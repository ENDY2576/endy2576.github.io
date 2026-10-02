/**
 * 全局平滑滚动（Lenis 1.3.26，自托管 /js/lenis.min.js）
 * ------------------------------------------------------------
 * 只接管「滚轮 / 触控板」的滚动曲线（加一层惯性缓动），触屏交给系统原生惯性，
 * 所以在手机上不会有任何「假滑动」的违和感。
 *
 * 与站上其他脚本的协作（关键点）：
 *  1. window.scrollTo 被改写成走 lenis.scrollTo(immediate) —— 主题自带的
 *     `anzhiyu.scrollToDest()` 是逐帧 rAF 缓动，每帧调用 scrollTo，
 *     这样改写后它依旧逐帧生效，但不会和 Lenis 的内部目标值互相拉扯（避免抖动/回滚）。
 *  2. 可滚动的内嵌容器（设置面板、代码块、侧栏目录…）自动打 `data-lenis-prevent`，
 *     鼠标在它们上面滚动时交还给原生滚动，不会「滚不动」。
 *  3. 弹层打开（body overflow 被置 hidden/clip）→ 自动 stop()，关闭 → start()。
 *  4. pjax 换页后 resize() + 重新扫描可滚动容器。
 *  5. 尊重 prefers-reduced-motion；localStorage['endy-lenis-off']='1' 可一键关闭。
 *
 * 对外暴露：
 *  window.__endyLenis            Lenis 实例（后续卡片视差/速度特效都从这里取 velocity）
 *  window.__endyLenisState()     调试用：当前 scroll / velocity / 是否运行中
 */
(function () {
  'use strict';
  if (window.__endyLenisReady) return;
  window.__endyLenisReady = true;

  var CFG = {
    lerp: 0.09,             // 惯性系数：越小越「重」。0.08~0.12 是手感甜区
    wheelMultiplier: 1,     // 滚轮灵敏度
    touchMultiplier: 1.8,
    smoothWheel: true,      // 滚轮/触控板平滑
    syncTouch: false,       // 触屏不接管（保留系统原生惯性）
    gestureOrientation: 'vertical',
    overscroll: false,      // 到顶/到底不做橡皮筋
    anchorOffset: -80,      // 锚点跳转预留顶部导航高度
    stopThreshold: 0.5
  };

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var off = false;
  try { off = localStorage.getItem('endy-lenis-off') === '1'; } catch (e) {}
  if (reduce || off) {
    window.__endyLenis = null;
    return;
  }
  if (typeof window.Lenis !== 'function') {
    console.warn('[lenis] Lenis 未加载，平滑滚动未启用');
    return;
  }

  var lenis = new window.Lenis({
    lerp: CFG.lerp,
    wheelMultiplier: CFG.wheelMultiplier,
    touchMultiplier: CFG.touchMultiplier,
    smoothWheel: CFG.smoothWheel,
    syncTouch: CFG.syncTouch,
    gestureOrientation: CFG.gestureOrientation,
    overscroll: CFG.overscroll,
    autoRaf: false,          // 自己跑 rAF：方便后面接卡片速度特效，统一时序
    anchors: { offset: CFG.anchorOffset, duration: 1.1 },
    autoResize: true
  });
  window.__endyLenis = lenis;

  // ---------- 0. 覆写 Lenis 的落点：直接写 scrollTop ----------
  // ⚠️ 实测（Edge/Chromium + 本站 CSS）：Lenis 默认的 setScroll 走
  //    `window.scrollTo({top, behavior:'instant'})`，在 rAF 内部调用时**不生效**
  //    （同一句从普通任务里调用却正常），表现为「滚轮有速度、页面一动不动」。
  //    直接给滚动元素写 scrollTop 同步且必定生效，这里就改成直写。
  var scrollRoot = document.scrollingElement || document.documentElement;
  lenis.setScroll = function (scroll) {
    try {
      if (lenis.isHorizontal) scrollRoot.scrollLeft = scroll;
      else scrollRoot.scrollTop = scroll;
    } catch (e) {
      window.__endyLenisNativeScrollTo(0, scroll);
    }
  };

  // ---------- 1. 让主题的逐帧 scrollTo 走 Lenis，避免两套动画互相打架 ----------
  // ⚠️ Lenis 内部落地滚动原本调用 window.scrollTo，所以必须加「重入保护」：
  //    Lenis 自己发起的调用一律放行给原生，否则会变成
  //    scrollTo → lenis.scrollTo → scrollTo 的无限递归（表现为滚轮完全不动）。
  var nativeScrollTo = window.scrollTo.bind(window);
  window.__endyLenisNativeScrollTo = nativeScrollTo; // 调试/逃生舱：需要绕过 Lenis 时用
  var inLenis = false;   // 当前是否处于 lenis.raf() 内部
  var applying = false;  // 当前是否处于「我们转发给 Lenis」的调用内部
  // 平滑跳转到某个位置：距离越远时长越长（0.55s ~ 1.3s），走 Lenis 默认 expo-out 曲线
  function smoothTo(target) {
    var cur = window.scrollY || 0;
    var dist = Math.abs(target - cur);
    var dur = Math.max(0.55, Math.min(dist / 2600, 1.3));
    lenis.scrollTo(target, { duration: dur, force: true });
  }

  function smoothToWith(target, time) {
    var cur = window.scrollY || 0;
    var dist = Math.abs(target - cur);
    var dur = Math.max((time || 500) / 1000, Math.min(dist / 2600, 1.3));
    lenis.scrollTo(target, { duration: dur, force: true });
  }

  window.scrollTo = function (a, b) {
    if (inLenis || applying || !lenis) return nativeScrollTo(a, b);
    var top = null;
    var smooth = false;
    if (a && typeof a === 'object') {
      top = typeof a.top === 'number' ? a.top : null;
      smooth = a.behavior === 'smooth';   // ⚠️ 主题的「回到顶部」走的就是这个
    } else if (typeof a === 'number') {
      top = (typeof b === 'number' ? b : a);
    }
    if (top === null || top === undefined) return nativeScrollTo(a, b);
    if (smooth) { smoothTo(top); return; }
    applying = true;
    try {
      lenis.scrollTo(top, { immediate: true, force: true });
    } catch (e) {
      nativeScrollTo(a, b);
    } finally {
      applying = false;
    }
  };

  // 主题的 anzhiyu.scrollToDest(pos, time) 原本用原生 behavior:'smooth'，
  // 被上面的接管后虽然不瞬移了，但拿不到它自己的 time 参数；这里单独接一层，
  // 让「回到顶部 / TOC 跳转」都走 Lenis 的缓动曲线。
  function hookTheme() {
    var A = window.anzhiyu;
    if (!A || typeof A.scrollToDest !== 'function' || A.__endyLenisHooked) return false;
    A.__endyLenisHooked = true;
    A.scrollToDest = function (pos, time) { smoothToWith(pos, time); };
    // 主题这个版本是「直接 window.scrollTo(0, domTop - 80)」——原生瞬移，
    // 顶部菜单里的锚点跳转走的正是它，一样接成缓动。
    if (typeof A.scrollTo === 'function' && !A.__endyLenisHooked2) {
      A.__endyLenisHooked2 = true;
      var origTo = A.scrollTo;
      A.scrollTo = function (id) {
        var el = null;
        try { el = document.querySelector(id); } catch (e) {}
        if (!el) return origTo(id);
        var y = el.getBoundingClientRect().top + (window.scrollY || 0) - 80;
        smoothTo(Math.max(0, y));
      };
    }
    return true;
  }
  hookTheme();
  window.addEventListener('load', hookTheme);
  var hookTries = 0;
  var hookTimer = setInterval(function () {
    if (hookTheme() || ++hookTries > 20) clearInterval(hookTimer);
  }, 300);
  // 首页卡片拖到屏幕边缘时的自动滚动用的是 window.scrollBy，同样接过来，
  // 否则原生 scrollBy 会和 Lenis 的内部目标值互相拉扯（拖拽时页面会「往回弹」）。
  var nativeScrollBy = window.scrollBy.bind(window);
  window.scrollBy = function (a, b) {
    if (inLenis || applying || !lenis) return nativeScrollBy(a, b);
    var dy = null;
    if (a && typeof a === 'object') dy = typeof a.top === 'number' ? a.top : null;
    else if (typeof a === 'number') dy = (typeof b === 'number' ? b : a);
    if (dy === null || dy === undefined) return nativeScrollBy(a, b);
    applying = true;
    try {
      lenis.scrollTo(window.scrollY + dy, { immediate: true, force: true });
    } catch (e) {
      nativeScrollBy(a, b);
    } finally {
      applying = false;
    }
  };

  // 有些地方用 Element.scrollIntoView：只有「没有可滚动祖先」时才交给 Lenis，
  // 否则（比如代码块、面板内部）必须走原生，不然会把整个页面滚走。
  var nativeIntoView = window.Element.prototype.scrollIntoView;
  function scrollableAncestor(el) {
    var n = el && el.parentElement;
    while (n && n !== document.body && n !== document.documentElement) {
      var oy = getComputedStyle(n).overflowY;
      if ((oy === 'auto' || oy === 'scroll') && n.scrollHeight > n.clientHeight + 4) return n;
      n = n.parentElement;
    }
    return null;
  }
  window.Element.prototype.scrollIntoView = function (opt) {
    if (!lenis || scrollableAncestor(this)) return nativeIntoView.call(this, opt);
    var y = this.getBoundingClientRect().top + (window.scrollY || 0) + CFG.anchorOffset;
    try {
      lenis.scrollTo(y, { duration: 0.9 });
      return;
    } catch (e) {
      return nativeIntoView.call(this, opt);
    }
  };

  // ---------- 2. 内嵌可滚动容器 → 交还原生滚动 ----------
  var SCAN_ROOTS = '#aside-content, #article-container, #post, #page, .card-widget, dialog, .swiper, .tk-comment, #twikoo';
  var SCAN_SELECTOR = SCAN_ROOTS + ', ' + SCAN_ROOTS + ' *';
  function markScrollables() {
    var nodes = document.querySelectorAll(SCAN_SELECTOR);
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var cs = getComputedStyle(el);
      var oy = cs.overflowY;
      if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight + 8) {
        el.setAttribute('data-lenis-prevent', '');
      }
    }
  }

  // ---------- 3. 弹层打开时停摆 ----------
  function isLocked() {
    var b = getComputedStyle(document.body);
    return b.overflow === 'hidden' || b.overflow === 'clip' || b.overflowY === 'hidden';
  }
  var wasLocked = false;
  function syncLock() {
    var locked = isLocked();
    if (locked === wasLocked) return;
    wasLocked = locked;
    if (locked) lenis.stop();
    else { lenis.start(); wake(); }   // 弹层关闭 → 解锁并唤醒循环（若有未完运动）
  }
  if (typeof MutationObserver !== 'undefined') {
    var mo = new MutationObserver(syncLock);
    mo.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'] });
  }

  // ---------- 4. rAF 主循环（空闲自休眠，省掉空转）----------
  // ⚠️ 关键性能修复：原实现每帧无条件 requestAnimationFrame(raf)，
  //    导致哪怕页面静止也在 60fps 空转，白天模式主线程常年被占 → 滚动掉帧 / 风扇转 / 整体发滞。
  //    现改为「有运动才续帧」：惯性未停 / 正在平滑跳转(targetScroll 未达) 才排下一帧，
  //    静止即休眠；用户的滚轮 / 触摸 / 按键 / 程序化滚动都会 wake() 唤醒。
  var rafId = 0;
  function raf(t) {
    rafId = 0;
    inLenis = true;
    try {
      lenis.raf(t);
    } finally {
      inLenis = false;
    }
    if (lenis.isStopped) return;                  // 弹层锁滚动：彻底停摆，等解锁再 wake
    var moving = Math.abs(lenis.velocity) > 0.06;  // 滚轮/触摸惯性还在衰减
    var animating = (typeof lenis.targetScroll === 'number') &&
                    Math.abs(lenis.scroll - lenis.targetScroll) > 0.5; // 平滑跳转进行中
    if (moving || animating) rafId = requestAnimationFrame(raf);
    // 否则：不再排帧 → 主线程休眠，直到下一次 wake()
  }
  function wake() {
    if (rafId === 0 && !lenis.isStopped) rafId = requestAnimationFrame(raf);
  }
  // 任何可能发起滚动的输入都唤醒循环；输入框里打字不误唤醒
  ['wheel', 'touchstart', 'pointerdown'].forEach(function (ev) {
    window.addEventListener(ev, wake, { passive: true });
  });
  window.addEventListener('keydown', function (e) {
    var t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    wake();
  }, { passive: true });
  // 程序化滚动（含主题自己的 anzhiyu.scrollToDest、回到顶部等）一律唤醒
  // —— 覆盖所有调用 lenis.scrollTo 的路径，确保动画期间循环不睡
  var _origLenisScrollTo = lenis.scrollTo.bind(lenis);
  lenis.scrollTo = function () {
    wake();
    return _origLenisScrollTo.apply(null, arguments);
  };
  // 标签页切走：取消挂起的帧；切回：唤醒（若有未完运动）
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
    } else {
      wake();
    }
  });
  wake(); // 首屏启动；无运动时会在 1 帧内自行休眠

  // ---------- 5. pjax / 首屏 ----------
  function refresh() {
    lenis.resize();
    markScrollables();
    wake();   // 尺寸变化后可能有未完运动，唤醒循环重新收敛
  }
  window.addEventListener('load', refresh);
  if (window.document.addEventListener) {
    document.addEventListener('pjax:complete', function () {
      setTimeout(refresh, 120);
    });
    document.addEventListener('pjax:success', function () {
      setTimeout(refresh, 60);
    });
  }
  setTimeout(markScrollables, 800);

  window.__endyLenisState = function () {
    return {
      ready: true,
      scroll: Math.round(lenis.scroll),
      velocity: +lenis.velocity.toFixed(3),
      isStopped: lenis.isStopped,
      direction: lenis.direction,
      htmlClass: document.documentElement.className.slice(0, 60)
    };
  };
})();
