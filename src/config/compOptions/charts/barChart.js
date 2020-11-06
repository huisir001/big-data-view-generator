/*
 * @Description: 图表默认Options
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2020-11-06 15:37:59
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
  xName: '姓名',
  yName: '售价',
  left: 40,
  top: 68,
  right: 28,
  bottom: 28,
  showLegend: true, //显示图例
  colors: [
    '#5ef5ff',
    '#27bf99',
    '#00BCD4',
    '#2d8ebf',
    '#1d88eb',
    '#6268f2',
    '#f2b3c9',
    '#f58db2',
    '#d0648a',
    '#cc70af'
  ],
  ...common
}
