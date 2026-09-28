/* 彖渊子 · 全局增强脚本
 * 右下角回顶按钮：滚动百分比
 *   - 页面中间滚动：只显示百分比（隐藏 ↑ 箭头）
 *   - 顶部 / 底部：只显示 ↑ 箭头（隐藏百分比）
 *   - 兼容 PJAX：导航完成后重新挂载（主题会用新页面内容替换 #go-up 所在容器）
 */
(function () {
  'use strict';

  const SELECTOR = '#go-up';

  function initScrollPercent() {
    const btn = document.querySelector(SELECTOR);
    if (!btn) return;

    // 避免重复挂载：同一按钮只保留一个滚动监听
    if (btn._endyScrollHandler) {
      window.removeEventListener('scroll', btn._endyScrollHandler, { passive: true });
      window.removeEventListener('resize', btn._endyScrollHandler);
      btn._endyScrollHandler = null;
    }

    let span = btn.querySelector('.endy-scroll-percent');
    if (!span) {
      span = document.createElement('span');
      span.className = 'endy-scroll-percent';
      span.setAttribute('aria-hidden', 'true');
      btn.appendChild(span);
    }
    span.textContent = '0%';

    const arrow = btn.querySelector('.anzhiyu-icon-arrow-up') || btn.querySelector('i');

    function update() {
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const clientHeight =
        document.documentElement.clientHeight || window.innerHeight || 0;
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight || 0;
      const track = scrollHeight - clientHeight;

      let pct = 0;
      if (track > 0) pct = Math.round((scrollTop / track) * 100);
      pct = Math.max(0, Math.min(100, pct));
      span.textContent = pct + '%';

      const atTop = scrollTop <= 5;
      const atBottom = track <= 0 || scrollTop + clientHeight >= scrollHeight - 5;

      if (atTop || atBottom) {
        // 顶部 / 底部：只显示 ↑ 箭头
        btn.classList.remove('endy-show-percent');
        span.style.display = 'none';
        if (arrow) arrow.style.display = '';
      } else {
        // 中间滚动：只显示百分比
        btn.classList.add('endy-show-percent');
        span.style.display = 'block';
        if (arrow) arrow.style.display = 'none';
      }
    }

    btn._endyScrollHandler = update;
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  const SEASONS = ['spring', 'summer', 'autumn', 'winter'];
  const SEASON_NAMES = { spring: '春', summer: '夏', autumn: '秋', winter: '冬' };
  const SEASON_ICONS = {
    spring: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V12"/><path d="M12 12c0-4-3-7-7-7 0 4 3 7 7 7z"/><path d="M12 12c0-4 3-7 7-7 0 4-3 7-7 7z"/></svg>',
    summer: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>',
    autumn: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2 5h5l-4 3 2 5-5-3-5 3 2-5-4-3h5z"/><path d="M12 15v7"/></svg>',
    winter: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M2 12h20M5.64 5.64l12.72 12.72M5.64 18.36 18.36 5.64"/></svg>'
  };
  const SEASON_STORAGE_KEY = 'endy-season-override';

  /* 四季日间背景：按当前月份（北半球）写入 <html data-season>，
     由 custom.css 的 :root[data-season] 规则切换 --endy-bg-light。
     如果用户在右下角手动切换过季节，优先读取 localStorage 保存的偏好。 */
  function getSeasonByMonth() {
    const m = new Date().getMonth() + 1; // 1-12
    if (m >= 3 && m <= 5) return 'spring';
    if (m >= 6 && m <= 8) return 'summer';
    if (m >= 9 && m <= 11) return 'autumn';
    return 'winter';
  }

  function applySeason() {
    let season = localStorage.getItem(SEASON_STORAGE_KEY);
    if (!season || SEASONS.indexOf(season) === -1) {
      season = getSeasonByMonth();
    }
    document.documentElement.setAttribute('data-season', season);
  }

  // 预加载图片：返回 Promise，onload/onerror/已缓存都立即 resolve，避免切换瞬间图未就绪而闪白
  function preloadImage(url) {
    return new Promise(function (resolve) {
      if (!url) return resolve();
      const img = new Image();
      img.onload = function () { resolve(); };
      img.onerror = function () { resolve(); };
      img.src = url;
      if (img.complete) resolve();
    });
  }

  // 把 CSS 变量里的 url("...") / url(...) 抽成裸 URL。
  // 关键：getComputedStyle 返回的是 "url(/img/...)" 这种 CSS 函数值，
  // 不能直接赋给 <img>.src（会被当成相对路径 404）。必须先剥离 url() 包裹。
  function cssUrlToSrc(value) {
    if (!value) return '';
    value = value.trim();
    const m = value.match(/^url\((['"]?)([\s\S]*?)\1\)$/i);
    return m ? m[2].trim() : value;
  }

  // 页面加载即预加载全部四季背景图，让首次手动切换也能秒切、不再现拉网络
  function preloadAllSeasons() {
    // 夜间模式用单独背景图，不依赖四季切换，没必要预加载四张大图（省流量/降卡顿）
    if (document.documentElement.getAttribute('data-theme') === 'dark') return;
    const root = document.documentElement;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    SEASONS.forEach(function (s) {
      const bgVar = isMobile ? '--endy-bg-' + s + '-mobile' : '--endy-bg-' + s;
      const url = cssUrlToSrc((getComputedStyle(root).getPropertyValue(bgVar) || '').trim());
      if (url) preloadImage(url);
    });
  }

  // 切换令牌：快速连点时只让最后一次切换真正生效，避免多个临时层叠加导致闪烁/卡顿
  let seasonToken = 0;

  function setSeason(season) {
    if (SEASONS.indexOf(season) === -1) return;
    const root = document.documentElement;
    const bg = document.getElementById('web_bg');
    const current = root.getAttribute('data-season') || getSeasonByMonth();

    // 无背景层、已是目标季节、或夜间模式（夜间仅一张图）直接切换，无需过渡
    if (current === season || !bg || root.getAttribute('data-theme') === 'dark') {
      root.setAttribute('data-season', season);
      localStorage.setItem(SEASON_STORAGE_KEY, season);
      return;
    }

    // 复位 #web_bg 可能残留的内联样式（防止旧过渡打断后背景卡在透明/缩放/滤镜）
    bg.style.transition = 'none';
    bg.style.opacity = '1';
    bg.style.transform = 'scale(1)';
    bg.style.filter = 'none';

    // 按视口选桌面/移动背景变量，用于预加载与临时层
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const bgVar = isMobile ? '--endy-bg-' + season + '-mobile' : '--endy-bg-' + season;
    const bgUrl = cssUrlToSrc((getComputedStyle(root).getPropertyValue(bgVar) || '').trim());

    const myToken = ++seasonToken;

    // 清掉可能残留的临时层
    const stale = document.getElementById('web_bg_next');
    if (stale) stale.remove();

    // 先预加载新季背景图，就绪后再开始淡入，杜绝闪白
    preloadImage(bgUrl).then(function () {
      if (myToken !== seasonToken) return; // 已被更新的切换取代，放弃本次

      const DURATION = 1.8;
      const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';

      // 让旧背景也加入过渡：变暗、轻微放大，与新图做真正的 cross-dissolve
      // 这样两张图在视觉上会短暂叠化，而不是新图生硬地盖住旧图
      bg.style.transition = `opacity ${DURATION}s ${EASE}, transform ${DURATION}s ${EASE}, filter ${DURATION}s ${EASE}`;
      bg.style.opacity = '1';
      bg.style.transform = 'scale(1)';
      bg.style.filter = 'brightness(1) saturate(1)';

      const next = document.createElement('div');
      next.id = 'web_bg_next';
      next.style.cssText = [
        'position: fixed',
        'top: 0', 'left: 0', 'width: 100%', 'height: 100%',
        'z-index: -998',                 // 高于 #web_bg(-999)，盖在旧背景之上、内容之下
        'background-image: var(' + bgVar + ')',
        'background-size: cover',
        'background-position: center center',
        'background-repeat: no-repeat',
        'pointer-events: none',
        'opacity: 0',
        // 新图从轻微放大缓收束到 1，旧图同步轻微放大淡出：
        // 把四张图构图/画幅差异变成一次缓慢运镜，而不是"主体突然变大变小"。
        // 缩放始终 >=1，边缘不会露底。
        'transform: scale(1.04)',
        'transform-origin: center center',
        'will-change: opacity, transform',
        `transition: opacity ${DURATION}s ${EASE}, transform ${DURATION}s ${EASE}`
      ].join(';');
      document.body.insertBefore(next, document.body.firstChild);

      // 强制重排，确保 opacity / transform / filter 过渡真正触发
      void next.offsetWidth;

      // 同时触发：旧图淡出变暗，新图淡入收束
      bg.style.opacity = '0.72';
      bg.style.transform = 'scale(1.02)';
      bg.style.filter = 'brightness(0.86) saturate(0.82)';
      next.style.opacity = '1';
      next.style.transform = 'scale(1)';

      let finished = false;
      const done = function () {
        if (finished || myToken !== seasonToken) return;
        finished = true;
        next.removeEventListener('transitionend', done);
        // 正式背景换为新图（与临时层一致），再移除临时层，无缝衔接、无闪白
        root.setAttribute('data-season', season);
        localStorage.setItem(SEASON_STORAGE_KEY, season);
        // 临时层仍盖着 web_bg，此时把 web_bg 重置为正常状态（新图、不透明、无滤镜）。
        // 这样等两帧新图真正上屏后移除临时层，底下露出的就是正常的 web_bg。
        bg.style.transition = 'none';
        bg.style.opacity = '1';
        bg.style.transform = 'scale(1)';
        bg.style.filter = 'none';
        // 关键：等 #web_bg 的新背景真正上屏（两帧）再撤临时层，
        // 否则中间有一帧两层都不是新图 → 露出底色，就是用户看到的"闪白"
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            setTimeout(function () {
              if (myToken === seasonToken) {
                next.remove();
                bg.style.transition = '';
              }
            }, 120);
          });
        });
      };
      next.addEventListener('transitionend', done, { once: true });
      setTimeout(done, 2100); // 兜底：过渡事件偶发未触发时也能收尾（略长于 1.8s 过渡）
    });
  }

  function initSeasonToggle() {
    // 中控台按钮 (#season-toggle) + 右侧设置展开按钮 (#rightside-season-toggle)
    const btns = [
      document.getElementById('season-toggle'),
      document.getElementById('rightside-season-toggle')
    ].filter(Boolean);
    if (!btns.length) return;

    function getIconHost(btn) {
      // 中控台按钮把 SVG 放在内部 <a class="season-switch"> 里；右侧按钮自身就是容器
      return btn.querySelector('a.season-switch') || btn;
    }

    function updateAll(season) {
      const s = season || document.documentElement.getAttribute('data-season') || getSeasonByMonth();
      btns.forEach(function (btn) {
        getIconHost(btn).innerHTML = SEASON_ICONS[s] || SEASON_ICONS.winter;
        btn.title = '切换四季背景（当前：' + (SEASON_NAMES[s] || '冬') + '）';
      });
    }

    btns.forEach(function (btn) {
      // PJAX 导航会重复触发 boot()，避免重复绑定导致点击一次跳两季
      if (btn.dataset.seasonBound === '1') return;
      btn.dataset.seasonBound = '1';

      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const current = document.documentElement.getAttribute('data-season') || getSeasonByMonth();
        const idx = SEASONS.indexOf(current);
        const next = SEASONS[(idx + 1) % SEASONS.length];
        setSeason(next);
        updateAll(next);
      });
    });

    updateAll();
  }

  // 点击主页链接时复用站点加载动画（#loading-box），提升跳转主页的过渡感
  function initHomePreloader() {
    function showLoading() {
      const box = document.getElementById('loading-box');
      if (box) box.classList.remove('loaded');
    }

    document.addEventListener('click', function (e) {
      const a = e.target.closest('#site-name a, a[href="/"], a[href="' + location.origin + '/"]');
      if (!a) return;
      showLoading();
    });
  }

  // 强制轮播可见：anzhiyu 的 .blog-slider__img img / .blog-slider__content > *
  // 默认 opacity:0，只有所在 .blog-slider__item 带 .swiper-slide-active 才变 1。
  // 一旦 Swiper 没给任何 slide 打 active 类（CDN 慢/初始化竞态/首屏脚本未执行），
  // 整块会全透明=空白。此函数兜底：保证至少首张 active 且图/文字强制可见。
  function forceSliderVisible() {
    const slider = document.querySelector('.blog-slider');
    if (!slider) return;
    // 已初始化但没有任何 active slide → 手动给首张打 active，杜绝全透明
    if (slider.classList.contains('swiper-initialized') && !slider.querySelector('.swiper-slide-active')) {
      const first = slider.querySelector('.blog-slider__item') || slider.querySelector('.swiper-slide');
      if (first) first.classList.add('swiper-slide-active');
    }
    // 兜底：active(或首张)的图与文字强制 opacity:1，覆盖 fade 模块可能残留的透明
    const active = slider.querySelector('.swiper-slide-active') || slider.querySelector('.blog-slider__item');
    if (active) {
      const img = active.querySelector('.blog-slider__img img');
      if (img) img.style.opacity = '1';
      active.querySelectorAll('.blog-slider__content > *').forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.filter = 'none';
      });
    }
  }

  // 首页轮播守护：PJAX 切回首页后，若 Swiper 未初始化或图片仍是占位，强制修复
  function sliderGuard() {
    const slider = document.querySelector('.blog-slider');
    if (!slider) return;
    // a) Swiper 实例缺失/已销毁 → 重新初始化（initBlogSlider 由主题 top.pug 提供）
    if (typeof initBlogSlider === 'function' && (!window.blogSwiper || window.blogSwiper.destroyed)) {
      try { initBlogSlider(); } catch (e) { /* 忽略，避免中断 */ }
    }
    // b) 轮播内 data-lazy-src 图片仍为占位 → 直接写回真实地址
    slider.querySelectorAll('img[data-lazy-src]').forEach(function (img) {
      const real = img.getAttribute('data-lazy-src');
      if (real && (!img.src || img.src.indexOf('data:image') === 0)) img.src = real;
    });
    // c) 强制首张可见，绝不空白（Swiper 就绪前后都生效）
    forceSliderVisible();
    // Swiper 在自己的一帧后才打 active，稍后二次兜底
    setTimeout(forceSliderVisible, 350);
  }

  /* 左下角音乐胶囊：收缩成球 / 展开成胶囊
   * anzhiyu 的 aplayer 自带 .aplayer-narrow（66px 只留封面=球态），但把切换开关
   * .aplayer-miniswitcher 用 display:none 藏了，所以这里自己注入一个按钮来切。
   * aplayer 由 Meting2.min.js 异步渲染，需轮询等待 .aplayer 出现再注入。 */
  function initMusicToggle() {
    const nav = document.getElementById('nav-music');
    if (!nav) return;
    const ap = nav.querySelector('.aplayer');
    if (!ap) {
      // aplayer 尚未渲染：稍后重试（最多 ~10s）
      initMusicToggle.__t = (initMusicToggle.__t || 0) + 1;
      if (initMusicToggle.__t <= 50) setTimeout(initMusicToggle, 200);
      return;
    }
    if (nav.querySelector('#endy-music-toggle')) return; // 已注入，避免重复

    const btn = document.createElement('button');
    btn.id = 'endy-music-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', '收缩 / 展开音乐播放器');
    nav.appendChild(btn);

    const KEY = 'endy-music-collapsed';
    function setCollapsed(c) {
      if (c) {
        ap.classList.add('aplayer-narrow');
        nav.classList.add('endy-collapsed');
      } else {
        ap.classList.remove('aplayer-narrow');
        nav.classList.remove('endy-collapsed');
      }
      try { localStorage.setItem(KEY, c ? '1' : '0'); } catch (e) { /* 忽略 */ }
      btn.textContent = c ? '＋' : '－'; // 球态显示＋(展开)，胶囊态显示－(收缩)
      btn.title = c ? '展开音乐胶囊' : '收起为音乐球';
    }
    // 初始状态：读 localStorage（默认展开=胶囊）
    let initial = '0';
    try { initial = localStorage.getItem(KEY) || '0'; } catch (e) { /* 忽略 */ }
    setCollapsed(initial === '1');

    // 按钮点击：切换（阻止冒泡，避免触发胶囊内播放/暂停）
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      setCollapsed(!nav.classList.contains('endy-collapsed'));
    });
    // 收起(球)态：点击球本身也展开
    nav.addEventListener('click', function () {
      if (nav.classList.contains('endy-collapsed')) setCollapsed(false);
    });
  }

  function boot() {
    initScrollPercent();
    applySeason();
    initSeasonToggle();
    initHomePreloader();
    sliderGuard();
    initMusicToggle(); // 左下角音乐胶囊：收缩/展开按钮
    preloadAllSeasons(); // 提前缓存四季背景图，消除手动切换时的预加载延迟
  }

  // 立即设置季节（脚本注入较早，先落定 data-season 避免日间背景闪一下默认冬季图）
  applySeason();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // 刷新懒加载：PJAX 切页后主题会替换 DOM，轮播图等 data-lazy-src 图片可能没被懒加载库重新扫描到，导致白屏
  function refreshLazyLoad() {
    if (window.lazyLoadInstance && typeof window.lazyLoadInstance.update === 'function') {
      window.lazyLoadInstance.update();
    }
    // 兜底：直接强制把 banner / 页面内 data-lazy-src 写回 src，避免懒加载库失效时一直显示占位图
    requestAnimationFrame(function () {
      document.querySelectorAll('img[data-lazy-src]').forEach(function (img) {
        const realSrc = img.getAttribute('data-lazy-src');
        if (realSrc && img.src !== realSrc) {
          // 只有当前 src 是占位图或为空时才替换，避免覆盖已加载的真实图
          const isPlaceholder = img.src.indexOf('data:image/gif;base64') === 0 || !img.src || img.src === window.location.href;
          if (isPlaceholder) img.src = realSrc;
        }
      });
    });
  }

  // PJAX 离开首页时销毁旧 Swiper：否则 autoplay 定时器仍指向已移除的 DOM，切回易白屏
  document.addEventListener('pjax:send', function () {
    if (window.blogSwiper && !window.blogSwiper.destroyed) {
      try {
        window.blogSwiper.destroy(true, true);
      } catch (e) {
        /* 忽略 */
      }
      window.blogSwiper = null;
    }
  });

  // PJAX 导航完成后重新挂载（#go-up 所在容器内容会被主题替换）
  document.addEventListener('pjax:complete', function () {
    boot();
    // 延迟刷新懒加载，让主题自己的 update() 先跑完
    setTimeout(refreshLazyLoad, 100);
    setTimeout(sliderGuard, 400);
  });
  // 兜底：主题布局异步渲染时，稍后再次挂载
  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(boot, 400);
    setTimeout(refreshLazyLoad, 600);
  });
})();
