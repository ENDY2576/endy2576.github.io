/**
 * 圆形主题切换（浅色 ⇄ 深色）
 * ------------------------------------------------------------
 * 用 View Transitions API 做「从点击处扩散的圆形揭示」：
 *   - 圆心 = 用户真实的点击 / 触摸坐标（键盘触发时退化为按钮中心）；
 *   - 半径 = 圆心到屏幕最远角的距离，保证圆能覆盖整个视口；
 *   - 两张快照都是 root 且尺寸/位置完全一致 → 页面内容不缩放、不位移；
 *   - 只给上层快照（new）做 clip-path 圆形裁切，下层（old）原样露出；
 *   - 切换瞬间冻结页面自身的 CSS 过渡，保证两张快照是干净的静态画面。
 *
 * 不支持 startViewTransition（旧浏览器 / Safari）或用户开启「减少动态效果」时，
 * 直接放行给主题原生的切换逻辑，行为与改动前完全一致。
 */
(function () {
  'use strict';

  if (window.__endyCircularThemeBound) return;
  window.__endyCircularThemeBound = true;

  // 主题里所有会触发深浅色切换的入口
  var TRIGGERS = [
    '#darkmode',                 // 右侧悬浮按钮
    '.darkmode_switchbutton',    // 侧栏 / 中控台
    '#menu-darkmode'             // 右键菜单
  ].join(',');

  var DURATION = 520;
  var bypass = false;            // 我们自己合成点击时的放行标志

  function prefersReduced() {
    try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
    catch (e) { return false; }
  }

  // 圆心到「最远屏幕角落」的距离 → 圆一定能盖满视口
  function maxRadius(x, y) {
    var dx = Math.max(x, window.innerWidth - x);
    var dy = Math.max(y, window.innerHeight - y);
    return Math.sqrt(dx * dx + dy * dy);
  }

  // 直接复用主题自己的切换逻辑（snackbar、本地存储、meta theme-color 全都不丢）
  function nativeToggle(btn) {
    bypass = true;
    try { btn.click(); } catch (e) {}
    bypass = false;
  }

  function circularToggle(btn, x, y) {
    var html = document.documentElement;
    html.classList.add('endy-vt-running');

    var vt;
    try {
      vt = document.startViewTransition(function () { nativeToggle(btn); });
    } catch (e) {
      html.classList.remove('endy-vt-running');
      nativeToggle(btn);
      return;
    }

    var cleanup = function () { html.classList.remove('endy-vt-running'); };

    vt.ready
      .then(function () {
        var r = maxRadius(x, y);
        html.animate(
          {
            clipPath: [
              'circle(0px at ' + x + 'px ' + y + 'px)',
              'circle(' + r + 'px at ' + x + 'px ' + y + 'px)'
            ]
          },
          {
            duration: DURATION,
            easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)'   // 只裁切上层页面
          }
        );
      })
      .catch(function () {});

    if (vt.finished && vt.finished.then) vt.finished.then(cleanup, cleanup);
    else setTimeout(cleanup, DURATION + 60);
    // 兜底：无论 VT 是否正常结束，都要把冻结类摘掉。
    // 否则 html.endy-vt-running 会残留 → body * { transition: none } 永久生效，
    // 全站所有过渡（卡片 hover、翻转动画…）都会变成瞬跳。
    setTimeout(cleanup, DURATION + 400);
  }

  document.addEventListener('click', function (e) {
    if (bypass) return;
    var t = e.target;
    if (!t || t.nodeType !== 1 || typeof t.closest !== 'function') return;

    var btn = t.closest(TRIGGERS);
    if (!btn) return;

    // 键盘（Enter/Space）触发时 clientX/Y 为 0，退化成按钮中心
    var x = e.clientX, y = e.clientY;
    if (!x && !y) {
      var r = btn.getBoundingClientRect();
      x = r.left + r.width / 2;
      y = r.top + r.height / 2;
    }

    if (typeof document.startViewTransition !== 'function' || prefersReduced()) return;

    // 拦下主题自己的监听器，改由我们用 View Transition 包一层触发
    e.preventDefault();
    e.stopPropagation();
    circularToggle(btn, x, y);
  }, true);
})();
