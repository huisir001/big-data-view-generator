/*
 * @Description: 作品管理
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-02-28 21:36:38
 * @LastEditTime: 2021-03-01 16:10:39
 */
import Axios from '@/utils/axios'
const Prefix = '/api/work'

//创建
export const CreateWork = (params) => Axios.post(`${Prefix}/create`, params)

//更新
export const UpdateWork = (params) => Axios.post(`${Prefix}/update`, params)

// 获取当前用户作品
export const FindByUserid = () => Axios.get(`${Prefix}/findByUserid`)

// 通过id获取作品
export const FindById = (id) =>
    Axios.get(`${Prefix}/findById`, { params: { id } })

// // 登出
// export const Logout = () => Axios.post(`${Prefix}/logout`)
