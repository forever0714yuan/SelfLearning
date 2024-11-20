import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import IndexSideBar from '@/common/IndexSideBar.vue';
import { getStorage } from '@/utils/storage'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main/welcome'
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/common/IndexSideBar.vue'),
    // component: IndexSideBar,
    children: [
      {
        path: 'welcome',
        name: 'welcome',
        component: () => import('@/views/Welcome/Welcome.vue')
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/Order/Order.vue')
      },
      {
        path: 'orderdetails',
        name: 'orderdetails',
        component: () => import('@/views/Order/orderDetails.vue')
      },

      {
        path: 'goods',
        name: 'goods',
        component: () => import('@/views/Goods/Goods.vue')
      },
      {
        path: 'nature',
        name: 'nature',
        component: () => import('@/views/Nature/Nature.vue')
      },
      {
        path: 'shopcart',
        name: 'shopcart',
        component: () => import('@/views/ShopCart/ShopCart.vue')
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/User/User.vue')
      },
      {
        path: 'settings/showset',
        name: 'showset',
        component: () => import('@/views/ShowSet/ShowSet.vue')
      },
      {
        path: 'ad',
        name: 'ad',
        component: () => import('@/views/Ad/Ad.vue')
      },
      {
        path: 'notice',
        name: 'notice',
        component: () => import('@/views/Notice/Notice.vue')
      },
      {
        path: 'freight',
        name: 'freight',
        component: () => import('@/views/Freight/Freight.vue')
      },
      {
        path: 'shipper',
        name: 'shipper',
        component: () => import('@/views/Shipper/Shipper.vue')
      },
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/Admin/Admin.vue')
      },
      {
        path: "editcategory",
        name: "editcategory",
        component: () => import("@/views/Nature/NatureEdit.vue")
      },
      {
        path: "categorytype",
        name: "categorytype",
        component: () => import("@/views/Nature/CategoryType.vue")
      }
    ]
  },
  {
    path: '/goodsadd',
    name: 'goodsadd',
    component: () => import('@/views/Goods/GoodAdd.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/Login.vue')
  },

  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (About.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import('../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // console.log(to);
  const isLogin: boolean = getStorage('token') ? true : false;
  // console.log(isLogin);

  if (to.fullPath === '/login') {
    next()
  } else {
    isLogin ? next() : next({ path: '/login' })
  }
})

export default router
