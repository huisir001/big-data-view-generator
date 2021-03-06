/*
 * @Description: 左侧栏组件库列表
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-23 10:33:00
 * @LastEditTime: 2021-02-18 17:22:59
 */
import {
    coBarChart,
    coLineChart,
    coPieChart,
    coGaugeChart,
    coRadarChart,
    coScatterChart,
} from './compOptions/charts'
import {
    fcoBarChart,
    fcoLineChart,
    fcoPieChart,
    fcoGaugeChart,
    fcoRadarChart,
    fcoScatterChart,
} from './formControlOptions/charts'
import { coForm, coTable, coBasicText, coTimeText } from './compOptions/base'
import {
    fcoForm,
    fcoTable,
    fcoBasicText,
    fcoTimeText,
} from './formControlOptions/base'
import { coBorderBox } from './compOptions/media'
import { fcoBorderBox } from './formControlOptions/media'

/*
 * list中的type为图表组件的名称，与实际组件的名称一致，不可随意更改
 */
export default [
    {
        id: 0,
        category: '基础组件',
        list: [
            {
                title: '基础文本',
                type: 'BasicText',
                pic: require('@/assets/img/compList/basicText.png'),
                compOptions: coBasicText,
                formControlOptions: fcoBasicText,
            },
            {
                title: '时间文本',
                type: 'TimeText',
                pic: require('@/assets/img/compList/timeText.png'),
                compOptions: coTimeText,
                formControlOptions: fcoTimeText,
            },
            {
                title: '表单',
                type: 'Form',
                pic: require('@/assets/img/compList/form.png'),
                compOptions: coForm,
                formControlOptions: fcoForm,
            },
            {
                title: '表格',
                type: 'Table',
                pic: require('@/assets/img/compList/table.png'),
                compOptions: coTable,
                formControlOptions: fcoTable,
            },
        ],
    },
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
                compOptions: coGaugeChart,
                formControlOptions: fcoGaugeChart,
            },
            {
                title: '雷达图',
                type: 'RadarChart',
                pic: require('@/assets/img/compList/radar.png'),
                compOptions: coRadarChart,
                formControlOptions: fcoRadarChart,
            },
            {
                title: '散点图',
                type: 'ScatterChart',
                pic: require('@/assets/img/compList/scatter.png'),
                compOptions: coScatterChart,
                formControlOptions: fcoScatterChart,
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
        list: [
            {
                title: '内置SVG边框',
                type: 'BorderBox',
                pic: require('@/assets/img/compList/borderBox.png'),
                compOptions: coBorderBox,
                formControlOptions: fcoBorderBox,
            },
        ],
    },
]
