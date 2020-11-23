/*
 * @Description: axios初始化和全局配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-06 13:16:24
 * @LastEditTime: 2020-11-23 16:10:47
 */
import axios from 'axios'

//初始化
let Axios = axios.create({
    // timeout: 10000, //超时
    // baseURL: process.env.VUE_APP_BASEAPI //api路径
    // headers: {'Content-Type':'application/x-www-form-urlencoded'}  //header
})

//全局配置
Axios.interceptors.response.use(
    (response) => {
        // 对响应数据做些事
        if (response.status === 200) {
            return response.data
        } else {
            return Promise.reject(response) // 返回接口返回的错误信息
        }
    },
    (error) => {
        console.error('服务器请求失败')
        console.log(error)
        return Promise.reject(error) // 返回接口返回的错误信息
    }
)

export default Axios
