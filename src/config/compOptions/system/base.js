/*
 * @Description: 蓝图配置项（画布）
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-01-11 14:49:25
 * @LastEditTime: 2021-01-11 15:27:20
 */
import { getRanId } from '@/utils/myUtils'
export default {
    title: '大数据视图页',
    screenSize: [1920, 1080],
    bgColor: 'rgba(30, 144, 255, 1)',
    useBgImage: false,
    bgImage: '',
    showGrid: false,
    router: `P-${getRanId()}`,
}
