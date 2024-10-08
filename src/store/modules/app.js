import { defineStore } from "pinia";
export const useAppStore = defineStore("app", {
  state: () => {
    return {
      echartsIDS: [], //echarts实例id
      equipment: "", //设备类型
      direction: "", //设备方向（横屏h竖屏s）
      navTopHeight: 0, //设备方向（横屏h竖屏s）
      navBottomHeight: 0, //设备方向（横屏h竖屏s）
      // h5: true, //需要屏幕适配调试（再header展示屏幕标记）
      h5: false, //需要屏幕适配调试（再header展示屏幕标记）
      breakLabel: null, //当前屏幕标记（依据unocss）
      isDark: false, //是否为深色主题
      theme: "#183F93", //主题颜色
      darkTheme: "#59BFDD", //深色主题颜色
      lightTheme: "#183F93", //浅色主题颜色
      themeOption: ["#61B72B", "#BD5437", "#9CCDEB", "#183F93"], //可选颜色
      themes: "#183F9350", //主题颜色浅色
      themess: "#183F9330", //主题颜色超级浅色
      dark: "#242424", //深色主题颜色
      darkOption: ["#37373D", "#242424", "#1E1E1E", "#000000"], //可选颜色
      light: "#e9e9e9", //浅色主题颜色
      lightOption: ["#d0d0d0", "#e0e0e0", "#e9e9e9", "#ffffff"], //可选颜色
      themeOverrides: {}, //naive配色
      lang: "zh", //默认语言
      // langFlag: true, //需要多语言
      langFlag: false, //不需要多语言
      langOption: [
        {
          label: "中文简体",
          value: "zh"
        },
        {
          label: "English",
          value: "en"
        }
      ] //可切换语言
    };
  },
  getters: {
    getEchartsIDS() {
      return this.echartsIDS;
    },
    getEquipment() {
      return this.equipment;
    },
    getDirection() {
      return this.direction;
    },
    getNavTopHeight() {
      return this.navTopHeight;
    },
    getNavBottomHeight() {
      return this.navBottomHeight;
    },
    getH5() {
      return this.h5;
    },
    getBreakLabel() {
      return this.breakLabel;
    },
    getIsDark() {
      return this.isDark;
    },
    getTheme() {
      return this.theme;
    },
    getDarkTheme() {
      return this.darkTheme;
    },
    getLightTheme() {
      return this.lightTheme;
    },
    getThemeOption() {
      return this.themeOption;
    },
    getThemes() {
      return this.themes;
    },
    getThemess() {
      return this.themess;
    },
    getThemeOverrides() {
      return this.themeOverrides;
    },
    getLight() {
      return this.light;
    },
    getLightOption() {
      return this.lightOption;
    },
    getDark() {
      return this.dark;
    },
    getDarkOption() {
      return this.darkOption;
    },
    getLang() {
      return this.lang;
    },
    getLangFlag() {
      return this.langFlag;
    },
    getLangOption() {
      return this.langOption;
    }
  },
  actions: {
    setEchartsIDS(id) {
      this.echartsIDS.push(id);
    },
    setEquipment(equipment) {
      this.equipment = equipment;
    },
    setDirection(direction) {
      this.direction = direction;
    },
    setNavTopHeight(navTopHeight) {
      this.navTopHeight = navTopHeight;
    },
    setNavBottomHeight(navBottomHeight) {
      this.navBottomHeight = navBottomHeight;
    },
    /* 更新自定义naiveUI框架部分样式（更改主题或色调时需要触发） */
    setThemeOverrides() {
      this.themeOverrides = {
        common: {
          fontSize: "18px",
          fontFamily: "等线,微软雅黑,PingFang SC",
          scrollbarColor: this.themes,
          // primary颜色相关
          primaryColor: this.theme,
          primaryColorHover: this.theme,
          primaryColorPressed: this.themes,
          primaryColorSuppl: this.theme,
          // Info颜色相关
          infoColor: "#6495ED",
          infoColorHover: "#4169E1",
          infoColorPressed: "#6495ED",
          infoColorSuppl: "#00BFFF",
          // Success颜色相关
          successColor: "#61B72B",
          successColorHover: "#32CD32",
          successColorPressed: "#32CD32",
          successColorSuppl: "#7CFC00",
          // Warning颜色相关
          warningColor: "#cc8510",
          warningColorHover: "#cc7a40",
          warningColorPressed: "#cc8510",
          warningColorSuppl: "#fff000",
          // Error颜色相关
          errorColor: "#FF7F50",
          errorColorHover: "#FF6347",
          errorColorPressed: "#FF4500",
          errorColorSuppl: "#FF6347",
          bodyColor: this.isDark ? this.dark : this.light,
          // textcolor
          textColorBase: !this.isDark ? this.dark : this.light,
          textColor1: !this.isDark ? this.dark : this.light,
          textColor2: !this.isDark ? this.dark : this.light,
          textColor3: !this.isDark ? this.dark + "92" : this.light + "92",
          textColorDisabled: !this.isDark + "82" ? this.dark : this.light + "82"
        },
        Layout: {
          // color: this.theme,
          // siderColor: this.themess,
          headerBorderColor: "transparency",
          footerBorderColor: "transparency",
          siderBorderColor: "transparency",
          siderToggleButtonBorder: `1px solid ${!this.isDark ? this.dark : this.light}`
        },
        Menu: {
          itemColorHover: this.themes
        },
        Tabs: {
          tabBorderColor: this.themes
        },
        LoadingBar: {
          height: "2px"
        },
        Timeline: {
          iconSizeMedium: "5rem",
          contentFontSize:
            this.breakLabel == "md" || this.breakLabel == "lg" || this.breakLabel == "xl" ? "4rem" : "5rem"
        }
      };
    },
    /* 更新视口标识（窗口尺寸缩放时需要触发） */
    setBreakLabel() {
      const breakpoints = {
        null: "0px",
        xs: "375px",
        sm: "768px",
        md: "1024px",
        lg: "1400px",
        xl: "1600px"
      };
      const getBreakpointKey = (width) => {
        let currentBreakpoint = "null";
        for (let key in breakpoints) {
          if (parseInt(width) >= parseInt(breakpoints[key])) {
            currentBreakpoint = key;
          }
        }
        return currentBreakpoint;
      };
      const handleResize = () => {
        const width = window.innerWidth;
        const breakpointKey = getBreakpointKey(width);
        this.breakLabel = breakpointKey;
        this.setThemeOverrides();
      };
      handleResize();
      window.addEventListener("resize", handleResize);
    },
    setBodyBg() {
      document.getElementsByTagName("body")[0].style.setProperty("--atcolor", this.isDark ? this.dark : this.light);
      document.getElementsByTagName("body")[0].style.setProperty("--hgcolor", !this.isDark ? this.dark : this.light);
    },
    /* 更新浅色色调 */
    setLight(light) {
      this.light = light;
      document.getElementsByTagName("body")[0].style.setProperty("--light", light);
      this.setBodyBg();
    },
    /* 更新深色色调 */
    setDark(dark) {
      this.dark = dark;
      document.getElementsByTagName("body")[0].style.setProperty("--dark", dark);
      this.setBodyBg();
    },
    /* 更新深浅模式 */
    setIsDark(isDark) {
      this.isDark = isDark;
      this.getIsDark ? this.setDarkTheme(this.getDarkTheme) : this.setLightTheme(this.getLightTheme);
      this.setBodyBg();
      this.setThemeOverrides();
    },
    /* 更新主题颜色与相关浅色 */
    setTheme(theme) {
      let themes = theme.split("").length == 7 ? theme + "50" : theme.slice(0, 7) + "50";
      let themess = theme.split("").length == 7 ? theme + "30" : theme.slice(0, 7) + "30";
      this.theme = theme;
      this.themes = themes;
      this.themess = themess;
      document.getElementsByTagName("body")[0].style.setProperty("--theme", theme);
      document.getElementsByTagName("body")[0].style.setProperty("--themes", themes);
      document.getElementsByTagName("body")[0].style.setProperty("--themess", themess);
      this.setThemeOverrides();
    },
    setDarkTheme(theme) {
      this.darkTheme = theme;
      this.setTheme(theme);
      this.setBodyBg();
    },
    setLightTheme(theme) {
      this.lightTheme = theme;
      this.setTheme(theme);
      this.setBodyBg();
    },
    /* 更新语言类型 */
    setLang(lang) {
      this.lang = lang;
    },
    /* 更新默认配置（初始化） */
    init() {
      // this.setTheme(this.getTheme);
      this.getIsDark ? this.setDarkTheme(this.getDarkTheme) : this.setLightTheme(this.getLightTheme);
      this.setBreakLabel();
      this.setBodyBg();
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: `${import.meta.env.VITE_KEY}-app`,
        storage: localStorage
      }
    ]
  }
});
