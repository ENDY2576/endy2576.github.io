/* 彖渊子 · 朋友圈子页（订阅 / 活跃 / 文章 / 失败）
 * 共享脚本：通过 #fc-subpage-root 的 data-view 决定渲染哪种视图。
 * 数据源：Friend-Circle-Lite page 分支 all.json（与首页朋友圈同源）。
 * 注意：all.json 仅公开 statistical_data + article_data，未暴露逐站错误明细，
 *       故「失败」页只展示聚合数字并说明，不做伪造明细。
 */
(function () {
  'use strict';

  const API_URL = 'https://cdn.jsdelivr.net/gh/ENDY2576/Friend-Circle-Lite@page/all.json';
  const ERROR_IMG = 'https://i.p-i.vip/30/20240815-66bced9226a36.webp';
  const CHART_JS = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js';

  const VIEWS = ['subscribe', 'active', 'articles', 'error'];
  const VIEW_LABEL = { subscribe: '订阅', active: '活跃', articles: '文章', error: '失败' };

  const CATEGORIES = [
    { key: 'all', label: '全部', color: '#6366f1' },
    { key: 'diary', label: '日记', color: '#3b82f6' },
    { key: 'ai', label: 'AI', color: '#8b5cf6' },
    { key: 'dev', label: '开发', color: '#10b981' },
    { key: 'tech', label: '技术', color: '#f59e0b' },
    { key: 'design', label: '设计', color: '#ec4899' },
    { key: 'knowledge', label: '知识', color: '#06b6d4' },
    { key: 'life', label: '生活', color: '#f97316' },
  ];

  const CLASSIFY_RULES = [
    ['diary', ['日记', 'journal', '日志', '周记', '月记', '每日', '信笺']],
    ['ai', [
      'ai', '人工智能', 'chatgpt', 'gpt', 'llm', '大模型', 'claude', 'openai',
      'copilot', '豆包', 'deepseek', '即梦', 'midjourney', 'mj', 'stable diffusion',
      'sd', 'ocr', 'rpa', '影刀', 'coze', '扣子', 'n8n', 'codex', 'openclaw',
      '油猴脚本', 'ai歌曲', 'ai工具', 'ai评论', 'ai时代', 'vibe-coding', 'vibe coding',
      'llmops', '多模型', '智能路由'
    ]],
    ['dev', [
      '开发', '代码', '编程', '程序', '项目', '脚本', 'python', 'javascript', 'js',
      'css', 'html', '前端', '后端', '小程序', 'github', '开源', 'hexo', 'vue',
      'react', 'node', 'node.js', 'api', 'webhook', '部署', '数据库', 'sql', '实战',
      '源码', '建站', '博客', '框架', '组件', '算法', 'leetcode', '数据结构',
      '编译器', 'c++', 'java', 'go', 'rust', 'typescript', 'ts', 'next.js', 'nuxt',
      'astro', 'vite', 'webpack', '构建', '持续集成', 'ci/cd', 'docker',
      'kubernetes', 'k8s', 'wsl', '虚拟局域网', '临时邮箱', '域名', '路由', '网关',
      '接口', '二维码', 'pixi', '微信', '鸿蒙', '应用', 'app'
    ]],
    ['tech', [
      '技术', '系统', '安全', '漏洞', '防御', 'owasp', 'macbook', 'home assistant',
      '智能家居', '硬件', '服务器', '网络', '架构', '运维', 'ssl', 'https', 'dns',
      '路由器', '刷机', '刷', 'immortalwrt', 'openwrt', '组网', '联机', '休眠',
      'idm', 'cloudflare', 'vercel', '小米', 'ax3000t', '解决方案', '修复'
    ]],
    ['design', [
      '设计', 'ui', 'ux', 'figma', 'iphone', 'apple', '苹果', '产品', '体验', '界面',
      '配色', '排版', '字体', '图标', '品牌', '视觉', '海报', '封面', '插画', 'sketch',
      'photoshop', 'ps', '摄影', '构图', '镜头'
    ]],
    ['knowledge', [
      '知识', '学习', '教程', '总结', '复盘', '方法论', '认知', '成长', '效率', '阅读',
      '读书', '笔记', '思考', '见解', '分享', '年终总结', '随想', '感悟', '诗词', '文学',
      '纳兰', '饮水词', '体检', '健康', '心理', '哲学'
    ]],
    ['life', [
      '生活', '随笔', '日常', '中秋', '礼盒', '外婆', '海淘', 'cd', '邮政', '寄送',
      '指南', '乐队', '音乐', '实习', '买东西', '舍不得', '追光者', '旅行', '美食',
      '电影', '游戏', '宠物', '家人', '情感'
    ]]
  ];

  function classifyTitle(title) {
    const t = String(title || '').toLowerCase();
    for (const [key, kws] of CLASSIFY_RULES) {
      for (const kw of kws) {
        if (t.indexOf(kw.toLowerCase()) !== -1) return key;
      }
    }
    return 'life';
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatDate(created) {
    if (!created) return '';
    const d = new Date(String(created).replace(/-/g, '/'));
    if (isNaN(d.getTime())) return created;
    const now = new Date();
    const diff = Math.floor((now - d) / 1000);
    if (diff < 60) return '刚刚';
    if (diff < 3600) return Math.floor(diff / 60) + '分钟前';
    if (diff < 86400) return Math.floor(diff / 3600) + '小时前';
    if (diff < 604800) return Math.floor(diff / 86400) + '天前';
    return d.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
  }

  function getCategory(key) {
    return CATEGORIES.find(c => c.key === key) || CATEGORIES[0];
  }

  function parseDate(created) {
    if (!created) return null;
    const d = new Date(String(created).replace(/-/g, '/'));
    return isNaN(d.getTime()) ? null : d;
  }

  // 聚合：按作者分组，统计文章数 + 最近发布时间
  function groupByAuthor(articles) {
    const map = new Map();
    articles.forEach(a => {
      const name = a.author || '匿名';
      if (!map.has(name)) {
        map.set(name, { author: name, avatar: a.avatar || ERROR_IMG, count: 0, latest: null });
      }
      const rec = map.get(name);
      rec.count += 1;
      const dt = parseDate(a.created);
      if (dt && (!rec.latest || dt > rec.latest)) rec.latest = dt;
    });
    return Array.from(map.values());
  }

  function renderArticleCard(article, index) {
    const cat = getCategory(article.category);
    return `
      <article class="fc-lite-card" data-cat="${article.category}" data-title="${escapeHtml(article.title)}" data-author="${escapeHtml(article.author)}" style="--card-enter-delay:${index * 24}ms">
        <img class="fc-lite-card-bg" src="${escapeHtml(article.avatar || ERROR_IMG)}" alt="" loading="lazy" aria-hidden="true" onerror="this.style.display='none'">
        <div class="fc-lite-card-main">
          <div class="fc-lite-card-header">
            <span class="fc-lite-cat-pill" style="--cat-color:${cat.color}">${cat.label}</span>
            <span class="fc-lite-card-date">${formatDate(article.created)}</span>
          </div>
          <h3 class="fc-lite-card-title">
            <a href="${escapeHtml(article.link)}" target="_blank" rel="noopener">${escapeHtml(article.title)}</a>
          </h3>
          <div class="fc-lite-card-footer">
            <div class="fc-lite-avatar-wrap small">
              <img class="fc-lite-card-avatar" src="${escapeHtml(article.avatar || ERROR_IMG)}" alt="${escapeHtml(article.author)}" loading="lazy" onerror="this.src='${ERROR_IMG}'">
            </div>
            <span class="fc-lite-card-author">${escapeHtml(article.author)}</span>
          </div>
        </div>
      </article>
    `;
  }

  function renderNav(activeView) {
    const tabs = VIEWS.map(v =>
      `<a class="fc-sub-tab${v === activeView ? ' active' : ''}" href="/fcircle/${v}/" style="--cat-color:${getCategory(v === 'all' ? 'all' : v).color}">${VIEW_LABEL[v]}</a>`
    ).join('');
    return `
      <div class="fc-sub-nav">
        <a class="fc-sub-back" href="/fcircle/">← 返回朋友圈</a>
        <div class="fc-sub-tabs">${tabs}</div>
      </div>
    `;
  }

  function statBanner(stats) {
    const items = [
      { num: stats.friends_num || 0, label: '订阅', href: '/fcircle/subscribe/' },
      { num: stats.active_num || 0, label: '活跃', href: '/fcircle/active/' },
      { num: stats.article_num || 0, label: '文章', href: '/fcircle/articles/' },
      { num: stats.error_num || 0, label: '失败', href: '/fcircle/error/' },
    ];
    return `
      <div class="fc-lite-stats">
        ${items.map(it => `
          <a class="fc-lite-stat-card" href="${it.href}" tabindex="0">
            <div class="fc-lite-stat-num">${it.num}</div>
            <div class="fc-lite-stat-label">${it.label}</div>
          </a>
        `).join('')}
      </div>
      <p class="fc-sub-update">数据更新时间：${escapeHtml(stats.last_updated_time || '未知')}（由 GitHub Actions 每日同步）</p>
    `;
  }

  function renderSubscribe(root, data) {
    const stats = data.statistical_data || {};
    const authors = groupByAuthor(data.article_data || []);
    root.innerHTML = `
      ${renderNav('subscribe')}
      ${statBanner(stats)}
      <div class="fc-sub-section">
        <h2 class="fc-sub-h2">已收录并产出文章的友链源（${authors.length} 个）</h2>
        <p class="fc-sub-desc">本站共订阅 <strong>${stats.friends_num || 0}</strong> 个友链源，其中 <strong>${stats.active_num || 0}</strong> 个近 30 天有更新、<strong>${stats.error_num || 0}</strong> 个抓取失败。下方为当前已成功收录文章的来源；完整清单与失败明细由后端维护，未在此公开。</p>
        <div class="fc-sub-author-grid">
          ${authors.map(a => `
            <div class="fc-sub-author">
              <img class="fc-sub-author-avatar" src="${escapeHtml(a.avatar)}" alt="${escapeHtml(a.author)}" loading="lazy" onerror="this.src='${ERROR_IMG}'">
              <div class="fc-sub-author-info">
                <div class="fc-sub-author-name">${escapeHtml(a.author)}</div>
                <div class="fc-sub-author-meta">${a.count} 篇 · 最近 ${a.latest ? a.latest.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }) : '未知'}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderActive(root, data) {
    const stats = data.statistical_data || {};
    const authors = groupByAuthor(data.article_data || [])
      .sort((a, b) => (b.latest ? b.latest.getTime() : 0) - (a.latest ? a.latest.getTime() : 0));
    root.innerHTML = `
      ${renderNav('active')}
      ${statBanner(stats)}
      <div class="fc-sub-section">
        <h2 class="fc-sub-h2">活跃博主（按最近更新排序，共 ${authors.length} 位有文章）</h2>
        <p class="fc-sub-desc">后端统计活跃订阅源 <strong>${stats.active_num || 0}</strong> 个。下方为近期实际产出文章的博主，点击头像右侧条目可前往其站点。</p>
        <div class="fc-sub-author-grid">
          ${authors.map(a => `
            <a class="fc-sub-author" href="#" onclick="return false;">
              <img class="fc-sub-author-avatar" src="${escapeHtml(a.avatar)}" alt="${escapeHtml(a.author)}" loading="lazy" onerror="this.src='${ERROR_IMG}'">
              <div class="fc-sub-author-info">
                <div class="fc-sub-author-name">${escapeHtml(a.author)}</div>
                <div class="fc-sub-author-meta">${a.count} 篇 · 最近 ${a.latest ? a.latest.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }) : '未知'}</div>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderArticles(root, data) {
    const stats = data.statistical_data || {};
    const articles = (data.article_data || []).map(a => ({ ...a, category: classifyTitle(a.title) }));
    root.innerHTML = `
      ${renderNav('articles')}
      ${statBanner(stats)}
      <div class="fc-sub-charts">
        <div class="fc-sub-chart-box">
          <h3 class="fc-sub-chart-title">分类分布</h3>
          <canvas id="fc-chart-cat" height="220"></canvas>
        </div>
        <div class="fc-sub-chart-box">
          <h3 class="fc-sub-chart-title">发文最多博主 Top 10</h3>
          <canvas id="fc-chart-author" height="220"></canvas>
        </div>
        <div class="fc-sub-chart-box fc-sub-chart-wide">
          <h3 class="fc-sub-chart-title">每月文章数</h3>
          <canvas id="fc-chart-month" height="200"></canvas>
        </div>
      </div>
      <div class="fc-sub-section">
        <h2 class="fc-sub-h2">全部文章（${articles.length} 篇）</h2>
        <div class="fc-lite-grid">
          ${articles.map((a, i) => renderArticleCard(a, i)).join('')}
        </div>
      </div>
    `;
    drawCharts(articles);
  }

  function renderError(root, data) {
    const stats = data.statistical_data || {};
    const authors = groupByAuthor(data.article_data || []);
    root.innerHTML = `
      ${renderNav('error')}
      ${statBanner(stats)}
      <div class="fc-sub-section">
        <h2 class="fc-sub-h2">抓取失败的订阅源（${stats.error_num || 0} 个）</h2>
        <p class="fc-sub-desc">当前公开数据源 <code>all.json</code> 仅提供聚合统计，未逐站暴露失败明细。失效通常为对方站点改版、RSS 失效或超时。<strong>${stats.error_num || 0}</strong> 个源本次抓取失败，已并入订阅总数 ${stats.friends_num || 0} 中。下方列出仍正常收录的 ${authors.length} 个来源作为对照。</p>
        <div class="fc-sub-author-grid">
          ${authors.map(a => `
            <div class="fc-sub-author ok">
              <img class="fc-sub-author-avatar" src="${escapeHtml(a.avatar)}" alt="${escapeHtml(a.author)}" loading="lazy" onerror="this.src='${ERROR_IMG}'">
              <div class="fc-sub-author-info">
                <div class="fc-sub-author-name">${escapeHtml(a.author)}</div>
                <div class="fc-sub-author-meta">${a.count} 篇 · 正常</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function drawCharts(articles) {
    const canvasCat = document.getElementById('fc-chart-cat');
    const canvasAuthor = document.getElementById('fc-chart-author');
    const canvasMonth = document.getElementById('fc-chart-month');
    const hasCanvas = canvasCat || canvasAuthor || canvasMonth;
    if (!hasCanvas) return;

    const render = () => {
      if (typeof Chart === 'undefined') {
        [canvasCat, canvasAuthor, canvasMonth].forEach(c => {
          if (c) c.insertAdjacentHTML('afterend', '<p class="fc-sub-chart-fail">图表库加载失败，已隐藏图表。</p>');
        });
        return;
      }

      // 分类分布
      const catCounts = {};
      CATEGORIES.forEach(c => { if (c.key !== 'all') catCounts[c.key] = 0; });
      articles.forEach(a => { catCounts[a.category] = (catCounts[a.category] || 0) + 1; });
      const catKeys = Object.keys(catCounts).filter(k => catCounts[k] > 0);
      new Chart(canvasCat, {
        type: 'doughnut',
        data: {
          labels: catKeys.map(k => getCategory(k).label),
          datasets: [{
            data: catKeys.map(k => catCounts[k]),
            backgroundColor: catKeys.map(k => getCategory(k).color),
            borderWidth: 1
          }]
        },
        options: { plugins: { legend: { position: 'right' } }, maintainAspectRatio: false }
      });

      // Top 10 作者
      const authors = groupByAuthor(articles).sort((a, b) => b.count - a.count).slice(0, 10);
      new Chart(canvasAuthor, {
        type: 'bar',
        data: {
          labels: authors.map(a => a.author),
          datasets: [{
            label: '文章数',
            data: authors.map(a => a.count),
            backgroundColor: '#6366f1'
          }]
        },
        options: {
          indexAxis: 'y',
          plugins: { legend: { display: false } },
          maintainAspectRatio: false,
          scales: { x: { beginAtZero: true, ticks: { precision: 0 } } }
        }
      });

      // 每月文章数
      const monthCounts = {};
      articles.forEach(a => {
        const d = parseDate(a.created);
        if (!d) return;
        const key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
        monthCounts[key] = (monthCounts[key] || 0) + 1;
      });
      const months = Object.keys(monthCounts).sort();
      new Chart(canvasMonth, {
        type: 'line',
        data: {
          labels: months,
          datasets: [{
            label: '文章数',
            data: months.map(m => monthCounts[m]),
            borderColor: '#10b981',
            backgroundColor: 'rgba(16,185,129,0.15)',
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          plugins: { legend: { display: false } },
          maintainAspectRatio: false,
          scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
        }
      });
    };

    if (typeof Chart === 'undefined') {
      loadScript(CHART_JS).then(render).catch(render);
    } else {
      render();
    }
  }

  function init() {
    const root = document.getElementById('fc-subpage-root');
    if (!root) return;
    const view = root.dataset.view;
    if (VIEWS.indexOf(view) === -1) {
      root.innerHTML = '<div class="fc-lite-error">未知视图。</div>';
      return;
    }
    root.innerHTML = '<div class="fc-lite-loading">正在加载朋友圈数据...</div>';
    fetch(API_URL)
      .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(data => {
        if (view === 'subscribe') renderSubscribe(root, data);
        else if (view === 'active') renderActive(root, data);
        else if (view === 'articles') renderArticles(root, data);
        else if (view === 'error') renderError(root, data);
      })
      .catch(err => {
        root.innerHTML = '<div class="fc-lite-error">朋友圈数据加载失败，请稍后刷新重试。</div>';
        console.error('[fcircle-subpage] 加载失败:', err);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
