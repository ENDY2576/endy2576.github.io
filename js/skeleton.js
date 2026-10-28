/**
 * 骨架屏 · 纯 CSS/原生 JS 版（不到 React 的零成本实现）
 * ------------------------------------------------------------------
 * 只有「本该有内容但还在路上」的区域才铺占位，内容一到原地替换：
 *   · 留言板：#twikoo-wrap 等 Twikoo 首次拉取评论区
 *   · 相册：.fj-gallery 等 fjGallery 注入图片
 *   · 音乐馆：.page-type-music 等 Meting/APlayer 建播放器
 *   · 追番：#bangumi-item1..3 分页由插件 JS 填充
 *   · 朋友圈：#fc-subpage-root 等 all.json 回来
 *
 * 占位隐藏策略：内容出现后 add('endy-sk--done') → 淡出并移除；
 * 8 秒兜底强制移除，避免网络卡死时一直闪。
 */
(function () {
  'use strict';

  if (window.__endySkeleton) return;
  window.__endySkeleton = true;

  var CSS = [
    '.endy-sk{--endy-sk-bg:rgba(136,136,136,.14);--endy-sk-hi:rgba(255,255,255,.22);position:relative;overflow:hidden}',
    '.endy-sk *{box-sizing:border-box}',
    '.endy-sk__bar{background:var(--endy-sk-bg);border-radius:8px;overflow:hidden;position:relative}',
    '.endy-sk__bar::after{content:"";position:absolute;inset:0;transform:translateX(-100%);background:linear-gradient(90deg,transparent,var(--endy-sk-hi),transparent);animation:endy-sk-shimmer 1.4s infinite}',
    'body:not([data-theme="light"]) .endy-sk,' + '.endy-sk{--endy-sk-hi:rgba(255,255,255,.10)}',
    '@keyframes endy-sk-shimmer{100%{transform:translateX(100%)}}',
    '.endy-sk--done{opacity:0;transition:opacity .35s ease;pointer-events:none}',
    '.endy-sk--hide{display:none!important}',
    /* 评论骨架 */
    '.endy-sk-comments{padding:8px 4px}',
    '.endy-sk-comment{display:flex;gap:12px;margin-bottom:22px}',
    '.endy-sk-avatar{width:44px;height:44px;border-radius:50%;flex:0 0 44px}',
    '.endy-sk-lines{flex:1;min-width:0;display:flex;flex-direction:column;gap:9px;padding-top:4px}',
    /* 相册骨架 */
    '.endy-sk-gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;padding:6px 0}',
    '.endy-sk-tile{aspect-ratio:4/3;border-radius:12px}',
    /* 追番骨架 */
    '.endy-sk-bangumi{display:grid;grid-template-columns:repeat(auto-fill,minmax(132px,1fr));gap:16px;padding:10px 0}',
    '.endy-sk-poster{aspect-ratio:3/4;border-radius:10px}',
    /* 音乐骨架 */
    '.endy-sk-music{display:flex;flex-direction:column;align-items:center;gap:22px;padding:56px 0 40px}',
    '.endy-sk-disc{width:180px;height:180px;border-radius:50%}',
    '.endy-sk-track{width:min(420px,78%);height:14px;border-radius:7px}',
    /* 图表骨架 */
    '.endy-sk-charts{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;padding:8px 0}',
    '.endy-sk-chart{height:240px;border-radius:16px}',
    '@media (prefers-reduced-motion: reduce){.endy-sk__bar::after{animation:none}}',
  ].join('');

  function injectCSS() {
    if (document.getElementById('endy-sk-css')) return;
    var s = document.createElement('style');
    s.id = 'endy-sk-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function bar(w, h, extra) {
    return '<div class="endy-sk__bar ' + (extra || '') + '" style="width:' + w + ';height:' + (h || 12) + 'px"></div>';
  }

  var TARGETS = [
    {
      // 留言板：Twikoo 初始化前
      key: 'comments',
      select: '#twikoo-wrap',
      hasContent: function (el) {
        return !!(el.querySelector('.tk-comments, .tk-input, .tk-submit, textarea, iframe'));
      },
      build: function () {
        var rows = '';
        for (var i = 0; i < 3; i++) {
          rows += '<div class="endy-sk-comment">' +
            '<div class="endy-sk__bar endy-sk-avatar"></div>' +
            '<div class="endy-sk-lines">' + bar('34%', 12) + bar('92%', 10) + bar('70%', 10) + '</div>' +
            '</div>';
        }
        return '<div class="endy-sk endy-sk-comments">' + rows + '</div>';
      },
    },
    {
      // 相册：fjGallery 还没吐图片
      key: 'gallery',
      select: '.fj-gallery',
      hasContent: function (el) {
        return el.querySelectorAll('img').length > 0 || el.children.length > 0;
      },
      build: function () {
        var tiles = '';
        for (var i = 0; i < 12; i++) tiles += '<div class="endy-sk__bar endy-sk-tile"></div>';
        return '<div class="endy-sk endy-sk-gallery">' + tiles + '</div>';
      },
    },
    {
      // 追番：插件按分页填充页面
      key: 'bangumi',
      select: '#bangumi-item1',
      hasContent: function (el) {
        return !!el.querySelector('.bangumi-item, img');
      },
      build: function () {
        var cards = '';
        for (var i = 0; i < 8; i++) cards += '<div class="endy-sk__bar endy-sk-poster"></div>';
        return '<div class="endy-sk endy-sk-bangumi">' + cards + '</div>';
      },
    },
    {
      // 音乐馆：播放器还没建起来
      key: 'music',
      select: '.page-type-music',
      hasContent: function (el) {
        return !!(el.querySelector('.aplayer, .aplayer-list, iframe'));
      },
      build: function () {
        return '<div class="endy-sk endy-sk-music">' +
          '<div class="endy-sk__bar endy-sk-disc"></div>' +
          '<div class="endy-sk__bar endy-sk-track"></div>' +
          '<div class="endy-sk__bar endy-sk-track" style="width:min(300px,56%)"></div>' +
          '</div>';
      },
    },
    {
      // 朋友圈子页：数据与图表
      key: 'fcircle',
      select: '#fc-subpage-root',
      hasContent: function (el) {
        return el.children.length > 0;
      },
      build: function (el) {
        if (el.getAttribute('data-view') === 'articles') {
          var charts = '';
          for (var i = 0; i < 3; i++) charts += '<div class="endy-sk__bar endy-sk-chart"></div>';
          return '<div class="endy-sk endy-sk-charts">' + charts + '</div>';
        }
        var rows = '';
        for (var j = 0; j < 4; j++) {
          rows += '<div class="endy-sk-comment">' +
            '<div class="endy-sk__bar endy-sk-avatar"></div>' +
            '<div class="endy-sk-lines">' + bar('40%', 12) + bar('88%', 10) + '</div>' +
            '</div>';
        }
        return '<div class="endy-sk endy-sk-comments">' + rows + '</div>';
      },
    },
  ];

  function watch(el, ph, hasContent) {
    var done = false;
    function finish() {
      if (done) return;
      done = true;
      ph.classList.add('endy-sk--done');
      setTimeout(function () {
        if (ph.parentNode) ph.parentNode.removeChild(ph);
      }, 400);
      if (observer) observer.disconnect();
      clearTimeout(timer);
    }

    var timer = setTimeout(finish, 8000);
    var observer = null;
    if ('MutationObserver' in window) {
      observer = new MutationObserver(function () {
        if (hasContent()) finish();
      });
      observer.observe(el, { childList: true, subtree: true });
    }
    // 有些区域是先有子节点再加载完成，短轮询兜底
    var poll = setInterval(function () {
      if (hasContent()) {
        clearInterval(poll);
        finish();
      }
    }, 350);
    setTimeout(function () { clearInterval(poll); }, 8500);
  }

  function start(target) {
    var el = document.querySelector(target.select);
    if (!el || el.getAttribute('data-endy-sk') === '1') return;
    if (target.hasContent(el)) return;
    el.setAttribute('data-endy-sk', '1');

    var ph = document.createElement('div');
    ph.innerHTML = target.build(el);
    var node = ph.firstChild;
    el.appendChild(node);
    watch(el, node, function () { return target.hasContent(el); });
  }

  function run() {
    injectCSS();
    TARGETS.forEach(start);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
  document.addEventListener('pjax:complete', run);
  document.addEventListener('endy:content-loaded', run);
})();
