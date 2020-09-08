/*
 * @Description: 主入口
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-04 15:14:43
 * @LastEditTime: 2020-09-03 15:08:59
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/public.scss'
process.env.NODE_ENV == 'development' && require('../mock') //mockjs

Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
