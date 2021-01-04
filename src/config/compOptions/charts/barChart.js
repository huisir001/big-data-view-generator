/*
 * @Description: 图表默认Options
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2021-01-04 14:38:58
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
    legendPosLeft: 98,
    legendPosTop: 35,
    legendOrient: 'horizontal',
    horizontal: false, //是否横向
    barWidth: 10,
    valEnding: '',
    stack: false, //是否堆叠  这里暂时只考虑全部堆叠，不考虑抽样堆叠的情况
    barBorderRadius: [0, 0, 0, 0], //圆角配置
    label: false,
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
    showValAxisLabel: true,
    showValAxisLine: true,
    showValSplitLine: true,
    showCatAxisLine: true,
    catLabelRowLen: 4,
    limitAxisMinVal: false,
    limitAxisMaxVal: false,
    axisScopeMin: 0,
    axisScopeMax: 100,
    showDataZoom: false,
    dataZoomAxis: 'x0',
    dataZoomSplitType: 'index',
    dataZoomSplitScope: [0, 9],
    showVisualMap: false,
    visualMap: {
        top: 10,
        right: 0,
        pieces: [
            {
                lte: 300,
            },
            {
                gt: 300,
                lte: 400,
            },
            {
                gt: 400,
                lte: 600,
            },
            {
                gt: 600,
                lte: 800,
            },
            {
                gt: 800,
                lte: 1000,
            },
        ],
    },
    showMarkPoint: false,
    showMarkLine: false,
    showMarkArea: false,
    markPoint: {
        data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' },
        ],
        label: {
            color: '#fff',
            textBorderColor: '#000',
            formatter: function (params) {
                return `${params.name}\n${params.value}`
            },
        },
    },
    markLine: {
        data: [{ type: 'average', name: '平均值' }],
        label: {
            formatter: function (params) {
                return `${params.name}\n${params.value}`
            },
        },
    },
    markArea: {
        label: {
            position: 'right',
        },
        data: [
            [
                {
                    name: '标域',
                    yAxis: '200',
                },
                {
                    yAxis: '500',
                },
            ],
        ],
    },
    ...common,
}
