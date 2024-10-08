import { getRation, getEquipment, getSafeAreaBottomHeight, getSafeAreaTopHeight } from "./equipment.js";
import { useAppStore } from "@/store/modules/app";
const appStore = useAppStore();
const setEQ = (eq) => {
  appStore.setEquipment(eq);
};
const setDIR = (dir) => {
  appStore.setDirection(dir);
};
export default function useDraw() {
  const resize = () => {
    const topHeight = getSafeAreaTopHeight();
    const bottomHeight = getSafeAreaBottomHeight();
    appStore.setNavTopHeight(topHeight);
    appStore.setNavBottomHeight(bottomHeight);
    let { windowWidth, windowHeight } = getRation();
    if (windowWidth >= windowHeight) {
      setDIR("w");
    } else if (windowWidth < windowHeight) {
      setDIR("h");
    }
    if (getEquipment() == "desktop") {
      setEQ("pc");
    } else if (getEquipment() == "mobile") {
      setEQ("h5");
    } else if (getEquipment() == "tablet") {
      setEQ("pb");
    } else {
      setEQ("pc");
    }
  };

  // 改变窗口大小重新绘制
  const windowDraw = () => {
    window.addEventListener("resize", resize);
  };

  const unWindowDraw = () => {
    window.removeEventListener("resize", resize);
  };

  return {
    windowDraw,
    unWindowDraw,
    resize
  };
}
