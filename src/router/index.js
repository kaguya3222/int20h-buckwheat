import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: () => ({ name: 'products', params: { page: 1 } })
  },
  {
    path: '/products/:page',
    props: route => ({ page: Number(route.params.page) }),
    name: 'products',
    component: () => import('@/pages/PageProducts')
  },
  {
    path: '/charts',
    name: 'chart',
    component: () => import('@/pages/PageCharts')
  },
  {
    path: '*',
    component: () => import('@/pages/PageNotFound')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
