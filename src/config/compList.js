/*
 * @Description: 组件列表
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-23 10:33:00
 * @LastEditTime: 2020-09-24 14:53:46
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
      },
      {
        title: '仪表盘',
        type: 'gaugeChart',
        pic: require('@/assets/img/compList/gauge.png')
      },
      {
        title: '雷达图',
        type: 'radarChart',
        pic: require('@/assets/img/compList/radar.png')
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
