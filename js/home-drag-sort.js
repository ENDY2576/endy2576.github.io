/**
 * 首页文章卡片拖拽排序 v2
 * ------------------------------------------------------------
 * 交互规则（逐条对应）：
 *   1) 拖离原位不超过 3/4 卡高 → 原区域保持空位（原位虚线框 + 流内空槽），
 *      卡片随时可以放回去，其他卡片不动；
 *   2) 超过 3/4 → 后面的卡片自动补位上来（空槽撤出文档流，FLIP 平移）；
 *   3) 补位后把卡片压到某张卡上 → 那里自动让位出一个空槽（区域示意），
 *       松手即落到这个空槽；空槽跟随悬停位置移动；
 *   4) 把卡片「甩」出列表（释放点在列表外 + 释放速度超过阈值）→ 进入该文章；
 *      飞出距离与释放速度成正比，体现「甩的力气」；慢慢拉出去则会弹回列表。
 *   5) 松手后那一次 click 一律吃掉，绝不会误触跳文章。
 *
 * 其它：触摸长按 220ms 激活；顺序存 localStorage；__endyResetPostOrder() 重置。
 */
(function () {
  'use strict';

  if (window.__endyDragSortBound) return;
  window.__endyDragSortBound = true;

  var CONTAINER = '#recent-posts';
  var ITEM = '.recent-post-item';
  var STORE_KEY = 'endy-home-post-order';

  var MOUSE_ACTIVATE = 8;
  var TOUCH_HOLD = 220;
  var FLIP_MS = 200;
  var FILL_AT = 0.75;      // 拖离原位超过 3/4 卡高 → 补位
  var UNFILL_AT = 0.6;     // 退回 0.6 以内 → 恢复空位（迟滞，避免来回抖）
  var THROW_SPEED = 0.55;  // px/ms，超过才算「甩出去」
  var THROW_MS = 380;

  var state = null;
  var rafId = 0;
  var suppressClickUntil = 0;

  /* ---------------- 工具 ---------------- */

  function itemUrl(el) {
    var a = el.querySelector('a[href]');
    var href = a ? a.getAttribute('href') : '';
    if (!href) {
      var oc = el.getAttribute('onclick') || '';
      var m = oc.match(/'(.*?)'/);
      href = m ? m[1] : '';
    }
    if (!href) return '';
    try { return new URL(href, location.href).pathname; } catch (e) { return href; }
  }

  function currentTranslateY(el) {
    var t = window.getComputedStyle(el).transform;
    if (!t || t === 'none') return 0;
    var m = t.match(/matrix\(([^)]+)\)/);
    if (m) { var p = m[1].split(','); return parseFloat(p[5]) || 0; }
    var m3 = t.match(/matrix3d\(([^)]+)\)/);
    if (m3) { var q = m3[1].split(','); return parseFloat(q[13]) || 0; }
    return 0;
  }

  function layoutTop(el) { return el.getBoundingClientRect().top - currentTranslateY(el); }

  function siblingsOf(container) {
    var out = [];
    var kids = container.children;
    for (var i = 0; i < kids.length; i++) {
      var el = kids[i];
      if (el === state.item || el === state.slot) continue;
      if (el.classList && el.classList.contains('recent-post-item')) out.push(el);
    }
    return out;
  }

  function flipTo(el, fromTop) {
    var delta = fromTop - el.getBoundingClientRect().top;
    if (Math.abs(delta) < 0.5) return;
    if (el.__endyFlip) { try { el.__endyFlip.cancel(); } catch (e) {} }
    el.__endyFlip = el.animate(
      [{ transform: 'translateY(' + delta + 'px)' }, { transform: 'translateY(0)' }],
      { duration: FLIP_MS, easing: 'cubic-bezier(0.2, 0.7, 0.3, 1)' }
    );
  }

  /* ---------------- 顺序持久化 ---------------- */

  function saveOrder() {
    var c = document.querySelector(CONTAINER);
    if (!c) return;
    var urls = [];
    var items = c.querySelectorAll(ITEM);
    for (var i = 0; i < items.length; i++) {
      var u = itemUrl(items[i]);
      if (u) urls.push(u);
    }
    try { localStorage.setItem(STORE_KEY, JSON.stringify(urls)); } catch (e) {}
  }

  function restoreOrder() {
    var c = document.querySelector(CONTAINER);
    if (!c) return;
    var saved;
    try { saved = JSON.parse(localStorage.getItem(STORE_KEY) || '[]'); } catch (e) { saved = []; }
    if (!Array.isArray(saved) || !saved.length) return;

    var items = [];
    var found = c.querySelectorAll(ITEM);
    for (var i = 0; i < found.length; i++) items.push(found[i]);
    if (items.length < 2) return;

    var known = [], unknown = [];
    items.forEach(function (el) {
      (saved.indexOf(itemUrl(el)) !== -1 ? known : unknown).push(el);
    });
    known.sort(function (a, b) {
      return saved.indexOf(itemUrl(a)) - saved.indexOf(itemUrl(b));
    });

    var sentinel = document.createComment('endy-sort');
    c.insertBefore(sentinel, items[0]);
    items.forEach(function (el) { el.parentNode.removeChild(el); });
    unknown.concat(known).forEach(function (el) { c.insertBefore(el, sentinel); });
    c.removeChild(sentinel);
  }

  window.__endyResetPostOrder = function () {
    try { localStorage.removeItem(STORE_KEY); } catch (e) {}
    location.reload();
  };

  /* ---------------- 拖拽生命周期 ---------------- */

  function startDrag() {
    var s = state;
    s.active = true;
    window.__endyDragActive = true;
    clearTimeout(s.holdTimer);

    var item = s.item;
    var rect = item.getBoundingClientRect();
    s.originRect = rect;
    s.width = rect.width;
    s.height = rect.height;
    s.savedCss = item.style.cssText;
    var mb = parseFloat(window.getComputedStyle(item).marginBottom) || 0;
    s.slotMargin = mb;
    s.filled = false;          // false = 原位留空；true = 已补位、空槽跟随悬停

    item.classList.add('endy-drag-item');
    if (typeof window.__endyPressRelease === 'function') {
      try { window.__endyPressRelease(item); } catch (e) {}
    }

    // 流内空槽：占住原位置，卡片拖回来直接落进去
    var slot = document.createElement('div');
    slot.className = 'endy-drag-slot';
    slot.style.height = rect.height + 'px';
    slot.style.marginBottom = mb + 'px';
    s.slot = slot;
    item.parentNode.insertBefore(slot, item);

    // 原位虚线框（绝对定位浮层，不占额外高度）
    var origin = document.createElement('div');
    origin.className = 'endy-drag-origin';
    origin.style.position = 'absolute';
    origin.style.left = (rect.left + window.pageXOffset) + 'px';
    origin.style.top = (rect.top + window.pageYOffset) + 'px';
    origin.style.width = rect.width + 'px';
    origin.style.height = rect.height + 'px';
    origin.style.pointerEvents = 'none';
    origin.style.zIndex = '1';
    document.body.appendChild(origin);
    s.origin = origin;

    // 拖拽项脱离文档流
    item.classList.add('endy-drag-ghost');
    item.style.position = 'fixed';
    item.style.left = rect.left + 'px';
    item.style.top = rect.top + 'px';
    item.style.width = rect.width + 'px';
    item.style.height = rect.height + 'px';
    item.style.margin = '0';
    item.style.zIndex = '99998';
    item.style.pointerEvents = 'none';
    document.body.classList.add('endy-dragging');

    try { item.setPointerCapture(s.pointerId); } catch (e) {}
  }

  function applyTransform() {
    var s = state;
    s.item.style.transform =
      'translate3d(' + s.dx + 'px,' + s.dy + 'px,0) scale(1.02) rotate(0.4deg)';
  }

  // 补位 / 收回空位（带迟滞，防止在阈值附近来回抖）
  function setFilled(v) {
    var s = state;
    if (s.filled === v) return;
    s.filled = v;
    var others = siblingsOf(s.container);
    if (!v) {
      // 恢复空位：空槽回到最前（原位）
      var before = others.map(function (el) { return el.getBoundingClientRect().top; });
      s.container.insertBefore(s.slot, s.container.firstChild);
      others.forEach(function (el, i) { flipTo(el, before[i]); });
    } else {
      // 补位：空槽撤出文档流，后面的卡片补上来
      var b2 = others.map(function (el) { return el.getBoundingClientRect().top; });
      s.slot.style.display = 'none';
      others.forEach(function (el, i) { flipTo(el, b2[i]); });
    }
  }

  // 每帧：按状态决定空槽位置
  function updateSlot() {
    var s = state;
    if (!s || !s.active) return;

    var ghost = s.item.getBoundingClientRect();
    var centerY = ghost.top + ghost.height / 2;
    var disp = Math.abs(centerY - (s.originRect.top + s.height / 2));

    if (!s.filled) {
      if (disp > s.height * FILL_AT) setFilled(true);
      return;                                   // 未补位：布局完全不动
    }
    if (disp < s.height * UNFILL_AT) { setFilled(false); return; }

    // 已补位：空槽跟随「压在哪张卡上」
    var others = siblingsOf(s.container);
    if (!others.length) return;

    var target = others.length;
    for (var i = 0; i < others.length; i++) {
      var top = layoutTop(others[i]);
      var h = others[i].offsetHeight;
      if (centerY < top + h / 2) { target = i; break; }
    }

    var kids = s.container.children;
    var slotIdx = 0;
    for (var k = 0; k < kids.length; k++) {
      if (kids[k] === s.slot) break;
      if (others.indexOf(kids[k]) !== -1) slotIdx++;
    }
    if (target === slotIdx) return;

    var before = others.map(function (el) { return el.getBoundingClientRect().top; });
    s.slot.style.display = '';
    s.container.insertBefore(s.slot, others[target] || null);
    others.forEach(function (el, idx) { flipTo(el, before[idx]); });
  }

  function scheduleUpdate() {
    if (rafId) return;
    rafId = requestAnimationFrame(function () {
      rafId = 0;
      updateSlot();
    });
  }

  function releaseVel() {
    var s = state, t = Date.now();
    var arr = s.samples;
    while (arr.length && t - arr[0].t > 110) arr.shift();
    if (arr.length < 2) return { x: 0, y: 0 };
    var last = arr[arr.length - 1];
    if (t - last.t > 110) return { x: 0, y: 0 };
    var dt = last.t - arr[0].t;
    if (dt < 8) return { x: 0, y: 0 };
    return { x: (last.x - arr[0].x) / dt, y: (last.y - arr[0].y) / dt };
  }

  function cleanupDom(s) {
    if (s.slot && s.slot.parentNode) s.slot.parentNode.removeChild(s.slot);
    if (s.origin && s.origin.parentNode) s.origin.parentNode.removeChild(s.origin);
    document.body.classList.remove('endy-dragging');
    window.__endyDragActive = false;
    state = null;
  }

  // 甩出列表 → 飞出并进入文章（飞多远由释放速度决定，体现「甩的力气」）
  function throwOut(s, vx, vy) {
    var item = s.item;
    var speed = Math.hypot(vx, vy) || 1;
    var dist = Math.min(560, 180 + speed * 380);
    var fx = (vx / speed) * dist;
    var fy = (vy / speed) * dist;

    var fly = item.animate(
      [
        { transform: item.style.transform, opacity: 1 },
        { transform: 'translate3d(' + (s.dx + fx) + 'px,' + (s.dy + fy) + 'px,0) scale(0.9) rotate(' + (fx > 0 ? 6 : -6) + 'deg)', opacity: 0 }
      ],
      { duration: THROW_MS, easing: 'cubic-bezier(0.3, 0, 0.6, 0.6)', fill: 'forwards' }
    );
    var gone = false;
    var go = function () {
      if (gone) return;
      gone = true;
      item.classList.remove('endy-drag-ghost', 'endy-drag-item');
      item.style.cssText = s.savedCss || '';
      cleanupDom(s);
      suppressClickUntil = Date.now() + 500;
      if (window.pjax && typeof window.pjax.loadUrl === 'function') window.pjax.loadUrl(s.url);
      else location.href = s.url;
    };
    fly.onfinish = go;
    fly.oncancel = go;
    setTimeout(go, THROW_MS + 500);
  }

  function finishDrag() {
    var s = state;
    if (!s || !s.active) { state = null; return; }
    var item = s.item, slot = s.slot;
    var v = releaseVel();

    // 甩出判定：释放点在列表外 + 速度够快
    var cr = s.container.getBoundingClientRect();
    var gc = item.getBoundingClientRect();
    var cx = gc.left + gc.width / 2, cy = gc.top + gc.height / 2;
    var outside = cx < cr.left - 40 || cx > cr.right + 40 || cy < cr.top - 40 || cy > cr.bottom + 40;
    if (outside && Math.hypot(v.x, v.y) > THROW_SPEED) {
      throwOut(s, v.x, v.y);
      return;
    }

    suppressClickUntil = Date.now() + 600;

    var slotRect = slot.getBoundingClientRect();
    var cur = item.getBoundingClientRect();
    var restDx = s.dx + (slotRect.left - cur.left);
    var restDy = s.dy + (slotRect.top - cur.top);

    var land = item.animate(
      [
        { transform: 'translate3d(' + s.dx + 'px,' + s.dy + 'px,0) scale(1.02) rotate(0.4deg)' },
        { transform: 'translate3d(' + restDx + 'px,' + restDy + 'px,0) scale(1) rotate(0deg)' }
      ],
      { duration: 220, easing: 'cubic-bezier(0.2, 0.8, 0.3, 1)' }
    );

    var done = function () {
      item.classList.remove('endy-drag-ghost', 'endy-drag-item');
      item.style.cssText = s.savedCss || '';
      if (slot.parentNode) {
        slot.parentNode.insertBefore(item, slot);
        slot.parentNode.removeChild(slot);
      }
      cleanupDom(s);
      saveOrder();
      suppressClickUntil = Date.now() + 220;
    };
    land.onfinish = done;
    land.oncancel = done;
    setTimeout(function () { if (state === s) done(); }, 400);
  }

  function cancelDrag() {
    if (!state) return;
    clearTimeout(state.holdTimer);
    if (state.active) finishDrag();
    else state = null;
  }

  /* ---------------- 事件 ---------------- */

  function onDown(e) {
    if (state) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    var t = e.target;
    if (!t || t.nodeType !== 1 || typeof t.closest !== 'function') return;

    var item = t.closest(ITEM);
    if (!item) return;
    var container = item.parentElement;
    if (!container || !(container.matches && container.matches(CONTAINER))) return;
    if (t.closest('input, textarea, select, button')) return;

    state = {
      item: item,
      container: container,
      url: itemUrl(item),
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      dx: 0,
      dy: 0,
      active: false,
      holdReady: false,
      samples: [],
      type: e.pointerType || 'mouse'
    };
    state.holdTimer = setTimeout(function () {
      if (state) state.holdReady = true;
    }, TOUCH_HOLD);
  }

  function onMove(e) {
    if (!state || e.pointerId !== state.pointerId) return;
    var s = state;
    var dx = e.clientX - s.startX;
    var dy = e.clientY - s.startY;
    var dist = Math.sqrt(dx * dx + dy * dy);

    if (!s.active) {
      var canStart = s.type === 'mouse' ? dist > MOUSE_ACTIVATE : (s.holdReady && dist > 4);
      if (!canStart) return;
      startDrag();
    }

    s.dx = dx;
    s.dy = dy;
    s.samples.push({ t: Date.now(), x: e.clientX, y: e.clientY });
    if (s.samples.length > 24) s.samples.shift();
    applyTransform();
    scheduleUpdate();
    if (e.cancelable) e.preventDefault();
  }

  function onUp(e) {
    if (!state || (e && e.pointerId !== state.pointerId)) return;
    if (state.active) finishDrag();
    else { clearTimeout(state.holdTimer); state = null; }
  }

  document.addEventListener('pointerdown', onDown, true);
  document.addEventListener('pointermove', onMove, true);
  document.addEventListener('pointerup', onUp, true);
  document.addEventListener('pointercancel', function () { cancelDrag(); }, true);
  window.addEventListener('blur', cancelDrag);

  document.addEventListener('touchmove', function (e) {
    if (state && state.active && e.cancelable) e.preventDefault();
  }, { passive: false });
  document.addEventListener('dragstart', function (e) {
    if (state && state.active) e.preventDefault();
  });

  // 松手后那一次 click 必须拦掉（卡片整块都有 onclick 跳文章）
  document.addEventListener('click', function (e) {
    if (Date.now() >= suppressClickUntil) return;
    suppressClickUntil = 0;
    e.preventDefault();
    e.stopPropagation();
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', restoreOrder);
  } else {
    restoreOrder();
  }
  document.addEventListener('pjax:complete', restoreOrder);
})();
