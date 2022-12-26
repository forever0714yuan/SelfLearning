import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/mappage'
    },
    {
      path: '/sellerpage',
      name: 'sellerpage',
      component: () => import('../views/SellerPage/SellerPage.vue')
    },
    {
      path: '/trendpage',
      name: 'trendpage',
      component: () => import('../views/TrendPage/TrendPage.vue')
    },
    {
      path: "/mappage",
      name: 'mappage',
      component: () => import('../views/MapPage/MapPage.vue')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
