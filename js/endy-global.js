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

  /* 左下角自研音乐胶囊（替换 anzhiyu aplayer）
   * 基于 /json/music.json 歌单，HTML5 Audio 原生播放。
   * 支持：播放/暂停、上一首/下一首、进度条、电台模式（随机连播）、
   *       胶囊↔圆球切换、Alt+M 快捷键。
   * 布局：#endy-music-wrapper 固定左下角，内部 column-reverse：
   *       音乐胶囊/球在下，独立电台球在上。
   * 原 #nav-music aplayer 由 CSS 隐藏，保留 DOM 以免 main.js 引用报错。 */
  function initEndyMusic() {
    const PLAYLIST_URL = '/json/music.json';
    const KEY_COLLAPSE = 'endy-music-collapsed';
    const KEY_RADIO = 'endy-music-radio';
    const KEY_VOLUME = 'endy-music-volume';

    // 防止 PJAX/旧缓存脚本重复初始化：已存在则退出，并清理旧版残留按钮
    if (document.getElementById('endy-music-wrapper')) return;
    const oldRadio = document.getElementById('endy-music-radio');
    if (oldRadio) oldRadio.remove();
    const oldToggle = document.getElementById('endy-music-toggle');
    if (oldToggle) oldToggle.remove();

    // 临时关闭电台模式功能：把这里改成 true 即可恢复（隐藏电台球 + 不加载/不启用随机电台）
    const RADIO_ENABLED = false;

    const wrapper = document.createElement('div');
    wrapper.id = 'endy-music-wrapper';
    wrapper.setAttribute('role', 'region');
    wrapper.setAttribute('aria-label', '悬浮音乐播放器');

    const radioBall = document.createElement('div');
    radioBall.id = 'endy-radio-ball';
    radioBall.setAttribute('role', 'button');
    radioBall.tabIndex = 0;
    radioBall.setAttribute('aria-label', '电台模式');
    radioBall.title = '电台模式：关（顺序播放）';
    radioBall.innerHTML = '<span class="em-radio-shine"></span>' +
      '<img class="em-radio-icon" src="/img/radio/radio-day.svg" alt="" />' +
      '<span class="em-radio-text">电台模式</span>' +
      '<span class="em-radio-controls">' +
      '<button class="em-radio-btn em-radio-prev" type="button" aria-label="电台上一首">⏮</button>' +
      '<button class="em-radio-btn em-radio-play" type="button" aria-label="电台播放/暂停">▶</button>' +
      '<button class="em-radio-btn em-radio-next" type="button" aria-label="电台下一首">⏭</button>' +
      '</span>';

    const nav = document.createElement('div');
    nav.id = 'endy-music';
    nav.innerHTML = '<div class="em-cover-wrap">' +
      '<img class="em-cover" src="" alt="封面" />' +
      '</div>' +
      '<div class="em-inline-controls">' +
      '<button class="em-btn em-prev" type="button" aria-label="上一首">⏮</button>' +
      '<button class="em-btn em-play" type="button" aria-label="播放/暂停">▶</button>' +
      '<button class="em-btn em-next" type="button" aria-label="下一首">⏭</button>' +
      '</div>' +
      '<div class="em-info"><div class="em-title">加载中…</div><div class="em-sub"><span class="em-artist">—</span><span class="em-lrc"></span></div></div>' +
      '<div class="em-progress"><div class="em-bar"></div></div>';

    wrapper.appendChild(nav);
    wrapper.appendChild(radioBall);
    document.body.appendChild(wrapper);

    /* 滚动自动显隐：页面在顶部时隐藏胶囊球，向下滚动超过阈值后滑出显示 */
    (function initAutoHide(el) {
      const THRESHOLD = 80;
      let rafId = null;
      function update() {
        rafId = null;
        el.classList.toggle('endy-player-visible', window.scrollY > THRESHOLD);
      }
      window.addEventListener('scroll', function () {
        if (rafId) return;
        rafId = requestAnimationFrame(update);
      }, { passive: true });
      update();
    })(wrapper);

    const coverWrap = nav.querySelector('.em-cover-wrap');
    const coverEl = nav.querySelector('.em-cover');
    const titleEl = nav.querySelector('.em-title');
    const artistEl = nav.querySelector('.em-artist');
    const lrcEl = nav.querySelector('.em-lrc');
    const playBtn = nav.querySelector('.em-play');
    const prevBtn = nav.querySelector('.em-prev');
    const nextBtn = nav.querySelector('.em-next');
    const barEl = nav.querySelector('.em-bar');

    let songs = [];
    let index = 0;
    let playing = false;
    let radioMode = false;
    let collapsed = false;
    let audio = null;
    let lrcData = [];

    function loadState() {
      try {
        // 默认展开（对齐 zhheo）；只有显式收起过（'1'）才保持球态
        collapsed = localStorage.getItem(KEY_COLLAPSE) === '1';
        // 电台模式临时关闭：RADIO_ENABLED=false 时不恢复旧状态
        radioMode = RADIO_ENABLED && localStorage.getItem(KEY_RADIO) === '1';
      } catch (e) { /* 忽略 */ }
    }

    function applyCollapsed(c) {
      collapsed = !!c;
      nav.classList.toggle('collapsed', collapsed);
      try { localStorage.setItem(KEY_COLLAPSE, collapsed ? '1' : '0'); } catch (e) {}
    }

    const radioIcon = radioBall.querySelector('.em-radio-icon');
    const DAY_ICON = '/img/radio/radio-day.svg';
    const NIGHT_ICON = '/img/radio/radio-night.svg';

    function isDarkTheme() {
      return document.documentElement.getAttribute('data-theme') === 'dark' ||
        document.body.getAttribute('data-theme') === 'dark';
    }
    function updateRadioIcon() {
      if (!radioIcon) return;
      const hovered = radioBall.matches(':hover');
      const useWhite = hovered || radioMode;
      radioIcon.src = useWhite ? NIGHT_ICON : (isDarkTheme() ? NIGHT_ICON : DAY_ICON);
    }

    function applyRadio(on) {
      radioMode = !!on;
      radioBall.classList.toggle('endy-radio-on', radioMode);
      radioBall.title = radioMode ? '电台模式：开（随机连播）' : '电台模式：关（顺序播放）';
      updateRadioIcon();
      try { localStorage.setItem(KEY_RADIO, radioMode ? '1' : '0'); } catch (e) {}
    }

    /* 鼠标跟随：无几何起伏，用 spotlight + 上下流光模拟"按压提亮" */
    function enableRadioSpotlight(el) {
      function setPos(e) {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty('--x', Math.max(0, Math.min(100, x)).toFixed(1) + '%');
        el.style.setProperty('--y', Math.max(0, Math.min(100, y)).toFixed(1) + '%');
      }
      el.addEventListener('mousemove', setPos);
      el.addEventListener('mouseenter', function (e) { setPos(e); updateRadioIcon(); });
      el.addEventListener('mouseleave', function () {
        el.style.setProperty('--x', '50%');
        el.style.setProperty('--y', '50%');
        updateRadioIcon();
      });
    }
    enableRadioSpotlight(radioBall);

    /* 监听主题切换，动态换 SVG */
    const themeObserver = new MutationObserver(updateRadioIcon);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    if (document.body) themeObserver.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });

    function renderSong() {
      const s = songs[index];
      if (!s) return;
      titleEl.textContent = s.name || '未知歌曲';
      artistEl.textContent = s.artist || '未知歌手';
      coverEl.src = s.cover || '';
      coverEl.alt = (s.name || '封面') + ' 封面';
      loadLRC(s.lrc);
    }

    /* LRC 歌词：解析 [mm:ss.xx] 时间轴，播放时随播显示当前行 */
    function parseLRC(text) {
      const out = [];
      const lines = (text || '').split('\n');
      for (let i = 0; i < lines.length; i++) {
        const content = lines[i].replace(/\[\d{2}:\d{2}(?:\.\d{1,3})?\]/g, '').trim();
        const marks = lines[i].match(/\[(\d{2}):(\d{2})(?:\.(\d{1,3}))?\]/g);
        if (!marks) continue;
        for (let j = 0; j < marks.length; j++) {
          const m = marks[j].match(/\[(\d{2}):(\d{2})(?:\.(\d{1,3}))?\]/);
          const t = parseInt(m[1], 10) * 60 + parseInt(m[2], 10) + (m[3] ? parseInt(m[3], 10) / 1000 : 0);
          out.push({ time: t, content: content });
        }
      }
      out.sort(function (a, b) { return a.time - b.time; });
      return out;
    }

    function loadLRC(url) {
      lrcData = [];
      if (lrcEl) lrcEl.textContent = '';
      if (!url) return;
      fetch(url).then(function (r) { return r.text(); }).then(function (txt) {
        lrcData = parseLRC(txt);
      }).catch(function () {});
    }

    function updateLRC(cur) {
      if (!lrcData.length || !lrcEl) return;
      let idx = 0;
      for (let i = 0; i < lrcData.length; i++) {
        if (lrcData[i].time <= cur) idx = i; else break;
      }
      const line = lrcData[idx].content;
      if (lrcEl.textContent !== line) lrcEl.textContent = line;
    }

    function loadAudio(i) {
      if (!songs.length) return;
      index = ((i % songs.length) + songs.length) % songs.length;
      renderSong();
      if (!audio) {
        audio = new Audio();
        audio.preload = 'metadata';
        audio.addEventListener('play', function () {
          playing = true;
          nav.classList.add('playing');
          playBtn.textContent = '⏸';
          playBtn.setAttribute('aria-label', '暂停');
        });
        audio.addEventListener('pause', function () {
          playing = false;
          nav.classList.remove('playing');
          playBtn.textContent = '▶';
          playBtn.setAttribute('aria-label', '播放');
        });
        audio.addEventListener('ended', function () {
          if (radioMode) playRandom();
          else { loadAudio(index + 1); audio.play().catch(function () {}); }
        });
        audio.addEventListener('timeupdate', function () {
          if (!audio.duration) return;
          barEl.style.width = (audio.currentTime / audio.duration * 100) + '%';
          updateLRC(audio.currentTime);
        });
        audio.addEventListener('error', function () {
          if (songs.length > 1) { loadAudio(index + 1); audio.play().catch(function () {}); }
        });
        audio.addEventListener('loadedmetadata', function () {
          try {
            const vol = localStorage.getItem(KEY_VOLUME);
            if (vol !== null) audio.volume = parseFloat(vol);
          } catch (e) {}
        });
        audio.addEventListener('volumechange', function () {
          try { localStorage.setItem(KEY_VOLUME, String(audio.volume)); } catch (e) {}
        });
      }
      audio.src = songs[index].url;
      audio.load();
    }

    function togglePlay() {
      if (!audio) return;
      if (audio.paused) audio.play().catch(function () {});
      else audio.pause();
    }

    function playRandom() {
      if (songs.length <= 1) { loadAudio(0); if (audio) audio.play().catch(function () {}); return; }
      let next = index;
      let guard = 0;
      do { next = Math.floor(Math.random() * songs.length); guard++; }
      while (next === index && guard < 20);
      loadAudio(next);
      audio.play().catch(function () {});
    }

    function toggleCollapse() { applyCollapsed(!collapsed); }

    playBtn.addEventListener('click', function (e) { e.stopPropagation(); togglePlay(); });
    prevBtn.addEventListener('click', function (e) { e.stopPropagation(); loadAudio(index - 1); if (audio) audio.play().catch(function () {}); });
    nextBtn.addEventListener('click', function (e) { e.stopPropagation(); loadAudio(index + 1); if (audio) audio.play().catch(function () {}); });
    /* 电台球：点击切换电台模式；开启时若未播放则立刻随机开播（点击有效果） */
    radioBall.addEventListener('click', function (e) {
      e.stopPropagation();
      if (!RADIO_ENABLED) return; /* 电台模式临时关闭 */
      const willOn = !radioMode;
      applyRadio(willOn);
      if (willOn && audio && audio.paused && songs.length) playRandom();
    });
    /* 内联控制：对齐音乐胶囊交互（stopPropagation 避免误触发电台切换）
       电台模式下 prev/next 都随机切歌，不做顺序播放 */
    const radioPrevBtn = radioBall.querySelector('.em-radio-prev');
    const radioPlayBtn = radioBall.querySelector('.em-radio-play');
    const radioNextBtn = radioBall.querySelector('.em-radio-next');
    function radioSkip(delta) {
      if (radioMode) playRandom();
      else { loadAudio(index + delta); if (audio) audio.play().catch(function () {}); }
    }
    if (radioPrevBtn) radioPrevBtn.addEventListener('click', function (e) { e.stopPropagation(); radioSkip(-1); });
    if (radioPlayBtn) radioPlayBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (!audio) loadAudio(0);
      togglePlay();
    });
    if (radioNextBtn) radioNextBtn.addEventListener('click', function (e) { e.stopPropagation(); radioSkip(1); });
    /* 键盘可达性：Enter / Space 切换电台模式 */
    radioBall.addEventListener('keydown', function (e) {
      if (!RADIO_ENABLED) return; /* 电台模式临时关闭 */
      if (e.key === 'Enter' || e.key === ' ' || e.keyCode === 32) {
        e.preventDefault();
        const willOn = !radioMode;
        applyRadio(willOn);
        if (willOn && audio && audio.paused && songs.length) playRandom();
      }
    });
    /* 唱片区域：单击收起/展开，双击跳转音乐馆；按钮子元素 stopPropagation */
    coverWrap.title = '单击收起/展开，双击跳转音乐馆';
    coverWrap.style.cursor = 'pointer';
    let coverClickTimer = null;
    coverWrap.addEventListener('click', function (e) {
      e.stopPropagation();
      if (coverClickTimer) {
        clearTimeout(coverClickTimer);
        coverClickTimer = null;
        return; /* 双击的第二次 click 不处理 */
      }
      coverClickTimer = setTimeout(function () {
        coverClickTimer = null;
        toggleCollapse();
      }, 220);
    });
    coverWrap.addEventListener('dblclick', function (e) {
      e.stopPropagation();
      window.location.href = '/life/music/';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('.em-btn')) return;
      if (collapsed) toggleCollapse();
    });

    document.addEventListener('keydown', function (e) {
      if (e.altKey && (e.key === 'm' || e.keyCode === 77)) {
        e.preventDefault();
        togglePlay();
      }
    });

    fetch(PLAYLIST_URL)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        songs = Array.isArray(data) ? data : [];
        if (!songs.length) { titleEl.textContent = '暂无歌曲'; return; }
        loadState();
        applyCollapsed(collapsed);
        applyRadio(radioMode);
        loadAudio(0);
      })
      .catch(function (err) {
        console.error('[endy-music] 加载歌单失败', err);
        titleEl.textContent = '歌单加载失败';
      });
  }

  function boot() {
    initScrollPercent();
    applySeason();
    initSeasonToggle();
    initHomePreloader();
    sliderGuard();
    initEndyMusic(); // 左下角自研音乐胶囊（HTML5 Audio + music.json + 电台模式）
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
