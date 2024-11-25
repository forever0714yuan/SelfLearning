import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("@/views/Layout/index.vue"),
      children: [
        {
          path: "index01",
          name: "index01",
          component: () => import("@/views/quickStart/index01.vue"),
        },
        {
          path: "index02",
          name: "index02",
          component: () => import("@/views/quickStart/index02.vue"),
        },
        {
          path: "index03",
          name: "index03",
          component: () => import("@/views/quickStart/index03.vue"),
        },
      ],
    },
  ],
});

export default router;
