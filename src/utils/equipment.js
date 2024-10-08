/* 获取当前终端 */
const getEquipment = () => {
  let os = (function () {
    let ua = navigator.userAgent,
      isWindowsPhone = /(?:Windows Phone)/.test(ua),
      isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
      isAndroid = /(?:Android)/.test(ua),
      isFireFox = /(?:Firefox)/.test(ua),
      isChrome = /(?:Chrome|CriOS)/.test(ua),
      isTablet =
        /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
      isPhone = /(?:iPhone)/.test(ua) && !isTablet,
      isPc = !isPhone && !isAndroid && !isSymbian;
    return {
      isTablet: isTablet,
      isPhone: isPhone,
      isAndroid: isAndroid,
      isChrome: isChrome,
      isPc: isPc
    };
  })();
  if (os.isAndroid || os.isPhone) {
    // 手机
    return "mobile";
  } else if (os.isTablet) {
    // 平板
    return "tablet";
  } else if (os.isPc) {
    // 电脑
    return "desktop";
  }
};
/* 获取当前屏幕信息 */
const getRation = () => {
  var screenWidth = window.screen.width;
  var screenHeight = window.screen.height;
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  return {
    screenWidth,
    screenHeight,
    windowWidth,
    windowHeight
  };
};
const getSafeAreaBottomHeight = () => {
  // visualViewport.height 是实际显示的区域高度
  // innerHeight 是整个窗口的高度
  var topHeight = window.screen.height - window.innerHeight;
  const safeAreaHeight = window.screen.height - window.innerHeight - topHeight.value;
  return safeAreaHeight > 0 ? safeAreaHeight : 0;
};
const getSafeAreaTopHeight = () => {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // 计算状态栏高度
    // var statusBarHeight = window.innerHeight - document.documentElement.clientHeight;
    var statusBarHeight = window.screen.height - window.innerHeight;
    return statusBarHeight > 0 ? statusBarHeight : 0;
  }
};
export { getEquipment, getRation, getSafeAreaBottomHeight, getSafeAreaTopHeight };
