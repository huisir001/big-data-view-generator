/*
 * @Description: 主入口
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-04 15:14:43
 * @LastEditTime: 2021-02-27 22:52:21
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueBigdata from './@vue/big-data' //组件库
import VueClipboard from 'vue-clipboard2'
import { ClickPreventShake } from './utils/myUtils'
import './utils/elemUi'
import './assets/css/public.scss'

Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示

//注册组件库
Vue.use(VueBigdata)
//剪贴板插件
Vue.use(VueClipboard)
//按钮防抖指令
Vue.use(ClickPreventShake)

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')
