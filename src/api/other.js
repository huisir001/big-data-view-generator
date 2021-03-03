/*
 * @Description: 其他
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-02-28 21:36:38
 * @LastEditTime: 2021-03-03 13:29:56
 */
import Axios from '@/utils/axios'

// 生成html
export const GetViewhtml = () => Axios.get(`./resource/viewhtml.dat`)
