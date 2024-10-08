import { createRouter, createWebHashHistory } from "vue-router";
import { cloneDeep, omit } from "lodash";
const modules = import.meta.glob("../view/**/*.{vue,tsx}");

/* Layout */
export const Layout = () => import("@/layout/layout.vue");

// 后端控制路由生成
export const generateRoutesByServer = (routes) => {
  const res = [];
  for (const route of routes) {
    const data = {
      path: route.path,
      name: route.name,
      redirect: route.redirect,
      meta: route.meta
    };
    if (route.component) {
      const comModule = modules[`../${route.component}.vue`] || modules[`../${route.component}.tsx`];
      const component = route.component;
      if (!comModule && !component.includes("#")) {
        console.error(`未找到${route.component}.vue文件或${route.component}.tsx文件，请创建`);
      } else {
        data.component =
          //   component === '#' ? Layout : component.includes('##') ? getParentLayout() : comModule
          // component == '#' ? Layout :  comModule
          component == "#" ? Layout : comModule;
        // data.component = comModule
      }
    }
    // recursive child routes
    if (route.children) {
      data.children = generateRoutesByServer(route.children);
    }
    if (route?.role) {
      const arr = route.role;
      const item = arr.find((t) => t == "*");
      if (item) {
        res.push(data);
      } else {
        // const str = localStorage.getItem('this-role')
        const str = ["admin"];
        const fn = (arr1 = [], arr2 = []) => {
          return arr1.some((val) => {
            return arr2.includes(val);
          });
        };
        const role = JSON.parse(str);
        if (fn(role, arr)) {
          res.push(data);
        }
      }
    } else {
      res.push(data);
    }
  }
  return res;
};
// 路由降级
export const flatMultiLevelRoutes = (routes) => {
  const modules = cloneDeep(routes);
  for (let index = 0; index < modules.length; index++) {
    const route = modules[index];
    if (!isMultipleRoute(route)) {
      continue;
    }
    promoteRouteLevel(route);
  }
  return modules;
};

// 层级是否大于2
const isMultipleRoute = (route) => {
  if (!route || !Reflect.has(route, "children") || !route.children?.length) {
    return false;
  }
  const children = route.children;
  let flag = false;
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    if (child.children?.length) {
      flag = true;
      break;
    }
  }
  return flag;
};
// 生成二级路由
const promoteRouteLevel = (route) => {
  let router = createRouter({
    routes: [route],
    history: createWebHashHistory()
  });
  const routes = router.getRoutes();
  addToChildren(routes, route.children || [], route);
  router = null;
  route.children = route.children?.map((item) => omit(item, "children"));
};
// 添加所有子菜单
const addToChildren = (routes, children, routeModule) => {
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    const route = routes.find((item) => item.name === child.name);
    if (!route) {
      continue;
    }
    routeModule.children = routeModule.children || [];
    if (!routeModule.children.find((item) => item.name === route.name)) {
      routeModule.children?.push(route);
    }
    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule);
    }
  }
};
