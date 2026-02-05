import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import MobilePage from './pages/MobilePage.vue'
import DashboardPage from './pages/DashboardPage.vue'
import './style.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/mobile' },
    { path: '/mobile', component: MobilePage },
    { path: '/dashboard', component: DashboardPage },
  ],
})

createApp(App).use(router).mount('#app')
