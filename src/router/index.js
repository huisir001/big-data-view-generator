/*
 * @Description: 路由
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-04 15:14:43
 * @LastEditTime: 2020-09-09 17:20:18
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: '首页'
    }
  }
  // {
  //   path: '/lineCharts',
  //   name: 'lineCharts',
  //   meta: {
  //     title: '折线图'
  //   },
  //   component: () => import('@/views/demo/lineCharts.vue')
  // },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
