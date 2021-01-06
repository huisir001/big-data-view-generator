/*
 * @Description: 图表默认Options 雷达图
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2021-01-06 15:18:28
 */
import common from './common'
export default {
    title: '雷达图',
    chartData: {
        cats: ['销售', '管理', '技术', '客服', '研发', '市场'],
        series: [
            {
                name: '预算分配',
                value: [4300, 10000, 28000, 35000, 50000, 19000],
            },
            {
                name: '实际开销',
                value: [5000, 14000, 28000, 31000, 42000, 21000],
            },
        ],
    },
    tooltipFmt: '',
    titleSize: 10,
    titleFontWeight: 'bold',
    titleFontFamily: 'Microsoft YaHei',
    titleColor: '#ffffff',
    titlePosLeft: 'center',
    titlePosTop: 'bottom',
    showLegend: true,
    legendPosLeft: 'right',
    legendPosTop: 'bottom',
    legendOrient: 'vertical',
    radius: '50%',
    center: ['50%', '55%'],
    max: 50000,
    min: 0,
    splitNumber: 4,
    radarType: 'polygon',
    startAngle: 90,
    areaOpacity: 0,
    label: false,
    labelPosition: 'inside',
    labelFmt: '{c}',
    labelSize: 10,
    showAxisLine: true,
    axisLineColor: '#babab2',
    axisLineWidth: 1,
    axisLineType: 'solid',
    showSplitLine: true,
    splitLineColor: '#babab2',
    splitLineWidth: 1,
    splitLineType: 'solid',
    showSplitArea: true,
    splitAreaColorAuto: true,
    splitAreaColor: [
        {
            color: 'rgba(255,255,255,.2)',
            gdColor: null,
            isGradient: false,
            gdScope: [0, 1],
        },
        {
            color: 'rgba(255,255,255,.1)',
            gdColor: null,
            isGradient: false,
            gdScope: [0, 1],
        },
        {
            color: 'rgba(255,255,255,.2)',
            gdColor: null,
            isGradient: false,
            gdScope: [0, 1],
        },
        {
            color: 'rgba(255,255,255,.1)',
            gdColor: null,
            isGradient: false,
            gdScope: [0, 1],
        },
    ],
    showAxisLabel: false,
    axisLabelColor: '#ffaa00',
    axisLabelSize: 10,
    showCatName: true,
    catNameFmt: '{value}',
    catNameColor: '#fff',
    nameGap: 10,
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
    ],
    ...common,
}
