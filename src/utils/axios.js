/*
 * @Description: axios初始化和全局配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-06 13:16:24
 * @LastEditTime: 2021-03-03 10:07:57
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
        const { status, data, statusText } = error.response
        Axios.loading.close() // 关闭loading
        console.error(error)
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