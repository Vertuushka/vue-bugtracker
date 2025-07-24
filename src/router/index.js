import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import DashboardPage from '../views/DashboardPage.vue'
import CreateAccoutPage from '../views/CreateAccoutPage.vue'

const routes = [
  { path: '/login', component: LoginPage },
  { path: '/signup', component: CreateAccoutPage },
  { path: '/', component: DashboardPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
