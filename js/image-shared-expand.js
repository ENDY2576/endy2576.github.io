/**
 * 图片共享展开（View Transition 共享元素灯箱）
 * ------------------------------------------------------------
 * 点击文章 / 相册里的图片时，用 View Transitions API 做「缩略图 → 大图」的
 * 共享元素 morph 展开，关闭时反向收起 —— 代替主题自带的 fancybox。
 *
 * 关键设计：
 *   1) 捕获阶段拦截 a[data-fancybox]（图片链接）的 click，preventDefault +
 *      stopPropagation 阻止 fancybox 打开（fancybox 的监听器在 document 冒泡阶段，
 *      捕获阶段 stopPropagation 可抢先拦下，互不打架）。
 *   2) 双层结构：#endy-img-lightbox 容器不透明度不动，内部「遮罩层」单独做淡入淡出，
 *      这样共享元素图片始终可见，morph 不会被父级 opacity:0 吃掉。
 *   3) 共享元素用同一 viewTransitionName：old 快照是缩略图、new 快照是大图，
 *      浏览器自动在两者间插值尺寸/位置；关闭时反过来。
 *   4) 支持上一张/下一张（键盘 ←/→ + 屏幕按钮）、标题、计数器、Esc/点遮罩/关闭按钮关闭。
 *   5) 优雅降级：不支持 startViewTransition 或用户开启「减少动态效果」时，
 *      完全不拦截 → 行为与原主题 fancybox 完全一致，无任何回归。
 *   6) 修饰键（Ctrl/Cmd/Shift）点击放行，保留「在新标签打开原图」等浏览器原生行为。
 */
(function () {
  'use strict';

  if (window.__endyImageSharedBound) return;
  window.__endyImageSharedBound = true;

  var VT_NAME = 'endy-shared-img';
  var SCOPE = '#article-container, #post, .fj-gallery, .gallery, .gallery-group, .article-container';
  var Z = 99999;

  var SUPPORTS_VT = (typeof document.startViewTransition === 'function');
  var REDUCED = false;
  try { REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  var lb = null;   // 当前灯箱状态

  /* ---------------- 工具 ---------------- */

  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }

  function managedLinks(scopeEl) {
    var list = scopeEl.querySelectorAll('a[data-fancybox]');
    var out = [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].querySelector('img')) out.push(list[i]);
    }
    return out;
  }

  /* ---------------- 打开 ---------------- */

  function openLightbox(link) {
    if (lb) return;
    var scopeEl = link.closest(SCOPE);
    if (!scopeEl) return;

    var links = managedLinks(scopeEl);
    var index = links.indexOf(link);
    if (index < 0) index = 0;

    var thumb = link.querySelector('img');
    var fullSrc = link.getAttribute('href') || (thumb && thumb.getAttribute('src')) || '';
    if (!fullSrc) return;
    var caption = link.getAttribute('data-caption') ||
      (thumb && (thumb.getAttribute('alt') || thumb.getAttribute('title'))) || '';

    var overlay = buildOverlay(fullSrc, caption, links, index, thumb);

    // 给「旧」快照里的缩略图打上共享名；新快照里改由大图持有该名
    if (thumb) thumb.style.viewTransitionName = VT_NAME;

    // 关键：overlay 必须在「新状态」回调里才插入 DOM。
    // 若在 startViewTransition 之前插入，旧快照就会 already 包含全尺寸大图，
    // 既失去「从缩略图展开」的效果，又会和缩略图叠加成双图。
    var apply = function () {
      document.body.appendChild(overlay);
      var img = overlay.querySelector('.endy-img-lightbox-img');
      if (img) img.style.viewTransitionName = VT_NAME;  // 新快照：大图持有共享名
      if (thumb) thumb.style.viewTransitionName = '';   // 缩略图释放，避免同名冲突
    };

    if (SUPPORTS_VT && !REDUCED) {
      var vt;
      try { vt = document.startViewTransition(apply); }
      catch (e) { apply(); }
      if (vt && vt.ready && vt.ready.then) {
        vt.ready.then(function () {
          overlay.classList.add('show');   // 遮罩淡入（图片已先 morph 到位）
        }).catch(function () {});
      } else {
        overlay.classList.add('show');
      }
    } else {
      apply();
      overlay.classList.add('show');
    }

    lb = { overlay: overlay, links: links, index: index, thumb: thumb, open: true };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey, true);
  }

  function buildOverlay(fullSrc, caption, links, index, thumb) {
    var overlay = document.createElement('div');
    overlay.id = 'endy-img-lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', '图片查看');

    var backdrop = document.createElement('div');
    backdrop.className = 'endy-img-backdrop';

    var img = document.createElement('img');
    img.className = 'endy-img-lightbox-img';
    img.src = fullSrc;
    img.alt = caption || 'image';
    img.draggable = false;

    var closeBtn = document.createElement('button');
    closeBtn.className = 'endy-img-btn endy-img-close';
    closeBtn.setAttribute('aria-label', '关闭');
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', function (e) { e.stopPropagation(); closeLightbox(); });

    var prevBtn = document.createElement('button');
    prevBtn.className = 'endy-img-btn endy-img-prev';
    prevBtn.setAttribute('aria-label', '上一张');
    prevBtn.innerHTML = '&#8249;';
    prevBtn.addEventListener('click', function (e) { e.stopPropagation(); navLightbox(-1); });

    var nextBtn = document.createElement('button');
    nextBtn.className = 'endy-img-btn endy-img-next';
    nextBtn.setAttribute('aria-label', '下一张');
    nextBtn.innerHTML = '&#8250;';
    nextBtn.addEventListener('click', function (e) { e.stopPropagation(); navLightbox(1); });

    var captionEl = document.createElement('div');
    captionEl.className = 'endy-img-caption';
    captionEl.textContent = caption || '';

    var counter = document.createElement('div');
    counter.className = 'endy-img-counter';
    counter.textContent = (index + 1) + ' / ' + links.length;

    overlay.appendChild(backdrop);
    overlay.appendChild(img);
    overlay.appendChild(closeBtn);
    overlay.appendChild(prevBtn);
    overlay.appendChild(nextBtn);
    overlay.appendChild(captionEl);
    overlay.appendChild(counter);

    // 点遮罩（非图片/按钮）关闭
    overlay.addEventListener('click', function (e) {
      if (e.target === backdrop || e.target === overlay) closeLightbox();
    });

    overlay.__caption = captionEl;
    overlay.__counter = counter;
    overlay.__img = img;
    return overlay;   // 注意：插入 DOM 延后到 VT 回调里（见 openLightbox），避免旧快照已含大图
  }

  /* ---------------- 上一张 / 下一张 ---------------- */

  function navLightbox(dir) {
    if (!lb) return;
    var n = lb.links.length;
    if (n <= 1) return;
    var ni = (lb.index + dir + n) % n;
    lb.index = ni;
    var link = lb.links[ni];
    var thumb = link.querySelector('img');
    var fullSrc = link.getAttribute('href') || (thumb && thumb.getAttribute('src')) || '';
    var caption = link.getAttribute('data-caption') ||
      (thumb && (thumb.getAttribute('alt') || thumb.getAttribute('title'))) || '';

    lb.thumb = thumb;  // 关闭时 morph 回当前这张缩略图
    var img = lb.overlay.__img;
    // 轻微淡入淡出切换（不在 VT 中，避免打断共享名）
    img.style.opacity = '0';
    setTimeout(function () {
      if (!lb) return;
      img.src = fullSrc;
      img.alt = caption || 'image';
      lb.overlay.__caption.textContent = caption || '';
      lb.overlay.__counter.textContent = (ni + 1) + ' / ' + n;
      img.style.opacity = '1';
    }, 120);
  }

  /* ---------------- 关闭 ---------------- */

  function closeLightbox() {
    if (!lb || !lb.open) return;
    var cur = lb;
    cur.open = false;

    var finish = function () {
      var img = cur.overlay.__img;
      var thumb = cur.thumb;
      var remove = function () {
        if (cur.overlay && cur.overlay.parentNode) cur.overlay.parentNode.removeChild(cur.overlay);
        if (img) img.style.viewTransitionName = '';
        if (thumb) thumb.style.viewTransitionName = '';
        document.body.style.overflow = '';
        document.removeEventListener('keydown', onKey, true);
        lb = null;
      };

      if (SUPPORTS_VT && !REDUCED) {
        var vt;
        try {
          vt = document.startViewTransition(function () {
            // 新状态：缩略图重新持有共享名，大图释放 → 反向 morph 收起
            if (img) img.style.viewTransitionName = '';
            if (thumb) thumb.style.viewTransitionName = VT_NAME;
            if (cur.overlay && cur.overlay.parentNode) cur.overlay.parentNode.removeChild(cur.overlay);
          });
        } catch (e) { remove(); return; }
        if (vt && vt.finished && vt.finished.then) vt.finished.then(remove, remove);
        else setTimeout(remove, 460);
      } else {
        remove();
      }
    };

    // 先淡出遮罩，再跑反向 morph（避免旧快照里遮罩半透明残留）
    cur.overlay.classList.remove('show');
    if (SUPPORTS_VT && !REDUCED) setTimeout(finish, 200);
    else finish();
  }

  /* ---------------- 键盘 ---------------- */

  function onKey(e) {
    if (!lb) return;
    if (e.key === 'Escape') { e.preventDefault(); closeLightbox(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); navLightbox(-1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); navLightbox(1); }
  }

  /* ---------------- 拦截点击（捕获阶段，抢在 fancybox 之前） ---------------- */

  document.addEventListener('click', function (e) {
    if (!SUPPORTS_VT || REDUCED) return;          // 不支持 / 减少动效 → 放行 fancybox
    if (e.defaultPrevented) return;
    if (e.button !== 0) return;                   // 只响应左键
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // 保留新标签打开等原生行为
    var t = e.target;
    if (!t || t.nodeType !== 1 || typeof t.closest !== 'function') return;

    var link = t.closest('a[data-fancybox]');
    if (!link) return;
    if (!link.querySelector('img')) return;        // 只接管图片灯箱
    if (!link.closest(SCOPE)) return;              // 仅内容 / 相册区域内

    // 拦下 fancybox + 阻止锚点跳转，改由共享元素灯箱接管
    e.preventDefault();
    e.stopPropagation();
    openLightbox(link);
  }, true);

  // pjax 切走时若灯箱还开着，直接销毁（不跑 VT，避免跨页残留）
  document.addEventListener('pjax:send', function () {
    if (!lb) return;
    var o = lb.overlay;
    var img = o && o.__img;
    var thumb = lb.thumb;
    if (img) img.style.viewTransitionName = '';
    if (thumb) thumb.style.viewTransitionName = '';
    if (o && o.parentNode) o.parentNode.removeChild(o);
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKey, true);
    lb = null;
  });
})();
