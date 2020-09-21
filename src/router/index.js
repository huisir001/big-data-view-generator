/*
 * @Description: 路由
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-04 15:14:43
 * @LastEditTime: 2020-09-21 15:22:44
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import EditPanel from '@/views/EditPanel'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/EditPanel'
  },
  {
    path: '/EditPanel',
    name: 'EditPanel',
    component: EditPanel,
    meta: {
      title: '编辑面板'
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
