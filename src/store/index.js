/*
 * @Description: 状态层
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-04 15:14:43
 * @LastEditTime: 2021-03-03 10:14:36
 */
import Vue from 'vue'
import Vuex from 'vuex'
import system from './modules/system' //系统层
import layer from './modules/layer' //图层

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    modules: {
        system,
        layer,
    },
})