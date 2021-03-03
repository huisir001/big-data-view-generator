/*
 * @Description: axios初始化和全局配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-06 13:16:24
 * @LastEditTime: 2021-03-03 13:26:31
 */
import { Message, Loading } from 'element-ui' //提示信息
import axios from 'axios'
import Store from '@/store'

//初始化
let Axios = axios.create({
    baseURL: process.env.VUE_APP_BASEAPI, //api路径
    // headers: {},
    // timeout: 1000,      //超时
})

//请求前钩子
Axios.interceptors.request.use(
    (config) => {
        // 加载loading
        Axios.loading = Loading.service({
            text: 'Loading',
            // spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.4)',
        })
        // 由于执行请求时token可能已经改变，故每次请求前都要重新获取token
        const Token = sessionStorage.getItem('_token')
        if (Token) {
            // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers['token'] = Token
        }
        return config
    },
    (error) => {
        Axios.loading.close() // 关闭loading
        console.error(error)
    }
)

//响应后钩子
Axios.interceptors.response.use(
    (response) => {
        // 对响应数据做些事
        if (response.status === 200) {
            if (typeof response.data == 'string') {
                try {
                    response.data = JSON.parse(response.data)
                } catch (error) {}
                // 关闭loading
                Axios.loading.close()
                return response.data
            }
            if (!response.data.ok) {
                Message.error(response.data.msg)
                console.error('[Request error]: ' + response.data.msg)
            }
        } else {
            Message.error(response.data.msg)
            console.error('[Request error]: ' + response.data.msg)
        }
        // 关闭loading
        Axios.loading.close()
        return response.data
    },
    (error) => {
        if (!error.response) {
            Axios.loading.close() // 关闭loading
            Message.error('请确保在服务器环境运行此系统！') //错误提示
            return
        }
        const { status, data, statusText } = error.response
        Axios.loading.close() // 关闭loading
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
        setTimeout(() => {
            if (data) {
                Message.error(data.msg) //错误提示
            } else {
                Message.error(`${status}: ${statusText}`) //错误提示
            }
        }, 100)
        return data
    }
)

export default Axios
