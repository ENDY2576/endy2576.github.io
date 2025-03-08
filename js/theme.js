// 主题相关的全局变量
window.GLOBAL_CONFIG = window.GLOBAL_CONFIG || {};
window.GLOBAL_CONFIG.Snackbar = {
  day_to_night: '已切换至深色模式',
  night_to_day: '已切换至浅色模式'
};

// 激活深色模式
function activateDarkMode() {
  document.documentElement.setAttribute('data-theme', 'dark');
  if (document.getElementById('modeicon')) {
    document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun');
  }
  saveToLocal.set('theme', 'dark', 2);
}

// 激活浅色模式
function activateLightMode() {
  document.documentElement.setAttribute('data-theme', 'light');
  if (document.getElementById('modeicon')) {
    document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon');
  }
  saveToLocal.set('theme', 'light', 2);
}

// localStorage操作
const saveToLocal = {
  get: function(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return false;
    }
  },
  set: function(key, value, hours) {
    try {
      if (hours) {
        const exp = new Date();
        exp.setTime(exp.getTime() + hours * 60 * 60 * 1000);
        localStorage.setItem(key + '_exp', exp.getTime().toString());
      }
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      return false;
    }
  }
};

// 初始化主题
function initTheme() {
  const theme = saveToLocal.get('theme');
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const autoChangeMode = 1; // 跟随系统

  if (theme) {
    theme === 'dark' ? activateDarkMode() : activateLightMode();
  } else if (autoChangeMode === 1) {
    isDarkMode ? activateDarkMode() : activateLightMode();
  }
}

// 监听系统主题变化
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addListener(function(e) {
    const theme = saveToLocal.get('theme');
    if (!theme) {
      e.matches ? activateDarkMode() : activateLightMode();
    }
  });
}

// 页面加载完成后初始化主题
document.addEventListener('DOMContentLoaded', initTheme); 