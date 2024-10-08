import { createWebHashHistory, createRouter } from "vue-router";
import { useAppStore } from "@/store/modules/app";
import { watch } from "vue";
// import { getCookie } from "@/common";
import defaults from "./modules/defaults";
import web from "./modules/web";
import no from "./modules/no";
export const constantRouterMap = [...no, ...defaults, ...web];
export const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRouterMap,
  scrollBehavior: () => ({ left: 0, top: 0 })
});

router.beforeEach((to, from, next) => {
  const appStore = useAppStore();
  window.$loadingBar.start();
  document.title = to?.meta?.title
    ? to.meta.title.includes(".")
      ? window.$t(to.meta.title)
      : to.meta.title
    : import.meta.env.VITE_APP_TITLE;
  setTimeout(() => {
    watch(
      () => appStore.getLang,
      () => {
        document.title = to?.meta?.title
          ? to.meta.title.includes(".")
            ? window.$t(to.meta.title)
            : to.meta.title
          : import.meta.env.VITE_APP_TITLE;
      },
      { immediate: true }
    );
  }, 600);
  next();
  /*   let token = getCookie("token");
if (!token && to.path !== "/login") {
  next({ path: "/login" });
} else {
  next();
} */
});
router.beforeResolve(() => {
  try {
    window.$loadingBar.finish();
  } catch (error) {
    console.log(error);
  }
});
