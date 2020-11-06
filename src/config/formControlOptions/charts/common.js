/*
 * @Description: 配置公共Option
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2020-11-06 17:13:49
 */
export default [
  {
    key: 'chartData',
    compType: 'input',
    label: '图表数据',
    inputType: 'textarea',
    readonly: true,
    showBtnGroup: true
  },
  {
    key: 'title',
    compType: 'input',
    label: '图表标题'
  },
  {
    key: 'xName',
    compType: 'input',
    label: 'x轴名称'
  },
  {
    key: 'yName',
    compType: 'input',
    label: 'y轴名称'
  },
  {
    key: 'left',
    compType: 'slider',
    label: '左边距',
    min: 0,
    max: 200
  },
  {
    key: 'top',
    compType: 'slider',
    label: '上边距',
    min: 0,
    max: 200
  },
  {
    key: 'right',
    compType: 'slider',
    label: '右边距',
    min: 0,
    max: 200
  },
  {
    key: 'bottom',
    compType: 'slider',
    label: '下边距',
    min: 0,
    max: 200
  },
  {
    key: 'showLegend',
    compType: 'switch',
    label: '显示图例'
  },
  {
    key: 'colors',
    compType: 'colors',
    label: '单柱颜色',
    labelOnTop: true //标签在上面
  },
  {
    key: 'seriesColors',
    compType: 'colors',
    label: '多柱颜色',
    labelOnTop: true
  }
]
