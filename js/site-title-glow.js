/**
 * 夜间首页中心站名 · 辉光增强（呼吸 / 指针光斑 / 滚动衰减 / 流星联动 / 入场）
 * ------------------------------------------------------------
 * 结构：把 #site-title 的文本包一层 <span class="endy-title-glow" data-text="…">，
 *       不碰主题 pug（避免双主题树同步）。视觉分三层：
 *   ① 底色层：站名本体（--endy-title-color 冷白）
 *   ② 呼吸层：::before 复制一份文本 + blur(13px)，只动 opacity（GPU 合成，零重绘）
 *   ③ 光斑层：站名本体用 radial-gradient + background-clip:text，
 *              光斑中心跟随指针（JS 只写 --gx/--gy 两个变量）
 *
 * 强度由 --endy-glow-mul 统一控制 = 滚动衰减(1→0.25) + 流星蓄力加成(≤0.35) + 过载脉冲(+0.5)
 * 快速滚动时呼吸层轻微纵向拉伸（≤3%），和首页卡片 L3 同一套语言。
 *
 * 降级：prefers-reduced-motion / 非夜间 → 不包层，保持主题原本的静态柔光。
 */
(function () {
  'use strict';
  if (window.__endyTitleGlowReady) return;
  window.__endyTitleGlowReady = true;

  var CFG = {
    lerp: 0.18,        // 光斑跟随指针的平滑系数
    scrollFade: 0.75,  // 滚过一屏后衰减到的比例（1 → 0.25）
    velStretch: 0.00035,
    maxStretch: 0.03,
    chargeGain: 0.35,  // 流星蓄力时的辉光加成
    pulseGain: 0.5,    // 拉满过载瞬间的脉冲
    pulseMs: 420,
    enterDelay: 260,
    idleAfter: 1.6     // 滚过 1.6 屏就停 rAF（省电）
  };

  var REDUCED = false;
  try { REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  if (REDUCED) return;

  var span = null;
  var raf = 0, lastT = 0;
  var pt = { x: 0, y: 0 };       // 光斑目标（相对站名盒子的 px）
  var cur = { x: 0, y: 0 };
  var hasPt = false;
  var mul = 0, stretch = 0, pulse = 0;
  var prevOverload = false;
  var entered = false;
  var rect = null;

  function isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  function wrap() {
    var el = document.querySelector('#page-header h1#site-title') ||
             document.querySelector('h1#site-title');
    if (!el) return false;
    if (el.querySelector('.endy-title-glow')) {
      span = el.querySelector('.endy-title-glow');
      return true;
    }
    var text = (el.textContent || '').trim();
    if (!text) return false;
    var s = document.createElement('span');
    s.className = 'endy-title-glow';
    s.setAttribute('data-text', text);
    s.textContent = text;
    el.textContent = '';
    el.appendChild(s);
    span = s;
    // 入场：字距从 0.12em 收到 0.02em（一次性重绘）
    setTimeout(function () { s.classList.add('is-in'); }, CFG.enterDelay);
    return true;
  }

  function measure() {
    if (span) rect = span.getBoundingClientRect();
  }

  function frame(ts) {
    raf = requestAnimationFrame(frame);
    var dt = lastT ? Math.min(ts - lastT, 60) : 16.7;
    lastT = ts;

    // 切到浅色模式：立刻停 rAF，避免无谓重绘
    if (!isDark()) { stopLoop(); return; }

    var y = window.scrollY || 0;
    var vh = window.innerHeight || 1;

    // 滚太远就停摆，回到首屏附近再启动
    if (y > vh * CFG.idleAfter) {
      if (span) span.style.setProperty('--endy-glow-mul', '0.25');
      stopLoop();
      return;
    }

    var fade = 1 - CFG.scrollFade * Math.min(y / vh, 1);

    // 速度拉伸（与卡片 L3 同源）
    var v = window.__endyLenis ? window.__endyLenis.velocity : 0;
    var want = Math.min(Math.abs(v) * CFG.velStretch, CFG.maxStretch);
    stretch += (want - stretch) * 0.15;

    // 流星蓄力 / 过载脉冲
    var chargeGain = 0;
    var st = (typeof window.__endyMeteorStats === 'function') ? window.__endyMeteorStats() : null;
    if (st) {
      chargeGain = CFG.chargeGain * (st.charge || 0);
      if (st.overloaded && !prevOverload) pulse = 1;
      prevOverload = !!st.overloaded;
    } else {
      prevOverload = false;
    }
    if (pulse > 0) pulse = Math.max(0, pulse - dt / CFG.pulseMs);

    var target = fade + chargeGain + CFG.pulseGain * pulse;
    if (!entered) {
      entered = true;
      mul = 0;
    }
    mul += (target - mul) * 0.12;

    // 光斑跟随
    if (hasPt && rect) {
      cur.x += (pt.x - cur.x) * CFG.lerp;
      cur.y += (pt.y - cur.y) * CFG.lerp;
      span.style.setProperty('--gx', cur.x.toFixed(1) + 'px');
      span.style.setProperty('--gy', cur.y.toFixed(1) + 'px');
    }

    span.style.setProperty('--endy-glow-mul', Math.max(0, mul).toFixed(3));
    span.style.setProperty('--endy-glow-scale', (1 + stretch).toFixed(4));
  }

  function startLoop() {
    if (raf || !span) return;
    if (!isDark()) return; // 浅色模式不跑辉光 rAF：辉光样式只在 [data-theme=dark] 下生效
    lastT = 0;
    raf = requestAnimationFrame(frame);
  }
  function stopLoop() {
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
  }

  function bind() {
    var header = document.getElementById('page-header');
    var host = header || window;
    host.addEventListener('pointermove', function (e) {
      if (!span || !isDark()) return;
      if (!rect) measure();
      if (!rect) return;
      pt.x = e.clientX - rect.left;
      pt.y = e.clientY - rect.top;
      hasPt = true;
      startLoop();
    }, { passive: true });
    if (header) {
      header.addEventListener('pointerleave', function () {
        hasPt = false;
        if (span) {
          span.style.setProperty('--gx', '50%');
          span.style.setProperty('--gy', '50%');
        }
      }, { passive: true });
    }
    window.addEventListener('scroll', function () {
      measure();
      startLoop();
    }, { passive: true });
    window.addEventListener('resize', function () { measure(); }, { passive: true });
    // 切后台/最小化：暂停辉光 rAF，省电；回前台且仍是夜间时再启动
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stopLoop();
      else if (isDark()) startLoop();
    });
  }

  function init() {
    if (!wrap()) return;
    measure();
    bind();
    startLoop();
    setTimeout(measure, 800);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  document.addEventListener('pjax:complete', function () {
    stopLoop();
    span = null; entered = false; hasPt = false;
    setTimeout(init, 200);
  });

  window.__endyTitleGlowState = function () {
    return span ? {
      text: span.getAttribute('data-text'),
      mul: span.style.getPropertyValue('--endy-glow-mul'),
      gx: span.style.getPropertyValue('--gx'),
      gy: span.style.getPropertyValue('--gy'),
      scale: span.style.getPropertyValue('--endy-glow-scale'),
      running: !!raf
    } : { ready: false };
  };
})();
