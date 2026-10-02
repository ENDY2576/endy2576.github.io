/**
 * 夜间流星雨 · 长按蓄力 → 星河过载（v2）
 * ------------------------------------------------------------
 * 仅夜间模式（[data-theme="dark"]）生效。左键长按屏幕任意空白处：
 *   阶段 1  按下 140ms 内：光标处浮现一枚「蓄力环」，此时不生成流星；
 *   阶段 2  长按蓄力 1.3s：环形进度顺时针填满，周围 200~440px 大范围
 *           稀疏地升起流星（不再糊成一团）；
 *   阶段 3  进度拉满：触发「星河过载」——冲击波扩散 + 全屏幕流星雨，
 *           其中约 18% 是彗星级（更快、更长、更亮、带光晕）；
 *   阶段 4  松手：环淡出，过载强度 1.4s 内线性衰减，残留流星飞完自动停。
 *
 * 设计要点（世界级微交互）：
 *  - 全程 pointer-events:none，不挡任何点击；
 *  - 落在按钮/链接/输入框/看板娘上 → 直接跳过，绝不抢交互；
 *  - 鼠标按住移动 → 焦点平滑跟随（像用手电筒划过夜空）；触屏移动 >16px 视为滚动 → 取消；
 *  - 帧率自适应：掉帧时自动降生成率（quality 0.55/0.8/1.0），弱机不卡；
 *  - 空闲零开销：无事可做时停 rAF、隐藏画布；
 *  - 尊重 prefers-reduced-motion：直接关闭；切到浅色模式自动收手。
 *
 * 可调参数都集中在下面 CFG 里。
 */
(function () {
  'use strict';
  if (window.__endyMeteorReady) return;
  window.__endyMeteorReady = true;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return; // 减少动态：不启用

  var CFG = {
    holdMs: 140,            // 触发长按（环开始蓄力）的阈值
    fullMs: 1300,           // 蓄力到满所需时长
    chargeDecayMs: 900,     // 松手后蓄力归零时长
    overloadDecayMs: 1400,  // 松手后过载余晖衰减时长
    moveCancelTouch: 16,    // 触屏移动超过此像素 → 取消
    maxParticles: 240,      // 粒子上限（过载稳态约 240，再高没意义还吃性能）
    localMinR: 200,         // 局部流星最小半径（解决「范围太小」）
    localMaxR: 440,         // 满蓄力时局部半径
    localRateBase: 0.22,    // 局部生成率基数（解决「太密集」：原版 0.6 起跳）
    localRateGain: 1.15,    // 局部生成率随蓄力的增量（原版 2.6，太猛）
    overloadRate: 3.8,      // 全屏过载每帧生成数
    pulseMs: 1500,          // 过载持续期间每隔多久补一圈弱冲击波
    cometChance: 0.18,      // 过载时「彗星」概率：更快更亮更长
    burstCount: 26,         // 拉满瞬间额外迸发的流星数
    dialSize: 52,
    ringR: 18,
    ticks: 12
  };

  // 落在这些元素上不触发（真实 UI 控件 + 看板娘图层）
  var SKIP_SELECTOR = 'a,button,input,textarea,select,label,[role="button"],#miku-settings-panel,' +
                      '#miku-chat-dialog,#oml2d-stage,#miku-hitbox,#oml2d-tips,.rightside-item,.rightside-config';
  var GLOW = '150, 220, 205'; // 葱绿偏青，柔光与尾色借用

  var canvas, ctx, dpr = 1, W = 0, H = 0;
  var particles = [];
  var shocks = [];
  var raf = 0, last = 0;
  var charging = false;
  var charge = 0;             // 0~1 蓄力
  var overloaded = false;
  var burst = 0;              // 0~1 过载强度（松手后衰减）
  var focus = { x: 0, y: 0 }; // 实际聚焦点（平滑跟随）
  var target = { x: 0, y: 0 };// 光标位置
  var start = { x: 0, y: 0 };
  var moved = false;
  var holdTimer = 0;
  var dtSmooth = 16.7;
  var quality = 1;
  var pulseAcc = 0;

  // ---- 蓄力环 ----
  var dial, prog, spin, core, tickEls = [];
  var dialScale = 0.72, dialTarget = 0.72, dialOn = false;
  var dialPos = { x: 0, y: 0 };
  var C = 2 * Math.PI * CFG.ringR;
  var lastTickBucket = -1;

  function ensureCanvas() {
    if (canvas) return;
    canvas = document.createElement('canvas');
    canvas.id = 'miku-meteor';
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;' +
      'z-index:9990;pointer-events:none;display:none;mix-blend-mode:screen;';
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
  }

  function resize() {
    if (!canvas) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  // ---------------- 蓄力环 DOM ----------------
  function ensureDial() {
    if (dial) return;
    dial = document.createElement('div');
    dial.id = 'endy-meteor-dial';
    var ticks = '';
    for (var i = 0; i < CFG.ticks; i++) {
      var a = (i / CFG.ticks) * Math.PI * 2 - Math.PI / 2;
      var c = Math.cos(a), s = Math.sin(a);
      ticks += '<line class="tick" x1="' + (24 + c * 21.4).toFixed(2) + '" y1="' + (24 + s * 21.4).toFixed(2) +
               '" x2="' + (24 + c * 23.6).toFixed(2) + '" y2="' + (24 + s * 23.6).toFixed(2) + '"/>';
    }
    dial.innerHTML =
      '<svg viewBox="0 0 48 48" aria-hidden="true">' +
        '<circle class="track" cx="24" cy="24" r="' + CFG.ringR + '"/>' +
        '<g class="ticks">' + ticks + '</g>' +
        '<circle class="prog" cx="24" cy="24" r="' + CFG.ringR + '"/>' +
        '<circle class="spin" cx="24" cy="24" r="' + CFG.ringR + '"/>' +
        '<circle class="core" cx="24" cy="24" r="2.4"/>' +
      '</svg>';
    document.body.appendChild(dial);
    prog = dial.querySelector('.prog');
    spin = dial.querySelector('.spin');
    core = dial.querySelector('.core');
    tickEls = dial.querySelectorAll('.tick');
    if (prog) {
      prog.style.strokeDasharray = C + ' ' + C;
      prog.style.strokeDashoffset = C;
    }
    if (spin) spin.style.strokeDasharray = (C * 0.12).toFixed(2) + ' ' + C.toFixed(2);
  }

  function showDial(x, y) {
    ensureDial();
    dialPos.x = x; dialPos.y = y;
    focus.x = x; focus.y = y;
    dialScale = 0.72; dialTarget = 1;
    dialOn = true;
    dial.classList.add('is-on');
    applyDialTransform();
  }

  function hideDial() {
    if (!dial) return;
    dialOn = false;
    dialTarget = 1.4;
    dial.classList.remove('is-on', 'is-full');
  }

  function applyDialTransform() {
    if (!dial) return;
    dial.style.transform = 'translate3d(' + (dialPos.x - CFG.dialSize / 2).toFixed(1) + 'px,' +
      (dialPos.y - CFG.dialSize / 2).toFixed(1) + 'px,0) scale(' + dialScale.toFixed(3) + ')';
  }

  function updateDial() {
    if (!dial) return;
    if (prog) prog.style.strokeDashoffset = (C * (1 - charge)).toFixed(2);
    if (core) core.style.opacity = (0.35 + charge * 0.6).toFixed(2);
    var bucket = Math.floor(charge * CFG.ticks);
    if (bucket !== lastTickBucket) {
      lastTickBucket = bucket;
      for (var i = 0; i < tickEls.length; i++) {
        tickEls[i].style.opacity = i <= bucket - 1 ? '1' : '0.18';
      }
    }
    dial.classList.toggle('is-full', overloaded);
    applyDialTransform();
  }

  // ---------------- 粒子 ----------------
  function spawnOne(global) {
    if (particles.length >= CFG.maxParticles) return;
    var x, y, sp;
    if (global) {
      // 全屏：从左下方整片区域随机起飞，斜向右上
      x = -80 + Math.random() * (W * 0.95);
      y = H * 0.10 + Math.random() * (H * 1.05);
      sp = 7 + Math.random() * 6;
    } else {
      // 局部：大范围环带散布（中心不堆，避免「太密集」）
      var R = CFG.localMinR + (CFG.localMaxR - CFG.localMinR) * charge;
      var rr = R * (0.32 + 0.68 * Math.sqrt(Math.random()));
      var ang = Math.random() * Math.PI * 2;
      x = focus.x + Math.cos(ang) * rr;
      y = focus.y + Math.sin(ang) * rr;
      sp = 4.5 + Math.random() * 6;
    }
    // 斜向上飞：角度 -62° ~ -28°（向右上方）
    var a = (-28 - Math.random() * 34) * Math.PI / 180;
    var comet = Math.random() < (global ? CFG.cometChance : CFG.cometChance * 0.35);
    var len = 60 + Math.random() * 90;
    if (comet) {
      sp *= 1.9 + Math.random() * 0.7;   // 更快
      len *= 1.6 + Math.random() * 0.6;  // 更长
    }
    particles.push({
      x: x, y: y,
      vx: Math.cos(a) * sp,
      vy: Math.sin(a) * sp,               // 负值 → 向上
      len: len,
      life: 0,
      maxLife: (global ? 900 : 1100) + Math.random() * 900,
      w: (1.2 + Math.random() * 1.3) * (comet ? 1.5 : 1),
      comet: comet
    });
  }

  function triggerOverload() {
    overloaded = true;
    burst = 1;
    shocks.push({ x: focus.x, y: focus.y, t: 0 });
    for (var i = 0; i < CFG.burstCount; i++) {
      // 瞬间从聚焦点迸发一小批（彗星概率更高，形成「炸开」感）
      var ang = Math.random() * Math.PI * 2;
      var rr = 30 + Math.random() * 150;
      var sp = 8 + Math.random() * 8;
      var a = (-28 - Math.random() * 34) * Math.PI / 180;
      var comet = Math.random() < CFG.cometChance * 1.6;
      var len = 70 + Math.random() * 110;
      if (comet) { sp *= 2.1 + Math.random() * 0.6; len *= 1.8 + Math.random() * 0.5; }
      particles.push({
        x: focus.x + Math.cos(ang) * rr,
        y: focus.y + Math.sin(ang) * rr,
        vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        len: len, life: 0,
        maxLife: 800 + Math.random() * 800,
        w: (1.3 + Math.random() * 1.4) * (comet ? 1.5 : 1),
        comet: comet
      });
    }
    if (dial) dial.classList.add('is-full');
  }

  function step(ts) {
    if (!isDark()) { stop(); return; }
    var dt = last ? Math.min(ts - last, 50) : 16.7;
    last = ts;
    var ds = dt / 16.667; // 帧时间缩放

    // 掉帧自适应：卡了就少生成一点，保证顺滑优先（阈值放宽，避免偶发抖动就降档）
    dtSmooth = dtSmooth * 0.9 + dt * 0.1;
    quality = dtSmooth > 26 ? 0.55 : (dtSmooth > 21 ? 0.8 : 1);

    // 蓄力 / 衰减
    if (charging) {
      var was = charge;
      charge = Math.min(1, charge + dt / CFG.fullMs);
      if (was < 1 && charge >= 1) triggerOverload();
    } else {
      charge = Math.max(0, charge - dt / CFG.chargeDecayMs);
    }
    if (overloaded && !charging) {
      burst = Math.max(0, burst - dt / CFG.overloadDecayMs);
      if (burst <= 0.001) { overloaded = false; burst = 0; }
    }
    // 过载持续期间：每隔 1.5s 补一圈弱冲击波，保持「还在喷发」的节奏感
    if (overloaded && charging) {
      pulseAcc += dt;
      if (pulseAcc >= CFG.pulseMs) {
        pulseAcc = 0;
        shocks.push({ x: focus.x, y: focus.y, t: 0, s: 0.5 });
      }
    } else {
      pulseAcc = 0;
    }

    // 焦点平滑跟随光标
    focus.x += (target.x - focus.x) * Math.min(1, 0.22 * ds);
    focus.y += (target.y - focus.y) * Math.min(1, 0.22 * ds);
    dialPos.x += (target.x - dialPos.x) * Math.min(1, 0.38 * ds);
    dialPos.y += (target.y - dialPos.y) * Math.min(1, 0.38 * ds);
    dialScale += (dialTarget - dialScale) * Math.min(1, 0.25 * ds);
    updateDial();

    // 生成
    var rate = 0;
    if (overloaded) rate = CFG.overloadRate * burst * quality;
    else if (charging && charge > 0.02) rate = (CFG.localRateBase + charge * CFG.localRateGain) * quality;
    if (rate > 0) {
      var expect = rate * ds;
      var n = Math.floor(expect) + (Math.random() < (expect % 1) ? 1 : 0);
      for (var i = 0; i < n; i++) spawnOne(overloaded);
    }

    // 绘制
    ctx.clearRect(0, 0, W, H);

    // 柔光：蓄力/过载时给焦点一抹青绿光晕（比 v1 更大更淡，避免糊）
    var glowA = charge * 0.06 + (overloaded ? 0.07 * burst : 0);
    if (glowA > 0.004) {
      var gr = 220 + charge * 160 + (overloaded ? 200 * burst : 0);
      var g = ctx.createRadialGradient(focus.x, focus.y, 0, focus.x, focus.y, gr);
      g.addColorStop(0, 'rgba(' + GLOW + ',' + glowA.toFixed(3) + ')');
      g.addColorStop(1, 'rgba(' + GLOW + ',0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(focus.x, focus.y, gr, 0, Math.PI * 2);
      ctx.fill();
    }

    // 流星
    var alive = [];
    for (var k = 0; k < particles.length; k++) {
      var p = particles[k];
      p.life += dt;
      if (p.life >= p.maxLife || p.x > W + 120 || p.y < -120 || p.x < -160 || p.y > H + 160) continue;
      p.x += p.vx * ds;
      p.y += p.vy * ds;
      var t = 1 - p.life / p.maxLife;              // 1→0 渐隐
      var a = t * (p.comet ? 1 : 0.88);
      var mag = Math.hypot(p.vx, p.vy) || 1;
      var tx = p.x - (p.vx / mag) * p.len;
      var ty = p.y - (p.vy / mag) * p.len;
      var grad = ctx.createLinearGradient(p.x, p.y, tx, ty);
      grad.addColorStop(0, 'rgba(255,255,255,' + (0.95 * a).toFixed(3) + ')');
      grad.addColorStop(0.4, 'rgba(' + GLOW + ',' + (0.5 * a).toFixed(3) + ')');
      grad.addColorStop(1, 'rgba(' + GLOW + ',0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = p.w;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(tx, ty);
      ctx.stroke();
      // 头部亮点（彗星额外两层光晕 → 更亮）
      if (p.comet) {
        ctx.fillStyle = 'rgba(' + GLOW + ',' + (0.20 * a).toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.w * 2.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(' + GLOW + ',' + (0.35 * a).toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.w * 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = 'rgba(255,255,255,' + (0.95 * a).toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.w * 0.95, 0, Math.PI * 2);
      ctx.fill();
      alive.push(p);
    }
    particles = alive;

    // 冲击波（拉满瞬间从焦点扩散的圆环）
    if (shocks.length) {
      var keep = [];
      for (var s = 0; s < shocks.length; s++) {
        var sw = shocks[s];
        sw.t += dt / 700; // 700ms 生命周期
        if (sw.t >= 1) continue;
        var pw = sw.s || 1;
        var e = 1 - Math.pow(1 - sw.t, 3);          // ease-out
        var rr2 = 20 + e * 340 * pw;
        var aa = (1 - sw.t) * 0.55 * pw;
        ctx.strokeStyle = 'rgba(' + GLOW + ',' + aa.toFixed(3) + ')';
        ctx.lineWidth = 0.6 + (1 - sw.t) * 2.6;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, rr2, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = 'rgba(255,255,255,' + (aa * 0.5).toFixed(3) + ')';
        ctx.lineWidth = 0.5 + (1 - sw.t) * 1.2;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, rr2 * 0.72, 0, Math.PI * 2);
        ctx.stroke();
        keep.push(sw);
      }
      shocks = keep;
    }

    // 收尾：无蓄力、无过载、无残留 → 停 rAF、隐藏画布、收环
    if (!charging && charge <= 0.001 && !overloaded && particles.length === 0 && shocks.length === 0) {
      hideDial();
      stop();
      return;
    }
    if (!dialOn && dialScale > 1.35) {
      // 环已淡出完毕，下次显示前不再参与计算
      lastTickBucket = -1;
    }
    raf = requestAnimationFrame(step);
  }

  function startLoop() {
    if (!isDark()) return;
    ensureCanvas();
    canvas.style.display = 'block';
    if (!raf) { last = 0; raf = requestAnimationFrame(step); }
  }

  function stop() {
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
    if (canvas) canvas.style.display = 'none';
    if (ctx) ctx.clearRect(0, 0, W, H);
    particles = [];
    shocks = [];
    charge = 0;
    charging = false;
    overloaded = false;
    burst = 0;
    document.body.style.userSelect = '';
  }

  window.addEventListener('pointerdown', function (e) {
    if (e.button !== 0) return;          // 仅左键/主指针
    if (!isDark()) return;
    var t = e.target;
    if (t && t.closest && t.closest(SKIP_SELECTOR)) return; // 落在 UI / 看板娘上 → 不触发
    moved = false;
    start.x = e.clientX;
    start.y = e.clientY;
    target.x = e.clientX;
    target.y = e.clientY;
    // 短按（<140ms）不显示环，避免每次点空白处都闪一下
    clearTimeout(holdTimer);
    holdTimer = setTimeout(function () {
      // 让位给首页卡片拖拽：正在拖卡片时绝不蓄力
      // 让位给 404 火箭点火：404 页常驻 __endyMeteorBlock，长按归火箭节接管
      if (!moved && !window.__endyDragActive && !window.__endyMeteorBlock) {
        showDial(target.x, target.y);
        charging = true;
        document.body.style.userSelect = 'none';
        startLoop();
      }
    }, CFG.holdMs);
  }, true);

  window.addEventListener('pointermove', function (e) {
    if (!dialOn && !charging) return;
    // 拖拽卡片时立刻让位（避免「拖卡片 + 喷流星」同时发生）
    // 404 火箭点火时同样立刻收手（__endyMeteorBlock 常驻）
    if ((window.__endyDragActive || window.__endyMeteorBlock) && charging) { endHold(); return; }
    target.x = e.clientX;
    target.y = e.clientY;
    if (moved) return;
    var d = Math.abs(e.clientX - start.x) + Math.abs(e.clientY - start.y);
    // 触屏：移动视为滚动 → 取消；鼠标：跟随划过夜空，不取消
    if (e.pointerType === 'touch' && d > CFG.moveCancelTouch) {
      moved = true;
      clearTimeout(holdTimer);
    }
  }, true);

  function endHold() {
    clearTimeout(holdTimer);
    if (charging) {
      charging = false;
      document.body.style.userSelect = '';
    }
    hideDial();
  }
  window.addEventListener('pointerup', endHold, true);
  window.addEventListener('pointercancel', endHold, true);
  window.addEventListener('blur', endHold, true);

  // 切到浅色模式时立刻收手
  if (typeof MutationObserver !== 'undefined') {
    var mo = new MutationObserver(function () {
      if (!isDark() && raf) { hideDial(); stop(); }
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  // 切后台/最小化：流星雨停 rAF + 隐藏画布，省电；回前台若仍是夜间且用户在蓄力会自行恢复
  document.addEventListener('visibilitychange', function () {
    if (document.hidden && raf) stop();
  });

  // 404 星图迷航等场景：外部直接引爆一次「星河过载」（免长按）
  // power: 0.15~1，缩放本次喷发强度（过载生成率 = overloadRate × burst）；x/y 可指定迸发点
  window.__endyMeteorOverload = function (power, x, y) {
    if (!isDark() || window.__endyDragActive) return false;
    ensureCanvas();
    startLoop();
    if (typeof x === 'number') { target.x = x; focus.x = x; }
    if (typeof y === 'number') { target.y = y; focus.y = y; }
    charging = false;
    charge = Math.max(charge, Math.min(1, Math.max(0.15, power || 1)));
    triggerOverload();
    if (power !== undefined) burst = Math.min(1, Math.max(0.15, power));
    return true;
  };

  // 调试用：控制台里 __endyMeteorStats() 可看当前粒子数 / 蓄力 / 过载强度 / 平滑帧时间
  window.__endyMeteorStats = function () {
    return {
      particles: particles.length,
      charge: +charge.toFixed(3),
      charging: charging,
      overloaded: overloaded,
      burst: +burst.toFixed(3),
      shocks: shocks.length,
      frameMs: +dtSmooth.toFixed(1),
      quality: quality
    };
  };
})();
