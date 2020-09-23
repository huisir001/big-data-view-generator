/*
 * @Description: 组件列表
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-23 10:33:00
 * @LastEditTime: 2020-09-23 17:07:54
 */
export default [
  {
    category: '标准图表',
    list: [
      {
        title: '柱状图',
        type: 'barChart',
        pic: require('@/assets/img/compList/bar.png')
      },
      {
        title: '折线图',
        type: 'lineChart',
        pic: require('@/assets/img/compList/line.png')
      },
      {
        title: '饼图',
        type: 'pieChart',
        pic: require('@/assets/img/compList/pie.png')
      }
    ]
  },
  {
    category: '定制图表',
    list: []
  },
  {
    category: '媒体组件',
    list: []
  }
]
