/* 彖渊子 · 彩蛋合集（easter-eggs.js）
 * 五个隐藏彩蛋：
 *   彩蛋1  进入音乐馆(/life/music/) → 强制显示音乐胶囊 + toast「🎧 你找到了音乐胶囊」
 *   彩蛋2  音乐胶囊封面快速连点 5 次 → 隐藏歌单（逻辑在 endy-global.js，这里只弹 toast）
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

  /* ---------- 等待某元素出现（PJAX 后 DOM 可能是异步挂的） ---------- */
  function whenReady(selector, cb, tries) {
    tries = tries || 0;
    const el = document.querySelector(selector);
    if (el) { cb(el); return; }
    if (tries > 40) return; // 约 2s 仍无则放弃，避免无意义轮询
    setTimeout(function () { whenReady(selector, cb, tries + 1); }, 50);
  }

  /* ---------- 彩蛋1：音乐馆强制显示音乐胶囊 ---------- */
  function initMusicPageEgg() {
    if (!location.pathname.startsWith('/life/music/')) return;
    whenReady('#endy-music-wrapper', function (wrapper) {
      // 强制显示并覆盖"顶部自动隐藏"逻辑
      wrapper.classList.add('endy-player-visible', 'endy-force-visible');
    });
    if (!sessionStorage.getItem('endy-egg1')) {
      sessionStorage.setItem('endy-egg1', '1');
      setTimeout(function () { showToast('🎧 你找到了音乐胶囊'); }, 900);
    }
  }

  /* ---------- 彩蛋2：隐藏歌单 toast（播放逻辑在 endy-global.js） ---------- */
  function initSecretPlaylistEgg() {
    document.addEventListener('endy:egg2', function (e) {
      const found = e.detail && e.detail.found;
      if (found) showToast('🎧 你找到了隐藏歌单', { duration: 4200 });
      else showToast('🤫 隐藏歌单还空着呢', { duration: 2600 });
    });
  }

  /* ---------- 彩蛋3：搜索暗号 → 彩蛋卡 ---------- */
  function initSearchEgg() {
    const KEYWORD = '彖渊子';

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

    function bind(input) {
      if (!input || input._endySearchBound) return;
      input._endySearchBound = true;
      input.addEventListener('input', function () {
        const v = (input.value || '').trim();
        if (v === KEYWORD) showEggCard();
        else hideEggCard();
      });
    }

    bind(document.querySelector('#local-search-input input'));
  }

  /* ---------- 彩蛋4：控制台 ASCII 艺术字 + 站名 5 连点彩蛋 ---------- */
  function initConsoleEgg() {
    const art =
      '╔══════════════════════════════════╗\n' +
      '║   ╭━━━╮  ╭━━━╮  ╭━━━╮  ╭━━━╮   ║\n' +
      '║   ╰╮╭╯   ╰╮╭╯   ╰╮╭╯   ╰╮╭╯   ║\n' +
      '║    ╰╯     ╰╯     ╰╯     ╰╯     ║\n' +
      '║       彖        渊        子        ║\n' +
      '╚══════════════════════════════════╝';
    try {
      console.log('%c' + art, 'color:#7c5cff;font-size:12px;line-height:1.3;font-family:monospace;');
      console.log('%c彖渊子', 'color:#ff7eb6;font-size:34px;font-weight:bold;');
      console.log('%c你打开了控制台 👀 试着连点页面左上角的站名「彖渊子」5 下，会有惊喜。', 'color:#8a8a99;font-size:13px;');
    } catch (e) { /* 某些环境 console.log 不支持 %c，忽略 */ }

    // 额外彩蛋：左上角站名连点 5 下
    whenReady('#site-name a, #site-name', function (siteName) {
      let clicks = [];
      siteName.addEventListener('click', function () {
        const now = Date.now();
        clicks.push(now);
        clicks = clicks.filter(function (t) { return now - t <= 1800; });
        if (clicks.length >= 5) {
          clicks = [];
          showToast('🐾 你连点了站名，彖渊子对你眨了眨眼', { duration: 3200 });
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

  /* ---------- 挂载 ---------- */
  function bootEggs() {
    initMusicPageEgg();
    initSearchEgg();
    initWhisperEgg();
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
