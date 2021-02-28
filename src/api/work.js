/*
 * @Description: 作品管理
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-02-28 21:36:38
 * @LastEditTime: 2021-02-28 23:46:03
 */
import Axios from '@/utils/axios'
const Prefix = '/api/work'

//创建
export const CreateWork = (params) => Axios.post(`${Prefix}/create`, params)

//更新
export const UpdateWork = (params) => Axios.post(`${Prefix}/update`, params)

// //获取当前用户
// export const GetUserInfo = () => Axios.get(`${Prefix}/getUserInfo`)

// // 登出
// export const Logout = () => Axios.post(`${Prefix}/logout`)
