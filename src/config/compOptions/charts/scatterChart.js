/*
 * @Description: 图表默认Options - scatterChart
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2021-01-08 18:05:54
 */
import { publicOpts, legendOpts } from './common'
export default {
    ...publicOpts,
    ...legendOpts,
    title: '散点图',
    chartData: [
        {
            name: '女性',
            data: [
                [161.2, 51.6],
                [172.9, 62.5],
                [153.4, 42],
                [160, 50],
                [147.2, 49.8],
                [168.2, 49.2],
                [175, 73.2],
                [157, 47.8],
                [167.6, 68.8],
                [159.5, 50.6],
                [175, 82.5],
                [166.8, 57.2],
                [176.5, 87.8],
                [170.2, 72.8],
                [174, 54.5],
                [173, 59.8],
                [179.9, 67.3],
                [170.5, 67.8],
                [162.6, 61.4],
            ],
        },
        {
            name: '男性',
            data: [
                [174, 65.6],
                [164.1, 55.2],
                [163, 57],
                [171.5, 61.4],
                [184.2, 76.8],
                [174, 86.8],
                [182, 72],
                [167, 64.6],
                [177.8, 74.8],
                [180.3, 93.2],
                [180.3, 82.7],
                [177.8, 58],
                [177.8, 79.5],
                [177.8, 78.6],
                [177.8, 71.8],
                [177.8, 72],
                [177.8, 81.8],
                [180.3, 83.2],
            ],
        },
    ],
    left: 30,
    top: 68,
    right: 28,
    bottom: 28,
    tooltipFmt: '',
    legendPosLeft: 98,
    legendPosTop: 35,
    legendOrient: 'horizontal',
    xName: '身高',
    yName: '体重/kg',
    showxAxisLabel: true,
    showyAxisLabel: true,
    showxAxisLine: true,
    showxSplitLine: true,
    showyAxisLine: true,
    showySplitLine: true,
    limitxAxisMinVal: false,
    limitxAxisMaxVal: false,
    limityAxisMinVal: false,
    limityAxisMaxVal: false,
    xAxisScopeMin: 0,
    yAxisScopeMin: 0,
    xAxisLabelFmt: '{value}',
    yAxisLabelFmt: '{value}',
    showDataZoom: false,
    dataZoomAxis: 'x0',
    dataZoomSplitType: 'index',
    dataZoomSplitScope: [0, 9],
    showVisualMap: false,
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
                    yAxis: '50',
                },
                {
                    yAxis: '80',
                },
            ],
        ],
    },
    label: false,
    labelPosition: 'top',
    labelFmt: '{c}',
    labelSize: 10,
    symbolSize: 10,
    isBubble: false,
    minBubbleSize: 3,
    maxBubbleSize: 15,
    symbolType: ['circle', 'rectangle'],
    showShadow: false,
    shadowBlur: 15,
    shadowColor: 'rgba(255, 255, 255, 0.5)',
    shadowOffsetX: 3,
    shadowOffsetY: 5,
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
    visualMap: {
        top: 10,
        right: 0,
        pieces: [
            {
                lte: 150,
            },
            {
                gt: 150,
                lte: 160,
            },
            {
                gt: 160,
                lte: 170,
            },
            {
                gt: 170,
                lte: 180,
            },
            {
                gt: 180,
                lte: 190,
            },
        ],
    },
}
