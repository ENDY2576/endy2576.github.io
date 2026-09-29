/**
 * 全站动效系统（A 动效语言 / B 滚动编排 / C 磁吸指针 / D 封面共享元素 / F 光影材质）
 * ------------------------------------------------------------
 * A：时长收敛到 3 档、曲线收敛到 2 条（见 custom.css 的 --endy-dur-* / --endy-ease-*）
 * B：卡片随滚动分批淡入上浮，stagger 60ms（隐藏态由 JS 加，JS 挂了内容照常可见）
 * C：指针靠近按钮/标签时轻微吸附位移，离开弹回（走 transform，不影响点击）
 * D：点文章卡 → 封面图 FLIP 连续放大到文章头图，页面切换有「同一张图飞过去」的错觉
 * F：卡片高光跟随指针（径向渐变叠加），静止时也有材质感
 *
 * 全部 try/catch 包裹 + prefers-reduced-motion 降级，任何一环出问题都不影响站点功能。
 */
(function () {
  'use strict';

  if (window.__endyMotionBound) return;
  window.__endyMotionBound = true;

  var REDUCED = false;
  try { REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  /* ---------------- B：滚动进场编排 ---------------- */
  var REVEAL = [
    '.card-widget', '.recent-post-item', '.article-item', '.author-content-item',
    '.gallery-item', '.flink-list-item', '.categoryItem'
  ].join(',');

  function setupReveal() {
    if (REDUCED) return;
    if (!('IntersectionObserver' in window)) return;
    var nodes = document.querySelectorAll(REVEAL);
    if (!nodes.length) return;

    var io = new IntersectionObserver(function (entries) {
      var batch = 0;
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        io.unobserve(el);
        el.style.setProperty('--endy-delay', (batch * 60) + 'ms');
        batch++;
        requestAnimationFrame(function () {
          el.classList.add('endy-reveal-in');
          setTimeout(function () { el.classList.remove('endy-reveal', 'endy-reveal-in'); }, 900);
        });
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    Array.prototype.forEach.call(nodes, function (el) {
      var r = el.getBoundingClientRect();
      // 首屏已经可见的不做隐藏，避免「闪一下才出现」
      if (r.top < window.innerHeight * 0.92) return;
      el.classList.add('endy-reveal');
      io.observe(el);
    });
  }

  /* ---------------- C：磁吸指针 ---------------- */
  var MAGNET = [
    '#rightside .rightside-item', '#rightside button', '.endy-eggs-btn',
    '.miku-panel-btn', '.tag-cloud-list a', '.pagination a', '.categoryButton'
  ].join(',');

  var magEl = null, magRaf = 0, magPt = null;

  function magPaint() {
    magRaf = 0;
    if (!magEl || !magPt) return;
    var r = magEl.getBoundingClientRect();
    var dx = (magPt.x - (r.left + r.width / 2)) / (r.width / 2);
    var dy = (magPt.y - (r.top + r.height / 2)) / (r.height / 2);
    var mx = Math.max(-1, Math.min(1, dx)) * 4.5;
    var my = Math.max(-1, Math.min(1, dy)) * 4.5;
    magEl.style.transition = 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)';
    magEl.style.transform = 'translate(' + mx.toFixed(2) + 'px,' + my.toFixed(2) + 'px)';
  }

  function magEnter(el, e) {
    if (magEl === el) return;
    magLeave();
    magEl = el;
    magPt = { x: e.clientX, y: e.clientY };
    magPaint();
  }

  function magLeave() {
    if (!magEl) return;
    var el = magEl;
    magEl = null; magPt = null;
    el.style.transition = 'transform 320ms cubic-bezier(0.16, 1, 0.3, 1)';
    el.style.transform = '';
    setTimeout(function () { if (magEl !== el) el.style.transition = ''; }, 360);
  }

  /* ---------------- F：光影材质 ---------------- */
  var GLOSS = [
    '.card-widget', '.recent-post-item', '.author-content-item',
    '.categoryItem', '.article-item'
  ].join(',');

  var glossEl = null, glossRaf = 0, glossPt = null;

  function glossPaint() {
    glossRaf = 0;
    if (!glossEl || !glossPt || !glossEl.isConnected) return;
    var r = glossEl.getBoundingClientRect();
    glossEl.style.setProperty('--endy-mx', (((glossPt.x - r.left) / r.width) * 100).toFixed(1) + '%');
    glossEl.style.setProperty('--endy-my', (((glossPt.y - r.top) / r.height) * 100).toFixed(1) + '%');
  }

  /* ---------------- D：封面共享元素 ---------------- */
  function coverFlight(card) {
    try {
      var src = card.querySelector('.post_cover img, .recent-post-info img, img');
      if (!src) return;
      var r = src.getBoundingClientRect();
      if (!r.width || !r.height) return;
      var clone = src.cloneNode(true);
      clone.className = 'endy-cover-fly';
      clone.style.cssText =
        'position:fixed;margin:0;z-index:99997;pointer-events:none;object-fit:cover;' +
        'left:' + r.left + 'px;top:' + r.top + 'px;width:' + r.width + 'px;height:' + r.height + 'px;' +
        'border-radius:12px;box-shadow:0 18px 40px rgba(0,0,0,.28);' +
        'transition:transform 460ms cubic-bezier(0.16,1,0.3,1),opacity 220ms ease,border-radius 460ms ease;';
      document.body.appendChild(clone);
      window.__endyCoverFly = { clone: clone, rect: r };
      setTimeout(clearFlight, 1200);
    } catch (e) {}
  }

  function landFlight() {
    var f = window.__endyCoverFly;
    if (!f) return;
    window.__endyCoverFly = null;
    var clone = f.clone;
    var rect = f.rect;
    function remove() { if (clone && clone.parentNode) clone.parentNode.removeChild(clone); }
    try {
      var target = document.querySelector('#page-header img, .post-bg, #post-cover img, .post-head img');
      if (!target) { clone.style.opacity = '0'; setTimeout(remove, 240); return; }
      // 目标图此时可能还没解码，等一帧再量
      setTimeout(function () {
        var t = target.getBoundingClientRect();
        if (!t.width || !t.height) { clone.style.opacity = '0'; setTimeout(remove, 240); return; }
        var sx = t.width / rect.width, sy = t.height / rect.height;
        var dx = t.left + t.width / 2 - (rect.left + rect.width / 2);
        var dy = t.top + t.height / 2 - (rect.top + rect.height / 2);
        clone.style.borderRadius = '0px';
        clone.style.transform = 'translate(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px) scale(' + sx.toFixed(3) + ',' + sy.toFixed(3) + ')';
        setTimeout(function () { clone.style.opacity = '0'; }, 380);
        setTimeout(remove, 640);
      }, 60);
    } catch (e) {
      remove();
    }
  }

  function clearFlight() {
    var f = window.__endyCoverFly;
    if (!f) return;
    window.__endyCoverFly = null;
    try { if (f.clone && f.clone.parentNode) f.clone.parentNode.removeChild(f.clone); } catch (e) {}
  }

  /* ---------------- 事件挂载 ---------------- */
  document.addEventListener('pointerover', function (e) {
    if (REDUCED) return;
    var t = e.target;
    if (!t || t.nodeType !== 1 || typeof t.closest !== 'function') return;
    try {
      var m = t.closest(MAGNET);
      if (m && e.pointerType !== 'touch') { magEnter(m, e); return; }
      if (magEl && !m) magLeave();

      var g = t.closest(GLOSS);
      if (g && e.pointerType !== 'touch') {
        if (g !== glossEl) {
          if (glossEl) glossEl.classList.remove('is-lit');
          glossEl = g;
          g.classList.add('is-lit');
        }
      } else if (glossEl && !g) {
        glossEl.classList.remove('is-lit');
        glossEl = null;
      }
    } catch (err) {}
  }, true);

  document.addEventListener('pointermove', function (e) {
    if (REDUCED) return;
    if (magEl) { magPt = { x: e.clientX, y: e.clientY }; if (!magRaf) magRaf = requestAnimationFrame(magPaint); }
    if (glossEl) { glossPt = { x: e.clientX, y: e.clientY }; if (!glossRaf) glossRaf = requestAnimationFrame(glossPaint); }
  }, true);

  document.addEventListener('pointerout', function (e) {
    try {
      var to = e.relatedTarget;
      if (magEl && (!to || !magEl.contains(to))) magLeave();
      if (glossEl && (!to || !glossEl.contains(to))) { glossEl.classList.remove('is-lit'); glossEl = null; }
    } catch (err) {}
  }, true);

  // D：点文章卡起飞
  document.addEventListener('click', function (e) {
    if (REDUCED) return;
    var t = e.target;
    if (!t || t.nodeType !== 1 || typeof t.closest !== 'function') return;
    var card = t.closest('.recent-post-item, .article-item');
    if (!card) return;
    try { coverFlight(card); } catch (err) {}
  }, true);

  document.addEventListener('pjax:complete', function () {
    try { landFlight(); } catch (e) {}
    try { setupReveal(); } catch (e) {}
  });
  window.addEventListener('pagehide', clearFlight);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupReveal);
  } else {
    setupReveal();
  }
})();
