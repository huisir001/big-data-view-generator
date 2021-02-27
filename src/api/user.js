/*
 * @Description: 用户接口
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-06 13:24:27
 * @LastEditTime: 2021-02-27 21:26:46
 */
import Axios from '@/utils/axios'
const Prefix = '/api/user'

// get请求
// export const Test1 = (params) => Axios.get(`${Prefix}/test`, { params })
// post请求
// export const Login = (params) => Axios.post(`${Prefix}/login`, params)

//注册
export const Signup = (params) => Axios.post(`${Prefix}/signup`, params)

//登陆
export const Login = (params) => Axios.post(`${Prefix}/login`, params)
