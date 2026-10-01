/**
 * 首页文章卡片拖拽诊断脚本（浏览器内 / Playwright 均可调用）
 * ------------------------------------------------------------------
 * 用途：自动模拟一次「拖起第一张卡片 → 移动 → 落位」的真实交互，
 *      在每一步测量关键指标，定位两类问题：
 *        1) 第一张卡片「高度突变」——拖起后「洞」高度 vs 邻居高度是否一致；
 *        2) 「复制感」——拖起首帧原卡与 ghost 是否同时可见、ghost 图片是否已就绪。
 *
 * 用法 A（控制台）：把本文件内容粘贴到首页 F12 控制台，会自动跑并在右上角浮层显示报告。
 * 用法 B（Playwright）：page.addScriptTag({path: 本文件}) 后读 window.__endyDragDiagResult。
 *
 * 注意：本脚本仅做测量与一次性模拟，跑完会自动还原（松手即还原），不改 localStorage 顺序。
 */
(function () {
  'use strict';

  function log(m) { try { console.log('[dragDiag] ' + m); } catch (e) {} }

  function rectOf(el) {
    if (!el) return null;
    var r = el.getBoundingClientRect();
    return { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) };
  }

  function imgStatus(el) {
    var imgs = el ? el.querySelectorAll('img') : [];
    var total = imgs.length, bad = 0;
    for (var i = 0; i < imgs.length; i++) {
      var im = imgs[i];
      if (!(im.complete && im.naturalWidth)) bad++;
    }
    return { total: total, notReady: bad };
  }

  function pe(el, type, x, y, buttons) {
    var ev = new PointerEvent(type, {
      pointerId: 1, pointerType: 'mouse', isPrimary: true,
      button: (type === 'pointerup' ? 0 : 0), buttons: buttons,
      clientX: x, clientY: y, bubbles: true, cancelable: true
    });
    (type === 'pointerdown' ? el : document).dispatchEvent(ev);
  }

  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  async function run() {
    var c = document.querySelector('#recent-posts');
    if (!c) return { error: '找不到 #recent-posts 容器' };
    var items = [].slice.call(c.querySelectorAll('.recent-post-item'))
      .filter(function (el) { return !el.classList.contains('endy-drag-ghost'); });
    if (items.length < 2) return { error: '卡片不足 2 张，无法诊断' };

    var first = items[0];
    var before = items.map(function (el) { return rectOf(el).h; });
    var beforeImgs = items.map(imgStatus);

    var fr = rectOf(first);
    var cx = fr.x + fr.w / 2, cy = fr.y + fr.h / 2;

    // —— 拖起 ——
    pe(first, 'pointerdown', cx, cy, 1);
    await sleep(20);
    pe(first, 'pointermove', cx + 12, cy + 8, 1);   // 超过 4px → 提交
    await sleep(40);

    var holeEl = first;                 // 原卡 = 洞（visibility:hidden 仍在流内）
    var ghostEl = c.querySelector('.endy-drag-ghost');
    var holeRect = rectOf(holeEl);
    var ghostRect = rectOf(ghostEl);
    var holeVis = getComputedStyle(holeEl).visibility;
    var dbg = {
      first_offsetHeight: first.offsetHeight,
      first_rectH: Math.round(first.getBoundingClientRect().height),
      first_alignSelf: getComputedStyle(first).alignSelf,
      container_alignItems: getComputedStyle(c).alignItems,
      ghost_styleHeight: ghostEl ? ghostEl.style.height : null,
      ghost_offsetHeight: ghostEl ? ghostEl.offsetHeight : null,
      ghost_computedHeight: ghostEl ? getComputedStyle(ghostEl).height : null,
      ghost_boxSizing: ghostEl ? getComputedStyle(ghostEl).boxSizing : null,
      ghost_maxHeight: ghostEl ? getComputedStyle(ghostEl).maxHeight : null,
      ghost_display: ghostEl ? getComputedStyle(ghostEl).display : null,
      ghost_position: ghostEl ? getComputedStyle(ghostEl).position : null,
      ghost_flexDirection: ghostEl ? getComputedStyle(ghostEl).flexDirection : null,
      ghost_alignItems: ghostEl ? getComputedStyle(ghostEl).alignItems : null,
      ghost_contain: ghostEl ? getComputedStyle(ghostEl).contain : null,
      ghost_cssText: ghostEl ? ghostEl.style.cssText : null,
      ghost_afterForceH: (function () {
        if (!ghostEl) return null;
        var prev = ghostEl.style.height;
        ghostEl.style.height = '600px';
        var h = ghostEl.offsetHeight;
        ghostEl.style.height = prev;
        return h;
      })()
    };
    var ghostVis = ghostEl ? getComputedStyle(ghostEl).visibility : 'MISSING';
    var ghostTransform = ghostEl ? ghostEl.style.transform : 'MISSING';
    var ghostImgs = imgStatus(ghostEl);
    var firstImgBefore = beforeImgs[0];

    // 复制感判定：原卡与 ghost 同时可见 = 异常；ghost 图片未就绪 = 易显空白
    var bothVisible = (holeVis !== 'hidden') && (ghostVis === 'visible');
    var ghostBlank = (ghostImgs.notReady > 0);

    // —— 移动到远处触发重排 ——
    var targetX = cx + Math.min(360, fr.w * 2 + 60);
    var targetY = cy + 40;
    for (var s = 1; s <= 6; s++) {
      pe(first, 'pointermove', cx + (targetX - cx) * s / 6, cy + (targetY - cy) * s / 6, 1);
      await sleep(30);
    }
    var neighborAfter = rectOf(items[1]);
    var firstNowIdx = [].slice.call(c.querySelectorAll('.recent-post-item'))
      .filter(function (el) { return !el.classList.contains('endy-drag-ghost'); })
      .indexOf(first);

    // —— 松手还原 ——
    pe(first, 'pointerup', targetX, targetY, 0);
    await sleep(700);                   // 等落位弹簧 / 还原
    var restoredVis = getComputedStyle(first).visibility;
    var ghostGone = !c.querySelector('.endy-drag-ghost');

    var report = {
      before_heights: before,
      before_imgs: beforeImgs,
      after_hole_height: holeRect ? holeRect.h : null,
      after_neighbor_height: neighborAfter ? neighborAfter.h : null,
      hole_vs_neighbor_diff: (holeRect && neighborAfter) ? (holeRect.h - neighborAfter.h) : null,
      hole_visibility: holeVis,
      ghost_visibility: ghostVis,
      ghost_height: ghostRect ? ghostRect.h : null,
      ghost_img_ready: !ghostBlank,
      ghost_img_status: ghostImgs,
      first_card_img_before: firstImgBefore,
      both_visible_bug: bothVisible,
      ghost_transform: ghostTransform,
      reordered: firstNowIdx !== 0,
      restored_visibility: restoredVis,
      ghost_removed: ghostGone,
      debug: dbg,
      verdict: []
    };

    // 判读
    if (Math.abs(report.hole_vs_neighbor_diff || 0) > 2) {
      report.verdict.push('⚠️ 洞高度与邻居差 ' + report.hole_vs_neighbor_diff +
        'px —— 第一张卡片「高度突变」风险（去掉洞 height 锁定后应归零）');
    } else {
      report.verdict.push('✅ 洞高度与邻居一致（' + report.hole_vs_neighbor_diff + 'px），无高度突变');
    }
    if (bothVisible) {
      report.verdict.push('⚠️ 拖起首帧原卡与 ghost 同时可见 —— 「复制感」根因（应先 hidden 原卡再 append ghost）');
    } else {
      report.verdict.push('✅ 拖起首帧原卡已隐藏、仅 ghost 可见 —— 无复制感');
    }
    if (ghostBlank) {
      report.verdict.push('⚠️ ghost 图片未就绪(' + ghostImgs.notReady + '/' + ghostImgs.total +
        ') —— 首帧空白导致复制感（forceImgEager 应修复）');
    } else {
      report.verdict.push('✅ ghost 图片已就绪 —— 首帧即有图');
    }
    if (restoredVis === 'hidden' || !ghostGone) {
      report.verdict.push('⚠️ 松手后未完全还原（visibility=' + restoredVis + ', ghostGone=' + ghostGone + '）');
    } else {
      report.verdict.push('✅ 松手后卡片与 ghost 均已还原');
    }

    log(JSON.stringify(report, null, 2));
    return report;
  }

  function showOverlay(report) {
    var ov = document.getElementById('endy-drag-diag');
    if (!ov) {
      ov = document.createElement('div');
      ov.id = 'endy-drag-diag';
      ov.style.cssText = 'position:fixed;top:12px;right:12px;max-width:380px;max-height:80vh;overflow:auto;' +
        'background:rgba(0,0,0,.85);color:#0f0;font:12px/1.5 monospace;padding:12px;border-radius:8px;' +
        'z-index:999999;white-space:pre-wrap;box-shadow:0 8px 24px rgba(0,0,0,.4);';
      document.body.appendChild(ov);
    }
    ov.textContent = '[拖拽诊断报告]\n' + JSON.stringify(report, null, 2);
  }

  window.__endyRunDragDiag = run;

  function auto() {
    run().then(function (res) {
      window.__endyDragDiagResult = res;
      try { showOverlay(res); } catch (e) {}
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', auto);
  } else {
    auto();
  }
})();
