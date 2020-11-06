/*
 * @Description: 图表默认Options
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2020-11-06 11:54:49
 */
import common from './common'
export default {
  title: '柱状图',
  chartData: {
    xAxis: ['郑丽', '于平', '龚娟', '杜强'],
    series: [
      { name: '产品1', data: [349, 955, 893, 459] },
      { name: '产品2', data: [466, 102, 610, 967] },
      { name: '产品3', data: [183, 425, 967, 370] }
    ]
  },
  xName: '',
  yName: '',
  left: 26,
  top: 0,
  right: 0,
  bottom: 0,
  ...common
}
