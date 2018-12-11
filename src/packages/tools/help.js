export default {
  isShare() {
    let reg = /share|help/g;
    let url = location.href;
    if (reg.test(url)) {
      return true
    } else {
      return false
    }
  },
  isBottom() {
    /*是否到底部*/
    let winScrollTop = Math.max(document.body.scrollTop || document.documentElement.scrollTop);
    let scrollHeight = Math.max(document.body.scrollHeight || document.documentElement.scrollHeight);
    let windowHeight = document.documentElement.clientHeight;
    if (winScrollTop + windowHeight === scrollHeight) {
      return true;
    } else {
      return false;
    }
  },
  backToTop() {
    let timerTop = window.setInterval(() => {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop === 0) {
        clearInterval(timerTop);
        timerTop = null;
      }
      let newScroll = scrollTop - 50;
      document.documentElement.scrollTop = document.body.scrollTop = newScroll;
    }, 0)
  },
  checkWechat() {
    /*判断是否微信*/
    if (navigator.userAgent.indexOf("MicroMessenger") >= 0) {
      return true;
    }
  },
  getRandom(n, m) {
    return Math.random() * (m - n) + n
  },
  getPosition(ele) {
    return ele.getBoundingClientRect()
  },
  getComputedStyle(ele) {
    let left = ele && ele.ownerDocument.defaultView.getComputedStyle(ele).webkitTransform;//matrix(1, 0, 0, 1, 101.698, 0)
    let regLeft = /matrix\(1, 0, 0, 1, (-?\d+\.?\d*), (-?\d+\.?\d*)\)/;
    let res = regLeft.exec(left);
    if (!res) return {
      x: 0,
      y: 0
    };
    return {
      x: parseFloat(res[1]),
      y: parseFloat(res[2])
    }
  },
  isDOM(ele) {
    if (typeof ele === 'object') {
      return ele instanceof HTMLElement
    } else {
      return ele && typeof ele === 'object' && ele.nodeType === 1 && typeof ele.nodeName === 'string'
    }
  },
  env() {
    let env = {},
      navigator = window.navigator,
      userAgent = navigator.userAgent,
      ios = userAgent.match(/(iPad|iPhone|iPod)[^;]*;.+OS\s([\d_\.]+)/),
      android = userAgent.match(/(Android)\s([\d\.]+)/);

    env.isAndroid = (/android/gi).test(navigator.appVersion);
    env.isIDevice = (/iphone|ipad|ipod/gi).test(navigator.appVersion);
    env.isWebkit = /WebKit\/[\d.]+/i.test(userAgent);
    env.isSafari = ios ? (navigator.standalone ? isWebkit : (/Safari/i.test(userAgent) && !/CriOS/i.test(userAgent) && !/MQQBrowser/i.test(userAgent))) : false;
    env.isGamebox = (/GameCenter/gi).test(navigator.userAgent);

    if (ios) {
      env.device = ios[1];
      env.version = ios[2].replace(/_/g, '.');
    } else if (android) {
      env.version = android[2];
    }

    env.standalone = navigator.standalone;
    env.wechat = navigator.userAgent.indexOf("MicroMessenger") >= 0;
    env.gameStoreHD = navigator.userAgent.indexOf('GameStoreHD') >= 0;
    env.isMiui = /MiuiBrowser/gi.test(navigator.userAgent);
    return env;
  }
}
