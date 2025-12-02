import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import apiClient from '@/api'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/',
      component: AdminLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: 'student',
          name: 'student',
          component: () => import('@/views/StudentPage.vue'),
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('@/views/UserPage.vue'),
        },
        // Thêm các trang khác ở đây
      ],
    },
  ],
})

// function getCookie(name) {
//   const value = `; ${document.cookie}`
//   const parts = value.split(`; ${name}=`)
//   if (parts.length === 2) return parts.pop().split(';').shift()
//   return null
// }

// router.beforeEach((to, from, next) => {
//   const user = localStorage.getItem('user')
//   const isAuthenticated = !!user

//   if (!isAuthenticated) {
//     next({ name: 'login' })
//   } else {
//     next()
//   }
// })

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem('user')
//       window.location.href = '/login'
//     }
//     return Promise.reject(error)
//   },
// )

export default router
