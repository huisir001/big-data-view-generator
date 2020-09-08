/*
 * @Description: 测试接口
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-06 13:24:27
 * @LastEditTime: 2020-08-12 10:26:30
 */
import Axios from '@/utils/axios'
const basePath = '/test'

// 模拟请求
export const getData = apiName =>
  Axios.get(`${basePath}/${apiName}`, {
    params: {
      /* 这里传字段 */
    }
  })

//需要直接传字段的请求
export const demo = params => Axios.get(`${basePath}/demo`, { params })
