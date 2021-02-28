/*
 * @Description: 用户接口
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-06 13:24:27
 * @LastEditTime: 2021-02-28 19:10:31
 */
import Axios from '@/utils/axios'
const Prefix = '/api/user'

//注册
export const Signup = (params) => Axios.post(`${Prefix}/signup`, params)

//登陆
export const Login = (params) => Axios.post(`${Prefix}/login`, params)

//获取当前用户
export const GetUserInfo = () => Axios.get(`${Prefix}/getUserInfo`)

// 登出
export const Logout = () => Axios.post(`${Prefix}/logout`)
