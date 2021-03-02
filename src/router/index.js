/*
 * @Description: 路由
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-04 15:14:43
 * @LastEditTime: 2021-03-02 17:05:51
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Startup from '@/views/Startup'
import EditPanel from '@/views/EditPanel'
import BeforeEach from './beforeEach'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/Startup',
    },
    {
        path: '/Startup',
        name: 'Startup',
        component: Startup,
        meta: {
            title: '启动页',
            notLogin: true, //无需登陆
        },
    },
    {
        // path: '/EditPanel/:id',
        path: '/EditPanel',
        name: 'EditPanel',
        component: EditPanel,
        meta: {
            title: '编辑面板',
        },
    },
    {
        path: '/WorkList/:comp',
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
    //     path: '/workview/:id', //动态路由，传入作品id
    //     name: 'WorkView',
    //     meta: {
    //         title: '作品共享',
    //          notLogin:true
    //     },
    //     component: () => import('@/views/WorkView'),
    // },
    // {
    //     path: '/test',
    //     name: 'Test',
    //     meta: {
    //         title: '测试',
    //     },
    //     component: () => import('@/@vue/big-data/components/BorderBox'),
    // },
]

const router = new VueRouter({
    //   mode: 'history',
    routes,
})

// 路由前置钩子
BeforeEach(router)

export default router
