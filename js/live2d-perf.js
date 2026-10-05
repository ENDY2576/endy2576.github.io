/**
 * Live2D 看板娘渲染节流（性能优化）
 * ------------------------------------------------------------------
 * 背景：部署版 oml2d 的渲染循环被锁在闭包里，没有可从外部调用的 pause/resume，
 *        全局覆写 devicePixelRatio 也不影响其画布分辨率（库写死 2x）。
 *        所以这里用「全局 requestAnimationFrame 限频」作为可靠手段：
 *        - 页面空闲（无滚动/无指针/键盘交互）时，把 rAF 限到 30fps，
 *          直接压低 Live2D 每帧 GPU/CPU 成本；
 *        - 滚动/交互时放行（interacting=true），保证 Lenis 平滑滚动跟手；
 *        - 标签页隐藏时进一步降到 5fps，切回前台立即恢复。
 * 仅影响空闲态的 rAF 消费者（首页空闲时基本只有 Live2D），不破坏滚动与交互。
 */
(function () {
  'use strict';
  if (!window.requestAnimationFrame || !window.cancelAnimationFrame || !window.setTimeout) return;

  var nativeRAF = window.requestAnimationFrame.bind(window);
  var nativeCAF = window.cancelAnimationFrame.bind(window);
  var now = function () { return (window.performance && performance.now) ? performance.now() : Date.now(); };

  var MIN_IDLE = 1000 / 30;      // 空闲 30fps
  var MIN_HIDDEN = 1000 / 5;     // 后台 5fps
  var INTERACTION_MS = 400;      // 交互后多久恢复空闲节流

  var last = 0;
  var interacting = false;
  var hidden = false;
  var t = null;

  function isHidden() {
    return document.hidden || document.visibilityState === 'hidden';
  }

  function getMin() {
    if (isHidden()) return MIN_HIDDEN;
    if (interacting) return 0;
    return MIN_IDLE;
  }

  function markInteracting() {
    interacting = true;
    hidden = isHidden();
    if (t) clearTimeout(t);
    t = setTimeout(function () { interacting = false; }, INTERACTION_MS);
  }

  ['scroll', 'pointerdown', 'pointermove', 'keydown', 'touchstart'].forEach(function (ev) {
    window.addEventListener(ev, markInteracting, { passive: true });
  });

  document.addEventListener('visibilitychange', function () {
    hidden = isHidden();
    last = 0; // 切回前台时允许立刻渲染一帧，避免首帧被旧 last 卡住
  });

  window.requestAnimationFrame = function (cb) {
    var min = getMin();
    if (min <= 0) return nativeRAF(cb);

    var n = now();
    var wait = min - (n - last);
    if (wait <= 0) {
      last = n;
      return nativeRAF(cb);
    }
    // 延迟到下一个节流刻度再调度；setTimeout id 可被下面的 cancelAnimationFrame 取消
    return setTimeout(function () {
      last = now();
      nativeRAF(cb);
    }, wait);
  };

  window.cancelAnimationFrame = function (id) {
    // 同时兼容 native rAF id 与本脚本返回的 setTimeout id
    clearTimeout(id);
    nativeCAF(id);
  };

  // 调试用：控制台输入 __endyLive2dPerf()
  window.__endyLive2dPerf = function () {
    return {
      enabled: true,
      idleFps: Math.round(1000 / MIN_IDLE),
      hiddenFps: Math.round(1000 / MIN_HIDDEN),
      interacting: interacting,
      hidden: isHidden()
    };
  };
})();
