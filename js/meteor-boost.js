/**
 * 夜间流星雨 · 长按增强交互
 * ------------------------------------------------------------
 * 仅夜间模式（[data-theme="dark"]）生效。在屏幕任意区域「左键长按」，
 * 该区域周围的流星（斜向上飞）密度随时间递增，形成局部流星雨；
 * 松开后密度衰减、残留流星飞完即自动停。整体 pointer-events:none，不挡任何点击。
 *
 * 设计要点（世界级微交互）：
 *  - 长按 160ms 才触发，阈值前移动超 12px 视为滚动/拖拽 → 不误伤；
 *  - 落在按钮/链接/输入框/看板娘身体上 → 直接跳过，绝不抢交互；
 *  - 按住时在该区域浮现一抹葱绿柔光，给出「能量聚焦」反馈；
 *  - 粒子数封顶 + 仅在需要时跑 rAF，空闲零开销；
 *  - 尊重 prefers-reduced-motion：直接关闭；切到浅色模式自动收手。
 */
(function () {
  'use strict';
  if (window.__endyMeteorReady) return;
  window.__endyMeteorReady = true;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return; // 减少动态：不启用

  // 落在这些元素上不触发（真实 UI 控件 + 看板娘图层）
  var SKIP_SELECTOR = 'a,button,input,textarea,select,label,[role="button"],#miku-settings-panel,' +
                      '#miku-chat-dialog,#oml2d-stage,#miku-hitbox,#oml2d-tips,.rightside-item,.rightside-config';
  var HOLD_MS = 160;        // 触发长按的阈值
  var MOVE_CANCEL = 12;     // 阈值前移动超过此像素 → 取消（当作滚动）
  var MAX_PARTICLES = 160;
  var GLOW = '120, 200, 180'; // 葱绿偏青，柔光与尾色借用

  var canvas, ctx, dpr = 1, W = 0, H = 0;
  var particles = [];
  var raf = 0;
  var charging = false;
  var charge = 0;            // 0~1 长按蓄力
  var focus = { x: 0, y: 0 };
  var start = { x: 0, y: 0 };
  var moved = false;
  var holdTimer = 0;

  function ensureCanvas() {
    if (canvas) return;
    canvas = document.createElement('canvas');
    canvas.id = 'miku-meteor';
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;' +
      'z-index:1;pointer-events:none;display:none;';
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
  }

  function isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  function spawnOne() {
    if (particles.length >= MAX_PARTICLES) return;
    // 在 focus 周围做偏向中心的随机散布（区域半径随蓄力略增）
    var r = (60 + charge * 90) * Math.sqrt(Math.random());
    var a = Math.random() * Math.PI * 2;
    var x = focus.x + Math.cos(a) * r;
    var y = focus.y + Math.sin(a) * r;
    // 斜向上飞：角度 -62° ~ -28°（向右上方）
    var ang = (-28 - Math.random() * 34) * Math.PI / 180;
    var sp = 5 + Math.random() * 7;
    particles.push({
      x: x, y: y,
      vx: Math.cos(ang) * sp,
      vy: Math.sin(ang) * sp,          // 负值 → 向上
      len: 60 + Math.random() * 90,    // 拖尾长度
      life: 0,
      maxLife: 1100 + Math.random() * 900,
      w: 1.2 + Math.random() * 1.4
    });
  }

  function step() {
    if (!isDark()) { stop(); return; }
    if (charging) charge = Math.min(1, charge + 0.018);
    else charge = Math.max(0, charge - 0.03);

    // 生成速率随蓄力提升（每帧期望生成数）
    if (charging && charge > 0.02) {
      var rate = 0.6 + charge * 2.6;
      var n = Math.floor(rate) + (Math.random() < (rate % 1) ? 1 : 0);
      for (var i = 0; i < n; i++) spawnOne();
    }

    ctx.clearRect(0, 0, W, H);

    // 柔光：蓄力时给 focus 一抹葱绿微光，提示「能量聚焦区」
    if (charge > 0.02) {
      var gr = 160 + charge * 80;
      var g = ctx.createRadialGradient(focus.x, focus.y, 0, focus.x, focus.y, gr);
      g.addColorStop(0, 'rgba(' + GLOW + ',' + (0.10 * charge).toFixed(3) + ')');
      g.addColorStop(1, 'rgba(' + GLOW + ',0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(focus.x, focus.y, gr, 0, Math.PI * 2);
      ctx.fill();
    }

    // 画流星（带渐隐拖尾 + 头部亮点）
    var alive = [];
    for (var k = 0; k < particles.length; k++) {
      var p = particles[k];
      p.life += 16;
      if (p.life >= p.maxLife || p.x > W + 80 || p.y < -80 || p.x < -80 || p.y > H + 80) continue;
      p.x += p.vx;
      p.y += p.vy;
      var t = 1 - p.life / p.maxLife;              // 1→0 渐隐
      var mag = Math.hypot(p.vx, p.vy) || 1;
      var tx = p.x - (p.vx / mag) * p.len;
      var ty = p.y - (p.vy / mag) * p.len;
      var grad = ctx.createLinearGradient(p.x, p.y, tx, ty);
      grad.addColorStop(0, 'rgba(255,255,255,' + (0.9 * t).toFixed(3) + ')');
      grad.addColorStop(0.4, 'rgba(' + GLOW + ',' + (0.5 * t).toFixed(3) + ')');
      grad.addColorStop(1, 'rgba(' + GLOW + ',0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = p.w;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(tx, ty);
      ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,' + (0.9 * t).toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.w * 0.9, 0, Math.PI * 2);
      ctx.fill();
      alive.push(p);
    }
    particles = alive;

    // 收尾：未蓄力 + 蓄力归零 + 无残留 → 停 rAF、隐藏画布
    if (!charging && charge <= 0.001 && particles.length === 0) {
      stop();
      return;
    }
    raf = requestAnimationFrame(step);
  }

  function startLoop() {
    if (!isDark()) return;
    ensureCanvas();
    canvas.style.display = 'block';
    if (!raf) raf = requestAnimationFrame(step);
  }

  function stop() {
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
    if (canvas) canvas.style.display = 'none';
    if (ctx) ctx.clearRect(0, 0, W, H);
    particles = [];
    charge = 0;
    charging = false;
    document.body.style.userSelect = '';
  }

  window.addEventListener('pointerdown', function (e) {
    if (e.button !== 0) return;          // 仅左键/主指针
    if (!isDark()) return;
    var t = e.target;
    if (t && t.closest && t.closest(SKIP_SELECTOR)) return; // 落在 UI / 看板娘上 → 不触发
    moved = false;
    start.x = e.clientX;
    start.y = e.clientY;
    focus.x = e.clientX;
    focus.y = e.clientY;
    clearTimeout(holdTimer);
    holdTimer = setTimeout(function () {
      if (!moved) {
        charging = true;
        document.body.style.userSelect = 'none';
        startLoop();
      }
    }, HOLD_MS);
  }, true);

  window.addEventListener('pointermove', function (e) {
    if (moved) return;
    if (Math.abs(e.clientX - start.x) > MOVE_CANCEL || Math.abs(e.clientY - start.y) > MOVE_CANCEL) {
      moved = true;
      clearTimeout(holdTimer);
    }
  }, true);

  function endHold() {
    clearTimeout(holdTimer);
    if (charging) {
      charging = false;
      document.body.style.userSelect = '';
    }
  }
  window.addEventListener('pointerup', endHold, true);
  window.addEventListener('pointercancel', endHold, true);

  // 切到浅色模式时立刻收手
  if (typeof MutationObserver !== 'undefined') {
    var mo = new MutationObserver(function () {
      if (!isDark() && raf) stop();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }
})();
