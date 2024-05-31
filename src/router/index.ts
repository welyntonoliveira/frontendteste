import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FuncionarioDetalheView from '../views/FuncionarioDetalheView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    { 
      path: '/funcionario/:id',
      name: 'funcionarioDetalhe',
      component: FuncionarioDetalheView, 
      props: true 
    },
  ]
})

export default router
