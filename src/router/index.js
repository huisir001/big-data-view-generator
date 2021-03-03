/*
 * @Description: 路由
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-04 15:14:43
 * @LastEditTime: 2021-03-03 11:29:09
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Startup from '@/views/Startup'
import EditPanel from '@/views/EditPanel'

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
        path: '/Preview',
        name: 'Preview',
        meta: {
            title: '预览页面',
        },
        component: () => import('@/views/Preview'),
    },
]

const router = new VueRouter({
    //   mode: 'history',
    routes,
})

// 路由执行钩子
router.beforeEach(async (to, from, next) => {
    // 外站进入\第一次打开、刷新网页
    if (!from.name && to.name != 'Startup' && to.name != 'Preview') {
        next('/Startup')
        return
    } else if (
        to.name == 'EditPanel' &&
        !router.app.$store.state.system.pageOptions.pid
    ) {
        //没有pid时候回首页
        next('/Startup')
    } else if (to.name == 'Preview') {
        const PreviewLayers = sessionStorage.getItem(`layers`),
            PreviewPageOptions = sessionStorage.getItem(`pageOptions`)
        if (!PreviewLayers || !PreviewPageOptions) {
            // 预览页没有数据
            next('/Startup')
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router