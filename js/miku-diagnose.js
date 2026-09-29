/**
 * 初音 Live2D 看板娘诊断脚本
 * 用法：把整段复制到浏览器控制台（F12 → Console）回车即可
 * 诊断项：model3.json 纹理数、每张纹理加载尺寸、oml2d 注入配置、点击交互观察
 */
(async function diagnoseMiku() {
  const out = [];
  const log = function (s) { console.log(s); out.push(s); };
  log('=== 彖渊子看板娘诊断 ===');

  // 1) model3.json
  let model;
  try {
    model = await fetch('/live2d_models/miku/miku.model3.json').then(function (r) { return r.json(); });
    const tex = model.FileReferences.Textures;
    log('1) Textures 数量: ' + tex.length + ' （应为 6，若少于 6 说明有水印层被整张删除 → 会出黑块）');
    tex.forEach(function (t, i) { log('   [' + i + '] ' + t); });
  } catch (e) {
    log('1) 读取 model3.json 失败: ' + e.message);
    return;
  }

  // 2) 每张纹理实际加载尺寸（texture_05 理论上 1x1）
  log('2) 纹理加载测试...');
  for (let i = 0; i < model.FileReferences.Textures.length; i++) {
    const url = new URL(model.FileReferences.Textures[i], location.href).href;
    const img = new Image();
    await new Promise(function (resolve) {
      img.onload = function () {
        log('   [' + i + '] OK ' + img.naturalWidth + 'x' + img.naturalHeight + ' ' + url);
        resolve();
      };
      img.onerror = function () {
        log('   [' + i + '] FAIL ' + url);
        resolve();
      };
      img.src = url;
    });
  }

  // 3) HTML 注入配置
  const scripts = Array.from(document.scripts).map(function (s) { return s.text; }).join('\n');
  const cfgMatch = scripts.match(/OML2D\.loadOml2d\s*\(\s*(\{[\s\S]*?\})\s*\)/);
  if (cfgMatch) {
    const c = cfgMatch[1];
    const scaleMatch = c.match(/"scale":\s*([0-9.]+)/);
    const posMatch = c.match(/dockedPosition["']?:\s*["']([^"']+)["']/);
    const stageMatch = c.match(/stageStyle:\s*\{[\s\S]*?width:\s*(\d+)[\s\S]*?height:\s*(\d+)/);
    log('3) 注入配置:');
    log('   scale=' + (scaleMatch ? scaleMatch[1] : '未找到') + ' （应为 0.035）');
    log('   dockedPosition=' + (posMatch ? posMatch[1] : '未找到') + ' （应为 right）');
    log('   stageStyle=' + (stageMatch ? 'width=' + stageMatch[1] + ' height=' + stageMatch[2] : '未找到') + ' （应为 320x400）');
    log('   has m.off("hit")=' + /m\.off\s*\(\s*['"]hit['"]\s*\)/.test(c) + ' （应为 true）');
  } else {
    log('3) 未找到 OML2D.loadOml2d 注入');
  }

  // 4) 运行时报错兜底
  log('4) 点击测试：请点击看板娘，若只换表情、不播全身动作，则 OK。');
  log('   结果汇总数组: window.__mikuDiagnoseLogs');
  window.__mikuDiagnoseLogs = out;
})();
