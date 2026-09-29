/**
 * 重力按压（局部反馈）
 * ------------------------------------------------------------
 * 在站内卡片上按下时，按「指针落点」做局部重力反馈：
 *   1) 以落点为 transform-origin，卡片向落点方向微微下沉 + 微小倾斜（像被手指按下去）；
 *   2) 从落点扩散一圈柔和的涟漪，越偏离中心倾斜越明显；
 *   3) 松手后带一点弹性回正。
 *
 * 设计约束：
 *   - 事件委托挂在 document 捕获阶段，pjax 换页后依然生效，只绑定一次；
 *   - 全程不 preventDefault、不改 DOM 结构（涟漪是临时节点，播完即删），
 *     不影响链接跳转 / 文本选择 / 灯箱；
 *   - 只用 transform / opacity 动画，不触发重排；
 *   - 尊重 prefers-reduced-motion；按下过快（90ms 内重复）不重复触发。
 */
(function () {
  'use strict';

  if (window.__endyPressGravityBound) return;
  window.__endyPressGravityBound = true;

  // 参与按压反馈的「卡片」选择器
  var CARDS = [
    '.card-widget', '.card', '.post-card', '.recent-post-item', '.article-sort-item',
    '.article-item', '.author-content-item', '.categoryItem', '.tag-cloud-list a',
    '.card-tags a', '.card-categories a', '.card-archives li', '.card-webinfo li',
    '.flink-list-item', '.site-card', '.friend-content', '.gallery-item', '.fj-gallery a',
    '.note', '.post-copyright', '.relatedPosts .relatedPosts-list-item',
    '#article-container figure', '.post-img', '.cover', '.endy-egg-card',
    '.pagination a', '.pagination .page-number', '#aside-content .sticky_layout > div'
  ].join(',');

  // 这些元素/区域里按下不做动画：表单控件、可编辑区、看板娘自己的浮层
  var SKIP = [
    'input', 'textarea', 'select', 'option', '[contenteditable="true"]',
    'video', 'audio', 'canvas', 'iframe',
    '#oml2d-stage', '#miku-hitbox', '#oml2d-tips', '#miku-chat-dialog',
    '#miku-settings-panel', '#miku-article-picker'
  ].join(',');

  var MAX_TILT = 1.8;        // 按下时最大倾斜角度（度）
  var SCALE = 0.975;         // 按下时下沉缩放
  // 悬停（未按下）时的跟随倾斜：比按压轻，但要能明显感觉到「被指针吸住」
  var HOVER_TILT = 0.9;
  var HOVER_SCALE = 0.99;
  var PRESS_SHADOW = '0 10px 24px rgba(0, 0, 0, 0.16)';
  var MIN_W = 44, MIN_H = 24; // 太小的元素（小标签、小按钮）不参与，避免视觉噪音
  var THROTTLE = 90;         // ms

  var REDUCED = false;
  try {
    REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {}

  var current = null;      // 正在被「按压」的卡片
  var hovered = null;      // 正在被「悬停跟随」的卡片
  var hoverPt = null;
  var hoverRaf = 0;

  function clamp01(v) { return v < 0 ? 0 : (v > 1 ? 1 : v); }

  // 3D 翻转类卡片（transform-style: preserve-3d）不能碰：
  // 任何 transform / will-change 都会把它压平成 flat，翻转动画直接失效。
  function has3d(el) {
    var n = el, i = 0;
    while (n && n.nodeType === 1 && i < 5) {
      var ts = window.getComputedStyle(n).transformStyle;
      if (ts && ts.indexOf('preserve-3d') !== -1) return true;
      n = n.parentElement;
      i++;
    }
    return false;
  }

  function tiltTransform(rx, ry, tiltMax, scale, base) {
    var tiltX = (0.5 - ry) * 2 * tiltMax;   // 上半部分 → 顶部往后倒
    var tiltY = (rx - 0.5) * 2 * tiltMax;   // 右半部分 → 右侧往后倒
    return 'perspective(800px) rotateX(' + tiltX.toFixed(2) + 'deg) rotateY(' + tiltY.toFixed(2) +
      'deg) scale(' + scale + ')' + (base ? ' ' + base : '');
  }

  function release(el) {
    if (!el) return;
    var st = el.__endyPress;
    if (!st) return;
    el.__endyPress = null;
    if (current === el) current = null;
    el.style.transition = 'transform 460ms cubic-bezier(0.22, 1, 0.36, 1)';
    el.style.transform = st.base || '';
    clearTimeout(st.timer);
    st.timer = setTimeout(function () {
      // 拖拽排序已接管这张卡 → 交给拖拽脚本清理，别把它的 fixed/transform 冲掉
      if (el.classList.contains('endy-drag-item')) return;
      // 回正后清掉内联样式，把 transform 交还给主题自己的 hover 动画。
      // 注意顺序：先清 transform（此时 transition 还在，回落是平滑的），
      // 再隔一帧清 transition，否则 hover 上浮会「瞬跳」一下。
      el.style.transform = '';
      el.style.transformOrigin = '';
      el.style.willChange = '';
      el.style.boxShadow = '';
      setTimeout(function () { el.style.transition = ''; }, 60);
    }, 480);
  }

  function spawnRipple(card, rect, x, y) {
    // 空元素（img 等）不能挂子节点，直接跳过涟漪，只保留下沉
    if (/^(IMG|INPUT|BR|HR|SOURCE)$/.test(card.tagName)) return;
    var cs = window.getComputedStyle(card);
    var needRel = cs.position === 'static';
    if (needRel) card.classList.add('endy-press-rel');

    // 直径取「卡片长边 * 0.85」并夹在 130~240px：
    // 足够形成一圈明显的局部光晕，又不会大到溢出卡片外面（渐变边缘 78% 处已完全透明）
    var size = Math.max(130, Math.min(240, Math.max(rect.width, rect.height) * 0.85));
    var r = document.createElement('span');
    r.className = 'endy-press-ripple';
    r.style.width = size + 'px';
    r.style.height = size + 'px';
    r.style.left = x + 'px';
    r.style.top = y + 'px';
    card.appendChild(r);

    setTimeout(function () {
      if (r.parentNode) r.parentNode.removeChild(r);
      // 只有涟漪全播完才摘掉临时的 position:relative，避免影响卡片内绝对定位元素
      if (needRel && !card.querySelector('.endy-press-ripple')) {
        card.classList.remove('endy-press-rel');
      }
    }, 700);
  }

  function onDown(e) {
    if (window.__endyPressEnabled === false) return;   // 总开关：控制台里设 false 即可关闭
    if (window.__endyDragActive) return;               // 正在拖拽排序，交给拖拽脚本
    if (e.pointerType === 'mouse' && e.button !== 0) return; // 只响应左键
    var t = e.target;
    if (!t || t.nodeType !== 1 || typeof t.closest !== 'function') return;
    if (t.closest(SKIP)) return;

    var card = t.closest(CARDS);
    if (!card) return;

    var now = Date.now();
    if (card.__endyPress && now - card.__endyPress.t < THROTTLE) return;

    var rect = card.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    if (rect.width < MIN_W || rect.height < MIN_H) return;
    if (has3d(card)) return;                 // 3D 翻转卡片：不做任何 transform 干预

    var rx = clamp01((e.clientX - rect.left) / rect.width);
    var ry = clamp01((e.clientY - rect.top) / rect.height);

    // 保留卡片原本的 transform（主题的 hover 上浮等），避免按下瞬间「跳一下」。
    // 注意：此时卡片可能正带着「悬停跟随」的倾斜，必须以进入前的原始值为基准，
    // 否则每次按下都会在已有倾斜上再叠一层，越按越歪。
    var base = (card === hovered ? (card.__endyHoverBase || '') : window.getComputedStyle(card).transform);
    if (!base || base === 'none') base = '';

    card.style.transformOrigin = (rx * 100).toFixed(2) + '% ' + (ry * 100).toFixed(2) + '%';
    card.style.transition = 'transform 110ms cubic-bezier(0.2, 0, 0.35, 1), box-shadow 160ms ease';
    card.style.willChange = 'transform';
    card.style.boxShadow = PRESS_SHADOW;      // 按下时整卡轻微「浮起投影」，强化下压手感
    card.style.transform = tiltTransform(rx, ry, MAX_TILT, SCALE, base);

    card.__endyPress = { base: base, t: now, timer: 0 };
    current = card;

    if (!REDUCED) spawnRipple(card, rect, e.clientX - rect.left, e.clientY - rect.top);
  }

  function onUp() {
    if (current) release(current);
  }

  /* ---------------- 悬停跟随：指针在卡片上移动时就有重力反馈 ---------------- */

  function leaveHover() {
    if (!hovered) return;
    var el = hovered;
    hovered = null;
    hoverPt = null;
    el.style.transition = 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)';
    el.style.transform = el.__endyHoverBase || '';
    clearTimeout(el.__endyHoverTimer);
    el.__endyHoverTimer = setTimeout(function () {
      if (hovered === el) return;          // 又回来了，别清
      if (el.classList.contains('endy-drag-item')) return;
      el.style.transform = '';
      el.style.transformOrigin = '';
      el.style.transition = '';
    }, 340);
  }

  function onHoverMove(e) {
    if (window.__endyPressEnabled === false) return;
    if (window.__endyDragActive) return;
    if (e.pointerType && e.pointerType !== 'mouse') return;  // 触摸没有「悬停」语义
    if (current) return;                                     // 正在按压 → 交给按压逻辑
    if (e.buttons) return;                                   // 按住拖动时不做悬停跟随

    var t = e.target;
    if (!t || t.nodeType !== 1 || typeof t.closest !== 'function') { leaveHover(); return; }
    if (t.closest(SKIP)) { leaveHover(); return; }

    var card = t.closest(CARDS);
    if (!card || card.classList.contains('endy-drag-item')) { leaveHover(); return; }

    if (card !== hovered) {
      leaveHover();
      var r0 = card.getBoundingClientRect();
      if (!r0.width || !r0.height || r0.width < MIN_W || r0.height < MIN_H) return;
      if (has3d(card)) return;
      var b = window.getComputedStyle(card).transform;
      card.__endyHoverBase = (!b || b === 'none') ? '' : b;
      hovered = card;
    }

    hoverPt = { x: e.clientX, y: e.clientY };
    if (hoverRaf) return;
    hoverRaf = requestAnimationFrame(function () {
      hoverRaf = 0;
      if (!hovered || !hoverPt || !hovered.isConnected) return;
      var r = hovered.getBoundingClientRect();
      if (!r.width || !r.height) return;
      var rx = clamp01((hoverPt.x - r.left) / r.width);
      var ry = clamp01((hoverPt.y - r.top) / r.height);
      hovered.style.transformOrigin = (rx * 100).toFixed(2) + '% ' + (ry * 100).toFixed(2) + '%';
      hovered.style.transition = 'transform 160ms cubic-bezier(0.2, 0, 0.35, 1)';
      hovered.style.transform =
        tiltTransform(rx, ry, HOVER_TILT, HOVER_SCALE, hovered.__endyHoverBase);
    });
  }

  // 暴露给拖拽排序脚本：拖拽接管某张卡时，先把按压状态收干净
  window.__endyPressRelease = release;

  document.addEventListener('pointerdown', onDown, true);
  document.addEventListener('pointerup', onUp, true);
  document.addEventListener('pointercancel', onUp, true);
  document.addEventListener('pointermove', onHoverMove, true);
  document.addEventListener('mouseleave', leaveHover);
  window.addEventListener('blur', function () { onUp(); leaveHover(); });
  // 页面切走（pjax 跳转）时也要回正，否则卡片会一直歪着
  document.addEventListener('pjax:send', onUp);
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) onUp();
  });
})();
