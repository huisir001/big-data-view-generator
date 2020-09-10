/*
 * @Description: 状态层
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-04 15:14:43
 * @LastEditTime: 2020-09-10 13:52:03
 */
import Vue from 'vue'
import Vuex from 'vuex'
import system from './modules/system' //系统层

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    system
  }
})
