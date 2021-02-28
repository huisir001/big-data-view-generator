/*
 * @Description: axios初始化和全局配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-06 13:16:24
 * @LastEditTime: 2021-02-28 13:00:40
 */
import { Message } from 'element-ui' //提示信息
import axios from 'axios'
import Store from '@/store'

//初始化
let Axios = axios.create({
    baseURL: process.env.VUE_APP_BASEAPI, //api路径
    headers: { token: sessionStorage.getItem('_token') },
    // timeout: 1000,      //超时
})

//全局配置
Axios.interceptors.response.use(
    (response) => {
        // 对响应数据做些事
        if (response.status === 200) {
            if (typeof response.data == 'string') {
                response.data = JSON.parse(response.data)
            }
            if (!response.data.ok) {
                Message.error(response.data.msg)
                console.error('[Request error]: ' + response.data.msg)
            }
        } else {
            Message.error(response.data.msg)
            console.error('[Request error]: ' + response.data.msg)
        }
        return response.data
    },
    (error) => {
        const { status, data } = error.response
        Message.error(data.msg) //错误提示
        console.error(error)
        // 若这里响应码为403，则改变登陆状态，弹出登录框
        if (status == 403) {
            Store.commit('setStates', {
                isLogin: 0, // 登陆状态
                userInfo: null, // 用户信息缓存
                showLoginBox: true, // 打开登陆弹窗
            })
            //删除token
            sessionStorage.removeItem('_token')
        }
        return data
    }
)

export default Axios
