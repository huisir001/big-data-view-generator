/*
 * @Description: axios初始化和全局配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-06 13:16:24
 * @LastEditTime: 2021-02-28 00:04:14
 */
import { Message } from 'element-ui' //提示信息
import axios from 'axios'

//初始化
let Axios = axios.create({
    baseURL: process.env.VUE_APP_BASEAPI, //api路径
    // timeout: 1000,      //超时
    // headers: {'Content-Type':'application/x-www-form-urlencoded'}  //header
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
        Message.error(error.response.data.msg)
        console.error(error)
        // 若这里响应码为403，则改变登陆状态，弹出登录框

        return error.response.data
    }
)

export default Axios
