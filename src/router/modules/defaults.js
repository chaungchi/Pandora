export default [
  {
    path: "/login",
    name: "login",
    component: () => import("@/view/login/login.vue"),
    meta: { title: "router.login" }
  },
  {
    path: "/",
    redirect: "/web"
  },
  {
    path: "/web",
    redirect: "/web/home"
  }
];
