/*
 * @Description: 状态层
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-04 15:14:43
 * @LastEditTime: 2021-02-28 19:35:21
 */
import Vue from 'vue'
import Vuex from 'vuex'
import system from './modules/system' //系统层
import layer from './modules/layer' //图层
import { Logout } from '@/api/user'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogin: 0, //登录状态 0-未登录 1-已登录
        showLoginBox: false, //登陆弹窗
        showSignupBox: false, //注册弹窗
        userInfo: null,
    },
    mutations: {
        /* 修改状态 */
        setStates(state, obj) {
            Object.keys(obj).forEach((key) => {
                state[key] = obj[key]
            })
        },
    },
    actions: {
        // 退出登陆
        async logout({ commit }, vm) {
            const { ok, msg } = await Logout()
            if (ok) {
                // 状态设置
                commit('setStates', {
                    isLogin: 0, // 登陆状态
                    userInfo: null, // 用户信息缓存
                })

                // 删token缓存
                sessionStorage.removeItem('_token')

                // 提示
                vm.$message({
                    message: msg,
                    type: 'success',
                })

                // 跳转
                if (vm.$route.name != 'Startup')
                    vm.$router.replace({ name: 'Startup' })
            }
        },
    },
    getters: {},
    modules: {
        system,
        layer,
    },
})
