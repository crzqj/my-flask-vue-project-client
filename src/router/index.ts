import { createRouter, createWebHistory } from 'vue-router'
import PingPong from '../components/PingPong.vue'
import BookList from '../components/BookList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/ping',
      name: 'ping',
      component: PingPong
    },
    {
        path: '/',
        name: 'BookList',
        component: BookList
      },
  ]
})

export default router