/*
 * @Description: 主入口
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-04 15:14:43
 * @LastEditTime: 2020-09-25 16:34:29
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueBigdata from './@vue/big-data' //组件库
import './utils/elemUi'
import './assets/css/public.scss'

Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示

//注册组件库
Vue.use(VueBigdata)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
