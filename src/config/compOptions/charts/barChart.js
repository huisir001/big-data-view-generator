/*
 * @Description: 图表默认Options
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2020-11-23 17:55:23
 */
import common from './common'
export default {
    title: '柱状图',
    chartData: {
        xAxis: ['郑丽', '于平', '龚娟', '杜强'],
        series: [
            { name: '产品1', data: [349, 955, 893, 459] },
            { name: '产品2', data: [466, 102, 610, 967] },
            { name: '产品3', data: [183, 425, 967, 370] },
        ],
    },
    xName: '姓名',
    yName: '数量',
    left: 40,
    top: 68,
    right: 28,
    bottom: 28,
    showLegend: true, //显示图例
    horizontal: false, //是否横向
    barWidth: 10,
    stack: false, //是否堆叠  这里暂时只考虑全部堆叠，不考虑抽样堆叠的情况
    barBorderRadius: [0, 0, 0, 0], //圆角配置
    labelPosition: 'top',
    colors: [
        {
            color: '#5ef5ff',
            gdColor: null,
            isGradient: false,
            gdScope: [0, 1],
        },
        {
            color: '#27bf99',
            gdColor: null,
            isGradient: false,
            gdScope: [0, 1],
        },
        {
            color: '#00BCD4',
            gdColor: null,
            isGradient: false,
            gdScope: [0, 1],
        },
    ],
    colorMode: 'byLegend',
    ...common,
}
