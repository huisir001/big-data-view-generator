/*
 * @Description: 左侧栏组件库列表
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-23 10:33:00
 * @LastEditTime: 2020-12-18 17:27:59
 */
import { coBarChart, coLineChart } from './compOptions/charts'
import { fcoBarChart, fcoLineChart } from './formControlOptions/charts'
/*
 * list中的type为图表组件的名称，与实际组件的名称一致，不可随意更改
 */
export default [
    {
        id: 1,
        category: '标准图表',
        list: [
            {
                title: '柱状图',
                type: 'BarChart',
                pic: require('@/assets/img/compList/bar.png'),
                compOptions: coBarChart,
                formControlOptions: fcoBarChart,
            },
            {
                title: '折线图',
                type: 'LineChart',
                pic: require('@/assets/img/compList/line.png'),
                compOptions: coLineChart,
                formControlOptions: fcoLineChart,
            },
            {
                title: '饼图',
                type: 'PieChart',
                pic: require('@/assets/img/compList/pie.png'),
                compOptions: coPieChart,
                formControlOptions: fcoPieChart,
            },
            {
                title: '仪表盘',
                type: 'GaugeChart',
                pic: require('@/assets/img/compList/gauge.png'),
                compOptions: coBarChart,
                formControlOptions: fcoBarChart,
            },
            {
                title: '雷达图',
                type: 'RadarChart',
                pic: require('@/assets/img/compList/radar.png'),
                compOptions: coBarChart,
                formControlOptions: fcoBarChart,
            },
            {
                title: '散点图',
                type: 'ScatterChart',
                pic: require('@/assets/img/compList/scatter.png'),
                compOptions: coBarChart,
                formControlOptions: fcoBarChart,
            },
            {
                title: '柱线双Y轴',
                type: 'TwoYAxis',
                pic: require('@/assets/img/compList/twoYAxis.png'),
                compOptions: coBarChart,
                formControlOptions: fcoBarChart,
            },
        ],
    },
    {
        id: 2,
        category: '定制图表',
        list: [],
    },
    {
        id: 3,
        category: '媒体组件',
        list: [],
    },
    {
        id: 4,
        category: '边框组件',
        list: [],
    },
]
