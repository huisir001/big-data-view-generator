/*
 * @Description: 图表默认Options
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2020-12-21 17:55:33
 */
import common from './common'
export default {
    title: '饼图',
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
    showLegend: true,
    label: false,
    labelPosition: 'outside',
    labelSize: 10,
    // roseType: false,
    // selectedMode: false,
    borderColor: 'rgba(255,255,255,0)',
    borderWidth: 0,
    titleSize: 16,
    titlePosLeft: 128,
    titlePosTop: 5,
    legendPosLeft: 0,
    legendPosTop: 30,
    legendOrient: 'vertical',
    selectedCats: '',
    labelLineLength: 10,
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
    ...common,
}
