/* miku-config.js  v=1
 * 原 _config.yml 的 OhMyLive2d.option 转写的真实 JS 对象。
 * 由 miku-loader 在启动看板娘前注入，供 miku-easter-egg.js 的
 *   var oml2d = OML2D.loadOml2d(window.__mikuOption);
 * 使用。
 *
 * 注意：menus.items 在原 YAML 里是一段函数字符串 "(d)=>{return [];}"，
 *       插件会把它原样拼进 option；这里直接写成函数，效果完全一致（清空默认菜单按钮）。
 */
window.__mikuOption = {
  dockedPosition: 'right', // 右下角（与 anzhiyu #rightside 不重叠）
  mobileDisplay: false,    // 手机端不加载（模型约 11MB，省流量）
  sayHello: false,         // 关掉控制台版本号输出
  primaryColor: '#4b5cc4', // 博客主题色 deep blue
  models: [
    {
      name: 'miku',
      path: '/live2d_models/miku/miku_v2.model3.json',
      scale: 0.045,
      anchor: [0.5, 0.5],
      position: [320, 480],
      stageStyle: {
        width: 640,
        height: 960
      },
      motionPreloadStrategy: 'IDLE',
      volume: 0
    }
  ],
  statusBar: {
    disable: true // 不要右下角 加载成功/加载中 状态条
  },
  tips: {
    // 气泡文本不限行，避免 oml2d 默认 line-clamp 导致省略号
    messageLine: 999,
    style: {
      width: 'auto',
      minWidth: '80px',
      maxWidth: '280px'
    },
    idleTips: {
      interval: 15000,
      message: [
        '彖辞破暗，渊澄万象 —— 欢迎来到彖渊子。',
        '点我一下，我会换个表情哦～',
        '葱，才是本体。',
        '这里是彖渊子的看板娘：初音未来。'
      ]
    },
    welcomeTips: {
      message: {
        daybreak: '天快亮了，初音陪你一起熬夜？',
        morning: '上午好～今天也要元气满满！',
        noon: '中午啦，记得吃饭哦～',
        afternoon: '午后犯困的话，听首歌吧♪',
        dusk: '傍晚了，今天辛苦啦～',
        night: '晚上好，要听我唱一首吗？',
        lateNight: '很晚了，早点休息吧，晚安～',
        weeHours: '这么晚还不睡？当心熬夜秃头哦！'
      }
    }
  },
  menus: {
    // 自定义开关按钮已全部整合进「设置面板」（连击看板娘 3 次弹出），
    // 这里只保留 oml2d 默认的「休息」按钮，其余默认按钮（切换模型/衣服/关于）移除。
    items: function (d) {
      return [];
    }
  }
};
