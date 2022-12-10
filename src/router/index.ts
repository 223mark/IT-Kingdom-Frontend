import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomePage/HomePage.vue')
  },

  {
    path: '/userInfo/',
    name: 'userInfo',
    component: () => import('../views/User/UserInfo.vue')
  },
  {
    path: '/shop',
    name: 'shopPage',
    component: () => import('../views/Shop/ShopIndex.vue')
  },
  {
    path: '/phone',
    name: 'phonePage',
    component: () => import('../views/PhonePage.vue')
  },
  {
    path: '/loginPage',
    name: 'loginPage',
    component: () => import('../components/LoginPage.vue')
  },
  {
    path: '/registerPage',
    name: 'resgisterPage',
    component: () => import('../components/RegisterPage.vue')
  },
  {
    path: '/myCart',
    name: 'myCart',
    component: () => import('../components/MyCart.vue')
  },
  {
    path: '/laptop',
    name: 'laptopPage',
    component: () => import('../views/LaptopPage.vue')
  },
  {
    path: '/news',
    name: 'newsPage',
    component: () => import('../views/NewsPage.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
