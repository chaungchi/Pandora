export default [
  {
    path: "/:pathMatch(.*)",
    redirect: "/404"
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/view/NotFound/404.vue")
  }
];
