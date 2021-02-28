/*
 * @Description: 状态层
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-04 15:14:43
 * @LastEditTime: 2021-02-28 12:04:47
 */
import Vue from 'vue'
import Vuex from 'vuex'
import system from './modules/system' //系统层
import layer from './modules/layer' //图层

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
    actions: {},
    getters: {},
    modules: {
        system,
        layer,
    },
})
