/* miku-loader.js  v=1
 * Miku 看板娘「纯彩蛋」按需加载器。
 *
 * 设计目标（用户决策）：
 *   1. 未解锁时：全站不加载任何 oml2d 资源（库 ~1MB + 模型 ~11MB 完全不请求）。
 *   2. 留言板开信触发：动态注入库 + 配置 + 交互脚本，启动看板娘并解锁。
 *   3. 解锁后（localStorage endy-miku-unlocked=1）：之后每次访问任意页面自动加载并常驻。
 *
 * 本文件本身极轻量（几 KB），全站常驻无负担；真正的大文件只在需要时才会被注入。
 *
 * 注意（部署 / CDN 缓存）：本博客 CDN 为 Cache-Control: immutable，query string 不生效，
 *   若需更新下列文件，请改实际文件名（如 miku-easter-egg.v2.js）并同步修改下方常量。
 */
(function () {
  var LIB = '/pluginsSrc/oh-my-live2d/dist/index.min.js';
  var CONFIG = '/js/miku-config.js';
  var EGG = '/js/miku-easter-egg.v2.js';

  var loading = false;
  var pending = [];

  function injectScript(src, onload) {
    var s = document.createElement('script');
    s.src = src;
    s.async = false; // 保证顺序：库 -> 配置 -> 彩蛋
    s.onload = onload || null;
    s.onerror = function () {
      console.error('[miku-loader] 资源加载失败:', src);
    };
    (document.body || document.documentElement).appendChild(s);
  }

  // 确保库+配置+彩蛋脚本都已就绪并 boot；可重复调用，首次真正加载，之后直接回调。
  window.__mikuEnsureLoaded = function (cb) {
    if (window.OML2D && typeof window.__mikuBoot === 'function') {
      if (typeof cb === 'function') cb();
      return;
    }
    if (loading) {
      if (typeof cb === 'function') pending.push(cb);
      return;
    }
    loading = true;
    injectScript(LIB, function () {
      injectScript(CONFIG, function () {
        injectScript(EGG, function () {
          loading = false;
          try {
            if (typeof window.__mikuBoot === 'function') window.__mikuBoot();
          } catch (e) {
            console.error('[miku-loader] __mikuBoot 执行异常:', e);
          }
          flush(cb);
        });
      });
    });
  };

  function flush(firstCb) {
    if (typeof firstCb === 'function') {
      try { firstCb(); } catch (e) {}
    }
    var q = pending.slice();
    pending.length = 0;
    q.forEach(function (f) { try { f(); } catch (e) {} });
  }

  // 留言板开信触发：加载并解锁（首次有滑入动画）。
  window.__mikuTriggerEgg = function () {
    window.__mikuEnsureLoaded(function () {
      if (typeof window.__mikuUnlock === 'function') window.__mikuUnlock();
    });
  };

  // 解锁后：每页自动加载（全站常驻）。__mikuUnlock 内部会判断 isResume，刷新恢复不重播滑入。
  function autoLoadIfUnlocked() {
    try {
      if (localStorage.getItem('endy-miku-unlocked') === '1') {
        window.__mikuEnsureLoaded(function () {
          if (typeof window.__mikuUnlock === 'function') window.__mikuUnlock();
        });
      }
    } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoLoadIfUnlocked);
  } else {
    autoLoadIfUnlocked();
  }
})();
