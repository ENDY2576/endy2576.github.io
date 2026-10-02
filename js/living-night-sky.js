/**
 * 活夜空 · 景深星野（v1）
 * ------------------------------------------------------------
 * 夜间模式（[data-theme="dark"]）下常驻的「活背景」：
 * 在夜景照片（#web_bg, z-index:-999）之上、所有内容之下（z-index:-998）
 * 铺一层多层景深星点 + 站点主题色(#4b5cc4)微光星云，让原本昏暗静止的
 * 夜景「活」起来，且不与长按流星雨(meteor-boost, z:9990)抢戏（各占一层）。
 *
 * 运动 / 交互（世界级微交互基线）：
 *  - 指针视差：近层星点跟随指针位移更大、远层更小（真实景深）；
 *  - 滚动视差：随页面滚动做轻微纵向漂移（Lenis 优先，回退 window.scrollY）；
 *  - 时间漂移：星点极缓慢漂移 + 独立相位闪烁，静止时也有生命感；
 *  - 主题色星云：两团极淡的 #4b5cc4 光晕缓慢呼吸浮动，统一冷调高级感。
 *
 * 性能 / 降级：
 *  - DPR 上限 2；选项卡隐藏(visibilitychange)暂停 rAF 省电；
 *  - prefers-reduced-motion：仅画一帧静态星野，不进循环；
 *  - 切浅色：MutationObserver 收手并清屏；空闲仍常驻（本身就是氛围层）。
 */
(function () {
  'use strict';
  if (window.__endyStarsReady) return;
  window.__endyStarsReady = true;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var CFG = {
    // 三层景深：远（多·小·暗·位移弱）→ 近（少·大·亮·位移强）
    farCount: 230, farSize: [0.5, 1.1], farAlpha: [0.22, 0.5], farDepth: 6,
    midCount: 120, midSize: [1.0, 1.8], midAlpha: [0.38, 0.7], midDepth: 14,
    nearCount: 46, nearSize: [1.6, 2.8], nearAlpha: [0.6, 1.0], nearDepth: 30,
    twMin: 0.6, twMax: 2.2,        // 闪烁角频率（rad/s）
    driftX: 1.6, driftY: 0.5,      // 极缓全局漂移 px/s（让画面永不静止）
    pointerGain: 26,               // 指针视差最大位移 px（按层 depth 比例缩放）
    scrollGain: 0.032,             // 滚动视差：每 px 滚动位移系数（按层 depth 缩放）
    nebulaAlpha: 0.11,             // 主题色星云最大不透明度（极淡，screen 混合自然提亮暗部）
    nebulaColor: '75, 92, 196'     // #4b5cc4 站点主题色
  };

  var canvas, ctx, dpr = 1, W = 0, H = 0;
  var stars = [];
  var nebula = [];
  var raf = 0, last = 0, t0 = 0;
  var pointer = { x: 0, y: 0, tx: 0, ty: 0 }; // 归一化 -1..1（中心为 0）；tx/ty 目标，x/y 平滑
  var scrollY = 0, scrollYT = 0;
  var running = false;

  function isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  function rnd(a, b) { return a + Math.random() * (b - a); }

  function ensureCanvas() {
    if (canvas) return;
    canvas = document.createElement('canvas');
    canvas.id = 'endy-stars';
    // 关键：固定在背景图之上、内容之下；screen 混合让星点/星云在暗底上自然发光
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;' +
      'z-index:-998;pointer-events:none;display:none;mix-blend-mode:screen;';
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
  }

  function resize() {
    if (!canvas) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildStars();
  }

  function makeLayer(count, sizeR, alphaR, depth) {
    var arr = [];
    for (var i = 0; i < count; i++) {
      arr.push({
        x: Math.random() * W,
        y: Math.random() * H,
        s: rnd(sizeR[0], sizeR[1]),
        a: rnd(alphaR[0], alphaR[1]),
        ph: Math.random() * Math.PI * 2,
        tw: rnd(CFG.twMin, CFG.twMax),
        depth: depth
      });
    }
    return arr;
  }

  function buildStars() {
    if (!W || !H) return;
    stars = []
      .concat(makeLayer(CFG.farCount, CFG.farSize, CFG.farAlpha, CFG.farDepth))
      .concat(makeLayer(CFG.midCount, CFG.midSize, CFG.midAlpha, CFG.midDepth))
      .concat(makeLayer(CFG.nearCount, CFG.nearSize, CFG.nearAlpha, CFG.nearDepth));
    // 两团主题色星云：缓慢呼吸 + 反向漂浮
    nebula = [
      { bx: 0.28, by: 0.30, r: Math.max(W, H) * 0.42, ph: Math.random() * 6.28, sp: 0.12, dir: 1 },
      { bx: 0.74, by: 0.72, r: Math.max(W, H) * 0.40, ph: Math.random() * 6.28, sp: 0.09, dir: -1 }
    ];
  }

  function drawStatic() {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < stars.length; i++) {
      var st = stars[i];
      ctx.globalAlpha = st.a;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(st.x, st.y, st.s, 0, 6.2832);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function frame(ts) {
    if (!running) return;
    if (!last) { last = ts; t0 = ts; }
    var dt = Math.min(ts - last, 50);
    last = ts;
    var time = (ts - t0) / 1000;

    // 平滑指针 / 滚动（缓动跟随，避免突兀）
    pointer.x += (pointer.tx - pointer.x) * 0.06;
    pointer.y += (pointer.ty - pointer.y) * 0.06;
    scrollY += (scrollYT - scrollY) * 0.08;

    ctx.clearRect(0, 0, W, H);

    // 主题色星云（极淡，screen 混合自然提亮暗部，统一冷调）
    for (var n = 0; n < nebula.length; n++) {
      var nb = nebula[n];
      var breath = 0.6 + 0.4 * Math.sin(time * nb.sp + nb.ph);
      var nx = (nb.bx + 0.04 * Math.sin(time * 0.03 * nb.dir + nb.ph)) * W;
      var ny = (nb.by + 0.04 * Math.cos(time * 0.025 * nb.dir + nb.ph)) * H;
      var na = CFG.nebulaAlpha * breath;
      var g = ctx.createRadialGradient(nx, ny, 0, nx, ny, nb.r);
      g.addColorStop(0, 'rgba(' + CFG.nebulaColor + ',' + na.toFixed(3) + ')');
      g.addColorStop(1, 'rgba(' + CFG.nebulaColor + ',0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }

    // 星点：按层 depth 做指针 + 滚动视差 + 极缓漂移 + 闪烁（wrap 保持密度）
    for (var i = 0; i < stars.length; i++) {
      var st = stars[i];
      var k = st.depth / CFG.nearDepth; // 0~1（近层=1）
      var px = pointer.x * CFG.pointerGain * k;
      var py = pointer.y * CFG.pointerGain * k;
      var sy = scrollY * CFG.scrollGain * k;
      var dx = (time * CFG.driftX * (0.3 + k)) % W;
      var dy = (time * CFG.driftY * (0.3 + k)) % H;
      var x = (st.x + px + dx) % W;
      var y = (st.y + py + sy + dy) % H;
      if (x < 0) x += W;
      if (y < 0) y += H;
      var tw = 0.55 + 0.45 * Math.sin(time * st.tw + st.ph);
      ctx.globalAlpha = Math.max(0, Math.min(1, st.a * tw));
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(x, y, st.s, 0, 6.2832);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (!isDark() || running) return;
    ensureCanvas();
    canvas.style.display = 'block';
    if (reduce) { drawStatic(); return; } // 减少动态：仅一帧静态星野
    running = true;
    last = 0;
    if (!raf) raf = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
    if (canvas) canvas.style.display = 'none';
    if (ctx) ctx.clearRect(0, 0, W, H);
  }

  // 指针视差（归一化到 -1..1，中心为 0）
  window.addEventListener('pointermove', function (e) {
    if (!isDark() || !running) return;
    pointer.tx = (e.clientX / W) * 2 - 1;
    pointer.ty = (e.clientY / H) * 2 - 1;
  }, { passive: true });

  // 滚动视差：Lenis 优先，回退 window.scrollY
  function onScroll() {
    if (!isDark()) return;
    var y = (window.__endyLenis && window.__endyLenis.scroll)
      ? window.__endyLenis.scroll
      : (window.scrollY || window.pageYOffset || 0);
    scrollYT = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // 选项卡隐藏时暂停 rAF 省电；回到前台且仍是暗色则恢复
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
    } else if (isDark() && running && !reduce) {
      last = 0;
      raf = requestAnimationFrame(frame);
    }
  });

  // 主题切换：进暗 → 起；出暗 → 收（与 meteor-boost 同范式）
  if (typeof MutationObserver !== 'undefined') {
    var mo = new MutationObserver(function () {
      if (isDark()) start(); else stop();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  // 初始：若已处于暗色（直链/pjax 残留）则启动
  if (isDark()) start();

  // 调试：控制台 __endyStarsStats() 看状态
  window.__endyStarsStats = function () {
    return {
      dark: isDark(),
      running: running,
      stars: stars.length,
      nebula: nebula.length,
      scrollY: Math.round(scrollY),
      pointer: { x: +pointer.x.toFixed(2), y: +pointer.y.toFixed(2) }
    };
  };
})();
