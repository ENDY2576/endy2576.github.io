/**
 * Live2D 看板娘渲染节流（性能优化，零画质损失）
 * ------------------------------------------------------------
 * 站名辉光移除后，首页常驻的 GPU 重负载只剩 Live2D（WebGL ~60fps 渲染循环）。
 * 本脚本在不破坏库、不丢模型的前提下，按场景暂停/恢复其渲染循环：
 *   - 标签页隐藏 / 窗口失焦：停渲染（0 成本）
 *   - 页面滚动时：暂停渲染，把 GPU 让给滚动；停手 ~450ms 后恢复
 *     （拖拽看板娘 __endyDragActive 时不抢，保证拖动跟手）
 * 做法：直接调用 oml2d 暴露的渲染循环实例 oml2d.ticker 的 pause()/resume()，
 *       比劫持 requestAnimationFrame 安全（不会卡死渲染循环）。
 * 全局监听器在 pjax 翻页后依然有效（oml2d 因去掉 data-pjax 不重建）。
 */
(function () {
  'use strict';

  // 取渲染循环控制器：优先 oml2d 自带 ticker(pause/resume)，回退 PixiJS ticker(stop/start)
  function getPauser() {
    try {
      var o = window.oml2d;
      if (o && o.ticker && typeof o.ticker.pause === 'function') {
        return { pause: o.ticker.pause.bind(o.ticker), resume: o.ticker.resume.bind(o.ticker) };
      }
      var pt = o && o.pixiApp && o.pixiApp.ticker;
      if (pt && typeof pt.stop === 'function') {
        return { pause: pt.stop.bind(pt), resume: pt.start.bind(pt) };
      }
    } catch (e) {}
    return null;
  }

  var pausedByUs = false;
  function pause() {
    var p = getPauser();
    if (p && !pausedByUs) {
      try { p.pause(); pausedByUs = true; } catch (e) {}
    }
  }
  function resume() {
    var p = getPauser();
    if (p && pausedByUs) {
      try { p.resume(); pausedByUs = false; } catch (e) {}
    }
  }

  var hidden = function () { return document.hidden; };
  var scrolling = false, scrollTimer = null;

  function maybeResume() {
    if (!hidden() && !scrolling && !window.__endyDragActive) resume();
  }

  // 1) 标签页隐藏 / 窗口失焦：停渲染
  document.addEventListener('visibilitychange', function () {
    if (hidden()) pause(); else maybeResume();
  });
  window.addEventListener('blur', pause);
  window.addEventListener('focus', maybeResume);

  // 2) 滚动时暂停渲染（让 GPU 给滚动），停手后恢复；拖拽看板娘时不抢
  window.addEventListener('scroll', function () {
    if (window.__endyDragActive) return;
    scrolling = true;
    pause();
    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () {
      scrolling = false;
      maybeResume();
    }, 450);
  }, { passive: true });

  // 拖拽看板娘结束时，若此前被滚动暂停则恢复
  var _dragPoll = setInterval(function () {
    if (window.__endyDragActive) { resume(); }
    else { clearInterval(_dragPoll); }
  }, 120);
  setTimeout(function () { clearInterval(_dragPoll); }, 4000);
})();
