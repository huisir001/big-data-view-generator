/*
 * @Description: 路由
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-04 15:14:43
 * @LastEditTime: 2021-02-28 23:13:57
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Startup from '@/views/Startup'
import EditPanel from '@/views/EditPanel'
import { GetUserInfo } from '@/api/user'

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
        path: '/EditPanel/:id',
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
router.beforeEach(async (to, from, next) => {
    // 外站进入\第一次打开、刷新网页
    if (!from.name || !router.app.$store.state) {
        //获取token
        const token = sessionStorage.getItem('_token')
        if (token) {
            // 查询用户信息
            const { ok, data } = await GetUserInfo()
            // 这里不再判定用户信息是否查到，若有错误会在axios全局配置钩子中处理
            router.app.$store.commit('setStates', {
                isLogin: 1, // 登陆状态
                userInfo: data, // 用户信息缓存
            })
            if (!to.meta.notLogin && ok == 0) {
                next('/Startup')
            } else {
                next()
            }
        } else {
            //没有token 设置状态
            router.app.$store.commit('setStates', {
                isLogin: 0, // 登陆状态
                userInfo: null, // 用户信息缓存
            })
            //直接转Startup
            if (!to.meta.notLogin) {
                next('/Startup')
            } else {
                next()
            }
        }
        return
    }
    /* 登陆验证 */
    if (!to.meta.notLogin && !router.app.$store.state.isLogin) {
        //请登录，弹出登陆框
        router.app.$store.commit('setStates', {
            showLoginBox: true,
        })
    } else {
        next()
    }
})

export default router
