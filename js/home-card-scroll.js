/**
 * 首页文章卡片 · 滚动缓动三层（L1 进场 / L2 视差 / L3 速度形变）
 * ------------------------------------------------------------
 * 依赖：Lenis（window.__endyLenis，提供平滑后的 velocity）。没装也能跑，
 *      只是速度用「两帧 scrollY 差」近似，手感略糙。
 *
 * L1 进场编排：只有折叠线以下的卡片才隐藏；进入视口时按速度伸缩 stagger ——
 *              滚得快就压缩间隔（不排队干等），慢慢翻页就拉开（有仪式感）。
 * L2 分层视差：封面 / 标题 / 元信息三种位移系数（14 / 5 / 2 px），形成纵深。
 * L3 速度形变：封面随滚动速度轻微纵向拉伸（≤4.5%），文字略微滞后位移（≤6px），
 *              速度归零时自然回弹（速度本身是平滑量，无需额外补间）。
 *
 * 为什么用 CSS 变量（--endy-cover-tf 等）而不是直接写 transform：
 *   home-drag-sort.js 的 ghost 是整张卡片的克隆，内联 transform 会被一起复制过去；
 *   改成自定义属性 + custom.css 里 `:not(.endy-drag-ghost)` 的选择器后，
 *   ghost 天生不匹配，拖起来的浮层永远是干净的原样。
 *
 * 为什么不动卡片本身（.recent-post-item）的 transform：
 *   - press-gravity.js 按压力反馈会写 card.style.transform（scale 0.985 + 倾斜）；
 *   - home-drag-sort.js 拖拽时会把原卡 hidden、ghost 用 fixed + transform 跟手。
 *   所以本脚本一律只写**子元素**（封面里的 a、标题、元信息），三者互不打架。
 *   L1 的隐藏/显现虽然写在卡片上，但只发生在进场那 620ms，且结束后立即清空内联样式，
 *   把 transform 交还给按压与主题 hover。
 *
 * 性能：位置用「文档坐标缓存 + scrollY」推算，避免每帧 getBoundingClientRect；
 *       滚动停止 / 图片加载 / 改窗口 / pjax 后才重算缓存；掉帧自动降档。
 */
(function () {
  'use strict';
  if (window.__endyCardScrollReady) return;
  window.__endyCardScrollReady = true;

  var CFG = {
    revealY: 24,          // 进场起始下沉像素
    revealScale: 0.985,   // 进场起始缩放
    revealDur: 620,       // 进场时长
    staggerBase: 110,     // 慢速滚动时的间隔
    staggerMin: 22,       // 高速滚动时压缩到
    coverParallax: 11,    // 封面视差幅度（px，随视口位置 -1.2~1.2 线性）
    coverScale: 1.12,     // 封面基准放大：给上下平移留出余量，否则平移会露出裁剪框外的空白
    titleParallax: 5,
    metaParallax: 2,
    velStretch: 0.00045,  // 速度 → 封面纵向拉伸系数
    maxStretch: 0.045,    // 拉伸封顶 4.5%
    velTextShift: 0.05,   // 速度 → 文字滞后位移系数
    maxTextShift: 6       // 文字位移封顶 6px
  };

  var REDUCED = false;
  try { REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  if (REDUCED) return; // 降级：完全不介入，卡片保持主题默认

  var EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
  var items = [];
  var io = null;
  var sv = 0;            // 平滑后的滚动速度
  var lastY = window.scrollY || 0;
  var lastT = 0;
  var dtAvg = 16.7;
  var quality = 2;       // 2=全效果 1=只留视差 0=全关
  var measureTimer = 0;
  var lastIdleY = 0;     // 上一帧滚动位置：用于「没滚动就跳过」的空闲判定

  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function num(v) { return (Math.round(v * 100) / 100).toFixed(2); }

  function isGhost(el) {
    var cl = el.classList;
    return !!cl && (cl.contains('endy-drag-ghost') || cl.contains('endy-drag-item'));
  }

  /* ---------------- 采集与缓存 ---------------- */
  function measure() {
    var y = window.scrollY || 0;
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var r = it.card.getBoundingClientRect();
      it.top = r.top + y;
      it.h = r.height;
    }
  }

  function scheduleMeasure() {
    clearTimeout(measureTimer);
    measureTimer = setTimeout(measure, 220);
  }

  function collect() {
    items = [];
    var cards = document.querySelectorAll('#recent-posts > .recent-post-item');
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      if (isGhost(card)) continue;
      var coverA = card.querySelector('.post_cover > a');
      var title = card.querySelector('.article-title');
      var meta = card.querySelector('.article-meta-wrap');
      // 每帧都要写 transform，先掐掉这些子元素自己的过渡，避免「拖泥带水」
      [coverA, title, meta].forEach(function (el) {
        if (el) el.style.transition = 'none';
      });
      items.push({
        card: card, coverA: coverA, title: title, meta: meta,
        top: 0, h: 0, revealed: true, pre: false, off: false, hover: false
      });
    }
    measure();
    setupReveal();
  }

  /* ---------------- L1 进场（速度感知 stagger） ---------------- */
  function setupReveal() {
    if (!('IntersectionObserver' in window)) return;
    if (io) { try { io.disconnect(); } catch (e) {} }
    var pending = [];
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      // 首屏可见的不隐藏，避免「闪一下才出现」
      if (it.top < window.innerHeight * 0.92) { it.revealed = true; continue; }
      it.revealed = false;
      if (!it.pre) {
        it.pre = true;
        it.card.style.opacity = '0';
        it.card.style.transform = 'translate3d(0,' + CFG.revealY + 'px,0) scale(' + CFG.revealScale + ')';
      }
      pending.push(it);
    }
    if (!pending.length) return;
    io = new IntersectionObserver(function (entries) {
      var batch = 0;
      var v = window.__endyLenis ? Math.abs(window.__endyLenis.velocity) : Math.abs(sv);
      // 滚得快 → 间隔压缩；慢慢翻 → 间隔拉开
      var stagger = clamp(CFG.staggerBase * (1 - v / 50), CFG.staggerMin, CFG.staggerBase);
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var it = null;
        for (var k = 0; k < items.length; k++) if (items[k].card === en.target) { it = items[k]; break; }
        if (!it || it.revealed) return;
        try { io.unobserve(en.target); } catch (e) {}
        var delay = Math.round(batch * stagger);
        batch++;
        it.revealed = true;
        requestAnimationFrame(function () {
          var c = it.card;
          c.style.transition = 'opacity ' + CFG.revealDur + 'ms ' + EASE + ' ' + delay + 'ms,' +
                               'transform ' + CFG.revealDur + 'ms ' + EASE + ' ' + delay + 'ms';
          c.style.opacity = '1';
          c.style.transform = 'translate3d(0,0,0) scale(1)';
          setTimeout(function () {
            // 交还控制权：清掉内联 transform，按压/拖拽/hover 才能正常接管
            c.style.transition = '';
            c.style.transform = '';
            c.style.opacity = '';
            it.pre = false;
          }, CFG.revealDur + delay + 60);
        });
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    for (var j = 0; j < pending.length; j++) io.observe(pending[j].card);
  }

  /* ---------------- 每帧：L2 视差 + L3 速度形变 ---------------- */
  function resetItem(it) {
    if (it.coverA) it.coverA.style.removeProperty('--endy-cover-tf');
    if (it.title) it.title.style.removeProperty('--endy-title-tf');
    if (it.meta) it.meta.style.removeProperty('--endy-meta-tf');
  }

  var running = false;
  function frame(ts) {
    if (!running) return;            // 标签页隐藏时由 stopLoop 停掉 rAF，避免后台空转
    requestAnimationFrame(frame);
    var dt = lastT ? Math.min(ts - lastT, 60) : 16.7;
    lastT = ts;
    dtAvg = dtAvg * 0.9 + dt * 0.1;
    quality = dtAvg > 30 ? 0 : (dtAvg > 22 ? 1 : 2);

    var y = window.scrollY || 0;
    var v = window.__endyLenis ? window.__endyLenis.velocity : (y - lastY);
    lastY = y;
    sv += (v - sv) * 0.2;
    if (Math.abs(sv) < 0.02) sv = 0;

    // 拖拽卡片时完全让位，避免和 home-drag-sort 抢 transform
    if (window.__endyDragActive === true) {
      if (sv !== 0) { sv = 0; }
      for (var d = 0; d < items.length; d++) {
        if (!items[d].off) { resetItem(items[d]); items[d].off = true; }
      }
      return;
    }

    // 空闲跳过：没在滚（速度已归零且页面位置没变）、无强制档时，跳过每帧 transform 写入。
    // 解决「明明没滚动却持续重排/重绘」导致的日常卡顿；一旦滚动 y 变化或 sv 回升立刻恢复。
    var forceOn = (typeof window.__endyCardScrollForce === 'number');
    if (!forceOn && Math.abs(sv) < 0.05 && y === lastIdleY) {
      return;
    }
    lastIdleY = y;

    var vh = window.innerHeight || 1;
    var q = (typeof window.__endyCardScrollForce === 'number') ? window.__endyCardScrollForce : quality;
    var full = q === 2;
    var stretch = full ? clamp(Math.abs(sv) * CFG.velStretch, 0, CFG.maxStretch) : 0;
    var shift = full ? clamp(sv * CFG.velTextShift, -CFG.maxTextShift, CFG.maxTextShift) : 0;

    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      if (!it.revealed) continue;
      var center = it.top + it.h / 2 - y;
      var p = clamp((center - vh / 2) / vh, -1.2, 1.2);
      // 只处理视口 ±1.2 屏（略大于视差范围），远处的清空 transform 让它们彻底休息
      if (p < -1.25 || p > 1.25) {
        if (!it.off) { resetItem(it); it.off = true; }
        continue;
      }
      it.off = false;
      var st = it.hover ? 0 : stretch;         // 悬停中的卡片不参与形变，避免抖动
      var sh = it.hover ? 0 : shift;
      if (it.coverA) {
        // 基准放大打底 → 上下平移 / 横向收窄都在裁剪框的余量内，不会露白
        it.coverA.style.setProperty('--endy-cover-tf', 'translate3d(0,' + num(p * CFG.coverParallax) + 'px,0)' +
          ' scale(' + CFG.coverScale + ')' +
          (st > 0.0005 ? ' scaleY(' + (1 + st).toFixed(4) + ') scaleX(' + (1 - st * 0.35).toFixed(4) + ')' : ''));
      }
      if (it.title) {
        it.title.style.setProperty('--endy-title-tf', 'translate3d(0,' + num(p * CFG.titleParallax + sh) + 'px,0)');
      }
      if (it.meta) {
        it.meta.style.setProperty('--endy-meta-tf', 'translate3d(0,' + num(p * CFG.metaParallax + sh * 0.5) + 'px,0)');
      }
    }
  }

  /* ---------------- 事件 ---------------- */
  function bind() {
    var wrap = document.getElementById('recent-posts');
    if (wrap) {
      wrap.addEventListener('pointerover', function (e) {
        var card = e.target && e.target.closest ? e.target.closest('.recent-post-item') : null;
        for (var i = 0; i < items.length; i++) items[i].hover = (items[i].card === card);
      }, true);
      wrap.addEventListener('pointerleave', function () {
        for (var i = 0; i < items.length; i++) items[i].hover = false;
      }, true);
    }
    window.addEventListener('scroll', scheduleMeasure, { passive: true });
    window.addEventListener('resize', function () { measure(); }, { passive: true });
    window.addEventListener('load', function () { setTimeout(measure, 200); });
    document.addEventListener('pjax:complete', function () {
      setTimeout(function () { collect(); }, 150);
    });
    // 封面懒加载完成后高度会变 → 重算
    var imgs = document.querySelectorAll('#recent-posts .post_cover img');
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].addEventListener('load', scheduleMeasure);
    }
  }

  function startLoop() {
    if (running) return;
    running = true;
    requestAnimationFrame(frame);
  }
  function stopLoop() { running = false; }
  // 标签页切到后台：直接停 rAF，避免无谓空转耗电/掉帧；切回前台且首页还在再启动
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stopLoop();
    else if (items.length) startLoop();
  });

  function init() {
    if (!document.querySelector('#recent-posts > .recent-post-item')) return;
    collect();
    bind();
    startLoop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 调试/调参用：控制台改 window.__endyCardScrollCfg.coverParallax = 20 即时生效；
  // window.__endyCardScrollForce = 2 可强制开满效果（无视掉帧降档）。
  window.__endyCardScrollCfg = CFG;
  window.__endyCardScrollState = function () {
    return {
      cards: items.length,
      sv: +sv.toFixed(2),
      quality: quality,
      dtAvg: +dtAvg.toFixed(1),
      sample: items.slice(0, 3).map(function (it) {
        return {
          top: Math.round(it.top), h: Math.round(it.h), revealed: it.revealed,
          cover: it.coverA ? it.coverA.style.getPropertyValue('--endy-cover-tf') : null,
          title: it.title ? it.title.style.getPropertyValue('--endy-title-tf') : null
        };
      })
    };
  };
})();
