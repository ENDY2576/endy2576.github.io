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
    { id: 'about',    icon: '🧑', name: '关于我',       hint: '在个人页，连击头像 5 次。' }
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
    } catch (e) {}
    document.body.classList.remove('endy-ania-cursor');
  }

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
    const titleStyle = 'color:#ff7eb6; font-size:40px; font-weight:bold; text-shadow: 3px 3px 0 #7c5cff; padding: 4px 0;';
    const hint = '🎉 彖渊子彩蛋：你打开了控制台。在首页快速连点中间的大站名「彖渊子」5 下，会有惊喜。';
    // 多通道输出：某些脚本/扩展只 hook 了 console.log，info/warn 可能仍原生
    try { console.log('%c彖 渊 子', titleStyle); } catch (e) {}
    try { console.info('%c彖 渊 子', titleStyle); } catch (e) {}
    try { console.warn('%c彖 渊 子', titleStyle); } catch (e) {}
    console.log(hint);
    console.info(hint);
    console.warn(hint);
  }

  function initConsoleEgg() {
    emitConsoleHint();

    // 监听 F12 / Ctrl+Shift+J / Ctrl+Shift+I / Cmd+Option+J / Cmd+Option+I
    // 打开控制台时再刷一次，避免页面加载时的日志被某些扩展清掉
    document.addEventListener('keydown', function (e) {
      const isF12 = e.key === 'F12';
      const isDevToolsShortcut = (e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'I');
      if (isF12 || isDevToolsShortcut) {
        setTimeout(emitConsoleHint, 300);
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

  /* ---------- 彩蛋8：个人页头像 5 连击揭示私密信息 ----------
     默认隐藏 .map（我现在住在…）和 .selfInfo（生于/学校/职业），
     连击头像 5 次给 #about-page 加 endy-private-revealed，CSS 平滑展开。 */
  function initAboutPageEgg() {
    if (!location.pathname.startsWith('/about/')) return;
    whenReady('#about-page .author-img', function (avatarWrap) {
      if (avatarWrap.dataset.aboutEggBound) return;
      avatarWrap.dataset.aboutEggBound = '1';
      let clicks = [];
      avatarWrap.addEventListener('click', function () {
        const now = Date.now();
        clicks.push(now);
        clicks = clicks.filter(function (t) { return now - t <= 1800; });
        if (clicks.length >= 5) {
          clicks = [];
          const aboutPage = document.getElementById('about-page');
          if (!aboutPage) return;
          const willReveal = !aboutPage.classList.contains('endy-private-revealed');
          aboutPage.classList.toggle('endy-private-revealed', willReveal);
          if (willReveal) markEggFound('about');
          showToast(willReveal ? '🧑 你发现了关于我的私人信息' : '🔒 私人信息已隐藏', { duration: 3200 });
        }
      });
    });
  }

  /* ---------- 彩蛋5：长文底部悄悄话 ---------- */
  function initWhisperEgg() {
    if (!document.querySelector('#article-container.post-content')) return;
    const quotes = [
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
    let shown = false;
    function check() {
      if (shown) return;
      const sh = document.documentElement.scrollHeight || document.body.scrollHeight || 0;
      const ch = document.documentElement.clientHeight || window.innerHeight || 0;
      const st = window.scrollY || document.body.scrollTop || 0;
      if (sh - ch <= 0) return; // 页面本身不够长，不触发
      if (st + ch >= sh - 80) {
        shown = true;
        showWhisper(quotes[Math.floor(Math.random() * quotes.length)]);
      }
    }
    function showWhisper(q) {
      markEggFound('whisper');
      const footer = document.getElementById('footer-wrap');
      if (!footer) return;
      let el = document.getElementById('endy-whisper');
      if (!el) {
        el = document.createElement('div');
        el.id = 'endy-whisper';
        el.className = 'endy-whisper';
        footer.parentNode.insertBefore(el, footer);
      }
      el.innerHTML = '🐾 恭喜你读到了这里，送你一句：<span class="endy-whisper-q">' + q + '</span>';
      requestAnimationFrame(function () { el.classList.add('show'); });
    }
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    check();
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

  /* ---------- 挂载 ---------- */
  function bootEggs() {
    initMusicPageEgg();
    initSearchEgg();
    initWhisperEgg();
    initSeasonEgg(); // 彩蛋6：中控台四季按钮 → 解锁右侧栏四季按钮
    initSiteNameEgg();   // 彩蛋4 站点名 5 连击（PJAX 切页后重绑，避免一次性失灵）
    initAboutPageEgg();  // 彩蛋8：个人页头像 5 连击揭示私密信息
    initEggsPage();      // 彩蛋7：彩蛋成就册页面渲染
  }

  function fullBoot() {
    bootEggs();
    initConsoleEgg();   // 控制台只需执行一次（绑定站名也用 whenReady 兜底）
    initSecretPlaylistEgg();
  }

  fullBoot();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootEggs);
  }
  // PJAX 切页后重新初始化依赖页面内容的彩蛋（音乐馆 / 长文）
  document.addEventListener('pjax:complete', function () { setTimeout(bootEggs, 120); });
})();
