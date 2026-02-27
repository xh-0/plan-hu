import { createRouter, createWebHashHistory } from 'vue-router'

import List from '@/views/List.vue'
import Editor from '@/views/Editor.vue'

const routes = [
  { path: '/', component: List },
  { path: '/note/:id', component: Editor },
  { path: '/new', component: Editor },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})