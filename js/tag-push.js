/**
 * 标签挤开动画（Tag push-aside）
 * ------------------------------------------------------------
 * 鼠标停在某个标签上时：
 *   1) 当前标签稍微放大（默认 1.14）；
 *   2) 同一行内的邻近标签按「距离衰减」平滑向两侧让位 —— 越近让得越多；
 *   3) 位移全部走 transform，不触发重排，所以不会突然跳动；
 *      让位距离 = max(基础值, 当前标签放大后每侧多出来的量 + 3px)，保证永不重叠；
 *   4) 只影响「同一行」的标签：按 offsetTop 分组，换行后另一行完全不受影响；
 *      并且每次位移都被限制在容器左右边界内，小屏下不会把标签顶出容器。
 *
 * 键盘 focus 同样触发（无障碍）；触摸设备不触发（没有 hover 语义）。
 */
(function () {
  'use strict';

  if (window.__endyTagPushBound) return;
  window.__endyTagPushBound = true;

  // 参与「挤开」的标签容器
  // 注意：.categoryGroup（首页生活/学习/知识三张分类卡）不在这里 ——
  // 安知鱼自带的是「hover 那张宽度涨到 50%，其余被挤压收窄」的 width 动画，
  // 我们用 transform 去挤会把它覆盖掉，交给主题原生实现（见 custom.css 的平滑过渡增强）。
  var CONTAINERS = [
    '.card-tag-cloud', '.card-tags', '.tag-cloud-list', '.card-categories',
    '.post-meta__tags', '.article-sort-item-tags'
  ].join(',');

  var SCALE = 1.14;      // 当前标签放大倍数
  var MAX_PUSH = 12;     // 让位基础距离（px）
  var RANGE = 3;         // 影响几个邻居
  var DUR = 260;         // 让位时长（ms）
  var EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

  var REDUCED = false;
  try {
    REDUCED = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  } catch (e) {}

  if (REDUCED) return;

  var cache = new WeakMap();   // container → { items, crect }
  var curContainer = null;
  var lastItem = null;

  function itemsOf(container) {
    var kids = container.children;
    // 容器只有一个包裹层时，用包裹层的子元素（如 .card-tags > div > a）
    if (kids.length === 1 && kids[0].children.length > 1) {
      container = kids[0];
      kids = container.children;
    }
    var out = [];
    for (var i = 0; i < kids.length; i++) {
      var el = kids[i];
      if (el.nodeType === 1 && el.offsetWidth) out.push(el);
    }
    return { list: out, host: container };
  }

  // 测量：必须先清掉 transform，否则测到的是「已被推开」的位置
  function measure(container) {
    var got = itemsOf(container);
    var list = got.list;
    if (list.length < 2) return null;

    list.forEach(function (el) { el.style.transition = 'none'; el.style.transform = ''; });
    var crect = got.host.getBoundingClientRect();
    var data = [];
    var rowIdx = 0, lastTop = null;
    for (var i = 0; i < list.length; i++) {
      var el = list[i];
      var r = el.getBoundingClientRect();
      var top = Math.round(r.top);
      if (lastTop === null || Math.abs(top - lastTop) > 6) { lastTop = top; rowIdx++; }
      data.push({ el: el, left: r.left, right: r.right, w: r.width, row: rowIdx });
    }
    list.forEach(function (el) { el.style.transition = ''; });

    var info = { items: data, crect: crect };
    cache.set(container, info);
    return info;
  }

  function reset(el) {
    el.style.transition = 'transform ' + DUR + 'ms ' + EASE;
    el.style.transform = '';
    el.style.zIndex = '';
  }

  function resetAll(container) {
    var info = cache.get(container);
    lastItem = null;
    if (!info) return;
    info.items.forEach(function (d) { reset(d.el); });
  }

  function apply(container, hoverEl) {
    var info = cache.get(container) || measure(container);
    if (!info) return;

    var items = info.items;
    var idx = -1;
    for (var i = 0; i < items.length; i++) {
      if (items[i].el === hoverEl) { idx = i; break; }
    }
    if (idx < 0) return;

    var row = items[idx].row;
    // 当前标签放大后每侧会多出这么多 —— 让位距离必须 ≥ 它，才不会重叠
    var grow = (SCALE - 1) * items[idx].w / 2 + 3;
    var pad = Math.max(MAX_PUSH, grow);

    for (var j = 0; j < items.length; j++) {
      var d = items[j];
      var el = d.el;

      if (d.row !== row) { reset(el); continue; }   // 换行后的另一行：完全不动

      var dist = Math.abs(j - idx);
      if (dist === 0) {
        el.style.zIndex = '3';
        el.style.transition = 'transform ' + DUR + 'ms ' + EASE;
        el.style.transform = 'scale(' + SCALE + ')';
        continue;
      }
      if (dist > RANGE) { reset(el); continue; }

      var f = (RANGE - dist + 1) / RANGE;   // 最近 = 1，最远 = 1/RANGE
      f = f * f;                            // 衰减更陡：远处几乎不动
      var dir = j > idx ? 1 : -1;
      var push = pad * f;
      // 边界保护：不许被推出容器（小屏/长标签也不会溢出）
      if (dir > 0) push = Math.min(push, Math.max(0, info.crect.right - d.right - 2));
      else push = Math.min(push, Math.max(0, d.left - info.crect.left - 2));

      el.style.zIndex = '1';
      el.style.transition = 'transform ' + DUR + 'ms ' + EASE;
      // 邻居除了让位，还带一点横向挤压 —— 看起来像「被当前卡片挤开」
      el.style.transform =
        'translateX(' + (dir * push).toFixed(2) + 'px)' +
        ' scale(' + (1 - 0.07 * f).toFixed(3) + ', ' + (1 - 0.02 * f).toFixed(3) + ')';
    }
  }

  function containerOf(el) {
    if (!el || el.nodeType !== 1 || !el.parentElement) return null;
    return el.parentElement.closest ? el.parentElement.closest(CONTAINERS) : null;
  }

  function onOver(e) {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    var t = e.target;
    if (!t || t.nodeType !== 1 || typeof t.closest !== 'function') return;

    // 先找容器，再把「容器里包含指针的那一个直接子元素」当作卡片。
    // 之前用 target.closest('a') 当卡片、parentElement 找容器，
    // 在 .categoryGroup > .categoryItem > a 这种三层结构里会错认成只有 1 个子元素。
    var c = t.closest(CONTAINERS);
    if (!c) return;
    var info = cache.get(c) || measure(c);
    if (!info) return;

    var item = null;
    for (var i = 0; i < info.items.length; i++) {
      if (info.items[i].el.contains(t)) { item = info.items[i].el; break; }
    }
    if (!item) return;
    // 同一张卡内移动不重复计算（pointerover 在子元素间会频繁触发）
    if (item === lastItem && curContainer === c) return;
    lastItem = item;

    // transform 对非替换的行内元素无效，标签若真是 inline 就临时改成 inline-block
    var cs = window.getComputedStyle(item);
    if (cs.display === 'inline') item.style.display = 'inline-block';
    if (cs.position === 'static') item.style.position = 'relative';

    if (curContainer && curContainer !== c) resetAll(curContainer);
    curContainer = c;
    apply(c, item);
  }

  function onOut(e) {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    var to = e.relatedTarget;
    if (to && curContainer && curContainer.contains(to)) return;
    if (curContainer) resetAll(curContainer);
    curContainer = null;
  }

  document.addEventListener('pointerover', onOver, true);
  document.addEventListener('pointerout', onOut, true);
  document.addEventListener('focusin', function (e) {
    var t = e.target;
    if (!t || t.nodeType !== 1) return;
    var c = t.closest(CONTAINERS);
    if (!c) return;
    var info = cache.get(c) || measure(c);
    if (!info) return;
    var item = null;
    for (var i = 0; i < info.items.length; i++) {
      if (info.items[i].el.contains(t)) { item = info.items[i].el; break; }
    }
    if (!item) return;
    if (curContainer && curContainer !== c) resetAll(curContainer);
    curContainer = c;
    apply(c, item);
  });
  document.addEventListener('focusout', function () {
    if (curContainer) resetAll(curContainer);
    curContainer = null;
  });

  // 尺寸/换行变化后必须重新测量，否则行分组会失效
  var t = 0;
  window.addEventListener('resize', function () {
    clearTimeout(t);
    t = setTimeout(function () {
      cache = new WeakMap();
      curContainer = null;
    }, 150);
  });
  document.addEventListener('pjax:complete', function () {
    cache = new WeakMap();
    curContainer = null;
  });
})();
