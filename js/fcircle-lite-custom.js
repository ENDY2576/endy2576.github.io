/* 彖渊子 · 朋友圈分类版（Friend-Circle-Lite 自定义前端）
 * 数据源：Friend-Circle-Lite page 分支 all.json（由 GitHub Actions 每日更新）
 * 功能：统计卡片、钓鱼随机文章、分类标签筛选、文章卡片网格、搜索过滤
 */
(function () {
  'use strict';

  const API_URL = 'https://cdn.jsdelivr.net/gh/ENDY2576/Friend-Circle-Lite@page/all.json';
  const ERROR_IMG = 'https://i.p-i.vip/30/20240815-66bced9226a36.webp';

  // 分类定义：key 用于内部筛选，label 显示名，color 主题色
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

  // 分类关键词规则（顺序 = 优先级，命中即返回）
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

  let state = {
    articles: [],
    currentCategory: 'all',
    searchQuery: '',
    randomIndex: 0,
  };

  function classifyTitle(title) {
    const t = String(title || '').toLowerCase();
    for (const [key, kws] of CLASSIFY_RULES) {
      for (const kw of kws) {
        if (t.indexOf(kw.toLowerCase()) !== -1) return key;
      }
    }
    return 'life'; // 没有明显关键词的归为「生活/随笔」
  }

  function formatDate(created) {
    if (!created) return '';
    const d = new Date(created.replace(/-/g, '/'));
    if (isNaN(d.getTime())) return created;
    const now = new Date();
    const diff = Math.floor((now - d) / 1000);
    if (diff < 60) return '刚刚';
    if (diff < 3600) return Math.floor(diff / 60) + '分钟前';
    if (diff < 86400) return Math.floor(diff / 3600) + '小时前';
    if (diff < 604800) return Math.floor(diff / 86400) + '天前';
    return d.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function getCategory(key) {
    return CATEGORIES.find(c => c.key === key) || CATEGORIES[0];
  }

  function renderStats(stats) {
    const path = (typeof window !== 'undefined' && window.location && window.location.pathname) || '';
    const items = [
      { num: stats.friends_num || 0, label: '订阅', href: '/fcircle/subscribe/' },
      { num: stats.active_num || 0, label: '活跃', href: '/fcircle/active/' },
      { num: stats.article_num || 0, label: '文章', href: '/fcircle/articles/' },
      { num: stats.error_num || 0, label: '失败', href: '/fcircle/error/' },
    ];
    return `
      <div class="fc-lite-stats">
        ${items.map(it => {
          const activeClass = path.indexOf(it.href) === 0 ? ' active' : '';
          return `
          <a class="fc-lite-stat-card${activeClass}" href="${it.href}" tabindex="0" role="button" aria-label="${it.label}：${it.num}，点击查看详情">
            <div class="fc-lite-stat-num">${it.num}</div>
            <div class="fc-lite-stat-label">${it.label}</div>
          </a>
        `;
        }).join('')}
      </div>
    `;
  }

  function renderRandomBody(article) {
    const cat = getCategory(article.category);
    return `
      <div class="fc-lite-avatar-wrap">
        <img class="fc-lite-random-avatar" src="${escapeHtml(article.avatar || ERROR_IMG)}" alt="${escapeHtml(article.author)}" loading="lazy" onerror="this.src='${ERROR_IMG}'">
      </div>
      <div class="fc-lite-random-info">
        <a class="fc-lite-random-link" href="${escapeHtml(article.link)}" target="_blank" rel="noopener">${escapeHtml(article.title)}</a>
        <div class="fc-lite-random-meta">
          <span class="fc-lite-cat-pill" style="--cat-color:${cat.color}">${cat.label}</span>
          <button class="fc-lite-author-btn" type="button" data-author="${escapeHtml(article.author)}" data-avatar="${escapeHtml(article.avatar || ERROR_IMG)}" data-link="${escapeHtml(article.link)}">${escapeHtml(article.author)}</button>
          <span class="fc-lite-date">${formatDate(article.created)}</span>
        </div>
      </div>
    `;
  }

  function getAuthorArticles(author, sampleLink) {
    let domain = '';
    try { if (sampleLink) domain = new URL(sampleLink).hostname; } catch (e) { domain = ''; }
    return state.articles
      .filter(a => a.author === author)
      .filter(a => {
        if (!domain || !a.link) return true;
        try { return new URL(a.link).hostname === domain; } catch (e) { return true; }
      })
      .sort((a, b) => {
        const ta = a.created ? new Date(a.created.replace(/-/g, '/')).getTime() : 0;
        const tb = b.created ? new Date(b.created.replace(/-/g, '/')).getTime() : 0;
        return tb - ta;
      })
      .slice(0, 5);
  }

  function renderAuthorPanel(author, avatar, articles) {
    const listHtml = articles.length
      ? articles.map(a => `
        <a class="fc-lite-author-panel-item" href="${escapeHtml(a.link)}" target="_blank" rel="noopener">
          <span class="fc-lite-author-panel-item-title">${escapeHtml(a.title)}</span>
          <span class="fc-lite-author-panel-item-date">${formatDate(a.created)}</span>
        </a>
      `).join('')
      : `<div class="fc-lite-author-panel-empty">暂无更多文章</div>`;
    return `
      <div class="fc-lite-author-panel-backdrop" id="fc-lite-author-panel-backdrop">
        <div class="fc-lite-author-panel" role="dialog" aria-modal="true" aria-labelledby="fc-lite-author-panel-name">
          <div class="fc-lite-author-panel-header">
            <div class="fc-lite-author-panel-info">
              <div class="fc-lite-avatar-wrap small">
                <img class="fc-lite-card-avatar" src="${escapeHtml(avatar)}" alt="${escapeHtml(author)}" loading="lazy" onerror="this.src='${ERROR_IMG}'">
              </div>
              <span class="fc-lite-author-panel-name" id="fc-lite-author-panel-name">${escapeHtml(author)}</span>
            </div>
            <button class="fc-lite-author-panel-close" type="button" aria-label="关闭">×</button>
          </div>
          <div class="fc-lite-author-panel-list">
            ${listHtml}
          </div>
        </div>
      </div>
    `;
  }

  function showAuthorPanel(author, avatar, link) {
    const existing = document.getElementById('fc-lite-author-panel-backdrop');
    if (existing) existing.remove();

    const articles = getAuthorArticles(author, link);
    const html = renderAuthorPanel(author, avatar, articles);
    document.body.insertAdjacentHTML('beforeend', html);

    const backdrop = document.getElementById('fc-lite-author-panel-backdrop');
    const panel = backdrop.querySelector('.fc-lite-author-panel');

    function close() {
      if (!backdrop) return;
      backdrop.classList.add('fc-lite-author-panel-hiding');
      setTimeout(() => backdrop.remove(), 250);
      document.removeEventListener('keydown', onKey);
    }

    function onKey(e) {
      if (e.key === 'Escape') close();
    }

    // 点击遮罩或关闭按钮关闭；点击面板内容不关闭
    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop || e.target.closest('.fc-lite-author-panel-close')) close();
    });

    document.addEventListener('keydown', onKey);

    // 简单入场动画：先让 DOM 渲染再添加显示类
    requestAnimationFrame(() => {
      if (backdrop) backdrop.classList.add('fc-lite-author-panel-show');
    });
  }

  function renderRandomArticle(article) {
    return `
      <div class="fc-lite-random">
        <div class="fc-lite-random-head">
          <span class="fc-lite-random-title">🎣 钓鱼</span>
          <div class="fc-lite-random-actions">
            <button class="fc-lite-btn" id="fc-lite-random-btn" type="button">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6M1 20v-6h6M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
              换一篇
            </button>
            <a class="fc-lite-btn fc-lite-btn-primary" href="${escapeHtml(article.link)}" target="_blank" rel="noopener">阅读文章</a>
          </div>
        </div>
        <div class="fc-lite-random-body">
          ${renderRandomBody(article)}
        </div>
      </div>
    `;
  }

  function renderFilters(counts) {
    return `
      <div class="fc-lite-filter-bar">
        <div class="fc-lite-tabs">
          ${CATEGORIES.map(c => `
            <button class="fc-lite-tab${state.currentCategory === c.key ? ' active' : ''}" data-cat="${c.key}" type="button" style="--cat-color:${c.color}">
              ${c.label}<span class="fc-lite-tab-count">${counts[c.key] || 0}</span>
            </button>
          `).join('')}
        </div>
        <div class="fc-lite-search">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input type="text" id="fc-lite-search-input" placeholder="搜索标题、作者..." value="${escapeHtml(state.searchQuery)}">
        </div>
      </div>
    `;
  }

  function renderArticleCard(article, index) {
    const cat = getCategory(article.category);
    return `
      <article class="fc-lite-card" data-cat="${article.category}" data-title="${escapeHtml(article.title)}" data-author="${escapeHtml(article.author)}" style="--card-enter-delay:${index * 40}ms">
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
          <button class="fc-lite-author-btn" type="button" data-author="${escapeHtml(article.author)}" data-avatar="${escapeHtml(article.avatar || ERROR_IMG)}" data-link="${escapeHtml(article.link)}">${escapeHtml(article.author)}</button>
          </div>
        </div>
      </article>
    `;
  }

  function filterArticles() {
    const q = state.searchQuery.trim().toLowerCase();
    // 搜索时自动跨分类查找；没有搜索词时按当前分类筛选
    const cat = q ? 'all' : state.currentCategory;
    return state.articles.filter(a => {
      if (cat !== 'all' && a.category !== cat) return false;
      if (q) {
        const text = (a.title + ' ' + a.author).toLowerCase();
        const catLabel = getCategory(a.category).label.toLowerCase();
        // 同时匹配标题/作者、分类名、分类 key（如搜 "AI" 能命中 AI 分类全部文章）
        if (text.indexOf(q) === -1 && catLabel.indexOf(q) === -1 && a.category.indexOf(q) === -1) return false;
      }
      return true;
    });
  }

  function updateTabVisuals(root) {
    const q = state.searchQuery.trim();
    root.querySelectorAll('.fc-lite-tab').forEach(b => {
      const activeKey = q ? 'all' : state.currentCategory;
      b.classList.toggle('active', b.dataset.cat === activeKey);
    });
  }

  function updateVisibleCards(root) {
    const grid = root.querySelector('.fc-lite-grid');
    const empty = root.querySelector('.fc-lite-empty');
    const filtered = filterArticles();
    const cards = Array.from(grid.querySelectorAll('.fc-lite-card'));
    cards.forEach(card => {
      const show = filtered.some(a => a._el === card);
      card.style.display = show ? '' : 'none';
    });
    if (empty) empty.style.display = filtered.length ? 'none' : 'block';
    updateTabVisuals(root);
  }

  function pickRandom() {
    if (!state.articles.length) return null;
    let idx;
    do { idx = Math.floor(Math.random() * state.articles.length); }
    while (state.articles.length > 1 && idx === state.randomIndex);
    state.randomIndex = idx;
    return state.articles[idx];
  }

  function render(root, data) {
    const stats = data.statistical_data || {};
    state.articles = (data.article_data || []).map(a => ({
      ...a,
      category: classifyTitle(a.title),
      _el: null,
    }));

    const counts = { all: state.articles.length };
    state.articles.forEach(a => { counts[a.category] = (counts[a.category] || 0) + 1; });

    const randomArticle = pickRandom();
    const filtered = filterArticles();

    root.innerHTML = `
      ${renderStats(stats)}
      ${renderRandomArticle(randomArticle)}
      ${renderFilters(counts)}
      <div class="fc-lite-grid">
        ${state.articles.map((a, i) => renderArticleCard(a, i)).join('')}
      </div>
      <div class="fc-lite-empty" style="display:${filtered.length ? 'none' : 'block'}">没有匹配的文章</div>
    `;

    // 绑定卡片 DOM 引用（用于后续筛选时避免重绘）
    const cards = Array.from(root.querySelectorAll('.fc-lite-card'));
    cards.forEach((card, i) => { state.articles[i]._el = card; });

    bindEvents(root);
  }

  function bindEvents(root) {
    root.querySelectorAll('.fc-lite-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        state.currentCategory = btn.dataset.cat;
        root.querySelectorAll('.fc-lite-tab').forEach(b => {
          b.classList.toggle('active', b.dataset.cat === state.currentCategory);
        });
        updateVisibleCards(root);
      });
    });

    const searchInput = root.querySelector('#fc-lite-search-input');
    if (searchInput) {
      let timer;
      searchInput.addEventListener('input', e => {
        state.searchQuery = e.target.value;
        clearTimeout(timer);
        timer = setTimeout(() => updateVisibleCards(root), 150);
      });
    }

    const randomBtn = root.querySelector('#fc-lite-random-btn');
    if (randomBtn) {
      randomBtn.addEventListener('click', () => {
        const a = pickRandom();
        if (!a) return;
        const randomBody = root.querySelector('.fc-lite-random-body');
        if (randomBody) {
          randomBody.innerHTML = renderRandomBody(a);
        }
      });
    }
    // 统计卡片已是 <a href> 原生跳转，无需额外 click 处理

    // 博主名称点击 → 弹出其最近文章面板
    // 用事件委托挂在 root 上，「换一篇」重渲染后的随机区按钮也能命中
    root.addEventListener('click', function (e) {
      const authorBtn = e.target.closest('.fc-lite-author-btn');
      if (!authorBtn) return;
      e.preventDefault();
      showAuthorPanel(authorBtn.dataset.author, authorBtn.dataset.avatar, authorBtn.dataset.link);
    });
  }

  function init() {
    const root = document.getElementById('friend-circle-lite-root');
    if (!root) return;
    root.innerHTML = '<div class="fc-lite-loading">正在加载朋友圈...</div>';

    fetch(API_URL, { cache: "no-cache" })
      .then(r => {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(data => render(root, data))
      .catch(err => {
        root.innerHTML = '<div class="fc-lite-error">朋友圈数据加载失败，请稍后刷新重试。</div>';
        console.error('[fcircle-lite-custom] 加载失败:', err);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
