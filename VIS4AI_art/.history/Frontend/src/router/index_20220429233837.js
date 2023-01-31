import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VisView from '../views/visView.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/vis',
      name: 'home',
      component: VisView
    },
    {
      path: '/',
      redirect: '/vis'
    }
  ]
})

export default router
