import { defineStore } from "pinia";
import { constantRouterMap } from "@/router";
import { generateRoutesByServer, flatMultiLevelRoutes } from "@/utils/routerHelper";
import { cloneDeep } from "lodash";
export const usePermissionStore = defineStore("permission", {
  state: () => ({
    routers: [],
    addRouters: [],
    isAddRouters: false,
    menuTabRouters: []
  }),
  getters: {
    getRouters() {
      return this.routers;
    },
    getAddRouters() {
      return flatMultiLevelRoutes(cloneDeep(this.addRouters));
    },
    getIsAddRouters() {
      return this.isAddRouters;
    }
  },
  actions: {
    generateRoutes(routers) {
      return new Promise((resolve) => {
        let routerMap = [];
        // 后端过滤菜单
        routerMap = generateRoutesByServer(routers);
        // 动态路由，404一定要放到最后面
        this.addRouters = routerMap.concat([
          {
            path: "/:path(.*)*",
            redirect: "/404",
            name: "404Page",
            meta: {
              hidden: true,
              breadcrumb: false
            }
          }
        ]);
        this.addRouters = routerMap;
        // 渲染菜单的所有路由
        console.log("所有路由：", constantRouterMap);
        console.log("新增路由：", routers);
        this.routers = cloneDeep(constantRouterMap).concat(routerMap);
        resolve();
      });
    },
    setIsAddRouters(state) {
      this.isAddRouters = state;
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: `${import.meta.env.VITE_KEY}-permission`,
        storage: localStorage
      }
    ]
  }
});
