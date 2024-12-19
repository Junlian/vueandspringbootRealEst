import { createRouter, createWebHistory } from 'vue-router'
import PropertyListing from '@/pages/PropertyListing.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PropertyListing
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/pages/auth/SignInPage.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/pages/auth/SignUpPage.vue')
    }
  ]
})

export default router