/**
 * 弹簧物理引擎（E）
 * ------------------------------------------------------------
 * 用「弹簧-阻尼」数值积分生成 WAAPI 关键帧，替代固定 cubic-bezier：
 * 好处是回弹有真实质量感、可中途打断、不同元素共用同一套物理参数 → 全站手感统一。
 *
 * 用法：
 *   EndySpring.popIn(el, opts)                      // 弹入（缩放 + 淡入）
 *   EndySpring.popOut(el, opts).finished            // 弹出（缩放 + 淡出）
 *   EndySpring.run(el, { from, to, build })         // 自定义：build(p) 返回样式对象
 */
(function (global) {
  'use strict';

  var DEFAULTS = { stiffness: 210, damping: 22, mass: 1, velocity: 0, frames: 34 };

  // 生成 0→1 的弹簧进度序列（含过冲）
  function samples(opts) {
    var o = {}, k;
    for (k in DEFAULTS) o[k] = DEFAULTS[k];
    for (k in (opts || {})) if (opts[k] !== undefined) o[k] = opts[k];

    var k1 = o.stiffness, c = o.damping, m = o.mass;
    var dt = 1 / 60;
    var x = 0, v = o.velocity;
    var out = [];
    for (var i = 0; i < o.frames; i++) {
      var a = (-k1 * x - c * v) / m;
      v += a * dt;
      x += v * dt;
      out.push(x);
      if (Math.abs(x - 1) < 0.0008 && Math.abs(v) < 0.0015 && i > 6) break;
    }
    if (out.length) out[out.length - 1] = 1;
    return out;
  }

  function run(el, cfg) {
    if (!el || !el.animate) return null;
    var pts = samples(cfg.spring);
    var frames = pts.map(function (p) { return cfg.build(p); });
    return el.animate(frames, {
      duration: cfg.duration || (pts.length * 1000 / 60),
      easing: 'linear',
      fill: cfg.fill || 'none'
    });
  }

  function popIn(el, opts) {
    opts = opts || {};
    if (!el) return null;
    el.style.transformOrigin = opts.origin || 'center';
    return run(el, {
      spring: { stiffness: opts.stiffness || 260, damping: opts.damping || 20 },
      build: function (p) {
        var s = 0.92 + 0.08 * p;
        return { opacity: Math.min(1, p * 1.15), transform: 'scale(' + s.toFixed(4) + ')' };
      }
    });
  }

  function popOut(el, opts) {
    opts = opts || {};
    if (!el) return null;
    return run(el, {
      spring: { stiffness: opts.stiffness || 300, damping: opts.damping || 26 },
      build: function (p) {
        var s = 1 - 0.08 * p;
        return { opacity: Math.max(0, 1 - p * 1.1), transform: 'scale(' + s.toFixed(4) + ')' };
      }
    });
  }

  global.EndySpring = { run: run, popIn: popIn, popOut: popOut, samples: samples };
})(window);
