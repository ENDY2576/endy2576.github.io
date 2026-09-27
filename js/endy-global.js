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

  /* 四季日间背景：按当前月份（北半球）写入 <html data-season>，
     由 custom.css 的 :root[data-season] 规则切换 --endy-bg-light。 */
  function applySeason() {
    const m = new Date().getMonth() + 1; // 1-12
    let season;
    if (m >= 3 && m <= 5) season = 'spring';
    else if (m >= 6 && m <= 8) season = 'summer';
    else if (m >= 9 && m <= 11) season = 'autumn';
    else season = 'winter';
    document.documentElement.setAttribute('data-season', season);
  }

  function boot() {
    initScrollPercent();
    applySeason();
  }

  // 立即设置季节（脚本注入较早，先落定 data-season 避免日间背景闪一下默认冬季图）
  applySeason();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // PJAX 导航完成后重新挂载（#go-up 所在容器内容会被主题替换）
  document.addEventListener('pjax:complete', boot);
  // 兜底：主题布局异步渲染时，稍后再次挂载
  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(boot, 400);
  });
})();
