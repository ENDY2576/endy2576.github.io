/**
 * 带刻度的惯性吸附滑杆 —— EndySnapSlider
 * ------------------------------------------------------------
 * 物理分三段，逐条对应需求：
 *   1) 拖动中：自由跟手，同时把最近 90ms 的位移采样下来 → 算出「释放速度」；
 *   2) 松手后：按释放速度做指数减速滑行 → 允许滑块越过刻度（短距离过冲），
 *      过冲距离有上限（默认 1.2 个刻度间距），撞到 min/max 会软回弹；
 *   3) 速度衰减到阈值后：改用弹簧-阻尼方程吸附到「最近的有效刻度」
 *      （欠阻尼 ζ=0.72，回程有一次极轻微的回弹）。
 *   ★ 任何时刻 value 都被 clamp 在 [min, max]，结束必然落在合法刻度上。
 *
 * 其它：
 *   - ARIA：role=slider + aria-valuemin/max/now/valuetext，键盘 ←→ 一档、Home/End 端点；
 *   - 位置全部交给 CSS 计算（--endy-p），JS 不逐帧读布局；
 *   - 尊重 prefers-reduced-motion（直接吸附，不做惯性）；
 *   - 面板被隐藏 / 宿主被移除时立即收尾，不会在看不见的地方空跑。
 *
 * 用法：
 *   window.EndySnapSlider.create(hostEl, { min, max, step, snap, value, onChange, onSettle, format });
 *   或给原生 <input type="range" data-endy-snap data-snap="5"> 自动升级（见底部 upgrade）。
 */
(function (global) {
  'use strict';

  var THUMB = 18;                          // 滑块直径，两端各内缩一半，保证滑块不越界
  var FRAME = 1000 / 60;
  var FRICTION = 0.945;                    // 每帧速度保留率（越大滑得越远，越吃释放速度）
  var GLIDE_GAIN = FRAME / (1 - FRICTION); // v * GAIN ≈ 惯性还能滑多远
  var SUB_STEP = 4;                        // 物理积分子步长（ms），保证稳定

  var DEFAULTS = {
    min: 0,
    max: 100,
    step: 0,        // 微调粒度（键盘微调用），0 = 自动取 snap/10
    snap: 0,        // 刻度间距（吸附栅格），0 = 自动取 (max-min)/10
    value: null,    // 初始值，null = min
    majorEvery: 0,  // 每隔几个刻度画一个「主刻度」，0 = 自动
    surface: 'auto',// 'light' = 强制浅色配色（面板是白底时用）
    format: null,   // 数值 → 显示文本
    onChange: null, // 每次数值变化（含动画中每一帧）
    onSettle: null  // 吸附完成、最终值确定
  };

  var reduced = false;
  try {
    reduced = !!(global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches);
  } catch (e) {}

  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function now() {
    return (global.performance && global.performance.now) ? global.performance.now() : Date.now();
  }

  function create(host, opts) {
    if (!host) return null;

    var o = {}, k;
    for (k in DEFAULTS) o[k] = DEFAULTS[k];
    for (k in (opts || {})) if (opts[k] !== undefined) o[k] = opts[k];

    var min = +o.min, max = +o.max;
    if (!(max > min)) return null;
    var span = max - min;
    var snap = o.snap > 0 ? +o.snap : span / 10;
    var step = o.step > 0 ? +o.step : snap / 10;
    var maxOver = o.maxOvershoot != null ? +o.maxOvershoot : snap * 2.4; // 过冲上限（弹簧惯性回弹的幅度）
    var omega = 0.03;                       // 弹簧角频率 rad/ms（决定回弹快慢）
    var zeta = 0.58;                        // 阻尼比（越小回弹越明显）
    var k1 = omega * omega;
    var c1 = 2 * zeta * omega;
    var velWindow = 90;                     // 释放速度采样窗口（ms）

    var value = clamp(o.value != null ? +o.value : min, min, max);
    var vel = 0;                            // 单位/ms
    var phase = 'idle';                     // idle | drag | catch | glide | spring
    var target = value;
    var raf = 0, lastT = 0, animStart = 0;
    var samples = [];
    var pointerId = null;
    var activeTick = -1;

    /* ---------------- DOM ---------------- */
    var tickCount = Math.min(101, Math.floor(span / snap + 1e-6) + 1);
    var majorEvery = o.majorEvery > 0 ? o.majorEvery : Math.max(1, Math.round((tickCount - 1) / 8));
    var tickHtml = '';
    for (var i = 0; i < tickCount; i++) {
      var tv = clamp(min + i * snap, min, max);
      var tp = span ? (tv - min) / span : 0;
      var isMajor = (i === 0 || i === tickCount - 1 || i % majorEvery === 0);
      tickHtml += '<i class="endy-slider-tick' + (isMajor ? ' is-major' : '') +
        '" style="left:' + (tp * 100).toFixed(3) + '%"></i>';
    }

    host.classList.add('endy-slider');
    if (o.surface === 'light') host.classList.add('endy-slider--light');
    host.setAttribute('role', 'slider');
    host.setAttribute('tabindex', '0');
    host.setAttribute('aria-valuemin', String(min));
    host.setAttribute('aria-valuemax', String(max));
    host.innerHTML =
      '<div class="endy-slider-rail">' +
        '<div class="endy-slider-track"><div class="endy-slider-fill"></div></div>' +
        '<div class="endy-slider-ticks">' + tickHtml + '</div>' +
        '<div class="endy-slider-thumb"><span class="endy-slider-bubble"></span></div>' +
      '</div>';

    var rail = host.querySelector('.endy-slider-rail');
    var thumb = host.querySelector('.endy-slider-thumb');
    var bubble = host.querySelector('.endy-slider-bubble');
    var ticks = Array.prototype.slice.call(host.querySelectorAll('.endy-slider-tick'));

    /* ---------------- 刻度 / 渲染 ---------------- */
    function tickIndex(v) {
      return clamp(Math.round((clamp(v, min, max) - min) / snap), 0, tickCount - 1);
    }
    function nearestTick(v) {
      return clamp(min + tickIndex(v) * snap, min, max);
    }

    function render() {
      var p = span ? (value - min) / span : 0;
      host.style.setProperty('--endy-p', String(p));
      var ti = tickIndex(value);
      if (ti !== activeTick) {
        if (ticks[activeTick]) ticks[activeTick].classList.remove('is-active');
        if (ticks[ti]) ticks[ti].classList.add('is-active');
        activeTick = ti;
      }
      var txt = o.format ? o.format(value) : String(Math.round(value * 1000) / 1000);
      host.setAttribute('aria-valuenow', String(Math.round(value * 1000) / 1000));
      host.setAttribute('aria-valuetext', txt);
      if (bubble) bubble.textContent = txt;
      if (o.onChange) o.onChange(value);
    }

    function pulse() {
      host.classList.remove('is-snap');
      // 强制重排以便重复触发同一个动画
      void host.offsetWidth;
      host.classList.add('is-snap');
      setTimeout(function () { host.classList.remove('is-snap'); }, 460);
    }

    /* ---------------- 物理 ---------------- */
    function integrate(h) {
      if (phase === 'glide') {
        vel *= Math.pow(FRICTION, h / FRAME);
        value += vel * h;
        if (value < min) { value = min; vel = Math.abs(vel) * 0.25; }
        else if (value > max) { value = max; vel = -Math.abs(vel) * 0.25; }
        // 惯性快耗尽 → 交给弹簧吸附到最近刻度
        if (Math.abs(vel) * GLIDE_GAIN < snap * 0.06) {
          phase = 'spring';
          target = nearestTick(value);
        }
        return;
      }
      if (phase === 'spring' || phase === 'catch') {
        var a = k1 * (target - value) - c1 * vel;
        vel += a * h;
        value += vel * h;
        if (value < min) { value = min; if (vel < 0) vel = 0; }
        else if (value > max) { value = max; if (vel > 0) vel = 0; }
        if (Math.abs(target - value) < snap * 0.0015 && Math.abs(vel) < snap * 0.0004) {
          value = target;
          vel = 0;
          if (phase === 'catch') { phase = 'spring'; target = nearestTick(value); }
          else phase = 'idle';
        }
        return;
      }
    }

    function frame(t) {
      raf = 0;
      var dt = clamp(t - lastT, 1, 48);
      lastT = t;
      // 面板被隐藏 / 宿主被移除 → 立刻收尾，不在看不见的地方空跑物理
      if (!host.isConnected || host.offsetParent === null || t - animStart > 2000) {
        finish();
        return;
      }
      var n = Math.max(1, Math.ceil(dt / SUB_STEP));
      var h = dt / n;
      for (var i = 0; i < n && phase !== 'idle'; i++) integrate(h);
      render();
      if (phase === 'idle') { finish(); return; }
      raf = global.requestAnimationFrame(frame);
    }

    function startAnim() {
      if (raf) return;
      lastT = now();
      animStart = lastT;
      host.classList.add('is-animating');
      raf = global.requestAnimationFrame(frame);
    }

    function stopAnim() {
      if (raf) { global.cancelAnimationFrame(raf); raf = 0; }
      host.classList.remove('is-animating');
    }

    function finish() {
      stopAnim();
      value = nearestTick(value);
      value = clamp(value, min, max);
      vel = 0;
      phase = 'idle';
      render();
      pulse();
      if (o.onSettle) o.onSettle(value);
    }

    /* ---------------- 指针交互 ---------------- */
    function valueFromX(clientX) {
      var r = rail.getBoundingClientRect();
      var w = r.width - THUMB;
      if (w <= 0) return value;
      var p = (clientX - r.left - THUMB / 2) / w;
      return clamp(min + p * span, min, max);
    }

    function releaseVel(t) {
      var s = samples;
      while (s.length && t - s[0].t > velWindow + 25) s.shift();
      if (s.length < 2) return 0;
      var lastS = s[s.length - 1];
      if (t - lastS.t > 110) return 0;         // 松手前已经停住 → 不算惯性
      var dt = lastS.t - s[0].t;
      if (dt < 8) return 0;
      return (lastS.v - s[0].v) / dt;
    }

    function onDown(e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      e.preventDefault();
      stopAnim();
      pointerId = e.pointerId;
      samples.length = 0;
      host.classList.add('is-pressed');
      try { host.focus(); } catch (err) {}
      // 点击轨道：先用弹簧「靠过去」（比瞬移柔和），移动指针后立刻转为跟手
      phase = 'catch';
      target = valueFromX(e.clientX);
      vel = 0;
      startAnim();
    }

    function onMove(e) {
      if (phase !== 'drag' && phase !== 'catch') return;
      if (pointerId !== null && e.pointerId !== pointerId) return;
      if (phase === 'catch') { stopAnim(); phase = 'drag'; }
      value = valueFromX(e.clientX);
      samples.push({ t: now(), v: value });
      if (samples.length > 24) samples.shift();
      render();
    }

    function onUp(e) {
      if (pointerId !== null && e && e.pointerId !== pointerId) return;
      pointerId = null;
      host.classList.remove('is-pressed');
      if (phase === 'catch') return;   // 点击轨道后没拖动：让 catch 自己跑完并吸附
      if (phase !== 'drag') return;

      var t = now();
      var v0 = releaseVel(t);
      // 限制过冲距离：不许滑出「短距离」的范围
      var proj = v0 * GLIDE_GAIN;
      if (Math.abs(proj) > maxOver) v0 = (proj > 0 ? 1 : -1) * maxOver / GLIDE_GAIN;

      if (reduced || Math.abs(v0) < snap / 4000) {
        phase = 'spring';
        target = nearestTick(value);
        vel = 0;
        startAnim();
        return;
      }
      phase = 'glide';
      vel = v0;
      startAnim();
    }

    function onKey(e) {
      var nv = null;
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowDown': nv = value - snap; break;
        case 'ArrowRight':
        case 'ArrowUp': nv = value + snap; break;
        case 'PageDown': nv = value - snap * 3; break;
        case 'PageUp': nv = value + snap * 3; break;
        case 'Home': nv = min; break;
        case 'End': nv = max; break;
        default: return;
      }
      e.preventDefault();
      stopAnim();
      phase = 'spring';
      target = nearestTick(clamp(nv, min, max));
      vel = 0;
      startAnim();
    }

    host.addEventListener('pointerdown', onDown);
    host.addEventListener('keydown', onKey);
    global.addEventListener('pointermove', onMove);
    global.addEventListener('pointerup', onUp);
    global.addEventListener('pointercancel', onUp);

    render();

    return {
      el: host,
      get: function () { return value; },
      set: function (v) {
        stopAnim();
        value = nearestTick(clamp(+v, min, max));
        vel = 0;
        phase = 'idle';
        render();
      },
      settle: finish,
      options: { min: min, max: max, snap: snap, step: step }
    };
  }

  /* ---------------- 原生 range 一键升级（可选） ---------------- */
  function upgrade(root) {
    var list = (root || document).querySelectorAll('input[type="range"][data-endy-snap]');
    Array.prototype.forEach.call(list, function (inp) {
      if (inp.__endySnapDone) return;
      inp.__endySnapDone = true;
      var host = document.createElement('div');
      host.style.marginTop = '2px';
      inp.parentNode.insertBefore(host, inp.nextSibling);
      inp.style.display = 'none';
      var api = create(host, {
        min: parseFloat(inp.getAttribute('min') || '0'),
        max: parseFloat(inp.getAttribute('max') || '100'),
        snap: parseFloat(inp.getAttribute('data-snap') || '0') || 0,
        step: parseFloat(inp.getAttribute('step') || '0') || 0,
        value: parseFloat(inp.value || '0'),
        format: inp.getAttribute('data-format') || null,
        onChange: function (v) {
          inp.value = String(v);
          try { inp.dispatchEvent(new Event('input', { bubbles: true })); } catch (e) {}
        }
      });
      inp.__endySnapApi = api;
    });
  }

  function boot() {
    try { upgrade(document); } catch (e) {}
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  document.addEventListener('pjax:complete', boot);

  global.EndySnapSlider = { create: create, upgrade: upgrade };
})(window);
