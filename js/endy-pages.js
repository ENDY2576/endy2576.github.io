/**
 * 按页面按需加载增强脚本（路由器）
 * ------------------------------------------------------------------
 * 全站只注入这一个小文件；真正的功能脚本（ECharts / FullCalendar /
 * MapLibre / PixiJS / React Flow …）只在对应页面出现时才去下载，
 * 首页不会因为别的页面用了大库而变重。
 *
 * 已加载过的地址会记住，pjax 换页不会重复请求同一个脚本。
 */
(function () {
  'use strict';

  var loaded = {};

  function load(src) {
    if (!src || loaded[src]) return;
    loaded[src] = 1;
    var s = document.createElement('script');
    s.src = src;
    s.defer = true;
    s.onerror = function () {
      // 失败后允许下次重试
      loaded[src] = 0;
      s.parentNode && s.parentNode.removeChild(s);
    };
    (document.body || document.head).appendChild(s);
  }

  // 大库延后到首屏空闲再下，别和首屏图片抢带宽
  function loadIdle(src) {
    if (!src || loaded[src]) return;
    var go = function () { load(src); };
    if ('requestIdleCallback' in window) window.requestIdleCallback(go, { timeout: 3500 });
    else setTimeout(go, 1800);
  }

  var path = function () {
    return location.pathname.replace(/index\.html$/, '');
  };

  var ROUTES = [
    { test: /^\/$/, js: ['/js/home-scroll.js?v=1'], idle: ['/js/night-sky-pixi.js?v=1'] },
    { test: /^\/box\/nav\/?$/, js: ['/js/page-dnd.js?v=1'] },
    {
      test: /^\/box\/(wallpaper|marvel|weimei|huiyi)\/?$/,
      js: ['/js/page-dnd.js?v=1', '/js/gallery-ogl.js?v=1'],
    },
    { test: /^\/life\/movies\/?$/, js: ['/js/bangumi-calendar.js?v=1'] },
    { test: /^\/archives\/?$/, js: ['/js/archive-stats.js?v=1'] },
    { test: /^\/stats\/?$/, js: ['/js/stats-charts.js?v=1'] },
    { test: /^\/footprint\/?$/, js: ['/js/footprint-map.js?v=1'] },
    { test: /^\/timeline\/?$/, js: ['/js/timeline-flow.js?v=1'] },
    { test: /^\/piano\/?$/, js: ['/js/sound-lab.js?v=2'] },
    { test: /^\/about\/?$/, js: ['/js/about-shader.js?v=1'] },
  ];

  function run() {
    var p = path();

    // 404：主题的 #error-wrap 出现即加载物理堆叠
    if (document.querySelector('#error-wrap')) {
      load('/js/matter-404.js?v=1');
    }

    // 文章页：导出 PDF（按钮常驻，库点了才下载）
    if (document.querySelector('#article-container .post-content') && !document.querySelector('.endy-pdf-btn')) {
      load('/js/pdf-button.js?v=1');
    }

    for (var i = 0; i < ROUTES.length; i++) {
      var r = ROUTES[i];
      if (!r.test.test(p)) continue;
      for (var j = 0; j < (r.js || []).length; j++) load(r.js[j]);
      for (var k = 0; k < (r.idle || []).length; k++) loadIdle(r.idle[k]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
  document.addEventListener('pjax:complete', run);
})();
