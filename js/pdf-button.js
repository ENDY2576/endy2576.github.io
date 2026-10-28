/**
 * 文章页「导出 PDF」按钮（常驻小脚本，约 2KB）
 * ------------------------------------------------------------------
 * 按钮本身不载任何库；点了才去下载 /js/pdf-export.js（html2canvas + jsPDF，
 * 共 700KB+）。这样普通阅读的每一页都不会为导出功能买单。
 * 下载完成后调用 window.EndyPdfExport.run(btn, article)。
 */
(function () {
  'use strict';

  var SRC = '/js/pdf-export.js?v=1';

  function loadLib(cb, err) {
    if (window.EndyPdfExport) return cb();
    var s = document.createElement('script');
    s.src = SRC;
    s.async = true;
    s.onload = function () {
      if (window.EndyPdfExport) cb();
      else err && err();
    };
    s.onerror = function () {
      s.parentNode && s.parentNode.removeChild(s);
      err && err();
    };
    document.body.appendChild(s);
  }

  function toast(text, ms) {
    var el = document.createElement('div');
    el.textContent = text;
    el.style.cssText =
      'position:fixed;left:50%;bottom:32px;transform:translateX(-50%);z-index:9999;padding:10px 18px;border-radius:12px;background:rgba(18,20,32,.92);color:#fff;font-size:13px';
    document.body.appendChild(el);
    setTimeout(function () {
      el.remove();
    }, ms || 2400);
  }

  function mount() {
    var article = document.querySelector('#article-container');
    if (!article) return;
    if (!article.querySelector('.post-content')) return;
    if (document.querySelector('.endy-pdf-btn')) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'endy-pdf-btn';
    btn.setAttribute('aria-label', '导出 PDF');
    btn.style.cssText =
      'position:fixed;right:18px;bottom:96px;z-index:70;display:flex;align-items:center;gap:7px;padding:9px 14px;border-radius:999px;' +
      'background:var(--anzhiyu-card-bg,#fff);color:var(--anzhiyu-fontcolor,#333);border:1px solid var(--anzhiyu-border-color,rgba(0,0,0,.1));' +
      'box-shadow:0 8px 24px rgba(0,0,0,.14);font-size:12px;cursor:pointer;opacity:.92';
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>' +
      '<span>导出 PDF</span>';
    btn.addEventListener('click', function () {
      btn.disabled = true;
      toast('正在准备导出组件…', 2000);
      loadLib(
        function () {
          btn.disabled = false;
          window.EndyPdfExport.run(btn, document.querySelector('#article-container'));
        },
        function () {
          btn.disabled = false;
          toast('导出组件加载失败，请刷新重试', 3000);
        }
      );
    });
    document.body.appendChild(btn);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
  document.addEventListener('pjax:complete', mount);
})();
