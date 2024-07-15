import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'
import GameView from '../views/GameView.vue'
import SummaryView from '../views/SummaryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WelcomeView
    },
    {
      path: '/in-game',
      name: 'game',
      component: GameView
    },
    {
      path: '/summary',
      name: 'summary',
      component: SummaryView
    }
  ]
})

export default router
