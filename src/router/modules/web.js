export default [
  {
    path: "/web",
    component: () => import("@/layout/layout.vue"),
    name: "web",
    children: [
      /* 前端 */
      {
        path: "home",
        component: () => import("@/view/home/home.vue"),
        name: "home"
      }
    ]
  }
];
