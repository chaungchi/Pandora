/* -------------------------【cookie】----------------------------------------- */
export function setCookie(key, value, setTimer = 7) {
  const cookieName = import.meta.env.VITE_KEY + "-" + key;
  const cookieValue = value;
  const expirationDays = setTimer; // 过期时间，单位为天
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + expirationDays);
  const cookie = `${cookieName}=${encodeURIComponent(cookieValue)}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = cookie;
}
export function getCookie(name) {
  const cookieName = import.meta.env.VITE_KEY + "-" + name;
  const cookies = document.cookie.split("; ");
  let str = null;
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === cookieName) {
      const decodedValue = decodeURIComponent(value);
      str = decodedValue;
    }
  }
  return str;
}
export function clearCookie(name) {
  setCookie(name, "", -1);
}
/* -------------------------【localStorage】----------------------------------------- */
import Storage from "web-storage-cache";
const localStorage = new Storage();
export function setLS(key, value) {
  return localStorage.set(key, value);
}
export function getLS(key) {
  return localStorage.get(key);
}
export function removeLS(key) {
  return localStorage.delete(key);
}
export function clearLS() {
  return localStorage.clear();
}
/* -------------------------【router】----------------------------------------- */
import { router } from "@/router/index";
// 回到上一页
export const goBack = () => {
  if (history.state?.back) {
    router.back();
  } else {
    router.push("/");
  }
};
// 路由扁平化
export const getRouter = (name) => {
  function getFlatMenuList(menuList) {
    const addPath = (t, arr) => {
      arr.forEach((element) => {
        element.path = t.path + "/" + element.path;
      });
      return arr;
    };
    let newMenuList = JSON.parse(JSON.stringify(menuList));
    return newMenuList.flatMap((item) => [
      item,
      ...(item.children ? getFlatMenuList(addPath(item, item.children)) : [])
    ]);
  }
  let item = getFlatMenuList(router.options.routes).filter((t) => t.name == name);
  return item;
};
// 路由跳转
export const goName = (name, query) => {
  if (router.currentRoute.value.name == name) return;
  let item = getRouter(name);
  if (query) {
    router.push({ path: item[0].path, query });
  } else {
    router.push({ path: item[0].path });
  }
};
/* -------------------------【相对此电脑获取一个独一无二的key】----------------------------------------- */
export function generateUniqueKey() {
  function stringToAlphanumericHash(inputString) {
    let hash = 0;
    for (let i = 0; i < inputString.length; i++) {
      const charCode = inputString.charCodeAt(i);
      hash = (hash << 5) - hash + charCode;
    }
    return Math.abs(hash).toString(36);
  }
  const userAgent = navigator.userAgent || "";
  const platform = navigator.platform || "";
  const uniqueKey = `${userAgent}-${platform}`;
  return stringToAlphanumericHash(uniqueKey);
}
/* -------------------------【二进制解析】----------------------------------------- */
export function analysisCode(data) {
  const decodedData = new TextDecoder().decode(Uint8Array.from(atob(data), (c) => c.charCodeAt(0)));
  let obj = JSON.parse(decodedData);
  return obj;
}

/* -------------------------【function】----------------------------------------- */
// 控制容器滚动
export function setScroll(dom, tops, num, flag) {
  let scrollTop = dom.scrollTop;
  let step = function () {
    var distance = tops - scrollTop;
    scrollTop = scrollTop + distance / num;
    if (Math.abs(distance) < 1) {
      dom.scrollTo(0, tops);
    } else {
      dom.scrollTo(0, scrollTop);
      requestAnimationFrame(step);
    }
  };
  if (flag) {
    step();
  } else {
    dom.scrollTop = tops;
  }
}
// 数字格式化小数点位
export const formatNumber = (sum, decimal_places) => {
  const num = Number(sum);
  if (num % 1 === 0) {
    return Number(num?.toFixed(decimal_places).padEnd(decimal_places + 1, "0"));
  } else {
    return Number(parseFloat(num?.toFixed(decimal_places)).toFixed(decimal_places));
  }
};
// 计算宽高
export const initCount = (id) => {
  try {
    let dom = document.getElementById(id);
    let w = dom.offsetWidth;
    let h = dom.offsetHeight;
    if (dom.getAttribute("class").includes("h100%")) {
      // 计算宽度
      dom.style.width = `${h}px`;
    } else {
      // 计算高度
      dom.style.height = `${w}px`;
    }
  } catch (error) {
    console.log(error);
  }
};
/* -------------------------【new Date()】----------------------------------------- */
// 传入（时间戳，时间间隔）：返回时间间隔之前的时间戳
export function calculateTimestampBefore(timestamp, seconds) {
  const intervalMillis = seconds * 1000;
  const newTimestamp = timestamp - intervalMillis;
  return newTimestamp;
}
// 将【时间戳】转化为格式：yyyy-MM-dd HH:MM:SS
export function formatTimestamp(timestamp, type = 0) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  const formattedTime1 = `${hours}:${minutes}:${seconds}`;
  const formattedTime2 = `${hours}:${minutes}`;
  return type == 0 ? formattedTime : type == 1 ? formattedTime1 : formattedTime2;
}
/*  全球时间兼容
    timeAp: 0,      0:AM/PM 1:24Hours
    timeZone: 0,    0:UTC 1:Local
*/
/* import moment from 'moment'
export function formatTimestamp(dateTime, flag) {
    if (flag || getStoreState().timeAp == 1) {
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const formattedTime = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
        return getStoreState().timeZone == 0 ? moment.utc(dateTime).format('YYYY-MM-DD HH:mm:ss') : moment(dateTime).format('YYYY-MM-DD HH:mm:ss')
    } else {
        const date = new Date(dateTime);
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const amOrPm = hours >= 12 ? "PM" : "AM";
        const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
        const formattedMinutes = minutes.toString().padStart(2, "0");
        const formattedSeconds = seconds.toString().padStart(2, "0");
        return getStoreState().timeZone == 0 ? moment.utc(dateTime).format('YYYY/MM/DD hh:mm:ss A') : moment(dateTime).format('YYYY/MM/DD hh:mm:ss A')
    }
} */
