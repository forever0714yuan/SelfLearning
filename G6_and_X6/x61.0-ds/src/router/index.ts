import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
      children: [
        {
          path: "graph",
          name: "graph",
          component: () => import("@/views/Graph/Graph.vue"),
        },
      ],
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/Home/Home.vue"),
    },
  ],
});

export default router;
