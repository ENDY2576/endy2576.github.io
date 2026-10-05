/**
 * Live2D 看板娘渲染节流（性能优化 · 滚动感知版）
 * ------------------------------------------------------------------
 * 部署版 oml2d 渲染循环锁在闭包里，没有外部 pause/resume；devicePixelRatio 也改不了
 * 其画布分辨率（写死 2x）。所以用「全局 requestAnimationFrame 限频」兜底，并区分状态：
 *   - 隐藏标签：5fps（省电）
 *   - 滚动中：oml2d / dark.js / 光标 等限到 20fps，但 Lenis(raf) 与卡片滚动(frame)
 *     这类滚动驱动回调保持 60fps，保证滚动跟手、不自宫；
 *   - 点击/悬停/键盘交互：全放行 60fps（UI 跟手）；
 *   - 空闲：30fps，压低 Live2D 每帧 GPU/CPU 成本。
 * 通过回调名白名单识别滚动关键回调，避免把 Lenis 平滑滚动也一起限成卡顿。
 */
(function () {
  'use strict';
  if (!window.requestAnimationFrame || !window.cancelAnimationFrame || !window.setTimeout) return;

  var nativeRAF = window.requestAnimationFrame.bind(window);
  var nativeCAF = window.cancelAnimationFrame.bind(window);
  var now = function () { return (window.performance && performance.now) ? performance.now() : Date.now(); };

  var MIN_IDLE = 1000 / 30;      // 空闲 30fps
  var MIN_SCROLL = 1000 / 20;    // 滚动时非关键回调 20fps
  var MIN_HIDDEN = 1000 / 5;     // 后台 5fps
  var INTERACTION_MS = 400;      // 一般交互后多久恢复空闲节流
  var SCROLL_MS = 160;           // 滚动停滞后多久解除「滚动」态

  // 滚动驱动的关键回调：必须保持 60fps，否则平滑滚动本身会变卡
  var SCROLL_KEEP = { raf: 1, frame: 1 };

  var last = 0;
  var active = false;            // 点击/悬停/键盘
  var scrolling = false;         // 滚动中
  var tActive = null;
  var tScroll = null;

  function isHidden() {
    return document.hidden || document.visibilityState === 'hidden';
  }

  function getMin(cb) {
    if (isHidden()) return MIN_HIDDEN;
    if (scrolling) {
      if (cb && cb.name && SCROLL_KEEP[cb.name]) return 0; // 滚动关键回调不节流
      return MIN_SCROLL;
    }
    if (active) return 0;
    return MIN_IDLE;
  }

  function markActive() {
    active = true;
    if (tActive) clearTimeout(tActive);
    tActive = setTimeout(function () { active = false; }, INTERACTION_MS);
  }

  function markScroll() {
    scrolling = true;
    if (tScroll) clearTimeout(tScroll);
    tScroll = setTimeout(function () { scrolling = false; }, SCROLL_MS);
  }

  // 滚动用 scroll；其余交互用各自事件
  window.addEventListener('scroll', markScroll, { passive: true });
  ['pointerdown', 'pointermove', 'keydown', 'touchstart'].forEach(function (ev) {
    window.addEventListener(ev, markActive, { passive: true });
  });

  document.addEventListener('visibilitychange', function () {
    last = 0; // 切回前台时允许立刻渲染一帧
  });

  window.requestAnimationFrame = function (cb) {
    var min = getMin(cb);
    if (min <= 0) return nativeRAF(cb);

    var n = now();
    var wait = min - (n - last);
    if (wait <= 0) {
      last = n;
      return nativeRAF(cb);
    }
    return setTimeout(function () {
      last = now();
      nativeRAF(cb);
    }, wait);
  };

  window.cancelAnimationFrame = function (id) {
    clearTimeout(id);
    nativeCAF(id);
  };

  // 调试：控制台 __endyLive2dPerf()
  window.__endyLive2dPerf = function () {
    return {
      enabled: true,
      idleFps: Math.round(1000 / MIN_IDLE),
      scrollFps: Math.round(1000 / MIN_SCROLL),
      hiddenFps: Math.round(1000 / MIN_HIDDEN),
      scrolling: scrolling,
      active: active,
      hidden: isHidden()
    };
  };
})();
