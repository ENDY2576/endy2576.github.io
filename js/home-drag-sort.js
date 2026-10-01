/**
 * 首页文章卡片交互 v5 —— 世界级「隐形原卡占位 + 浮层幽灵跟手」实时重排
 * --------------------------------------------------------------------
 * 统一由本脚本独占 .recent-post-item 的「悬浮倾斜 / 按下 / 拖起 / 实时重排 / 落位 / 甩出」，
 * 不再与 press-gravity 抢同一张卡片的 transform（press-gravity 在拖拽时通过
 * window.__endyDragActive 主动让位，互不打架）。
 *
 * v5 核心改进（针对 v4 slot 占位在 flex 双列下反复错位的问题）：
 *   · 不再往 flex 流里插入任何占位 div，彻底告别「洞宽 vs 卡片宽」的博弈。
 *   · 拖起时：原卡保留在 DOM 流内，仅 visibility:hidden，它自身就是「洞」，
 *     尺寸永远与 flex 分配给它的盒子完全一致。
 *   · 视觉反馈：创建原卡的 fixed 浮层克隆（ghost）跟随指针，带弹簧迟滞 / 速度形变。
 *   · 实时重排：按指针 2D 位置移动隐形原卡在 DOM 中的顺序，flex 自然重排，
 *     邻居卡片做 rect-measuring FLIP。
 *   · 落位：ghost 用弹簧动画飞回隐形原卡的位置，移除 ghost、恢复 visibility。
 *
 * 交互规则：
 *   1) 悬浮：卡片朝光标微倾（press-gravity 负责）。
 *   2) 拖起：鼠标移动第一帧即视觉拾起（ghost 立即出现、原卡立即隐藏），移动超过 4px 后「提交」并开始重排/甩出；触摸需长按 200ms 后拾起。保持 LIFT_SCALE=1.0，原样浮起。
 *   3) 实时重排：2D 最近格子命中，横拖也准。
 *   4) 落位：磁吸到洞，过冲 ~6%、约 380ms 收敛。
 *   5) 边缘自动滚动：拖到视口边缘自动滚屏。
 *   6) 甩出：列表外 + 速度阈值 → 飞出并进入文章。
 *   7) 键盘重排：Tab 聚焦 → Space/Enter 拾起 → 方向键 → Enter/Space 放下、Esc 取消。
 *   8) 松手后 click 一律吃掉，不误触跳文章。
 *   9) 顺序存 localStorage；__endyResetPostOrder() 重置；尊重 prefers-reduced-motion。
 */
(function () {
  'use strict';

  if (window.__endyDragSortBound) return;
  window.__endyDragSortBound = true;

  var CONTAINER = '#recent-posts';
  var ITEM = '.recent-post-item';
  var STORE_KEY = 'endy-home-post-order';

  var MOUSE_ACTIVATE = 4;       // 鼠标移动超过此像素才「提交」拖拽（开始重排/甩出；视觉拾起在移动第一帧即发生）
  var TOUCH_HOLD = 200;         // 触摸长按激活
  var FLIP_MS = 260;            // 邻居让位 FLIP 时长
  var THROW_SPEED = 0.55;       // px/ms，超过才算「甩出去」
  var THROW_MS = 360;
  var LIFT_SCALE = 1.015;       // 极轻微放大：营造「被拿起」的物理感，同时仍接近原样
  var SPEED_TILT = 4;           // 随速度的轻微倾斜（度），保留一点跟手感
  var SPEED_SCALE = 0.0;        // 不额外放大
  var SPEED_GAIN = 6;           // 速度→角度 增益（px/ms × 增益 = 度）
  var SPEED_DECAY = 0.82;       // 每帧速度衰减
  var FOLLOW = 0.65;            // 跟手弹簧迟滞系数（越小越「重」，0.65 更贴手少脱节）
  var SPRING = { stiffness: 260, damping: 22 }; // 落位弹簧（过冲 ~6%）
  var EDGE = 80;                // 边缘自动滚动触发区（px）
  var MAX_SCROLL = 16;          // 边缘自动滚动最大单帧位移

  var REDUCED = false;
  try { REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  var state = null;             // 指针拖拽状态
  var suppressClickUntil = 0;
  var kbDrag = null;            // 键盘拖拽中的卡片
  var liveRegion = null;        // aria-live 播报节点

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

  // 当前流内的文章卡（排除正在拖的隐形原卡 + 视觉 ghost）
  function flowItems() {
    var c = state.container, out = [];
    var kids = c.children;
    for (var i = 0; i < kids.length; i++) {
      var el = kids[i];
      if (el === state.item) continue;          // 隐形原卡 = 洞，不参与命中
      if (el.classList && el.classList.contains('endy-drag-ghost')) continue; // 视觉浮层不算流内卡
      if (el.classList && el.classList.contains('recent-post-item')) out.push(el);
    }
    return out;
  }

  function getOverlay() {
    var ov = document.getElementById('endy-drag-overlay');
    if (!ov) {
      ov = document.createElement('div');
      ov.id = 'endy-drag-overlay';
      ov.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:99998;';
      document.body.appendChild(ov);
    }
    return ov;
  }

  // 拖起瞬间强制封面图立即加载，消除「首帧 ghost 空白 → 复制感」。
  // anzhiyu 的 lazyload 把真实地址放在 data-src / data-lazy-src，src 只是占位。
  function forceImgEager(root) {
    if (!root || !root.querySelectorAll) return;
    var imgs = root.querySelectorAll('img');
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      if (img.getAttribute('loading') === 'lazy') img.setAttribute('loading', 'eager');
      var real = img.getAttribute('data-src') || img.getAttribute('data-lazy-src');
      if (real && img.getAttribute('src') !== real) {
        img.setAttribute('src', real);
      }
    }
  }

  function removeGhost(ghost) {
    if (!ghost || !ghost.parentNode) return false;
    var p = ghost.parentNode;
    try { p.removeChild(ghost); } catch (e) { return false; }
    if (p.id === 'endy-drag-overlay' && p.childNodes.length === 0 && p.parentNode) {
      try { p.parentNode.removeChild(p); } catch (e) {}
    }
    return true;
  }

  function resetOriginal(item) {
    if (!item) return;
    item.classList.remove('endy-drag-item');
    item.style.visibility = '';
    item.style.pointerEvents = '';
    item.style.transition = '';
    item.style.transform = '';
    item.style.height = '';
    item.style.minHeight = '';
    item.style.overflow = '';
    item.style.boxSizing = '';
    item.style.transformOrigin = '';
    item.style.willChange = '';
    item.style.boxShadow = '';
  }

  // 强制清理：幂等，可从 console 手动调用
  function cleanupDrag(s) {
    if (!s) return;
    if (s.raf) { try { cancelAnimationFrame(s.raf); } catch (e) {} s.raf = 0; }
    if (s.settleAnim) { try { s.settleAnim.cancel(); } catch (e) {} s.settleAnim = null; }
    if (s.holdTimer) { clearTimeout(s.holdTimer); s.holdTimer = null; }
    if (s.liftTimer) { clearTimeout(s.liftTimer); s.liftTimer = null; }
    try { document.body.classList.remove('endy-dragging'); } catch (e) {}
    window.__endyDragActive = false;
    removeGhost(s.ghost);
    resetOriginal(s.item);
  }

  function forceEndDrag() {
    if (!state) return;
    cleanupDrag(state);
    state = null;
    suppressClickUntil = Date.now() + 220;
  }
  window.__endyForceEndDrag = forceEndDrag;

  /* ---------------- FLIP 工具 ---------------- */

  function flipTo(el, dx, dy) {
    if (el.__flip) { try { el.__flip.cancel(); } catch (e) {} }
    if (REDUCED) { el.style.transform = 'none'; return; }
    var anim = el.animate(
      [{ transform: 'translate3d(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px,0)' },
       { transform: 'translate3d(0,0,0)' }],
      { duration: FLIP_MS, easing: 'cubic-bezier(0.2, 0.7, 0.3, 1)' }
    );
    anim.onfinish = function () { if (el.__flip === anim) el.__flip = null; };
    anim.oncancel = function () { if (el.__flip === anim) el.__flip = null; };
    el.__flip = anim;
  }

  /* ---------------- 顺序持久化 ---------------- */

  function saveOrder() {
    var c = document.querySelector(CONTAINER);
    if (!c) return;
    var urls = [], items = c.querySelectorAll(ITEM);
    for (var i = 0; i < items.length; i++) {
      if (items[i].classList && items[i].classList.contains('endy-drag-ghost')) continue;
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
    if (Array.isArray(saved) && saved.length) {
      var items = [];
      var found = c.querySelectorAll(ITEM);
      for (var i = 0; i < found.length; i++) {
        if (found[i].classList && found[i].classList.contains('endy-drag-ghost')) continue;
        items.push(found[i]);
      }
      if (items.length >= 2) {
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
    }
    bindKeyboard();
  }

  function bindKeyboard() {
    var items = document.querySelectorAll(CONTAINER + ' ' + ITEM);
    for (var i = 0; i < items.length; i++) {
      var el = items[i];
      if (el.classList && el.classList.contains('endy-drag-ghost')) continue;
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
    }
  }

  window.__endyResetPostOrder = function () {
    try { localStorage.removeItem(STORE_KEY); } catch (e) {}
    location.reload();
  };

  /* ---------------- P1 重排：2D 最近格子命中 ----------------
     移动的是隐形原卡（洞），flex 自然重排，邻居做 FLIP。 */
  function reorder2D(px, py) {
    var s = state;
    var items = flowItems();
    if (!items.length) return;

    // 死区：指针还在原卡（洞）附近时不重排。
    // 否则刚拖起时指针可能命中远处卡片，导致卡片「一跳到顶」。
    var hole = s.item.getBoundingClientRect();
    var hcx = hole.left + hole.width / 2, hcy = hole.top + hole.height / 2;
    var threshold = Math.max(hole.width, hole.height) * 0.35;
    if (Math.hypot(px - hcx, py - hcy) < threshold) return;

    // 邻居卡片正在 FLIP 动画中 → 等落定再重排。
    // 否则用动画 intermediate 位置做命中会反复改变落点，导致卡片疯狂弹跳。
    for (var i = 0; i < items.length; i++) {
      if (items[i].__flip) return;
    }

    // 最小重排间隔，进一步抑制高频抖动
    var now = Date.now();
    if (s.lastReorder && now - s.lastReorder < 80) return;

    var best = -1, bestDist = Infinity;
    for (var i = 0; i < items.length; i++) {
      var r = items[i].getBoundingClientRect();
      var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      var d = Math.hypot(px - cx, py - cy);
      if (d < bestDist) { bestDist = d; best = i; }
    }
    if (best < 0) return;

    var rb = items[best].getBoundingClientRect();
    var cx = rb.left + rb.width / 2;
    var after = px > cx;
    var ref = after ? items[best].nextElementSibling : items[best];
    if (ref === s.item) return;                  // 目标位置就是当前洞位置
    if (s.item.nextSibling === ref) return;      // 无变化

    var before = items.map(function (el) { return el.getBoundingClientRect(); });
    s.container.insertBefore(s.item, ref);
    // 洞已移动，更新参考矩形，让死区跟随新位置
    s.originRect = s.item.getBoundingClientRect();
    items.forEach(function (el, i) {
      var a = before[i], b = el.getBoundingClientRect();
      var dx = a.left - b.left, dy = a.top - b.top;
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return;
      flipTo(el, dx, dy);
    });

    s.lastReorder = now;
  }

  /* ---------------- 跟手帧循环 ---------------- */
  function frame() {
    var s = state;
    if (!s || !s.active) return;
    var desiredDx = s.pointerX - s.startX;
    var desiredDy = s.pointerY - s.startY;
    s.curDx += (desiredDx - s.curDx) * FOLLOW;
    s.curDy += (desiredDy - s.curDy) * FOLLOW;

    var speed = Math.hypot(s.velX, s.velY);
    var tiltY = REDUCED ? 0 : clamp(s.velX * SPEED_GAIN, -SPEED_TILT, SPEED_TILT);
    var tiltX = REDUCED ? 0 : clamp(-s.velY * SPEED_GAIN, -SPEED_TILT, SPEED_TILT);
    var dynScale = REDUCED ? LIFT_SCALE : (LIFT_SCALE + clamp(speed * 3, 0, SPEED_SCALE));
    s.ghost.style.transform =
      'perspective(900px) translate3d(' + s.curDx.toFixed(1) + 'px,' + s.curDy.toFixed(1) + 'px,0) ' +
      'rotateX(' + tiltX.toFixed(2) + 'deg) rotateY(' + tiltY.toFixed(2) + 'deg) scale(' + dynScale.toFixed(4) + ')';

    s.velX *= SPEED_DECAY; s.velY *= SPEED_DECAY;

    if (s.needSlot) { s.needSlot = false; reorder2D(s.pointerX, s.pointerY); }

    // P2 边缘自动滚动
    if (!REDUCED) {
      if (s.pointerY < EDGE) {
        window.scrollBy(0, -Math.max(4, MAX_SCROLL * (1 - s.pointerY / EDGE)));
      } else if (s.pointerY > window.innerHeight - EDGE) {
        window.scrollBy(0, Math.max(4, MAX_SCROLL * (1 - (window.innerHeight - s.pointerY) / EDGE)));
      }
    }

    s.raf = requestAnimationFrame(frame);
  }

  /* ---------------- 拖拽生命周期 ---------------- */

  function startDrag(e) {
    var s = state;
    if (s.active) return;          // 幂等：已拾起则忽略
    s.active = true;
    window.__endyDragActive = true;
    clearTimeout(s.holdTimer); s.holdTimer = null;
    clearTimeout(s.liftTimer); s.liftTimer = null;

    var item = s.item;

    // 关键修复：press-gravity 在 pointerdown 时可能给原卡写了 scale(0.985) 的 transform。
    // getBoundingClientRect() 会包含这个缩放值；如果直接用它设置「洞」的高度，
    // 洞会比正常卡片矮 1.5%，flex 容器重排 → 第一个卡片「高度突变」。
    // 因此先记录视觉位置（给 ghost 定位），再清掉 transform 并 reflow，
    // 用 offsetWidth/offsetHeight 取自然布局尺寸给 ghost 和洞。
    var visualRect = item.getBoundingClientRect();
    item.style.transition = 'none';
    item.style.transform = '';
    void item.offsetWidth;
    var naturalW = item.offsetWidth;
    var naturalH = item.offsetHeight;

    s.originRect = visualRect;
    s.originLeft = visualRect.left;
    s.originTop = visualRect.top;
    s.grabX = e.clientX - visualRect.left;
    s.grabY = e.clientY - visualRect.top;
    s.curDx = e.clientX - s.startX;
    s.curDy = e.clientY - s.startY;
    s.pointerX = e.clientX; s.pointerY = e.clientY;
    s.snap = true;   // 首次移动时立即把 ghost 贴到光标，避免弹簧追入

    // 原卡先隐藏，避免「原卡 + ghost 同帧可见」造成的复制感（首帧图片未解码尤甚）。
    item.classList.add('endy-drag-item');
    item.style.visibility = 'hidden';

    // 隐藏后元素仍在 flex 流，align-items:stretch 会把它拉到与同排一致的高度，
    // 这个真实高度可能高于内容自然高。ghost 必须匹配它，否则 ghost 比原卡位置矮一截。
    var holeH = item.getBoundingClientRect().height;

    // 创建视觉 ghost：原卡的 fixed 浮层克隆，跟手移动。
    // ghost 脱离 flex 流（position:fixed），必须有明确宽高 → 宽用 naturalW、高用洞的真实高度 holeH。
    var ghost = item.cloneNode(true);
    ghost.removeAttribute('id');
    ghost.removeAttribute('tabindex');
    ghost.removeAttribute('onclick');
    ghost.classList.add('endy-drag-ghost', 'endy-drag-item');
    ghost.style.position = 'fixed';
    ghost.style.left = visualRect.left + 'px';
    ghost.style.top = visualRect.top + 'px';
    ghost.style.width = naturalW + 'px';
    // ghost 是 display:flex 的克隆卡（flex column 容器），在此类元素上显式 height 会被
    // 内容高度覆盖（实测设 600px 仍 computed 401）。额外用 min-height 兜底，
    // 确保 ghost 与原卡（被 flex stretch 后的真实高度 holeH）等高，拖起才「原样」。
    ghost.style.height = holeH + 'px';
    ghost.style.minHeight = holeH + 'px';
    ghost.style.margin = '0';
    ghost.style.padding = '';
    ghost.style.zIndex = '99998';
    ghost.style.pointerEvents = 'none';
    ghost.style.transition = 'none';
    ghost.style.transformOrigin = 'center center';
    ghost.style.boxSizing = 'border-box';
    // 关键：覆盖 custom.css 的 .endy-drag-ghost { contain: layout style paint }。
    // containment 会让这个克隆复杂子树在 Chromium 下忽略显式 height（实测 computed height
    // 比设定值矮 ~20px），导致 ghost 比原卡（被 flex stretch 后的高度）矮一截。
    // 这里用内联 contain:none 关闭隔离，让 height:holeH 真正生效，ghost 才能与原卡等高。
    ghost.style.contain = 'none';
    ghost.style.visibility = 'visible';
    ghost.style.opacity = '1';
    ghost.style.willChange = 'transform';
    // 克隆会带上 press-gravity 的内联 box-shadow，清掉让 .endy-drag-ghost 的阴影规则接管
    ghost.style.boxShadow = '';
    // 把 ghost 插回原容器 #recent-posts，保留主题 CSS 上下文。
    // position:fixed 已让 ghost 脱离 flex 正常流，不会参与容器重排。
    s.container.appendChild(ghost);
    s.ghost = ghost;

    // 初始 transform 就带上抓取位移，避免首帧 ghost 渲染在原卡位置再跳到光标。
    ghost.style.transform = 'perspective(900px) translate3d(' + s.curDx.toFixed(1) + 'px,' + s.curDy.toFixed(1) + 'px,0) scale(' + LIFT_SCALE + ')';

    // 拖起瞬间确保封面图立即加载：首屏图片可能尚未 decode，会导致 ghost 首帧空白 → 复制感；
    // 同时把 lazyload 占位图换成真实 data-src（anzhiyu 的 lazyload 把真 src 存在 data-src）。
    forceImgEager(item);
    forceImgEager(ghost);

    document.body.classList.add('endy-dragging');
    // pointer capture 绑在 body 上而不是原卡上：
    // 拖拽过程中原卡会被 insertBefore 移动，且 visibility:hidden，
    // 某些浏览器对不可见/移动元素的 capture 会丢事件。body 稳定可靠。
    try { document.body.setPointerCapture(s.pointerId); } catch (e3) {}
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

  function throwOut(s, vx, vy) {
    var ghost = s.ghost, item = s.item;
    var speed = Math.hypot(vx, vy) || 1;
    var dist = Math.min(560, 180 + speed * 380);
    var fx = (vx / speed) * dist;
    var fy = (vy / speed) * dist;

    if (s.raf) { try { cancelAnimationFrame(s.raf); } catch (e) {} }
    s.active = false;

    var fromT = ghost.style.transform ||
      'perspective(900px) translate3d(0,0,0) rotateX(0) rotateY(0) scale(' + LIFT_SCALE + ')';
    var fly = ghost.animate(
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
      cleanupDrag(s);
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
    if (!s || !s.active) { forceEndDrag(); return; }
    var item = s.item, ghost = s.ghost;
    if (!ghost || !item) { forceEndDrag(); return; }

    var v = releaseVel();

    var cr = s.container.getBoundingClientRect();
    var gc = ghost.getBoundingClientRect();
    var cx = gc.left + gc.width / 2, cy = gc.top + gc.height / 2;
    var outside = cx < cr.left - 40 || cx > cr.right + 40 || cy < cr.top - 40 || cy > cr.bottom + 40;
    if (outside && Math.hypot(v.x, v.y) > THROW_SPEED) {
      throwOut(s, v.x, v.y);
      return;
    }

    suppressClickUntil = Date.now() + 600;

    if (s.raf) { try { cancelAnimationFrame(s.raf); } catch (e) {} }
    s.active = false;

    var hole = item.getBoundingClientRect();     // 隐形原卡当前位置 = 洞
    var cur = ghost.getBoundingClientRect();
    var curDx = cur.left - s.originLeft;
    var curDy = cur.top - s.originTop;
    var tgtDx = hole.left - s.originLeft;
    var tgtDy = hole.top - s.originTop;

    var done = function () {
      cleanupDrag(s);
      state = null;
      saveOrder();
      suppressClickUntil = Date.now() + 220;
    };

    // 1.2s 铁底：即便浏览器不触发 onfinish/oncancel，也强制清掉
    var safetyTimer = setTimeout(function () {
      if (state === s) { cleanupDrag(s); state = null; }
    }, 1200);

    if (REDUCED || typeof ghost.animate !== 'function') {
      clearTimeout(safetyTimer);
      done();
      return;
    }

    var pts = (window.EndySpring && window.EndySpring.samples)
      ? window.EndySpring.samples(SPRING)
      : [0, 0.5, 1];
    var frames = pts.map(function (p) {
      var e = p;
      var dx = curDx + (tgtDx - curDx) * e;
      var dy = curDy + (tgtDy - curDy) * e;
      var sc = LIFT_SCALE + (1 - LIFT_SCALE) * Math.max(0, Math.min(1, e));
      return {
        transform: 'perspective(900px) translate3d(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px,0) rotateX(0deg) rotateY(0deg) scale(' + sc.toFixed(4) + ')'
      };
    });
    var anim = ghost.animate(frames, { duration: frames.length * 1000 / 60, easing: 'linear', fill: 'forwards' });
    s.settleAnim = anim;
    anim.onfinish = function () { clearTimeout(safetyTimer); done(); };
    anim.oncancel = function () { clearTimeout(safetyTimer); done(); };
  }

  function cancelDrag() {
    if (!state) return;
    if (state.active) {
      if (state.committed) { finishDrag(); return; }
      // 未提交 = 点击，立即还原，不拦 click
      cleanupDrag(state);
      state = null;
      return;
    }
    clearTimeout(state.holdTimer);
    clearTimeout(state.liftTimer);
    state = null;
  }

  /* ---------------- 指针事件 ---------------- */

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
      committed: false,
      holdReady: false,
      samples: [],
      velX: 0,
      velY: 0,
      type: e.pointerType || 'mouse',
      needSlot: false,
      raf: 0,
      holdTimer: null,
      liftTimer: null
    };

    if (state.type !== 'mouse') {
      state.holdTimer = setTimeout(function () {
        if (state) {
          state.holdReady = true;
          // 触摸：长按后才视觉拾起
          startDrag(e);
          state.committed = false;
        }
      }, TOUCH_HOLD);
    }
    // 鼠标：不再设 liftTimer，任何移动都在 onMove 第一帧实时拾起。
    // 避免按住不动 60ms 后自动创建 ghost，导致「复制感」。

  }

  function onMove(e) {
    if (!state || (e.pointerId !== state.pointerId)) return;
    var s = state;
    var dx = e.clientX - s.startX;
    var dy = e.clientY - s.startY;
    var dist = Math.sqrt(dx * dx + dy * dy);

    if (!s.active) {
      // 鼠标：任何移动立即视觉拾起；触摸：长按就绪 + 微动
      var canStart = s.type === 'mouse' ? (Math.abs(dx) > 0 || Math.abs(dy) > 0) : (s.holdReady && dist > 4);
      if (!canStart) return;
      startDrag(e);
      if (s.type === 'mouse') s.committed = false;
      else s.committed = true;
    }

    s.pointerX = e.clientX;
    s.pointerY = e.clientY;

    // 首次移动立即把 ghost 贴到光标，避免从原卡位置弹簧飞入。
    // 同步刷新 ghost transform，避免等到下一帧 rAF 才到位（减少「复制感」）。
    if (s.snap) {
      s.curDx = s.pointerX - s.startX;
      s.curDy = s.pointerY - s.startY;
      s.snap = false;
      if (s.ghost) {
        s.ghost.style.transform =
          'perspective(900px) translate3d(' + s.curDx.toFixed(1) + 'px,' + s.curDy.toFixed(1) + 'px,0) scale(' + LIFT_SCALE + ')';
      }
    }

    // 鼠标/触摸：移动超过阈值才「提交」拖拽（开始重排/甩出）
    if (s.active && !s.committed && dist > MOUSE_ACTIVATE) {
      s.committed = true;
    }

    if (s.committed) {
      s.samples.push({ t: Date.now(), x: e.clientX, y: e.clientY });
      if (s.samples.length > 24) s.samples.shift();

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
    }

    if (e.cancelable) e.preventDefault();
  }

  function onUp(e) {
    if (!state || (e && e.pointerId !== state.pointerId)) return;
    if (state.active) {
      if (state.committed) finishDrag();
      else {
        // 未提交 = 点击，立即还原，不拦 click
        cleanupDrag(state);
        state = null;
      }
    } else {
      clearTimeout(state.holdTimer);
      clearTimeout(state.liftTimer);
      state = null;
    }
  }

  /* ---------------- P3 键盘重排 ---------------- */

  function getLive() {
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'assertive');
      liveRegion.setAttribute('role', 'status');
      liveRegion.className = 'sr-only';
      document.body.appendChild(liveRegion);
    }
    return liveRegion;
  }
  function announce(msg) { getLive().textContent = msg; }

  function listItems() {
    return Array.prototype.slice.call(document.querySelectorAll(CONTAINER + ' ' + ITEM))
      .filter(function (el) { return !(el.classList && el.classList.contains('endy-drag-ghost')); });
  }

  function dropKb() {
    if (!kbDrag) return;
    kbDrag.classList.remove('endy-kbd-dragging');
    announce('已放下卡片。');
    kbDrag = null;
  }
  function cancelKb() {
    if (!kbDrag) return;
    kbDrag.classList.remove('endy-kbd-dragging');
    kbDrag = null;
    restoreOrder();
    announce('已取消移动，顺序已还原。');
  }

  document.addEventListener('keydown', function (e) {
    var ae = document.activeElement;
    if (!ae || !ae.classList || !ae.classList.contains('recent-post-item')) return;

    if (!kbDrag) {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        kbDrag = ae;
        kbDrag.classList.add('endy-kbd-dragging');
        var idx = listItems().indexOf(kbDrag);
        announce('已拾起文章卡片，当前第 ' + (idx + 1) + ' 张。用方向键移动，回车或空格放下，Esc 取消。');
      }
      return;
    }

    var items = listItems();
    var pos = items.indexOf(kbDrag);
    if (pos === -1) { kbDrag = null; return; }

    var target = pos;
    if (e.key === 'ArrowUp') target = pos - 2;
    else if (e.key === 'ArrowDown') target = pos + 2;
    else if (e.key === 'ArrowLeft') target = pos - 1;
    else if (e.key === 'ArrowRight') target = pos + 1;
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); dropKb(); return; }
    else if (e.key === 'Escape') { e.preventDefault(); cancelKb(); return; }
    else return;

    e.preventDefault();
    target = clamp(target, 0, items.length - 1);
    if (target === pos) { announce('已在边界，无法继续移动。'); return; }

    var before = items.map(function (el) { return el.getBoundingClientRect(); });
    if (target > pos) {
      var ref = items[target].nextElementSibling;
      kbDrag.parentNode.insertBefore(kbDrag, ref);
    } else {
      kbDrag.parentNode.insertBefore(kbDrag, items[target]);
    }
    var newItems = listItems();
    newItems.forEach(function (el) {
      var i = items.indexOf(el);
      if (i === -1) return;
      var a = before[i], b = el.getBoundingClientRect();
      var dx = a.left - b.left, dy = a.top - b.top;
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return;
      flipTo(el, dx, dy);
    });
    saveOrder();
    announce('已移动到第 ' + (newItems.indexOf(kbDrag) + 1) + ' 张，共 ' + newItems.length + ' 张。');
  }, true);

  /* ---------------- 全局事件绑定 ---------------- */

  document.addEventListener('pointerdown', onDown, true);
  document.addEventListener('pointermove', onMove, true);
  document.addEventListener('pointerup', onUp, true);
  document.addEventListener('pointercancel', cancelDrag, true);
  document.addEventListener('lostpointercapture', function (e) {
    if (state && e.pointerId === state.pointerId) cancelDrag();
  }, true);
  window.addEventListener('blur', cancelDrag);
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden' && state) forceEndDrag();
  });
  window.addEventListener('pagehide', function () {
    if (state) forceEndDrag();
  });

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

  /* ---------------- 初始化 ---------------- */

  function init() { restoreOrder(); bindKeyboard(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  document.addEventListener('pjax:complete', function () {
    if (state) forceEndDrag();
    if (kbDrag) { kbDrag.classList.remove('endy-kbd-dragging'); kbDrag = null; }
    restoreOrder();
    bindKeyboard();
  });
})();
