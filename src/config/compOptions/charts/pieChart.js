/*
 * @Description: 图表默认Options
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2021-01-04 10:44:34
 */
import common from './common'
export default {
    title: '饼状图',
    legendPosLeft: 0,
    legendPosTop: 30,
    chartData: [
        {
            name: '数量',
            data: [
                {
                    name: '郑丽',
                    value: 122,
                },
                {
                    name: '张三',
                    value: 231,
                },
                {
                    name: '李四',
                    value: 222,
                },
                {
                    name: '王五',
                    value: 98,
                },
                {
                    name: '赵六',
                    value: 321,
                },
            ],
        },
    ],
    tooltipFmt: '{a} <br/>{b}: {c} ({d}%)',
    labelFmt: ['{b}'],
    showLegend: true,
    label: true,
    labelPosition: 'outside',
    labelSize: 10,
    roseType: false,
    borderColor: '#ffffff',
    borderWidth: 1,
    legendOrient: 'vertical',
    selectedCats: '',
    labelLineLength: 10,
    radius: [55],
    center: [50, 50],
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
        {
            color: '#2d8ebf',
            gdColor: null,
            isGradient: false,
            gdScope: [0, 1],
        },
        {
            color: '#1d88eb',
            gdColor: null,
            isGradient: false,
            gdScope: [0, 1],
        },
    ],
    ...common,
}
