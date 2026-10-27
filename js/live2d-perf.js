/**
 * Live2D 看板娘滚动暂停（性能优化 · v2.1 动效版）
 * ------------------------------------------------------------------
 * v2 移除了全局 rAF patch（解决误伤其他脚本 rAF 的问题），
 * 但 hide/show 直接改 canvas.style.visibility 绕过了 custom.css 里
 * 已有的 miku-hidden 过渡动效（opacity+transform 柔和滑出）。
 *
 * 这版：
 *   1. 隐藏/显示通过切换 #oml2d-stage.miku-hidden 触发 CSS 过渡
 *      （custom.css:L1367-1401 已定义 opacity 0.36s + transform 0.42s）；
 *   2. 不 patch rAF、不改 canvas 尺寸、不触发 oml2d 重绘——
 *      visibility:hidden 直接让浏览器跳过合成层绘制，WebGL context 完整保留。
 */
(function () {
  'use strict';
  if (!window.requestAnimationFrame) return;

  var SCROLL_MS = 200;           // 滚动停滞后多久恢复（lenis 惯性衰减时间）
  var pendingShow = 0;           // setTimeout id
  var hideRAF = 0;               // rAF 批处理 id
  var HIDE_CLASS = 'miku-hidden';

  function getStage() {
    // #oml2d-stage 是 oml2d 创建的包裹层（canvas 直接挂在它里面）
    return document.getElementById('oml2d-stage');
  }

  function hide() {
    var s = getStage();
    if (!s) return;
    s.classList.add(HIDE_CLASS);
  }

  function show() {
    var s = getStage();
    if (!s) return;
    s.classList.remove(HIDE_CLASS);
  }

  // --- rAF 批处理 hide：scroll 事件高频（60+ 次/滚轮），
  //     但我们一帧内只需要 hide 一次 ---
  function scheduleHide() {
    if (hideRAF) return;
    hideRAF = requestAnimationFrame(function () {
      hideRAF = 0;
      hide();
    });
  }

  // --- 节流的 show：200ms 内只排一次 ---
  function scheduleShow() {
    if (pendingShow) return;
    pendingShow = setTimeout(function () {
      pendingShow = 0;
      show();
    }, SCROLL_MS);
  }

  // ---- 事件监听 ----

  window.addEventListener('scroll', function () {
    if (document.hidden) return;
    scheduleHide();
    scheduleShow();
  }, { passive: true });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      hide();
      if (pendingShow) { clearTimeout(pendingShow); pendingShow = 0; }
    } else {
      scheduleShow();
    }
  });

  // ---- 调试 API ----
  window.__endyLive2dPerf = function () {
    var s = getStage();
    return {
      version: 'v2.1',
      hidden: s ? s.classList.contains(HIDE_CLASS) : false,
      note: '通过 .miku-hidden class 触发 CSS 过渡，无全局 rAF patch'
    };
  };
})();
