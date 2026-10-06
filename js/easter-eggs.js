/* 彖渊子 · 彩蛋合集（easter-eggs.js）
 * 五个隐藏彩蛋：
 *   彩蛋1  首次进入音乐馆(/life/music/) → 发现并强制显示音乐胶囊 + toast；之后胶囊变全局播放器（仅其他页面存在、顶部自动隐藏）；再回音乐馆不再显示
 *   彩蛋2  音乐胶囊播放键 5 连击 → 隐藏 QQ 音乐歌单（再 5 连击切回默认歌单；逻辑在 endy-global.js，这里只弹 toast）
 *   彩蛋3  搜索框输入暗号「彖渊子」→ 弹出彩蛋卡（谜语 + 隐藏入口 /life/secret/）
 *   彩蛋4  打开 DevTools 控制台 → ASCII 艺术字线索 + 提示连点站名 5 下（额外：站名连点 5 下也有惊喜）
 *   彩蛋5  滚到任意长文最底部 → 页脚上方淡入站长悄悄话（随机名言）
 * 注入顺序晚于 endy-global.js，二者通过自定义事件 endy:egg2 解耦。
 */
(function () {
  'use strict';

  /* ---------- 通用 toast ---------- */
  function showToast(msg, opts) {
    opts = opts || {};
    let host = document.getElementById('endy-toast-host');
    if (!host) {
      host = document.createElement('div');
      host.id = 'endy-toast-host';
      host.setAttribute('aria-live', 'polite');
      document.body.appendChild(host);
    }
    const t = document.createElement('div');
    t.className = 'endy-toast';
    t.textContent = msg;
    host.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('show'); });
    const dur = opts.duration || 3200;
    setTimeout(function () {
      t.classList.remove('show');
      setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 400);
    }, dur);
  }

  /* ---------- 彩蛋成就册：发现状态统一登记 ----------
     用一个 JSON key 记录各彩蛋发现状态，同时兼容旧独立 key。 */
  const EGGS_KEY = 'endy-eggs-discovered';
  const EGGS = [
    { id: 'music',     icon: '🎧', name: '音乐胶囊',     hint: '在音乐馆里，第一次看见左下角的胶囊。' },
    { id: 'secret',    icon: '🎵', name: '隐藏歌单',     hint: '连点播放键 5 次，听见另一份歌单。' },
    { id: 'search',    icon: '🔍', name: '彖渊子的暗号', hint: '在搜索框里，输入站长的名字。' },
    { id: 'console',   icon: '🖥️', name: '控制台密语',   hint: '打开 DevTools，或连点首页大站名 5 下。' },
    { id: 'whisper',   icon: '🐾', name: '底部悄悄话',   hint: '把一篇长文读到最底部。' },
    { id: 'season',    icon: '🍂', name: '四季开关',     hint: '在中控台，发现四季背景切换入口。' },
    { id: 'about',    icon: '🧑', name: '关于我',       hint: '在个人页，连点头像 3 次，进入新个人主页。' },
    { id: 'miku',     icon: '🎤', name: 'Miku 看板娘', hint: '在留言板，打开那封信。' }
  ];

  // 彩蛋成就页：触发方法（hint）是否全部显示。默认隐藏（未解锁卡片不剧透），
  // 在成就页搜索框输入密码“200466”可切换显示。
  let eggsRevealed = false;

  function getDiscovered() {
    let map = {};
    try {
      const raw = localStorage.getItem(EGGS_KEY);
      if (raw) map = JSON.parse(raw);
    } catch (e) {}
    // 兼容本轮之前的旧独立标记
    try {
      if (localStorage.getItem('endy-music-discovered') === '1') map.music = true;
      if (localStorage.getItem('endy-ania-cursor') === '1') map.sitetitle = true; // 站名彩蛋视为 console 一部分
      if (localStorage.getItem('endy-season-unlocked') === '1') map.season = true;
    } catch (e) {}
    return map;
  }

  function markEggFound(id) {
    const map = getDiscovered();
    if (map[id]) return false; // 已发现过
    map[id] = true;
    try { localStorage.setItem(EGGS_KEY, JSON.stringify(map)); } catch (e) {}
    return true;
  }

  function clearEggDiscovery() {
    try {
      localStorage.removeItem(EGGS_KEY);
      localStorage.removeItem('endy-music-discovered');
      localStorage.removeItem('endy-season-unlocked');
      localStorage.removeItem('endy-ania-cursor');
      // 看板娘彩蛋：清掉解锁标记 + oml2d 自身状态，确保她能重新隐藏
      localStorage.removeItem('endy-miku-unlocked');
      localStorage.removeItem('endy-miku-chat');
      localStorage.removeItem('OML2D_STATUS');
      localStorage.removeItem('OML2D_MODEL_INDEX');
      localStorage.removeItem('OML2D_MODEL_CLOTHES_INDEX');
    } catch (e) {}
    document.body.classList.remove('endy-ania-cursor');
  }
  window.clearEggDiscovery = clearEggDiscovery;

  /* ---------- 等待某元素出现（PJAX 后 DOM 可能是异步挂的） ---------- */
  function whenReady(selector, cb, tries) {
    tries = tries || 0;
    const el = document.querySelector(selector);
    if (el) { cb(el); return; }
    if (tries > 40) return; // 约 2s 仍无则放弃，避免无意义轮询
    setTimeout(function () { whenReady(selector, cb, tries + 1); }, 50);
  }

  /* ---------- 彩蛋1：音乐胶囊发现逻辑 ----------
     - 首次进入音乐馆：强制显示胶囊 + toast「🎧 你找到了音乐胶囊」+ localStorage 标记已发现
     - 之后切到其他页面：胶囊作为全局播放器存在，启用"滚动到顶自动隐藏"
     - 再次进入音乐馆：本页不再显示胶囊 */
  function initMusicPageEgg() {
    const isMusicPage = location.pathname.startsWith('/life/music/');
    const discovered = localStorage.getItem('endy-music-discovered') === '1';
    const setAuto = window.endySetMusicAutoHide || function () {};
    whenReady('#endy-music-wrapper', function (wrapper) {
      if (isMusicPage && !discovered) {
        // 首次进入音乐馆：发现胶囊
        wrapper.classList.add('endy-force-visible');
        wrapper.classList.remove('endy-player-visible');
        setAuto(false);
        localStorage.setItem('endy-music-discovered', '1');
        markEggFound('music');
        setTimeout(function () { showToast('🎧 你找到了音乐胶囊'); }, 900);
      } else if (isMusicPage && discovered) {
        // 再次进入音乐馆：本页不显示胶囊
        wrapper.classList.remove('endy-force-visible', 'endy-player-visible');
        setAuto(false);
      } else {
        // 其他页面：已发现则启用滚动自动隐藏，否则保持隐藏
        wrapper.classList.remove('endy-force-visible');
        setAuto(discovered);
        if (!discovered) wrapper.classList.remove('endy-player-visible');
      }
    });
  }

  /* ---------- 彩蛋2：隐藏歌单 toast（播放逻辑在 endy-global.js） ---------- */
  function initSecretPlaylistEgg() {
    document.addEventListener('endy:egg2', function (e) {
      const d = e.detail || {};
      if (d.mode === 'default') { showToast('🎧 已切回默认歌单', { duration: 2600 }); return; }
      if (d.found) {
        // 用户要求隐藏歌单提示不显示首数
        markEggFound('secret');
        showToast('🎧 你找到了隐藏歌单', { duration: 4200 });
      }
      else showToast('🤫 隐藏歌单接口暂时不可用', { duration: 3200 });
    });
  }

  /* ---------- 彩蛋3：搜索暗号 → 彩蛋卡 ----------
     关键：本博客实际用的是 Algolia 搜索（_config.anzhiyu.yml 里
     algolia_search.enable=true、local_search.enable=false），所以搜索框是
     #algolia-search-input 内的 input，而非本地搜索的 #local-search-input input。
     这里改用 document 级事件委托，无论 Algolia / 本地搜索 / 搜索弹窗懒加载，
     都能命中；且 PJAX 切页后无需重新绑定，避免“一次性”失灵。 */
  function initSearchEgg() {
    // 输入框暗号映射：彖渊子 → 彩蛋卡；彩蛋 → 彩蛋成就页
    const KEYWORDS = {
      '彖渊子': function () { showEggCard(); markEggFound('search'); },
      '彩蛋': function () {
        hideEggCard();
        showToast('🥚 暗号「彩蛋」已触发，正在打开彩蛋成就册…', { duration: 2000 });
        setTimeout(function () { window.location.href = '/life/eggs/'; }, 500);
      }
    };
    const INPUT_SELECTOR = [
      '#algolia-search-input input',
      '#local-search-input input',
      '.local-search-box--input',
      '.aa-Input',      // docsearch / algolia autocomplete 输入框
      '#searchbox input'
    ].join(',');

    function hideEggCard() {
      const card = document.getElementById('endy-secret-card');
      const backdrop = document.getElementById('endy-secret-backdrop');
      if (card) { card.classList.remove('show'); setTimeout(function () { if (card.parentNode) card.parentNode.removeChild(card); }, 300); }
      if (backdrop) { backdrop.classList.remove('show'); setTimeout(function () { if (backdrop.parentNode) backdrop.parentNode.removeChild(backdrop); }, 300); }
    }

    function showEggCard() {
      if (document.getElementById('endy-secret-card')) return;
      const backdrop = document.createElement('div');
      backdrop.id = 'endy-secret-backdrop';
      const card = document.createElement('div');
      card.id = 'endy-secret-card';
      card.setAttribute('role', 'dialog');
      card.setAttribute('aria-label', '暗号彩蛋');
      card.innerHTML =
        '<button class="endy-secret-close" type="button" aria-label="关闭">×</button>' +
        '<div class="endy-secret-title">🗝️ 暗号已接收</div>' +
        '<p class="endy-secret-riddle">「彖者，判万象之几；渊者，藏深意之静。」<br>' +
        '你念出了站长的名字，门后藏着另一番天地。</p>' +
        '<a class="endy-secret-link" href="/life/secret/">推开这扇门 →</a>';
      document.body.appendChild(backdrop);
      document.body.appendChild(card);
      requestAnimationFrame(function () { backdrop.classList.add('show'); card.classList.add('show'); });
      card.querySelector('.endy-secret-close').addEventListener('click', hideEggCard);
      backdrop.addEventListener('click', hideEggCard);
    }

    // 只绑定一次：document 常驻，委托到具体输入框，PJAX 切页 / 弹窗懒加载都不怕
    if (document._endySearchDelegated) return;
    document._endySearchDelegated = true;
    document.addEventListener('input', function (e) {
      const t = e.target;
      if (!t || typeof t.matches !== 'function') return;
      if (!t.matches(INPUT_SELECTOR)) return;
      const v = (t.value || '').trim().replace(/\s+/g, '');
      // 彩蛋成就页密码：输入 200466 切换显示全部触发方法（清空输入框，避免触发真实搜索）
      if (location.pathname.startsWith('/life/eggs/') && v === '200466') {
        eggsRevealed = !eggsRevealed;
        t.value = '';
        if (t.blur) { try { t.blur(); } catch (e2) {} }
        initEggsPage();
        showToast(eggsRevealed ? '🗝️ 已显示全部彩蛋触发方法' : '🔒 已隐藏彩蛋触发方法', { duration: 2600 });
        return;
      }
      if (KEYWORDS[v]) KEYWORDS[v]();
      else hideEggCard();
    });
  }

  /* ---------- 彩蛋4：控制台 ASCII 艺术字 + 站名 5 连点彩蛋 ---------- */
  function emitConsoleHint() {
    if (window.__endyConsoleHintEmitted) return;
    window.__endyConsoleHintEmitted = true;
    const titleStyle = 'color:#fff; background:linear-gradient(90deg,#7c5cff,#ff7eb6); font-size:24px; font-weight:bold; padding:6px 14px; border-radius:8px; line-height:1.6;';
    const hintStyle = 'color:#ff7eb6; font-size:12px;';
    const hint = '🎉 彖渊子彩蛋：你打开了控制台。在首页快速连点中间的大站名「彖渊子」5 下，会有惊喜。';
    // anzhiyu 主题在 queueMicrotask 里把 console.log 替换成空函数，所以这里主用 console.warn。
    // 如果浏览器（如 360/QQ/搜狗）过滤 warn，再兜底用主题保存的原始 log（HoldLog）。
    try { console.warn('%c彖 渊 子', titleStyle); } catch (e) {}
    try { console.warn('%c' + hint, hintStyle); } catch (e) {}
    if (typeof window.HoldLog === 'function') {
      try { window.HoldLog.call(console, '%c彖 渊 子', titleStyle); } catch (e) {}
      try { window.HoldLog.call(console, '%c' + hint, hintStyle); } catch (e) {}
    }
  }

  function initConsoleEgg() {
    // 主题会先把 console.log 设为空函数，再在 queueMicrotask 里恢复；延迟到下一个宏任务执行，避开压制。
    setTimeout(emitConsoleHint, 0);

    // 监听 F12 / Ctrl+Shift+J / Ctrl+Shift+I / Cmd+Option+J / Cmd+Option+I
    // 仅解锁彩蛋计数，不再重刷提示（否则打开控制台的瞬间会多出第二份）
    document.addEventListener('keydown', function (e) {
      const isF12 = e.key === 'F12';
      const isDevToolsShortcut = (e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'I');
      if (isF12 || isDevToolsShortcut) {
        markEggFound('console');
      }
    });
  }

  /* ---------- 彩蛋4 站点名 5 连击（PJAX 切页后由 bootEggs 重新绑定） ---------- */
  function initSiteNameEgg() {
    whenReady('#site-info #site-title', function (siteName) {
      if (siteName._endySiteNameBound) return; // 同一元素只绑一次，PJAX 重建后自动重绑
      siteName._endySiteNameBound = true;
      let clicks = [];
      siteName.addEventListener('click', function () {
        const now = Date.now();
        clicks.push(now);
        clicks = clicks.filter(function (t) { return now - t <= 1800; });
        if (clicks.length >= 5) {
          clicks = [];
          markEggFound('console');
          showToast('🐾 你连点了站名，彖渊子对你眨了眨眼', { duration: 3200 });
          toggleAniaCursor();
        }
      });
    });
  }

  /* ---------- 鼠标指针切换（站名 5 连击彩蛋） ---------- */
  function toggleAniaCursor() {
    const KEY = 'endy-ania-cursor';
    const on = document.body.classList.toggle('endy-ania-cursor');
    try { localStorage.setItem(KEY, on ? '1' : '0'); } catch (e) {}
    showToast(on ? '🖱️ 光标已切换为阿尼亚主题' : '🖱️ 光标已恢复默认', { duration: 2600 });
  }

  // 页面加载时恢复已保存的光标状态
  try { if (localStorage.getItem('endy-ania-cursor') === '1') document.body.classList.add('endy-ania-cursor'); } catch (e) {}

  /* ---------- 控制台彩蛋诊断入口 ----------
     用法：打开 DevTools 后，在控制台输入 __endyConsoleEggDiag() 或 __endyTriggerConsoleEgg()
     前者打印检测信息并强制触发一次，后者只强制触发。 */
  window.__endyConsoleEggDiag = function () {
    const logs = [];
    logs.push('easter-eggs.js loaded: true');
    logs.push('HoldLog present: ' + (typeof window.HoldLog === 'function'));
    logs.push('console.log is theme no-op: ' + (console.log && console.log.toString && /function\s*\(\)\s*\{\s*\}/.test(console.log.toString())));
    logs.push('__endyConsoleHintEmitted: ' + !!window.__endyConsoleHintEmitted);
    console.warn('%c彩蛋4诊断', 'color:#fff;background:#4b5cc4;padding:4px 10px;border-radius:6px;');
    console.warn(logs.join('\n'));
    console.warn('正在用 console.warn 强制触发一次：');
    window.__endyConsoleHintEmitted = false;
    emitConsoleHint();
    return '诊断完成';
  };
  window.__endyTriggerConsoleEgg = function () {
    window.__endyConsoleHintEmitted = false;
    emitConsoleHint();
  };

  /* ---------- 彩蛋6：中控台点击四季按钮 → 右侧栏出现四季切换 ---------- */
  function initSeasonEgg() {
    const KEY = 'endy-season-unlocked';
    whenReady('#season-toggle', function (centerBtn) {
      whenReady('#rightside-season-toggle', function (rightBtn) {
        // 默认隐藏右侧栏的四季切换按钮，直到在中控台发现它
        if (localStorage.getItem(KEY) !== '1') rightBtn.style.display = 'none';
        if (centerBtn.dataset.seasonEggBound) return;
        centerBtn.dataset.seasonEggBound = '1';
        centerBtn.addEventListener('click', function () {
          if (localStorage.getItem(KEY) === '1') return;
          try { localStorage.setItem(KEY, '1'); } catch (e) {}
          markEggFound('season');
          rightBtn.style.display = ''; // 恢复主题默认显示
          showToast('🍂 你发现了四季背景切换开关', { duration: 3600 });
        });
      });
    });
  }

  /* ---------- 彩蛋8：个人页三连点头像 → 全屏浮层切换到新个人页（home-app） ----------
     连点三下 #about-page .author-img 打开全屏 iframe 浮层加载 /about-home/（home-app 产物）；
     浮层内（home-app）再三连点其头像 → window.parent.postMessage({type:'endy:revertAbout'})
     通知本页关闭浮层，切回原个人页。浮层自带 × 与 ESC 关闭；pjax 切走时自动关闭。
     原「连点揭示私密信息」彩蛋已移除，私密信息改为常显（下方永久加 endy-private-revealed）。 */

  /* --- 浮层管理 + 跨窗口回切：模块级单例，避免 pjax 重跑重复绑定 --- */
  let __endyAboutOverlay = null;
  let __endyAboutKeyHandler = null;

  function __endyCloseAboutOverlay() {
    if (__endyAboutOverlay && __endyAboutOverlay.parentNode) {
      __endyAboutOverlay.parentNode.removeChild(__endyAboutOverlay);
    }
    __endyAboutOverlay = null;
    if (__endyAboutKeyHandler) {
      document.removeEventListener('keydown', __endyAboutKeyHandler);
      __endyAboutKeyHandler = null;
    }
    document.documentElement.classList.remove('endy-about-locked');
  }

  function __endyOpenAboutOverlay() {
    if (__endyAboutOverlay) return; // 已打开，避免重复创建
    const overlay = document.createElement('div');
    overlay.className = 'endy-about-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', '新个人主页');

    const frame = document.createElement('iframe');
    frame.className = 'endy-about-frame';
    frame.id = 'endy-about-home-frame';
    frame.src = '/about-home/?v=3';
    frame.setAttribute('title', '彖渊子的新个人主页');
    frame.setAttribute('allow', 'autoplay; fullscreen');

    const closeBtn = document.createElement('button');
    closeBtn.className = 'endy-about-close';
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', '返回原个人页');
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', __endyCloseAboutOverlay);

    // 点击遮罩空白区（iframe 外）关闭
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) __endyCloseAboutOverlay();
    });

    overlay.appendChild(frame);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    __endyAboutKeyHandler = function (e) {
      if (e.key === 'Escape') __endyCloseAboutOverlay();
    };
    document.addEventListener('keydown', __endyAboutKeyHandler);
    document.documentElement.classList.add('endy-about-locked');
    __endyAboutOverlay = overlay;
  }

  // 跨窗口回切 + pjax 关闭：整个脚本生命周期只绑一次
  if (!window.__endyAboutGlobalBound) {
    window.__endyAboutGlobalBound = true;
    window.addEventListener('message', function (e) {
      if (e.data && e.data.type === 'endy:revertAbout') __endyCloseAboutOverlay();
    });
    document.addEventListener('pjax:send', __endyCloseAboutOverlay);
  }

  // 跨浮层音频互斥：博客 ↔ home-app(iframe) 同时只能有一边出声。
  // 协议：谁先 play 谁广播 owner，对方收到后暂停自己的媒体；只在「播放」时广播，绝不级联，天然无环。
  if (!window.__endyAudioFocusBound) {
    window.__endyAudioFocusBound = true;
    function __endyPauseBlogMedia() {
      document.querySelectorAll('audio, video').forEach(function (a) {
        try { if (!a.paused) a.pause(); } catch (e) {}
      });
    }
    window.addEventListener('message', function (e) {
      if (e.data && e.data.type === 'endy:audioFocus' && e.data.owner === 'home-app') __endyPauseBlogMedia();
    });
    // 博客自身媒体开始播放（导航音乐 / 音乐馆 / 任意 <audio><video>）→ 通知浮层里的 home-app 暂停。
    // 注意：iframe 内部的 play 事件不会冒泡到博客 document，所以此监听只会捕获博客自己的媒体，不会误伤。
    document.addEventListener('play', function (e) {
      var t = e.target;
      if (!t || (t.tagName !== 'AUDIO' && t.tagName !== 'VIDEO')) return;
      var f = document.getElementById('endy-about-home-frame');
      if (f && f.contentWindow) f.contentWindow.postMessage({ type: 'endy:audioFocus', owner: 'blog' }, '*');
    }, true);
  }

  function initAboutPageEgg() {
    if (!location.pathname.startsWith('/about/')) return;
    const aboutPage = document.getElementById('about-page');
    if (!aboutPage) return;
    // 私密信息（地图 / 生于·学校·职业）改为常显，不再依赖点击揭示
    aboutPage.classList.add('endy-private-revealed');

    whenReady('#about-page .author-img', function (avatarWrap) {
      if (avatarWrap.dataset.aboutEggBound) return;
      avatarWrap.dataset.aboutEggBound = '1';
      let clicks = [];
      avatarWrap.addEventListener('click', function () {
        const now = Date.now();
        clicks.push(now);
        clicks = clicks.filter(function (t) { return now - t <= 1600; });
        if (clicks.length >= 3) {
          clicks = [];
          __endyOpenAboutOverlay();
          markEggFound('about');
          showToast('🧑 已进入新个人主页，三连点头像返回', { duration: 3200 });
        }
      });
    });
  }

  /* ---------- 彩蛋5：长文底部悄悄话（仅文章详情页） ---------- */
  function initWhisperEgg() {
    // 真正「文章详情页」判定：每次都现场查 DOM，避免 PJAX 切页后残留旧的首次判定结果
    function isPostPageNow() {
      return !!document.querySelector('#article-container.post-content') &&
        !!document.querySelector('#post .post-meta, #post-meta, .post-copyright, #post .post-footer');
    }
    function removeWhisper() {
      var el = document.getElementById('endy-whisper');
      if (el && el.parentNode) el.parentNode.removeChild(el);
    }
    var quotes = [
      '万物皆有裂痕，那是光照进来的地方。',
      '慢下来，才能看见被速度忽略的风景。',
      '你读到的每一行，都是某个人深夜的独白。',
      '真正的安静，不是没有声音，而是心里不再喧哗。',
      '把日子过成诗，不必惊天动地，只需真诚。',
      '山高路远，行则将至；事虽难，做则必成。',
      '愿你出走半生，归来仍是少年心气。',
      '世界很吵，但你可以选择听自己的心跳。',
      '所有的遇见，都是久别重逢。',
      '知识是船，好奇心是风，别停泊太久。',
      '把简单的事做好，就是不简单。',
      '夜再长，也挡不住一颗想发光的心。'
    ];
    function showWhisper(q) {
      markEggFound('whisper');
      var footer = document.getElementById('footer-wrap');
      if (!footer) return;
      var el = document.getElementById('endy-whisper');
      if (!el) {
        el = document.createElement('div');
        el.id = 'endy-whisper';
        el.className = 'endy-whisper';
        footer.parentNode.insertBefore(el, footer);
      }
      el.innerHTML = '🐾 恭喜你读到了这里，送你一句：<span class="endy-whisper-q">' + q + '</span>';
      requestAnimationFrame(function () { el.classList.add('show'); });
    }

    // 监听器只绑定一次（window 级），靠闭包内的实时判定处理所有页面，
    // 避免「之前在文章页绑的监听器，切到首页仍认为自己在文章页」而误触发。
    if (!window.__endyWhisperBound) {
      window.__endyWhisperBound = true;
      var shown = false;
      function check() {
        if (!isPostPageNow()) { removeWhisper(); return; } // 非文章页（含首页）一律清掉
        if (shown) return;
        var sh = document.documentElement.scrollHeight || document.body.scrollHeight || 0;
        var ch = document.documentElement.clientHeight || window.innerHeight || 0;
        var st = window.scrollY || document.body.scrollTop || 0;
        if (sh - ch <= 0) return; // 页面本身不够长，不触发
        if (st + ch >= sh - 80) {
          shown = true;
          showWhisper(quotes[Math.floor(Math.random() * quotes.length)]);
        }
      }
      window.addEventListener('scroll', check, { passive: true });
      window.addEventListener('resize', check);
      document.addEventListener('pjax:send', removeWhisper);
      window.__endyWhisperReset = function () { shown = false; };
      window.__endyWhisperCheck = check;
    }

    if (!isPostPageNow()) { removeWhisper(); return; }
    window.__endyWhisperReset();        // 进入（或切回）文章页：允许本次再触发一次
    if (Math.random() >= 0.5) return;   // 50% 概率
    window.__endyWhisperCheck();        // 立即检查一次（万一本就在底部）
  }

  /* ---------- 彩蛋7：彩蛋成就册页面（/life/eggs/） ---------- */
  function initEggsPage() {
    if (!location.pathname.startsWith('/life/eggs/')) return;
    const container = document.getElementById('endy-eggs-achievement');
    if (!container) return;
    const map = getDiscovered();
    const foundCount = EGGS.filter(function (e) { return map[e.id]; }).length;
    let html =
      '<div class="endy-eggs-header">' +
        '<div class="endy-eggs-title">🥚 彩蛋成就册</div>' +
        '<div class="endy-eggs-count">已发现 <b>' + foundCount + '</b> / ' + EGGS.length + ' 个彩蛋</div>' +
      '</div>' +
      '<div class="endy-eggs-grid">';
    EGGS.forEach(function (egg) {
      const found = !!map[egg.id];
      // 未解锁且不处于“已揭示”状态时不剧透触发方法；用占位文案保持卡片高度对齐
      const showHint = eggsRevealed || found;
      // 未解锁且不揭示时：留空（不剧透），保留空容器维持卡片高度对齐
      const hintHtml = showHint
        ? '<div class="endy-egg-hint">' + egg.hint + '</div>'
        : '<div class="endy-egg-hint"></div>';
      html +=
        '<div class="endy-egg-card ' + (found ? 'found' : 'locked') + '">' +
          '<div class="endy-egg-icon">' + egg.icon + '</div>' +
          '<div class="endy-egg-name">' + egg.name + '</div>' +
          hintHtml +
          '<div class="endy-egg-badge">' + (found ? '已发现' : '未解锁') + '</div>' +
        '</div>';
    });
    html +=
      '</div>' +
      '<div class="endy-eggs-actions">' +
        '<button id="endy-eggs-reset" class="endy-eggs-btn" type="button">' +
          '<svg class="endy-eggs-reset-icon" viewBox="0 0 1024 1024" width="16" height="16" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M502.714987 58.258904l-126.531056-54.617723a52.797131 52.797131 0 0 0-41.873587 96.855428A447.865322 447.865322 0 0 0 392.02307 946.707184a61.535967 61.535967 0 0 0 13.83649 1.820591 52.797131 52.797131 0 0 0 13.65443-103.773672 342.453118 342.453118 0 0 1-31.678278-651.771485l-8.374718 19.480321a52.615072 52.615072 0 0 0 27.855039 69.182448 51.522718 51.522718 0 0 0 20.572675 4.369418A52.797131 52.797131 0 0 0 476.498481 254.882703L530.205907 127.441352a52.979191 52.979191 0 0 0-27.49092-69.182448zM962.960326 509.765407A448.775617 448.775617 0 0 0 643.992829 68.090094a52.797131 52.797131 0 1 0-30.403866 101.042786A342.635177 342.635177 0 0 1 674.578753 801.059925a52.615072 52.615072 0 0 0-92.30395-50.612422l-71.913335 117.246043a52.433013 52.433013 0 0 0 17.295612 72.82363l117.063985 72.823629a52.797131 52.797131 0 1 0 54.617722-89.755123l-16.021198-10.013249A448.593558 448.593558 0 0 0 962.960326 509.765407z"></path>' +
          '</svg>' +
          '<span>重置所有彩蛋状态</span>' +
        '</button>' +
      '</div>';
    container.innerHTML = html;
    const resetBtn = document.getElementById('endy-eggs-reset');
    if (resetBtn) resetBtn.addEventListener('click', function () {
      if (!confirm('确定要重置所有彩蛋发现状态吗？你将可以重新寻找它们。')) return;
      clearEggDiscovery();
      showToast('🗑️ 彩蛋状态已重置', { duration: 2600 });
      initEggsPage();
    });
  }

  /* ---------- 彩蛋9：Miku 看板娘（留言板开信触发） ---------- */
  // 纯彩蛋化：未解锁时全站不加载 oml2d 资源；解锁逻辑交给 miku-loader.js。
  //   - 已解锁：miku-loader 在 DOMContentLoaded 时自动全站加载并常驻，这里不重复处理。
  //   - 未解锁 + 留言板：信封开信停留 5 秒 → 调 __mikuTriggerEgg()（加载库+配置+交互并解锁）。
  function initMikuEgg() {
    const isCommentsPage = location.pathname.startsWith('/comments/');
    const unlocked = localStorage.getItem('endy-miku-unlocked') === '1';

    // 已解锁：交给 miku-loader 全站自动加载（含留言板恢复），这里不重复处理
    if (unlocked) return;

    // 未解锁且不在留言板：不处理
    if (!isCommentsPage) return;

    // 留言板：信封打开（hover 或点击）后，停留观看满 5 秒才触发彩蛋
    whenReady('#form-wrap', function (wrap) {
      if (wrap.dataset.mikuEggBound) return;
      wrap.dataset.mikuEggBound = '1';

      let dwellTimer = 0;
      let handled = false;

      function tryUnlock() {
        if (handled) return;
        handled = true;
        dwellTimer = setTimeout(function () {
          if (typeof window.__mikuTriggerEgg === 'function') {
            window.__mikuTriggerEgg();
            markEggFound('miku');
            showToast('🎤 你找到了 Miku 看板娘', { duration: 4200 });
          }
        }, 5000);
      }

      // 换页立刻作废，避免人已经走了彩蛋才蹦出来
      document.addEventListener('pjax:send', function () {
        clearTimeout(dwellTimer);
      });

      wrap.addEventListener('mouseenter', tryUnlock, { once: true });
      wrap.addEventListener('click', tryUnlock, { once: true });
    });
  }

  /* ---------- 挂载 ---------- */
  function bootEggs() {
    initMusicPageEgg();
    initSearchEgg();
    initWhisperEgg();
    initSeasonEgg(); // 彩蛋6：中控台四季按钮 → 解锁右侧栏四季按钮
    initSiteNameEgg();   // 彩蛋4 站点名 5 连击（PJAX 切页后重绑，避免一次性失灵）
    initAboutPageEgg();  // 彩蛋8：个人页头像 5 连击揭示私密信息
    initMikuEgg();       // 彩蛋9：留言板开信触发 Miku 看板娘
    initEggsPage();      // 彩蛋7：彩蛋成就册页面渲染
  }

  function fullBoot() {
    initConsoleEgg();   // 控制台彩蛋最先执行，确保即使后续初始化异常也不影响显示
    bootEggs();
    initSecretPlaylistEgg();
  }

  fullBoot();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootEggs);
  }
  // PJAX 切页后重新初始化依赖页面内容的彩蛋（音乐馆 / 长文）
  document.addEventListener('pjax:complete', function () { setTimeout(bootEggs, 120); });
})();
