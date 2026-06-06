import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import DetailPage from '@/pages/DetailPage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/detail',
    name: 'Detail',
    component: DetailPage,
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
