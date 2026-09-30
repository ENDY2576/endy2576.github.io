/**
 * 首页文章卡片交互 v3 —— 方向 A（iOS 实时重排）
 * ------------------------------------------------------------
 * 统一由本脚本独占 .recent-post-item 的「悬浮倾斜 / 按下 / 拖起 / 实时重排 / 落位 / 甩出」，
 * 不再与 press-gravity 抢同一张卡片的 transform（press-gravity 在拖拽时通过
 * window.__endyDragActive 主动让位，互不打架）。
 *
 * 交互规则（对应方向 A）：
 *   1) 悬浮：卡片朝光标做 ≤5° 的 3D 微倾（由 press-gravity 负责，本脚本不重复）。
 *   2) 拖起：移动超过 6px（触摸需长按 200ms）才激活，卡片 scale 1.04 浮空，
 *      以「弹簧迟滞」跟随光标（带一点重量感），z-index 置顶、光标变抓取。
 *   3) 实时重排：拖拽时占位用「半透明同形剪影」(非虚线框)，随光标在列表中实时移动，
 *      其余卡片用 FLIP 平滑让位 —— 像 iOS 主屏一样边拖边排。
 *   4) 落位：松手后卡片用弹簧引擎归位（过冲 ~6%、约 380ms 收敛），邻居收拢填满。
 *   5) 甩出：释放点在列表外 + 释放速度超阈值 → 沿速度向量飞出并进入文章，
 *      飞出距离与速度成正比（体现「甩的力气」）；慢慢拉出则弹回列表。
 *   6) 松手后的那一次 click 一律吃掉，绝不误触跳文章。
 *
 * 其它：顺序存 localStorage；__endyResetPostOrder() 重置；尊重 prefers-reduced-motion。
 */
(function () {
  'use strict';

  if (window.__endyDragSortBound) return;
  window.__endyDragSortBound = true;

  var CONTAINER = '#recent-posts';
  var ITEM = '.recent-post-item';
  var STORE_KEY = 'endy-home-post-order';

  var MOUSE_ACTIVATE = 6;       // 鼠标移动超过此像素才判定为拖拽（区分点击）
  var TOUCH_HOLD = 200;         // 触摸长按激活
  var FLIP_MS = 260;            // 邻居让位 FLIP 时长
  var THROW_SPEED = 0.55;       // px/ms，超过才算「甩出去」
  var THROW_MS = 360;
  var LIFT_SCALE = 1.04;        // 浮空缩放
  var PRESS_SCALE = 0.97;       // 按下下沉（保留给将来统一按压用）
  // —— P2(a) 速度形变：拖拽中按指针「真实速度」做形变的参数 ——
  var SPEED_TILT = 12;          // 随速度的最大倾斜（度），朝运动方向倾倒
  var SPEED_SCALE = 0.05;       // 随速度的最大额外放大（形变量，0~5%）
  var SPEED_GAIN = 6;           // 速度→角度 增益（px/ms × 增益 = 度）
  var SPEED_DECAY = 0.82;       // 每帧速度衰减：指针静止时倾斜/放大平滑回正
  var FOLLOW = 0.3;             // 跟手弹簧迟滞系数（越小越「重」）
  var SPRING = { stiffness: 260, damping: 22 }; // 落位弹簧（过冲 ~6%）

  var REDUCED = false;
  try { REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  var state = null;             // 拖拽状态
  var suppressClickUntil = 0;

  function clamp(v, min, max) { return v < min ? min : (v > max ? max : v); }

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

  // 当前流内的文章卡（排除正在拖的那张和占位剪影）
  function flowItems() {
    var c = state.container, out = [];
    var kids = c.children;
    for (var i = 0; i < kids.length; i++) {
      var el = kids[i];
      if (el === state.item || el === state.slot) continue;
      if (el.classList && el.classList.contains('recent-post-item')) out.push(el);
    }
    return out;
  }

  function clearDragStyles(item) {
    item.style.position = '';
    item.style.left = '';
    item.style.top = '';
    item.style.width = '';
    item.style.height = '';
    item.style.margin = '';
    item.style.zIndex = '';
    item.style.transform = '';
    item.style.transition = '';
    item.style.transformOrigin = '';
    item.style.willChange = '';
    item.style.pointerEvents = '';
    item.style.boxShadow = '';
  }

  /* ---------------- 顺序持久化 ---------------- */

  function saveOrder() {
    var c = document.querySelector(CONTAINER);
    if (!c) return;
    var urls = [], items = c.querySelectorAll(ITEM);
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

  /* ---------------- 实时重排：占位剪影随光标移动 ---------------- */

  // 根据指针 Y 计算应插入的索引（vertical list）
  function targetIndex(pointerY) {
    var items = flowItems();
    for (var i = 0; i < items.length; i++) {
      var r = items[i].getBoundingClientRect();
      if (pointerY < r.top + r.height / 2) return i;
    }
    return items.length;
  }

  // 把占位剪影移到目标位置；仅当目标索引变化时才重排并 FLIP，避免每帧抖动
  function setTarget(pointerY) {
    var s = state;
    var items = flowItems();
    var idx = targetIndex(pointerY);
    var pag = s.container.querySelector('#pagination');
    var ref = (idx >= items.length) ? (pag || null) : items[idx];
    if (s.slot.nextSibling === ref) return; // 没变化，不动

    var before = items.map(function (el) { return el.getBoundingClientRect(); });
    s.container.insertBefore(s.slot, ref);
    items.forEach(function (el, i) {
      var after = el.getBoundingClientRect();
      var dx = before[i].left - after.left;
      var dy = before[i].top - after.top;
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return;
      if (el.__flip) { try { el.__flip.cancel(); } catch (e) {} }
      // flex 双列布局中，slot 移动会让邻居卡片左右换列，因此 FLIP 必须同时 animate X/Y
      el.__flip = el.animate(
        [{ transform: 'translate3d(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px,0)' },
         { transform: 'translate3d(0,0,0)' }],
        { duration: FLIP_MS, easing: 'cubic-bezier(0.2, 0.7, 0.3, 1)' }
      );
    });
  }

  /* ---------------- 跟手帧循环（弹簧迟滞，translate 模型） ----------------
     卡片固定定位于「原点」(originLeft/originTop)，只通过 transform: translate3d 跟手，
     这样落位动画也能用同一套 translate 表达，不会和 left/top 叠加出错。
     抓取点偏移 grabX/grabY 在差值中自然抵消：desiredDx = pointerX - startX。 */
  function frame() {
    var s = state;
    if (!s || !s.active) return;
    var desiredDx = s.pointerX - s.startX;
    var desiredDy = s.pointerY - s.startY;
    s.curDx += (desiredDx - s.curDx) * FOLLOW;
    s.curDy += (desiredDy - s.curDy) * FOLLOW;

    // —— P2(a) 速度形变 ——
    // 以指针「真实速度」(px/ms) 驱动：拖得越快，卡片越朝运动方向倾倒、并轻微放大，
    // 像被甩出去的纸片带着惯性；指针一停，速度每帧衰减 → 倾斜/放大平滑回正。
    var speed = Math.hypot(s.velX, s.velY);
    var tiltY = REDUCED ? 0 : clamp(s.velX * SPEED_GAIN, -SPEED_TILT, SPEED_TILT);
    var tiltX = REDUCED ? 0 : clamp(-s.velY * SPEED_GAIN, -SPEED_TILT, SPEED_TILT);
    var dynScale = REDUCED ? LIFT_SCALE : (LIFT_SCALE + clamp(speed * 3, 0, SPEED_SCALE));
    s.item.style.transform =
      'perspective(900px) translate3d(' + s.curDx.toFixed(1) + 'px,' + s.curDy.toFixed(1) + 'px,0) ' +
      'rotateX(' + tiltX.toFixed(2) + 'deg) rotateY(' + tiltY.toFixed(2) + 'deg) scale(' + dynScale.toFixed(4) + ')';

    // 指针静止（不再产生 onMove）时，速度自身衰减回 0 → 形变自然归位，不依赖位移
    s.velX *= SPEED_DECAY; s.velY *= SPEED_DECAY;

    if (s.needSlot) { s.needSlot = false; setTarget(s.pointerY); }
    s.raf = requestAnimationFrame(frame);
  }

  /* ---------------- 拖拽生命周期 ---------------- */

  function startDrag(e) {
    var s = state;
    s.active = true;
    window.__endyDragActive = true;
    clearTimeout(s.holdTimer);

    var item = s.item;
    var rect = item.getBoundingClientRect();
    s.originRect = rect;
    s.originLeft = rect.left;
    s.originTop = rect.top;
    s.grabX = e.clientX - rect.left;
    s.grabY = e.clientY - rect.top;
    s.curDx = 0; s.curDy = 0;   // 以「固定定位原点」为基准的位移（translate 模型）
    s.pointerX = e.clientX; s.pointerY = e.clientY;

    // 收掉 press-gravity 可能残留的悬浮倾斜，避免两套管子打架
    if (typeof window.__endyPressRelease === 'function') {
      try { window.__endyPressRelease(item); } catch (e2) {}
    }
    item.classList.add('endy-drag-item');
    item.style.transition = 'none';
    item.style.transform = '';

    var cs = window.getComputedStyle(item);
    var mb = parseFloat(cs.marginBottom) || 0;
    var mt = parseFloat(cs.marginTop) || 0;
    var slot = document.createElement('div');
    slot.className = 'endy-drag-silhouette';
    slot.style.height = rect.height + 'px';
    // flex 双列布局：空 div 默认宽 0 会塌缩，但用固定像素宽 + flex-shrink:0 又会挤爆换行。
    // 改用百分比宽（与 .recent-post-item 的 49% 一致），让 flex 容器自然分配空间。
    slot.style.width = '49%';
    slot.style.boxSizing = 'border-box';
    slot.style.marginTop = mt + 'px';
    slot.style.marginBottom = mb + 'px';
    s.slot = slot;
    item.parentNode.insertBefore(slot, item);

    item.style.position = 'fixed';
    item.style.margin = '0';
    item.style.left = rect.left + 'px';
    item.style.top = rect.top + 'px';
    item.style.width = rect.width + 'px';
    item.style.height = rect.height + 'px';
    item.style.zIndex = '99998';
    item.style.pointerEvents = 'none';
    document.body.classList.add('endy-dragging');

    try { item.setPointerCapture(s.pointerId); } catch (e3) {}
    s.raf = requestAnimationFrame(frame);
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

  // 甩出列表 → 飞出并进入文章
  function throwOut(s, vx, vy) {
    var item = s.item;
    var speed = Math.hypot(vx, vy) || 1;
    var dist = Math.min(560, 180 + speed * 380);
    var fx = (vx / speed) * dist;
    var fy = (vy / speed) * dist;

    // 先停掉跟手帧循环：否则它会持续写 item.style.transform，覆盖下面的飞出动画
    if (s.raf) { try { cancelAnimationFrame(s.raf); } catch (e) {} }
    s.active = false;

    var fromT = item.style.transform ||
      'perspective(900px) translate3d(0,0,0) rotateX(0) rotateY(0) scale(' + LIFT_SCALE + ')';
    var fly = item.animate(
      [
        { transform: fromT, opacity: 1 },
        { transform: 'perspective(900px) translate3d(' + fx + 'px,' + fy + 'px,0) rotate(' + (fx > 0 ? 10 : -10) + 'deg) scale(0.9)', opacity: 0 }
      ],
      { duration: THROW_MS, easing: 'cubic-bezier(0.3, 0, 0.6, 0.6)', fill: 'forwards' }
    );
    var gone = false;
    var go = function () {
      if (gone) return;
      gone = true;
      if (s.slot && s.slot.parentNode) s.slot.parentNode.removeChild(s.slot);
      document.body.classList.remove('endy-dragging');
      window.__endyDragActive = false;
      item.classList.remove('endy-drag-item');
      clearDragStyles(item);
      state = null;
      suppressClickUntil = Date.now() + 500;
      if (window.pjax && typeof window.pjax.loadUrl === 'function') window.pjax.loadUrl(s.url);
      else location.href = s.url;
    };
    fly.onfinish = go; fly.oncancel = go;
    setTimeout(go, THROW_MS + 500);
  }

  function finishDrag() {
    var s = state;
    if (!s || !s.active) { state = null; return; }
    var item = s.item, slot = s.slot;
    var v = releaseVel();

    // 甩出判定
    var cr = s.container.getBoundingClientRect();
    var gc = item.getBoundingClientRect();
    var cx = gc.left + gc.width / 2, cy = gc.top + gc.height / 2;
    var outside = cx < cr.left - 40 || cx > cr.right + 40 || cy < cr.top - 40 || cy > cr.bottom + 40;
    if (outside && Math.hypot(v.x, v.y) > THROW_SPEED) {
      throwOut(s, v.x, v.y);
      return;
    }

    suppressClickUntil = Date.now() + 600;

    // 停掉跟手帧循环：否则它会持续写 item.style.transform，覆盖下面的落位动画
    if (s.raf) { try { cancelAnimationFrame(s.raf); } catch (e) {} }
    s.active = false;

    var slotRect = slot.getBoundingClientRect();
    var cur = item.getBoundingClientRect();
    // 以「固定定位原点」为基准的偏移量
    var curDx = cur.left - s.originLeft;
    var curDy = cur.top - s.originTop;
    var tgtDx = slotRect.left - s.originLeft;
    var tgtDy = slotRect.top - s.originTop;

    var done = function () {
      if (s.settleAnim) { try { s.settleAnim.cancel(); } catch (e) {} }
      item.classList.remove('endy-drag-item');
      clearDragStyles(item);
      if (slot.parentNode) {
        slot.parentNode.insertBefore(item, slot);
        slot.parentNode.removeChild(slot);
      }
      document.body.classList.remove('endy-dragging');
      window.__endyDragActive = false;
      state = null;
      saveOrder();
      suppressClickUntil = Date.now() + 220;
    };

    if (REDUCED) {
      // 降级：无位移动画，直接归位
      done();
      return;
    }

    // 弹簧落位：过冲 + 收敛到目标
    var pts = (window.EndySpring && window.EndySpring.samples)
      ? window.EndySpring.samples(SPRING)
      : [0, 0.5, 1];
    var frames = pts.map(function (p) {
      var e = p; // 允许 >1 的过冲
      var dx = curDx + (tgtDx - curDx) * e;
      var dy = curDy + (tgtDy - curDy) * e;
      var sc = LIFT_SCALE + (1 - LIFT_SCALE) * Math.max(0, Math.min(1, e));
      return {
        transform: 'perspective(900px) translate3d(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px,0) rotateX(0deg) rotateY(0deg) scale(' + sc.toFixed(4) + ')'
      };
    });
    var anim = item.animate(frames, {
      duration: frames.length * 1000 / 60,
      easing: 'linear',
      fill: 'forwards'
    });
    s.settleAnim = anim;
    anim.onfinish = done; anim.oncancel = done;
    setTimeout(function () { if (state === s) done(); }, 800);
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
      active: false,
      holdReady: false,
      samples: [],
      velX: 0,
      velY: 0,
      type: e.pointerType || 'mouse',
      needSlot: false,
      raf: 0
    };
    state.holdTimer = setTimeout(function () {
      if (state) state.holdReady = true;
    }, TOUCH_HOLD);
  }

  function onMove(e) {
    if (!state || (e.pointerId !== state.pointerId)) return;
    var s = state;
    var dx = e.clientX - s.startX;
    var dy = e.clientY - s.startY;
    var dist = Math.sqrt(dx * dx + dy * dy);

    if (!s.active) {
      var canStart = s.type === 'mouse' ? dist > MOUSE_ACTIVATE : (s.holdReady && dist > 4);
      if (!canStart) return;
      startDrag(e);
    }

    s.pointerX = e.clientX;
    s.pointerY = e.clientY;
    s.samples.push({ t: Date.now(), x: e.clientX, y: e.clientY });
    if (s.samples.length > 24) s.samples.shift();

    // P2(a)：由最近两帧采样估算指针瞬时速度（px/ms），做指数平滑
    var sn = s.samples.length;
    if (sn >= 2) {
      var a = s.samples[sn - 2], b = s.samples[sn - 1];
      var dt = b.t - a.t;
      if (dt > 0) {
        var ivx = (b.x - a.x) / dt, ivy = (b.y - a.y) / dt;
        s.velX = s.velX * 0.55 + ivx * 0.45;
        s.velY = s.velY * 0.55 + ivy * 0.45;
      }
    }

    s.needSlot = true;
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
  document.addEventListener('pointercancel', cancelDrag, true);
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
