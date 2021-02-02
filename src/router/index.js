/*
 * @Description: 路由
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-04 15:14:43
 * @LastEditTime: 2021-02-02 16:36:46
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Startup from '@/views/Startup'
import EditPanel from '@/views/EditPanel'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/EditPanel',
    },
    {
        path: '/Startup',
        name: 'Startup',
        component: Startup,
        meta: {
            title: '启动页',
        },
    },
    {
        path: '/EditPanel',
        name: 'EditPanel',
        component: EditPanel,
        meta: {
            title: '编辑面板',
        },
    },
    {
        path: '/WorkList',
        name: 'WorkList',
        meta: {
            title: '作品管理',
        },
        component: () => import('@/views/WorkList'),
    },
    {
        path: '/Preview',
        name: 'Preview',
        meta: {
            title: '预览页面',
        },
        component: () => import('@/views/Preview'),
    },
    // {
    //     path: '/test',
    //     name: 'Test',
    //     meta: {
    //         title: '测试',
    //     },
    //     component: () => import('@/@vue/big-data/components/Table'),
    // },
]

const router = new VueRouter({
    //   mode: 'history',
    routes,
})

export default router
