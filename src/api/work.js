/*
 * @Description: 作品管理
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-02-28 21:36:38
 * @LastEditTime: 2021-03-01 22:58:13
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

// 删除作品
export const RemoveById = (workId) =>
    Axios.post(`${Prefix}/removeById`, { workId })

// 复制作品
export const CopyById = (id) => Axios.post(`${Prefix}/copyById`, { id })
