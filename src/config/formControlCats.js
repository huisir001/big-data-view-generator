/*
 * @Description: 配置面板表单分类
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-11-13 17:45:47
 * @LastEditTime: 2020-11-13 18:04:14
 */
export default [
  {
    category: '图层配置',
    optionsFilter: []
  },
  {
    category: '图表基础配置',
    optionsFilter: ['title', 'horizontal']
  },
  {
    category: '数据配置',
    optionsFilter: ['chartData']
  },
  {
    category: '图例配置',
    optionsFilter: ['showLegend']
  },
  {
    category: 'X轴设置',
    optionsFilter: ['xName']
  },
  {
    category: 'Y轴设置',
    optionsFilter: ['yName']
  },
  {
    category: '边距设置',
    optionsFilter: ['left', 'top', 'bottom', 'right']
  },
  {
    category: '自定义配色',
    optionsFilter: ['colors']
  }
]
