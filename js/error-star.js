/**
 * 404 星图迷航 · 海报式长页（v9，Canvas2D 伪 3D + 电影史诗）
 * ------------------------------------------------------------
 * v8 重构：星座(SEC.03)与星轨(SEC.04)改为 Canvas2D 伪 3D 渲染（点云在「松散团↔旋臂星系」间插值变形，
 *   相机 dolly + yaw/pitch 多轴旋转；星轨中心恒星 + 3 倾角环 + 行星，缩放与角度随滚动同时变化）。
 * v9 升级（电影级质感）：
 *   - 相机进度缓动 camEase（lerp 0.10），让所有 3D 运动带惯性、更顺滑；
 *   - #endy-grade 后期层：暗角 + 胶片颗粒 + 冷暖色散（仅 404 页注入）；
 *   - 标题动态揭示：章节 H2 进入视口时从左擦除 + 辉光脉冲，章节标号字距收回淡入；
 *   - S4 中心恒星四向星芒 + 对角微芒 + 镜头光晕环；体积星云三团冷暖色雾增强纵深；
 *   - 星座 hero 星彗尾拖拽（上一帧连线）；曲速点火加屏幕中心闪光 + 向心汇聚星流。
 *   透视投影见 project()，形态/轨道定义在 buildCloud() / RING_DEFS。
 * 仅在 #error-wrap 存在的 404 页激活，其余页面首行即退，零开销。
 * 六幕：
 *   S0 起点：声呐 + 404 + 归航环（滚动 >140px 取消自动归航）
 *   S1 迷航：「信号丢失」叙事，坐标数字随滚动跳动
 *   SEC.03 星图：3D 点云形态变形——星点即最近文章，悬停出卡、点击直达
 *   SEC.04 星轨：3D 轨道系统飞行（缩放 + 角度随滚动同时变化）
 *   SEC.05 点火：长按屏幕 → 曲率加速（星海后掠成线 + 火箭尾焰 + VEL/G 读数）
 *   S5 归航：CTA「回到陆地」+ 三个快捷入口
 * 主题：404 是星空叙事页，强制夜间（data-theme=dark）并隐藏全站明暗切换入口；
 *       原主题存 __endyPrevTheme，pjax 离开时恢复；MutationObserver 兜底锁定。
 * 长按冲突：404 常驻 window.__endyMeteorBlock=true，meteor-boost 长按蓄力让位。
 * 降级：prefers-reduced-motion → 无火箭/无视差/无 canvas 动画（静态星座），自动归航保留
 */
(function () {
  'use strict';
  if (!document.getElementById('error-wrap')) return;
  if (window.__endyStarReady) return;
  window.__endyStarReady = true;

  var REDUCED = false;
  try { REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  /* ================= 锁定夜间主题 ================= */
  // 404 是纯星空叙事页，日间配色会破坏氛围 → 进入即切 dark，离开（pjax）恢复。
  var htmlEl = document.documentElement;
  var prevTheme = htmlEl.getAttribute('data-theme');
  window.__endy404 = true;            // 供看板娘 chips / 面板过滤「切主题」入口
  window.__endyMeteorBlock = true;    // 让 meteor-boost 长按蓄力休眠（火箭点火接管长按）
  htmlEl.setAttribute('data-theme', 'dark');
  htmlEl.setAttribute('data-endy-404', '1'); // CSS 借此隐藏 #darkmode / #menu-darkmode / .darkmode_switchbutton
  // 保险锁：404 期间任何代码（右键菜单 / 看板娘语音指令）把主题切回 light 都立即压回
  var themeLock = new MutationObserver(function () {
    if (htmlEl.getAttribute('data-theme') !== 'dark') htmlEl.setAttribute('data-theme', 'dark');
  });
  themeLock.observe(htmlEl, { attributes: true, attributeFilter: ['data-theme'] });
  window.addEventListener('pjax:before', function () {
    themeLock.disconnect();
    htmlEl.removeAttribute('data-endy-404');
    htmlEl.setAttribute('data-theme', prevTheme || 'light');
    window.__endy404 = false;
    window.__endyMeteorBlock = false;
  });

  /* ================= 数据 ================= */
  var posts = [];
  Array.prototype.forEach.call(document.querySelectorAll('.aside-list .aside-list-item'), function (it) {
    var a = it.querySelector('.content a.title') || it.querySelector('a.title');
    if (!a) return;
    posts.push({
      title: (a.textContent || '').trim(),
      href: a.href,
      date: (it.querySelector('time') || {}).textContent || '',
      cover: (it.querySelector('.thumbnail img') || {}).src || ''
    });
  });
  posts = posts.slice(0, 6);

  var content = document.querySelector('#error-wrap .error-content');
  var errorImg = document.querySelector('#error-wrap .error-img');

  /* ================= S1~S3 场景 DOM ================= */
  var SCENES = [
    { id: 'endy-scene-1', cls: 's1', mark: 'SEC.01 — DRIFTING', h: '信号丢失', p: '你在星海里偏离了航线 <b>0.42</b> 光年。<br>别慌——先抬头看一看这片天。', ghost: 'LOST' },
    { id: 'endy-scene-2', cls: 's2', mark: 'SEC.02 — COORDINATES', h: '重新定位', p: '移动光标，十字线会告诉你：你一直都在这里。', hud: true, coord: true },
    { id: 'endy-scene-3', cls: 's3', mark: 'SEC.03 — CONSTELLATION', h: '星图检索', p: '这片星座是我的足迹。<br>悬停星点看地名，点击直达那颗星。', ghost: 'STARS', hint: '把光标放到星点上' },
    { id: 'endy-scene-4', cls: 's4', mark: 'SEC.04 — ORBITS', h: '星轨', p: '每一圈轨道，<br>都是一次没说出口的「欢迎回来」。', orbit: true },
    { id: 'endy-scene-5', cls: 's5', mark: 'SEC.05 — IGNITION', h: '曲率引擎', p: '这里是航行的最深处。<br><b>按住屏幕任意处</b>，整片星海会为你后掠。', ghost: 'BURN', hint: '长按屏幕 · 点火', rocket: true },
    { id: 'endy-scene-6', cls: 's6', mark: 'SEC.06 — LANDING', h: '归航', p: '桥就在前面了。<br>潮水退去，星光会送你回去。', cta: true }
  ];
  var sections = []; // {el, progress}

  function buildScenes() {
    var frag = document.createDocumentFragment();
    SCENES.forEach(function (sc, i) {
      var sec = document.createElement('section');
      sec.id = sc.id;
      sec.className = 'endy-scene ' + sc.cls;
      var inner = document.createElement('div');
      inner.className = 'endy-scene-inner';
      inner.innerHTML =
        '<span class="endy-scene-tag">' + sc.mark + '</span>' +
        '<h2 class="endy-scene-h">' + sc.h + '</h2>' +
        '<p class="endy-scene-p">' + sc.p + '</p>' +
        (sc.coord ? '<div class="endy-coord"><span id="endy-coord">LAT 23.0727° N</span><span class="dot">·</span><span id="endy-coord2">LON 113.1507° E</span></div>' : '') +
        (sc.hint ? '<div class="endy-scene-hint">' + sc.hint + '</div>' : '') +
        (sc.orbit ? '<div class="endy-orbit"><div class="o o1"></div><div class="o o2"></div><div class="o o3"></div><div class="sat"><i></i></div><div class="sat s2"><i></i></div></div>' : '') +
        (sc.rocket ? '<div id="endy-rocket-hud"><span id="endy-rocket-vel">VEL 00.0 km/s</span><span class="sep">·</span><span id="endy-rocket-g">G 1.0</span><em id="endy-rocket-state">引擎待命</em></div>' : '') +
        (sc.cta ? '' +
          '<div class="endy-cta-row">' +
          '  <a class="endy-cta main" href="/"><i>⌂</i> 回到陆地</a>' +
          '  <a class="endy-cta" href="/archives/">归档</a>' +
          '  <a class="endy-cta" href="/categories/">分类</a>' +
          '  <a class="endy-cta" href="javascript:toRandomPost()" onclick="toRandomPost()">随便逛逛</a>' +
          '</div>' : '');
      if (sc.ghost) {
        var gh = document.createElement('div');
        gh.className = 'endy-ghost';
        gh.textContent = sc.ghost;
        sec.appendChild(gh);
      }
      sec.appendChild(inner);
      frag.appendChild(sec);
      sections.push({ el: sec, progress: 0, ghost: gh || null });
      gh = null;
    });
    // 挂到 #body-wrap.error 内、#error-wrap 之后
    var bw = document.getElementById('body-wrap');
    bw.appendChild(frag);

    // 入场：IntersectionObserver
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          if (en.isIntersecting) en.target.classList.add('is-in');
        });
      }, { threshold: 0.35 });
      sections.forEach(function (s) { io.observe(s.el); });
    } else {
      sections.forEach(function (s) { s.el.classList.add('is-in'); });
    }

    // 航程节点轴
    var voyage = document.createElement('div');
    voyage.id = 'endy-voyage';
    voyage.innerHTML =
      '<a data-to="0" title="起点"><i></i><span>起点</span></a>' +
      '<a data-to="1" title="迷航"><i></i><span>迷航</span></a>' +
      '<a data-to="2" title="定位"><i></i><span>定位</span></a>' +
      '<a data-to="3" title="星图"><i></i><span>星图</span></a>' +
      '<a data-to="4" title="星轨"><i></i><span>星轨</span></a>' +
      '<a data-to="5" title="点火"><i></i><span>点火</span></a>' +
      '<a data-to="6" title="归航"><i></i><span>归航</span></a>';
    document.body.appendChild(voyage);
    voyage.addEventListener('click', function (e) {
      var a = e.target.closest('a[data-to]');
      if (!a) return;
      e.preventDefault();
      var idx = +a.dataset.to;
      var target = idx === 0 ? document.getElementById('error-wrap') : sections[idx - 1].el;
      smoothTo(target, 420);
    });
  }

  function smoothTo(el, offset) {
    var y = el.getBoundingClientRect().top + (window.scrollY || 0) - (offset || 0);
    if (window.__endyLenis && window.__endyLenis.scrollTo) {
      window.__endyLenis.scrollTo(y, { duration: 1.35 });
    } else {
      try { window.scrollTo({ top: y, behavior: 'smooth' }); } catch (e) { window.scrollTo(0, y); }
    }
  }

  /* ================= HUD 制图准线（S2） ================= */
  var hud = null, hudRead = null;
  function buildHud() {
    hud = document.createElement('div');
    hud.id = 'endy-hud';
    hud.innerHTML = '<div class="hx"></div><div class="hy"></div><div class="hc"></div><div class="hr">LAT --.-- · LON --.--</div>';
    document.body.appendChild(hud);
    hudRead = hud.querySelector('.hr');
    window.addEventListener('pointermove', function (e) {
      hud.style.setProperty('--hx', e.clientX + 'px');
      hud.style.setProperty('--hy', e.clientY + 'px');
      hudRead.textContent = 'LAT ' + (23 + e.clientY / window.innerHeight * 0.9).toFixed(3) + ' N · LON ' + (113 + e.clientX / window.innerWidth * 0.9).toFixed(3) + ' E';
    }, { passive: true });
  }

  /* ================= 星野 + 星座 canvas ================= */
  var cv = null, ctx = null, W = 0, H = 0, DPR = 1;
  var bgStars = [];      // 星野：三层视差
  var nodes = [];        // 星座节点（= 文章）
  var hoverIdx = -1, starTip = null;
  var star3dState = null;   // S2 相机状态（诊断用）
  var orbit3dState = null;  // S4 相机状态（诊断用）
  var camEase = { s2: -1, s4: -1 };  // 相机进度缓动（让 3D 运动更顺滑、有惯性）
  var heroPrev = {};        // 星座 hero 上一帧屏幕坐标（用于彗尾拖拽）

  /* ---- 3D 投影与相机（伪 3D，Canvas2D） ----
     相机：位置(x,y,z) + 偏航 yaw + 俯仰 pitch + 焦距 focal。
     世界点先绕 Y 轴 yaw、再绕 X 轴 pitch 旋入相机空间，再做透视除法：
       屏幕 = 焦点·(旋转后坐标) / 视深
     视深 < near 即在相机背后，剔除（实现"穿行/飞越"）。 */
  function project(px, py, pz, cam) {
    var dx = px - cam.x, dy = py - cam.y, dz = pz - cam.z;
    var cyaw = Math.cos(cam.yaw), syaw = Math.sin(cam.yaw);
    var x1 = dx * cyaw + dz * syaw;
    var z1 = -dx * syaw + dz * cyaw;
    var cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);
    var y1 = dy * cp - z1 * sp;
    var z2 = dy * sp + z1 * cp;          // 视深（正=前方）
    if (z2 < cam.near) return null;      // 相机背后或过于贴近 → 剔除
    var f = cam.focal / z2;
    return { x: cam.cx + x1 * f, y: cam.cy + y1 * f, s: f, depth: z2 };
  }
  // 种子随机：保证每次刷新形态一致（避免每帧抖动）
  function srand(seed) {
    var s = seed >>> 0;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function easeInOut(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

  /* S2 形态：SHAPE_A 松散星座团 / SHAPE_B 对数螺旋星系盘，滚动进度 m 在两形态间插值。
     前 6 个索引为 hero（= 文章星），连线构成星座轮廓，变形时一并平移。 */
  var STARN = 60, shapeA = [], shapeB = [];
  var HERO_LINKS = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 3]];
  function buildCloud() {
    var rnd = srand(20261002);
    var hpos = [[-200, 130, -60], [70, -180, 50], [220, 100, -30], [-130, -160, 90], [150, 210, -90], [270, -50, 70]];
    for (var i = 0; i < STARN; i++) {
      // A：椭球松散团
      var u = rnd() * 2 - 1, th = rnd() * Math.PI * 2, rr = 90 + rnd() * 240;
      var ax = Math.cos(th) * Math.sqrt(1 - u * u) * rr * 1.15;
      var ay = Math.sin(th) * Math.sqrt(1 - u * u) * rr * 0.78;
      var az = u * rr * 0.9;
      // B：对数螺旋星系盘（黄金角铺点 + 中央隆起）
      var ang = i * 2.399963, rad = Math.sqrt(i / STARN) * 300;
      var bx = Math.cos(ang) * rad, by = Math.sin(ang) * rad;
      var bz = (rnd() - 0.5) * 26 * (1 - rad / 320);
      shapeA.push([ax, ay, az]);
      shapeB.push([bx, by, bz]);
    }
    for (var k = 0; k < 6; k++) {
      // hero 形态塞进 A/B 对应索引，使 morph 时星座星也平滑移动
      shapeA[k] = [hpos[k][0] * 0.9, hpos[k][1] * 0.9, hpos[k][2] * 0.9];
      shapeB[k] = [hpos[k][0] * 1.15, hpos[k][1] * 1.15, hpos[k][2] * 1.15];
    }
  }

  /* S4 轨道系统：中心恒星 + 3 个不同倾角/升交点的环 + 行星。
     环平面由两个正交基向量 u,v 张成（先按 inc 绕 X 倾转，再按 node 绕 Z 旋转）。 */
  var RING_DEFS = [
    { R: 150, N: 46, inc: 0.0,  node: 0.0,  speed: 0.18,  col: '158,224,214' },
    { R: 232, N: 54, inc: 1.02, node: 0.7,  speed: -0.12, col: '190,205,255' },
    { R: 322, N: 60, inc: -0.62, node: -0.5, speed: 0.085, col: '255,214,150' }
  ];
  var PLANET_DEFS = [
    { ring: 0, ph: 0.0, sz: 7, col: '#d8fff7' },
    { ring: 1, ph: 2.1, sz: 9, col: '#ffd9a0' },
    { ring: 2, ph: 4.0, sz: 6, col: '#bcd0ff' }
  ];
  function ringBasis(inc, node) {
    var ci = Math.cos(inc), si = Math.sin(inc), cn = Math.cos(node), sn = Math.sin(node);
    return {
      u: [cn, sn, 0],
      v: [-sn * ci, cn * ci, si]
    };
  }
  function hexToRgba(hex, a) {
    var h = hex.replace('#', '');
    var r = parseInt(h.substring(0, 2), 16), g = parseInt(h.substring(2, 4), 16), b = parseInt(h.substring(4, 6), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a.toFixed(3) + ')';
  }

  function buildCanvas() {
    cv = document.createElement('canvas');
    cv.id = 'endy-404-canvas';
    document.body.appendChild(cv);
    // 电影级后期层：暗角 + 颗粒 + 色散（纯展示，pointer-events:none）
    var grade = document.createElement('div');
    grade.id = 'endy-grade';
    document.body.appendChild(grade);
    ctx = cv.getContext('2d');
    sizeCanvas();
    window.addEventListener('resize', sizeCanvas, { passive: true });
    buildCloud();

    for (var i = 0; i < 110; i++) {
      bgStars.push({
        x: Math.random(), y: Math.random(),
        r: 0.4 + Math.random() * 1.5,
        depth: 0.12 + Math.random() * 0.5,
        tw: Math.random() * Math.PI * 2
      });
    }
    // hero 节点占位（屏幕坐标，供悬停/点击命中）
    for (var j = 0; j < Math.min(posts.length, 6); j++) {
      nodes.push({ x: 0, y: 0, on: false, s: 1 });
    }
    // 星点悬停卡（复用声呐卡样式）
    starTip = document.createElement('div');
    starTip.id = 'endy-star-tip';
    starTip.innerHTML = '<img alt="" /><div class="t"><span class="ti"></span><span class="td"></span></div>';
    document.body.appendChild(starTip);
    starTip.addEventListener('pointerleave', function () { starTip.classList.remove('on'); hoverIdx = -1; });

    // 画布本身 pointer-events:none，悬停/点击改由 window 监听 + 命中测试（不受层级遮挡影响）
    window.addEventListener('pointermove', onCvMove, { passive: true });
    window.addEventListener('click', onCvClick, true);
  }
  function sizeCanvas() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    cv.width = W * DPR; cv.height = H * DPR;
    cv.style.width = W + 'px'; cv.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function drawCanvas(t, scroll) {
    ctx.clearRect(0, 0, W, H);
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    var starCol = dark ? '158,224,214' : '255,255,255';
    var starA = dark ? 0.85 : 0.7;

    // ① 星野：三层视差 + 闪烁（始终存在，作为星海底）
    for (var i = 0; i < bgStars.length; i++) {
      var s = bgStars[i];
      var sy = ((s.y * H - scroll * s.depth) % H + H) % H;
      var tw = 0.55 + 0.45 * Math.sin(t / 900 + s.tw);
      ctx.fillStyle = 'rgba(' + starCol + ',' + (starA * s.depth * 1.4 * tw).toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(s.x * W, sy, s.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 悬停命中状态每帧重置，由下方各幕重新点亮
    for (var ni = 0; ni < nodes.length; ni++) nodes[ni].on = false;

    // ② S2 星座：3D 点云形态变形（滚动驱动相机 dolly + 多轴旋转）
    var p2t = sections[1] ? secProgress(sections[1]) : 0;
    if (camEase.s2 < 0) camEase.s2 = p2t; else camEase.s2 += (p2t - camEase.s2) * 0.10;
    var p2 = camEase.s2;
    if (p2 > 0.02 && p2 < 1.02) drawConstellation3D(t, p2);
    // ③ S4 星轨：3D 轨道系统飞行（缩放 + 角度同时变化）
    var p4t = sections[3] ? secProgress(sections[3]) : 0;
    if (camEase.s4 < 0) camEase.s4 = p4t; else camEase.s4 += (p4t - camEase.s4) * 0.10;
    var p4 = camEase.s4;
    if (p4 > 0.02 && p4 < 1.02) drawOrbits3D(t, p4);
  }

  /* S2：3D 点云形态变形 —— 滚动时相机在三维空间 dolly 前进 + yaw/pitch 旋转，
     点云在 SHAPE_A(松散团)↔SHAPE_B(旋臂星系) 间插值变形，点-线真正在空间中变换。 */
  function drawConstellation3D(t, p2) {
    var fade = Math.min(1, p2 / 0.12) * Math.min(1, (1.05 - p2) / 0.12);
    if (fade <= 0.01) return;
    var m = easeInOut(Math.max(0, Math.min(1, p2)));
    var cam = {
      x: 0, y: 0,
      z: 560 - m * 470,                                   // dolly：随滚动向点云逼近
      yaw: (p2 - 0.5) * 0.95 + Math.sin(t / 9000) * 0.06, // 偏航
      pitch: Math.sin(p2 * Math.PI) * 0.28,               // 俯仰
      focal: 640, near: 12, cx: W / 2, cy: H * 0.44
    };
    star3dState = { p2: +p2.toFixed(3), camz: Math.round(cam.z), yaw: +cam.yaw.toFixed(3), pitch: +cam.pitch.toFixed(3) };

    var pts = [];
    for (var i = 0; i < STARN; i++) {
      var a = shapeA[i], b = shapeB[i];
      var wx = a[0] + (b[0] - a[0]) * m;
      var wy = a[1] + (b[1] - a[1]) * m;
      var wz = a[2] + (b[2] - a[2]) * m;
      var isHero = i < 6;
      var amp = isHero ? 5 : 12;
      wx += Math.sin(t / 1700 + i * 1.7) * amp;          // 每点独立 Lissajous 漂浮
      wy += Math.cos(t / 2100 + i * 2.3) * amp * 0.7;
      wz += Math.sin(t / 1500 + i * 0.9) * amp * 0.8;
      var pr = project(wx, wy, wz, cam);
      if (!pr) continue;
      pts.push({ x: pr.x, y: pr.y, s: pr.s, depth: pr.depth, hero: isHero, i: i });
    }
    pts.sort(function (p, q) { return q.depth - p.depth; });

    var heroSc = {};
    for (var hi = 0; hi < pts.length; hi++) { if (pts[hi].hero) heroSc[pts[hi].i] = pts[hi]; }

    ctx.globalCompositeOperation = 'lighter';
    // 彗尾：把 hero 星本帧屏幕坐标与上一帧连线，随漂动/相机运动拉出拖尾
    for (var ti = 0; ti < pts.length; ti++) {
      var hp = pts[ti];
      if (!hp.hero) continue;
      var prv = heroPrev[hp.i];
      if (prv && Math.hypot(hp.x - prv.x, hp.y - prv.y) < 220) {
        var ta = 0.20 * fade * Math.min(1.5, hp.s);
        var tg = ctx.createLinearGradient(prv.x, prv.y, hp.x, hp.y);
        tg.addColorStop(0, 'rgba(255,255,255,0)');
        tg.addColorStop(1, 'rgba(190,235,255,' + ta.toFixed(3) + ')');
        ctx.strokeStyle = tg;
        ctx.lineWidth = 2.4 * Math.min(1.6, hp.s);
        ctx.beginPath(); ctx.moveTo(prv.x, prv.y); ctx.lineTo(hp.x, hp.y); ctx.stroke();
      }
      heroPrev[hp.i] = { x: hp.x, y: hp.y };
    }
    for (var li = 0; li < HERO_LINKS.length; li++) {       // 星座连线（additive bloom）
      var h1 = heroSc[HERO_LINKS[li][0]], h2 = heroSc[HERO_LINKS[li][1]];
      if (!h1 || !h2) continue;
      var la = (0.30 + 0.22 * Math.sin(t / 520 + li)) * fade;
      var g = ctx.createLinearGradient(h1.x, h1.y, h2.x, h2.y);
      g.addColorStop(0, 'rgba(158,224,214,' + la.toFixed(3) + ')');
      g.addColorStop(1, 'rgba(190,212,255,' + (la * 0.5).toFixed(3) + ')');
      ctx.strokeStyle = g; ctx.lineWidth = 1.1;
      ctx.beginPath(); ctx.moveTo(h1.x, h1.y); ctx.lineTo(h2.x, h2.y); ctx.stroke();
    }
    for (var pi = 0; pi < pts.length; pi++) {
      var p = pts[pi];
      var sc = Math.min(1.8, Math.max(0.55, p.s));
      var baseR = (p.hero ? 4.2 : 1.5) * sc;
      var glow = (p.hero ? 26 : 9) * sc;
      var col = p.hero ? '255,255,255' : '170,210,235';
      var alpha = (p.hero ? 0.95 : 0.55) * fade * Math.min(1.4, p.s * 1.1);
      var rg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glow);
      rg.addColorStop(0, 'rgba(' + col + ',' + Math.min(1, alpha).toFixed(3) + ')');
      rg.addColorStop(1, 'rgba(' + col + ',0)');
      ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(p.x, p.y, glow, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(' + col + ',' + Math.min(1, alpha * 1.2).toFixed(3) + ')';
      ctx.beginPath(); ctx.arc(p.x, p.y, baseR, 0, Math.PI * 2); ctx.fill();
      if (p.hero && p.i < nodes.length) {
        nodes[p.i].x = p.x; nodes[p.i].y = p.y; nodes[p.i].s = p.s; nodes[p.i].on = true;
      }
    }
    ctx.globalCompositeOperation = 'source-over';
  }

  /* S4：3D 轨道系统飞行 —— 中心恒星 + 3 个不同倾角环 + 行星；
     滚动时相机同时 dolly(缩放) 与 yaw(角度) 变化，空间里同时缩放和转动。 */
  function drawOrbits3D(t, p4) {
    var fade = Math.min(1, p4 / 0.12) * Math.min(1, (1.05 - p4) / 0.12);
    if (fade <= 0.01) return;
    var m = easeInOut(Math.max(0, Math.min(1, p4)));
    var cam = {
      x: 0, y: 0,
      z: 600 - m * 430,                                   // dolly：缩放
      yaw: m * 1.15 + Math.sin(t / 12000) * 0.05,         // 角度：随滚动持续偏转
      pitch: 0.16 + Math.sin(p4 * Math.PI) * 0.22,
      focal: 660, near: 12, cx: W / 2, cy: H * 0.5
    };
    orbit3dState = { p4: +p4.toFixed(3), camz: Math.round(cam.z), yaw: +cam.yaw.toFixed(3), pitch: +cam.pitch.toFixed(3) };

    // 局部星云底光（电影史诗感）
    var neb = ctx.createRadialGradient(W / 2, H * 0.5, 0, W / 2, H * 0.5, Math.max(W, H) * 0.5);
    neb.addColorStop(0, 'rgba(42,54,120,' + (0.22 * fade).toFixed(3) + ')');
    neb.addColorStop(0.5, 'rgba(20,26,62,' + (0.10 * fade).toFixed(3) + ')');
    neb.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = neb; ctx.fillRect(0, 0, W, H);

    // 体积星云：几团错位冷暖色雾，制造“星际尘埃”纵深（additive 叠加在底光上）
    var blobs = [
      ['rgba(70,110,255,', W * 0.34, H * 0.42, 280],
      ['rgba(255,150,90,', W * 0.66, H * 0.58, 320],
      ['rgba(120,220,210,', W * 0.5, H * 0.32, 240]
    ];
    for (var bi = 0; bi < blobs.length; bi++) {
      var bb = blobs[bi];
      var rg = ctx.createRadialGradient(bb[1], bb[2], 0, bb[1], bb[2], bb[3]);
      rg.addColorStop(0, bb[0] + (0.16 * fade).toFixed(3) + ')');
      rg.addColorStop(1, bb[0] + '0)');
      ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H);
    }

    var pts = [];
    pts.push({ kind: 'star', x: 0, y: 0, z: 0 });
    for (var ri = 0; ri < RING_DEFS.length; ri++) {
      var rd = RING_DEFS[ri], basis = ringBasis(rd.inc, rd.node);
      for (var k = 0; k < rd.N; k++) {
        var ang = (k / rd.N) * Math.PI * 2 + t / 1000 * rd.speed;
        var ca = Math.cos(ang) * rd.R, sa = Math.sin(ang) * rd.R;
        pts.push({
          kind: 'ring', col: rd.col,
          x: ca * basis.u[0] + sa * basis.v[0],
          y: ca * basis.u[1] + sa * basis.v[1],
          z: ca * basis.u[2] + sa * basis.v[2]
        });
      }
    }
    for (var pi2 = 0; pi2 < PLANET_DEFS.length; pi2++) {
      var pd = PLANET_DEFS[pi2], rd2 = RING_DEFS[pd.ring], b2 = ringBasis(rd2.inc, rd2.node);
      var ang2 = pd.ph + t / 1000 * rd2.speed;
      var ca2 = Math.cos(ang2) * rd2.R, sa2 = Math.sin(ang2) * rd2.R;
      pts.push({
        kind: 'planet', col: pd.col, sz: pd.sz,
        x: ca2 * b2.u[0] + sa2 * b2.v[0],
        y: ca2 * b2.u[1] + sa2 * b2.v[1],
        z: ca2 * b2.u[2] + sa2 * b2.v[2]
      });
    }

    var proj = [];
    var starPr = null;
    for (var qi = 0; qi < pts.length; qi++) {
      var pr = project(pts[qi].x, pts[qi].y, pts[qi].z, cam);
      if (!pr) continue;
      if (pts[qi].kind === 'star') starPr = { x: pr.x, y: pr.y, s: pr.s };
      proj.push({ p: pts[qi], x: pr.x, y: pr.y, s: pr.s, depth: pr.depth });
    }
    proj.sort(function (a, b) { return b.depth - a.depth; });

    ctx.globalCompositeOperation = 'lighter';
    for (var ji = 0; ji < proj.length; ji++) {
      var it = proj[ji], pp = it.p;
      var a2 = fade * Math.min(1.5, it.s * 1.2);
      if (pp.kind === 'star') {
        var sg = 120 * Math.min(2, it.s);
        var gs = ctx.createRadialGradient(it.x, it.y, 0, it.x, it.y, sg);
        gs.addColorStop(0, 'rgba(255,247,214,' + (0.95 * fade).toFixed(3) + ')');
        gs.addColorStop(0.25, 'rgba(255,214,140,' + (0.55 * fade).toFixed(3) + ')');
        gs.addColorStop(1, 'rgba(255,180,90,0)');
        ctx.fillStyle = gs; ctx.beginPath(); ctx.arc(it.x, it.y, sg, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,' + (0.95 * fade).toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(it.x, it.y, 9 * it.s, 0, Math.PI * 2); ctx.fill();
      } else if (pp.kind === 'ring') {
        var rg = ctx.createRadialGradient(it.x, it.y, 0, it.x, it.y, 7);
        rg.addColorStop(0, 'rgba(' + pp.col + ',' + Math.min(1, a2).toFixed(3) + ')');
        rg.addColorStop(1, 'rgba(' + pp.col + ',0)');
        ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(it.x, it.y, 7, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(' + pp.col + ',' + Math.min(1, a2 * 1.3).toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(it.x, it.y, 1.3 * it.s, 0, Math.PI * 2); ctx.fill();
      } else {
        var pg = ctx.createRadialGradient(it.x, it.y, 0, it.x, it.y, pp.sz * 4 * it.s);
        pg.addColorStop(0, hexToRgba(pp.col, 0.9 * fade));
        pg.addColorStop(0.4, hexToRgba(pp.col, 0.4 * fade));
        pg.addColorStop(1, hexToRgba(pp.col, 0));
        ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(it.x, it.y, pp.sz * 4 * it.s, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = hexToRgba(pp.col, 0.95 * fade);
        ctx.beginPath(); ctx.arc(it.x, it.y, pp.sz * it.s, 0, Math.PI * 2); ctx.fill();
      }
    }
    // 中心恒星：四向星芒 + 对角微芒 + 镜头光晕环（lens flare），强化“星核”仪式感
    if (starPr) {
      var sx = starPr.x, sy = starPr.y, ss = starPr.s;
      var L = 150 * Math.min(2.2, ss);
      var mkA = ctx.createLinearGradient(sx - L, sy, sx + L, sy);
      mkA.addColorStop(0, 'rgba(255,240,200,0)');
      mkA.addColorStop(0.5, 'rgba(255,245,210,' + (0.5 * fade).toFixed(3) + ')');
      mkA.addColorStop(1, 'rgba(255,240,200,0)');
      ctx.strokeStyle = mkA; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(sx - L, sy); ctx.lineTo(sx + L, sy); ctx.stroke();
      var mkB = ctx.createLinearGradient(sx, sy - L, sx, sy + L);
      mkB.addColorStop(0, 'rgba(255,240,200,0)');
      mkB.addColorStop(0.5, 'rgba(255,245,210,' + (0.5 * fade).toFixed(3) + ')');
      mkB.addColorStop(1, 'rgba(255,240,200,0)');
      ctx.strokeStyle = mkB; ctx.beginPath(); ctx.moveTo(sx, sy - L); ctx.lineTo(sx, sy + L); ctx.stroke();
      ctx.save(); ctx.translate(sx, sy); ctx.rotate(Math.PI / 4); ctx.lineWidth = 1;
      var mkC = ctx.createLinearGradient(-L * 0.6, 0, L * 0.6, 0);
      mkC.addColorStop(0, 'rgba(200,225,255,0)');
      mkC.addColorStop(0.5, 'rgba(210,230,255,' + (0.28 * fade).toFixed(3) + ')');
      mkC.addColorStop(1, 'rgba(200,225,255,0)');
      ctx.strokeStyle = mkC; ctx.beginPath(); ctx.moveTo(-L * 0.6, 0); ctx.lineTo(L * 0.6, 0); ctx.stroke();
      ctx.restore();
      ctx.strokeStyle = 'rgba(255,230,180,' + (0.35 * fade).toFixed(3) + ')';
      ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(sx, sy, 26 * ss, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = 'rgba(160,200,255,' + (0.16 * fade).toFixed(3) + ')';
      ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(sx, sy, 54 * ss, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';
  }

  function onCvMove(e) {
    if (!nodes.length) return;
    var best = -1, bd = 26;
    for (var i = 0; i < nodes.length; i++) {
      if (!nodes[i].on) continue;                 // 仅命中当前可见且已点亮的星点
      var d = Math.hypot(nodes[i].x - e.clientX, nodes[i].y - e.clientY);
      if (d < bd) { bd = d; best = i; }
    }
    // 命中目标在交互元素上时不当作星点（避免遮挡链接/按钮）
    if (best >= 0 && e.target && e.target.closest && e.target.closest('a, button, input, textarea, select, .endy-scene-inner, #endy-voyage, #endy-home-ring, .error-content')) {
      best = -1;
    }
    if (best !== hoverIdx) {
      hoverIdx = best;
      if (best >= 0) {
        var p = posts[best];
        starTip.querySelector('.ti').textContent = p.title;
        starTip.querySelector('.td').textContent = p.date || '';
        if (p.cover) { starTip.querySelector('img').src = p.cover; starTip.querySelector('img').style.display = ''; }
        else { starTip.querySelector('img').style.display = 'none'; }
        starTip.style.left = nodes[best].x + 'px';
        starTip.style.top = (nodes[best].y - 18) + 'px';
        starTip.classList.add('on');
      } else {
        starTip.classList.remove('on');
      }
    } else if (best >= 0) {
      starTip.style.left = nodes[best].x + 'px';
      starTip.style.top = (nodes[best].y - 18) + 'px';
    }
  }
  function onCvClick(e) {
    // 不拦截真实链接/按钮，仅在空白处命中星点时跳转
    if (e.target && e.target.closest && e.target.closest('a, button, input, textarea, select, .endy-scene-inner, #endy-voyage, #endy-home-ring, .error-content')) return;
    if (hoverIdx >= 0 && nodes[hoverIdx] && nodes[hoverIdx].on && posts[hoverIdx]) {
      window.location.href = posts[hoverIdx].href;
    }
  }

  /* ================= 火箭点火（S5 · 曲率加速） =================
     长按屏幕：速度 v 缓入至 1，星海拉成后掠光线（三层视差），
     矢量火箭尾焰拉长 + 机体微震，HUD 实时读 VEL / G；
     松手：缓出回到巡航漂移。空格键同样可点火（可达性）。 */
  var rk = { hold: false, v: 0, streaks: [], armed: false };
  var rkVel = null, rkG = null, rkState = null;

  function buildRocket() {
    var hudEl = document.getElementById('endy-rocket-hud');
    if (hudEl) {
      rkVel = document.getElementById('endy-rocket-vel');
      rkG = document.getElementById('endy-rocket-g');
      rkState = document.getElementById('endy-rocket-state');
    }
    // 三层星速线（与星野分离：只在点火幕绘制）
    for (var i = 0; i < 90; i++) {
      rk.streaks.push({
        y: Math.random(),
        depth: [0.35, 0.65, 1.0][i % 3],
        ph: Math.random() * Math.PI * 2,
        len: 0.4 + Math.random() * 0.8
      });
    }
    var s5ok = function () {
      var s5 = sections[4];
      return s5 && s5.progress > 0.3 && s5.progress < 1.05;
    };
    var isInteractive = function (t) {
      return !!(t && t.closest && t.closest('a, button, input, textarea, select, #endy-voyage, #endy-home-ring, #rightside, .error-content'));
    };
    window.addEventListener('pointerdown', function (e) {
      if (REDUCED || rk.hold || isInteractive(e.target) || !s5ok()) return;
      rk.hold = true;
      rk.armed = true;
      document.body.style.userSelect = 'none';
    }, true);
    window.addEventListener('pointerup', release, true);
    window.addEventListener('pointercancel', release, true);
    // 触屏向上滚动 = 想走，不是想飞
    window.addEventListener('pointermove', function (e) {
      if (!rk.hold || e.pointerType !== 'touch') return;
      if (Math.abs(e.clientY - (rk.startY || e.clientY)) > 16) release();
      if (rk.startY === undefined) rk.startY = e.clientY;
    }, { passive: true, capture: true });
    window.addEventListener('keydown', function (e) {
      if (e.code !== 'Space' || rk.hold || e.repeat || !s5ok()) return;
      var t = e.target;
      if (t && t.closest && t.closest('input, textarea, button, a')) return;
      rk.hold = true; rk.armed = true; rk.startY = undefined;
      document.body.style.userSelect = 'none';
    });
    window.addEventListener('keyup', function (e) { if (e.code === 'Space') release(); });
    // 长按不弹菜单
    window.addEventListener('contextmenu', function (e) {
      if (rk.hold) e.preventDefault();
    });
    function release() {
      if (!rk.hold) return;
      rk.hold = false;
      rk.startY = undefined;
      document.body.style.userSelect = '';
    }
  }

  function drawRocket(ts) {
    var s5 = sections[4];
    if (!s5) return;
    var vis = s5.progress > 0.04 && s5.progress < 1.02;
    // 速度：按住缓入（约 2s 拉满），松手缓出
    var goal = (rk.hold && vis) ? 1 : 0;
    rk.v += (goal - rk.v) * (rk.hold ? 0.028 : 0.045);
    if (rk.v < 0.001) rk.v = 0;
    var v = rk.v;

    // HUD 读数
    if (rkVel) {
      if (v > 0.003 || rk.hold) {
        rkVel.textContent = 'VEL ' + (v * 52.0).toFixed(1) + ' km/s';
        rkG.textContent = 'G ' + (1 + v * 3.2).toFixed(1);
        rkState.textContent = rk.hold ? (v > 0.85 ? '曲率航行' : '点火中') : (v > 0.05 ? '减速滑行' : '引擎待命');
        document.getElementById('endy-rocket-hud').classList.toggle('hot', rk.hold && v > 0.4);
      } else if (rkState && rkState.textContent !== '引擎待命') {
        rkState.textContent = '引擎待命';
        document.getElementById('endy-rocket-hud').classList.remove('hot');
      }
    }
    if (!vis) return;

    // ① 星速线：巡航慢漂 → 点火后拉成贯穿光线
    var baseA = Math.min(1, 0.25 + v * 1.1);
    for (var i = 0; i < rk.streaks.length; i++) {
      var st = rk.streaks[i];
      var spd = (0.06 + v * st.depth * 52) * st.len;
      var x = ((st.ph * W) - (ts / 16.7) * spd) % (W + 260);
      if (x < -260) x += W + 260;
      var y = st.y * H;
      var ln = 2 + v * st.depth * st.len * 150;
      var a = baseA * (0.2 + st.depth * 0.55);
      var grad = ctx.createLinearGradient(x, y, x + ln, y);
      grad.addColorStop(0, 'rgba(158,224,214,0)');
      grad.addColorStop(0.5, 'rgba(190,235,255,' + a.toFixed(3) + ')');
      grad.addColorStop(1, 'rgba(158,224,214,0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 0.8 + st.depth * 1.3;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + ln, y);
      ctx.stroke();
    }

    // ② 火箭：位于文字下方，侧视朝右
    var rx = W * 0.5 + Math.sin(ts / 1400) * 6 + (v > 0.3 ? (Math.random() - 0.5) * v * 3 : 0);
    var ry = H * 0.66 + Math.sin(ts / 1750) * 8;
    var S = 1; // 缩放基准
    ctx.save();
    ctx.translate(rx, ry);
    // 机身微仰（点火时压低抬头）
    ctx.rotate(-0.06 - v * 0.05);
    ctx.scale(S, S);
    // 尾焰（先画，垫在机身后）
    if (v > 0.02) {
      var fl = 26 + v * 110 + Math.sin(ts / 42) * v * 9 + Math.random() * v * 6;
      var fw = 9 + v * 7;
      var fg = ctx.createLinearGradient(-16, 0, -16 - fl, 0);
      fg.addColorStop(0, 'rgba(255,255,255,' + (0.9).toFixed(2) + ')');
      fg.addColorStop(0.3, 'rgba(140,180,255,' + (0.75 * Math.min(1, v + 0.3)).toFixed(2) + ')');
      fg.addColorStop(1, 'rgba(75,92,196,0)');
      ctx.fillStyle = fg;
      ctx.beginPath();
      ctx.moveTo(-16, -fw / 2);
      ctx.quadraticCurveTo(-16 - fl * 0.55, -fw * 0.4, -16 - fl, 0);
      ctx.quadraticCurveTo(-16 - fl * 0.55, fw * 0.4, -16, fw / 2);
      ctx.closePath();
      ctx.fill();
      // 焰心亮点
      ctx.fillStyle = 'rgba(255,255,255,' + (0.55 + v * 0.4).toFixed(2) + ')';
      ctx.beginPath();
      ctx.arc(-18, 0, 2.4 + v * 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
    // 尾翼（上下）
    ctx.fillStyle = '#4b5cc4';
    ctx.beginPath();
    ctx.moveTo(-14, -8); ctx.lineTo(-26, -17); ctx.lineTo(-9, -9); ctx.closePath(); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-14, 8); ctx.lineTo(-26, 17); ctx.lineTo(-9, 9); ctx.closePath(); ctx.fill();
    // 机身
    var bg1 = ctx.createLinearGradient(0, -9, 0, 9);
    bg1.addColorStop(0, '#e8eefc');
    bg1.addColorStop(0.5, '#c9d4f2');
    bg1.addColorStop(1, '#93a3cf');
    ctx.fillStyle = bg1;
    ctx.beginPath();
    ctx.moveTo(20, 0);                              // 头尖
    ctx.quadraticCurveTo(16, -9, 2, -9);            // 上肩
    ctx.lineTo(-16, -7);                            // 上尾
    ctx.quadraticCurveTo(-19, 0, -16, 7);           // 尾弧
    ctx.lineTo(2, 9);
    ctx.quadraticCurveTo(16, 9, 20, 0);             // 下肩回尖
    ctx.closePath();
    ctx.fill();
    // 头锥
    ctx.fillStyle = '#8ea6ff';
    ctx.beginPath();
    ctx.moveTo(20, 0);
    ctx.quadraticCurveTo(15, -8.4, 8, -8.8);
    ctx.lineTo(8, 8.8);
    ctx.quadraticCurveTo(15, 8.4, 20, 0);
    ctx.closePath();
    ctx.fill();
    // 舷窗
    ctx.fillStyle = '#22305e';
    ctx.beginPath(); ctx.arc(-1, -0.5, 3.6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(158,224,214,0.9)';
    ctx.beginPath(); ctx.arc(-1, -0.5, 2.4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.beginPath(); ctx.arc(-2.1, -1.7, 0.9, 0, Math.PI * 2); ctx.fill();
    // 机身描边（点火时发热泛光）
    if (v > 0.5) {
      ctx.strokeStyle = 'rgba(255,214,150,' + ((v - 0.5) * 0.7).toFixed(2) + ')';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.restore();

    // ③ 曲速闪光 + 向心汇聚星流（屏幕中心，不受火箭本体变换影响）
    if (v > 0.32) {
      var cx2 = W / 2, cy2 = H / 2;
      var fl = (v - 0.32) / 0.68;
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      var fg = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, Math.max(W, H) * (0.18 + fl * 0.5));
      fg.addColorStop(0, 'rgba(255,255,255,' + (0.5 * fl).toFixed(3) + ')');
      fg.addColorStop(0.4, 'rgba(180,210,255,' + (0.22 * fl).toFixed(3) + ')');
      fg.addColorStop(1, 'rgba(120,160,255,0)');
      ctx.fillStyle = fg; ctx.fillRect(0, 0, W, H);
      var beams = 26;
      ctx.strokeStyle = 'rgba(200,225,255,' + (0.5 * fl).toFixed(3) + ')';
      ctx.lineWidth = 1.2;
      for (var bi2 = 0; bi2 < beams; bi2++) {
        var ang = (bi2 / beams) * Math.PI * 2 + ts / 4000;
        var r0 = Math.max(W, H) * 0.75, r1 = Math.max(W, H) * (0.10 + fl * 0.2);
        ctx.beginPath();
        ctx.moveTo(cx2 + Math.cos(ang) * r0, cy2 + Math.sin(ang) * r0);
        ctx.lineTo(cx2 + Math.cos(ang) * r1, cy2 + Math.sin(ang) * r1);
        ctx.stroke();
      }
      ctx.restore();
    }
  }

  /* ================= 幕进度 & 主循环 ================= */
  function secProgress(sec) {
    var r = sec.el.getBoundingClientRect();
    var vh = window.innerHeight || 1;
    // 进入视口下沿 → 完全离开上沿，映射 0→1
    return Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height * 0.4)));
  }

  var coordEl = null, coordTick = 0;
  var voyageEl = null, activeScene = -1;
  var para = { x: 0, y: 0 }, paraTarget = { x: 0, y: 0 };
  var webBg = null, raf = 0, sweepT0 = 0, tilt = { x: 0, y: 0 }, tiltTarget = { x: 0, y: 0 }, hasTilt = false;
  var SWEEP_MS = 2200;
  var radar = null;

  function fxFrame(ts) {
    raf = requestAnimationFrame(fxFrame);
    var scroll = window.scrollY || 0;
    if (!sweepT0) sweepT0 = ts;

    // 幕进度 → CSS 变量 + 航程轴激活态
    var act = 0;
    for (var i = 0; i < sections.length; i++) {
      var p = secProgress(sections[i]);
      sections[i].progress = p; // 供 ghost 视差 / HUD 显隐读取
      sections[i].el.style.setProperty('--p', p.toFixed(3));
      if (scroll > window.innerHeight * 0.5 * (i + 1)) act = i + 1;
    }
    if (voyageEl && act !== activeScene) {
      activeScene = act;
      Array.prototype.forEach.call(voyageEl.children, function (a, k) { a.classList.toggle('on', k === act); });
    }

    // 坐标数字随滚动跳动
    var coordEl2 = document.getElementById('endy-coord2');
    if (coordEl && scroll > 10) {
      coordTick++;
      if (coordTick % 6 === 0) {
        var lat = 23.0727 + (scroll % 97) / 97 * 0.42, lon = 113.1507 + (scroll % 53) / 53 * 0.42;
        coordEl.textContent = 'LAT ' + lat.toFixed(4) + '° N';
        if (coordEl2) coordEl2.textContent = 'LON ' + lon.toFixed(4) + '° E';
      }
    }

    // 幽灵大字：随幕进度反向横移
    for (var gi = 0; gi < sections.length; gi++) {
      var gEl = sections[gi].ghost;
      if (gEl) gEl.style.setProperty('--sh', ((0.5 - sections[gi].progress) * 300).toFixed(1) + 'px');
    }

    // HUD 准线：仅在 S2 幕内显示
    if (hud) {
      var p2s = sections[1] ? sections[1].progress : 0;
      var vis = p2s > 0.12 && p2s < 0.92;
      hud.style.opacity = vis ? Math.min(1, (Math.min(p2s, 0.5) - 0.12) * 6).toFixed(2) : '0';
      hud.style.pointerEvents = 'none';
    }

    // 星野/星座
    if (ctx) drawCanvas(ts, scroll);
    // 火箭点火（S5）：星速线 + 矢量火箭 + HUD
    if (ctx) drawRocket(ts);

    // 星轨（S4）：改由 canvas 3D 轨道系统绘制（见 drawOrbits3D），
    // 滚动驱动相机 dolly(缩放) + yaw(角度) 同时变化；状态记录在 orbit3dState。

    // 声呐：扫描点亮 + tilt
    if (radar) {
      var deg = ((ts - sweepT0) / SWEEP_MS * 360) % 360;
      for (var s2i = 0; s2i < sonarStars.length; s2i++) {
        var sd = (sonarStars[s2i].ang * 180 / Math.PI + 90 + 360) % 360;
        var d = (deg - sd + 360) % 360;
        sonarStars[s2i].el.style.setProperty('--lit', (d < 110 ? 1 - d / 110 : 0).toFixed(3));
      }
      tilt.x += ((hasTilt ? tiltTarget.x : 0) - tilt.x) * 0.1;
      tilt.y += ((hasTilt ? tiltTarget.y : 0) - tilt.y) * 0.1;
      radar.style.transform = 'perspective(700px) rotateX(' + (-tilt.y * 6).toFixed(2) + 'deg) rotateY(' + (tilt.x * 7).toFixed(2) + 'deg)';
    }

    // 水面视差
    para.x += (paraTarget.x - para.x) * 0.06;
    para.y += (paraTarget.y - para.y) * 0.06;
    if (webBg) webBg.style.transform = 'translate3d(' + (-para.x * 14).toFixed(1) + 'px,' + (-para.y * 10).toFixed(1) + 'px,0) scale(1.045)';
    if (content) content.style.transform = 'translate3d(' + (para.x * 7).toFixed(1) + 'px,' + (para.y * 5).toFixed(1) + 'px,0)';
  }

  window.addEventListener('pointermove', function (e) {
    paraTarget.x = (e.clientX / Math.max(window.innerWidth, 1) - 0.5) * 2;
    paraTarget.y = (e.clientY / Math.max(window.innerHeight, 1) - 0.5) * 2;
  }, { passive: true });

  /* ================= 声呐雷达（S0） ================= */
  var sonarStars = [], sonarTip = null;
  function buildRadar() {
    if (!content) return;
    radar = document.createElement('div');
    radar.id = 'endy-radar';
    radar.innerHTML =
      '<div class="endy-radar-ring"></div>' +
      '<div class="endy-radar-ring r2"></div>' +
      '<div class="endy-radar-cross"></div>' +
      '<div class="endy-radar-ping"></div>' +
      '<div class="endy-radar-sweep"></div>' +
      '<div class="endy-radar-core"></div>';
    var n = posts.length;
    for (var i = 0; i < n; i++) {
      var ang = (-90 + i * (360 / Math.max(n, 1)) + (Math.random() * 36 - 18)) * Math.PI / 180;
      var r = 74 + (i % 3) * 17;
      var s = document.createElement('a');
      s.className = 'endy-radar-star';
      s.href = posts[i].href;
      s.title = posts[i].title;
      s.style.setProperty('--sx', (Math.cos(ang) * r).toFixed(1) + 'px');
      s.style.setProperty('--sy', (Math.sin(ang) * r).toFixed(1) + 'px');
      radar.appendChild(s);
      sonarStars.push({ el: s, ang: ang });
    }
    sonarTip = document.createElement('div');
    sonarTip.id = 'endy-radar-tip';
    sonarTip.innerHTML = '<img alt="" /><div class="t"><span class="ti"></span><span class="td"></span></div>';
    radar.appendChild(sonarTip);
    if (errorImg) errorImg.style.display = 'none';
    content.insertBefore(radar, content.firstChild);

    sonarStars.forEach(function (st, i) {
      st.el.addEventListener('pointerenter', function () {
        var p = posts[i] || {};
        sonarTip.querySelector('.ti').textContent = p.title || '';
        sonarTip.querySelector('.td').textContent = p.date || '';
        if (p.cover) { sonarTip.querySelector('img').src = p.cover; sonarTip.querySelector('img').style.display = ''; }
        else { sonarTip.querySelector('img').style.display = 'none'; }
        sonarTip.style.setProperty('--tx', st.el.style.getPropertyValue('--sx'));
        sonarTip.style.setProperty('--ty', st.el.style.getPropertyValue('--sy'));
        radar.classList.add('tip-on');
      });
      st.el.addEventListener('pointerleave', function () { radar.classList.remove('tip-on'); });
    });
    radar.addEventListener('pointermove', function (e) {
      var r = radar.getBoundingClientRect();
      if (!r.width) return;
      tiltTarget.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      tiltTarget.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      hasTilt = true;
    }, { passive: true });
    radar.addEventListener('pointerleave', function () { hasTilt = false; }, { passive: true });
  }

  /* ================= 归航环（滚动即取消自动跳转） ================= */
  var HOME_MS = 10000, ringElapsed = 0, ringLast = 0, ringPaused = false, ringDone = false, ringCancelled = false;
  var ringEl = null, ringProg = null, ringNum = null;

  function buildRing() {
    ringEl = document.createElement('div');
    ringEl.id = 'endy-home-ring';
    ringEl.innerHTML =
      '<svg viewBox="0 0 52 52"><circle class="track" cx="26" cy="26" r="18"/>' +
      '<circle class="prog" cx="26" cy="26" r="18"/></svg>' +
      '<span class="num">10</span><span class="lbl">归航</span>';
    ringProg = ringEl.querySelector('.prog');
    ringNum = ringEl.querySelector('.num');
    var C = (2 * Math.PI * 18).toFixed(2);
    ringProg.style.strokeDasharray = C;
    ringProg.style.strokeDashoffset = C;
    ringEl.addEventListener('pointerenter', function () { ringPaused = true; ringEl.classList.add('pause'); });
    ringEl.addEventListener('pointerleave', function () { ringPaused = false; ringEl.classList.remove('pause'); ringLast = 0; requestAnimationFrame(ringFrame); });
    ringEl.addEventListener('click', goHome);
    ringEl.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') goHome(); });
    ringEl.setAttribute('tabindex', '0');
    ringEl.setAttribute('role', 'button');
    ringEl.setAttribute('aria-label', '10 秒后自动返回主页，滚动可取消；点击立即返回');

    var homeBtn = document.querySelector('#error-wrap .error-info a.button--animated');
    if (homeBtn && homeBtn.parentNode) {
      var row = document.createElement('div');
      row.className = 'endy-home-row';
      homeBtn.parentNode.insertBefore(row, homeBtn);
      row.appendChild(homeBtn);
      row.appendChild(ringEl);
    } else {
      (content || document.body).appendChild(ringEl);
    }
    requestAnimationFrame(ringFrame);
  }
  function ringFrame(ts) {
    if (ringDone || !ringEl || !ringEl.isConnected) return;
    if (!ringCancelled && !ringPaused) {
      var dt = ringLast ? Math.min(ts - ringLast, 100) : 16.7;
      ringLast = ts;
      ringElapsed += dt;
      var p = Math.min(1, ringElapsed / HOME_MS);
      ringProg.style.strokeDashoffset = (113.1 * (1 - p)).toFixed(2);
      ringNum.textContent = Math.ceil((HOME_MS - ringElapsed) / 1000);
      ringEl.classList.toggle('urgent', HOME_MS - ringElapsed < 3000);
      if (p >= 1) { goHome(); return; }
    } else if (ringCancelled) {
      ringNum.textContent = '⌂';
    }
    requestAnimationFrame(ringFrame);
  }
  // 长页下：用户一开始滚动就取消自动归航
  window.addEventListener('scroll', function () {
    if (!ringCancelled && !ringDone && (window.scrollY || 0) > 140) {
      ringCancelled = true;
      ringEl.classList.remove('urgent');
      ringEl.classList.add('cancelled');
      ringEl.setAttribute('aria-label', '点击立即返回主页');
    }
  }, { passive: true });
  function goHome() {
    if (ringDone) return;
    ringDone = true;
    ringEl.classList.add('go');
    setTimeout(function () { window.location.href = '/'; }, 180);
  }

  /* ================= 点水涟漪 + 光尘 ================= */
  function spawnRipple(x, y) {
    for (var k = 0; k < 2; k++) {
      var r = document.createElement('div');
      r.className = 'endy-ripple' + (k ? ' r2' : '');
      r.style.left = x + 'px'; r.style.top = y + 'px';
      document.body.appendChild(r);
      setTimeout(function (el) { return function () { el.remove(); }; }(r), 1600);
    }
    var n = 2 + (Math.random() * 2 | 0);
    for (var j = 0; j < n; j++) {
      var sp = document.createElement('div');
      sp.className = 'endy-spark';
      sp.style.left = (x + (Math.random() * 44 - 22)) + 'px';
      sp.style.top = (y + (Math.random() * 18 - 9)) + 'px';
      sp.style.setProperty('--sdx', ((Math.random() * 60 - 30) | 0) + 'px');
      sp.style.animationDelay = (Math.random() * 0.25).toFixed(2) + 's';
      document.body.appendChild(sp);
      setTimeout(function (el) { return function () { el.remove(); }; }(sp), 1900);
    }
  }
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (t && t.closest && t.closest('a, button, input, #endy-radar, #endy-home-ring, .error-content, .endy-scene-inner, #endy-voyage')) return;
    spawnRipple(e.clientX, e.clientY);
  }, true);

  function buildDust() {
    var d = document.createElement('div');
    d.id = 'endy-dust';
    for (var i = 0; i < 11; i++) {
      var s = document.createElement('i');
      var sz = 2.5 + Math.random() * 3.5;
      s.style.cssText =
        'left:' + (Math.random() * 100).toFixed(1) + '%;top:' + (12 + Math.random() * 82).toFixed(1) + '%;' +
        'width:' + sz.toFixed(1) + 'px;height:' + sz.toFixed(1) + 'px;' +
        'animation-duration:' + (7 + Math.random() * 9).toFixed(1) + 's;' +
        'animation-delay:-' + (Math.random() * 9).toFixed(1) + 's;' +
        '--dx:' + ((Math.random() * 70 - 35) | 0) + 'px;';
      d.appendChild(s);
    }
    document.body.appendChild(d);
  }

  /* ================= 流星编排 ================= */
  var meteorTimers = [];
  var meteorsArmed = false;
  var dbg = { observerFired: 0, armed: 0, fired: 0, blocked: 0 };
  function armMeteors() {
    if (meteorsArmed) return;
    meteorsArmed = true;
    dbg.armed++;
    var fire = function (pw, dx, dy) {
      if (document.hidden || window.__endyDragActive) { dbg.blocked++; return; }
      if (!document.getElementById('error-wrap')) { dbg.blocked++; return; }
      dbg.fired++;
      window.__endyMeteorOverload(pw, dx, dy);
    };
    var cx = function () { return window.innerWidth * (0.3 + Math.random() * 0.4); };
    var cy = function () { return window.innerHeight * (0.18 + Math.random() * 0.25); };
    meteorTimers.push(setTimeout(function () { fire(1, cx(), cy()); }, 800));
    meteorTimers.push(setTimeout(function () { fire(0.7, cx(), cy()); }, 2100));
    (function cruise() {
      meteorTimers.push(setTimeout(function () {
        fire(0.3 + Math.random() * 0.15, cx(), cy());
        cruise();
      }, 9000 + Math.random() * 4000));
    })();
  }
  function scheduleMeteors() {
    if (REDUCED || typeof window.__endyMeteorOverload !== 'function') return;
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      armMeteors();
    } else {
      var mo = new MutationObserver(function () {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
          dbg.observerFired++;
          mo.disconnect();
          meteorTimers.push(setTimeout(armMeteors, 600));
        }
      });
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    }
  }

  /* ================= Miku 台词 ================= */
  function mikuLines() {
    var tries = 0;
    (function poll() {
      var o = window.oml2d;
      if ((!o || !o.tipsMessage) && ++tries < 30) return setTimeout(poll, 600);
      if (!o || !o.tipsMessage) return;
      var alive = function () { return !!document.getElementById('error-wrap'); };
      var say = function (t, d) { try { if (alive()) o.tipsMessage(t, d, 2); } catch (e) {} };
      setTimeout(function () { say('这条路……没有星星呢。往下滚，我带你看看这片天～', 6000); }, 2500);
      setTimeout(function () { say('星图上那几个亮点，是我最近去过的地方哦，点一颗就送你去～', 6000); }, 9000);
      setTimeout(function () { say('桥就在前面啦，随时可以回家～', 8000); }, 16000);
      setTimeout(function () { say('想试试超光速吗？在「曲率引擎」那节，长按屏幕不放～', 8000); }, 26000);
    })();
  }

  /* ================= 启动 ================= */
  // 主题的全屏加载遮罩（#loading-box）靠 window load 淡出；404 页背景图大、load 慢，
  // 会白屏很久。场景不依赖大图加载，600ms 后主动淡出。
  setTimeout(function () {
    var lb = document.getElementById('loading-box');
    if (lb) lb.classList.add('endy-hide');
  }, 600);
  buildScenes();
  buildRadar();
  buildRing();
  if (!REDUCED) {
    webBg = document.getElementById('web_bg');
    buildCanvas();
    buildDust();
    buildHud();
    buildRocket();
  } else {
    sections.forEach(function (s) { s.el.classList.add('is-in'); });
  }
  coordEl = document.getElementById('endy-coord');
  voyageEl = document.getElementById('endy-voyage');
  raf = requestAnimationFrame(fxFrame);
  scheduleMeteors();
  mikuLines();

  window.addEventListener('pagehide', function () {
    meteorTimers.forEach(clearTimeout);
    if (raf) cancelAnimationFrame(raf);
  });

  window.__endyStarState = function () {
    return {
      posts: posts.length,
      scenes: sections.length,
      ring: ringEl ? { elapsedS: +(ringElapsed / 1000).toFixed(1), cancelled: ringCancelled, done: ringDone } : null,
      hoverIdx: hoverIdx,
      reduced: REDUCED,
      dbg: dbg,
      rocketHold: rk ? rk.hold : null,
      rocketV: rk ? +(rk.v).toFixed(3) : null,
      star3d: star3dState,
      orbit3d: orbit3dState,
      nodes: nodes.map(function (n) { return { x: +(n.x || 0).toFixed(2), y: +(n.y || 0).toFixed(2), on: !!n.on }; })
    };
  };
})();
