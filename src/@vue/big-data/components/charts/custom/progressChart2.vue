<!--
 * @Description: 多进度条1
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月2日 09:46:43
 * @LastEditTime: 2020-09-07 16:58:51
-->
<template>
    <div style="width:100%;height:100%"></div>
</template>

<script>
import echarts from 'echarts'
import common from '@/components/mixin/charts.common'
export default {
    name: 'progressChart2',
    mixins: [common],
    props: {
        title: String, //标题
        colors: Array, //自定义颜色，两个值
    },
    data() {
        return {}
    },
    methods: {
        getOptions(percentData) {
            //配置项
            var myData = percentData.map((item) => item.name)
            var lineData = [100, 100, 100, 100]

            var thisYearData = {
                1: percentData.map((item) => item.value),
            }
            var timeLineData = [1]

            var option = {
                baseOption: {
                    timeline: {
                        show: false,
                        top: 0,
                        data: [],
                    },
                    [this.title && 'legend']: {
                        top: 15,
                        left: 0,
                        itemWidth: 18,
                        itemHeight: 18,
                        icon: 'horizontal',
                        textStyle: {
                            color: '#ffffff',
                            fontSize: 15,
                        },
                        data: [this.title],
                    },
                    grid: [
                        {
                            show: false,
                            left: '5%',
                            top: '10%',
                            bottom: '5%',
                            containLabel: true,
                            width: '80%',
                        },
                        {
                            // 进度条左侧文字位置调整 -- 开始
                            show: false,
                            left: 10,
                            top: '14%',
                            bottom: '8%', // 进度条左侧文字之间的间距
                            width: '0%',
                        }, // 进度条左侧文字位置调整 -- 结束
                        {
                            // 进度条位置调整 -- 开始
                            show: false,
                            left: '18%',
                            top: '14%',
                            bottom: '8%', // 进度条之间的间距
                            containLabel: true,
                            width: '80%',
                        }, // 进度条位置调整 -- 结束
                    ],
                    xAxis: [
                        {
                            type: 'value',
                            inverse: true,
                            axisLine: {
                                show: false,
                            },
                            axisTick: {
                                show: false,
                            },
                            position: 'top',
                            axisLabel: {
                                show: false,
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                        {
                            gridIndex: 1,
                            show: false,
                        },
                        {
                            gridIndex: 2,
                            axisLine: {
                                show: false,
                            },
                            axisTick: {
                                show: false,
                            },
                            position: 'top',
                            axisLabel: {
                                show: false,
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: 'category',
                            inverse: true,
                            position: 'right',
                            axisLine: {
                                show: false,
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLabel: {
                                show: false,
                            },
                            data: myData,
                        },
                        {
                            gridIndex: 1,
                            type: 'category',
                            inverse: true,
                            position: 'left',
                            axisLine: {
                                show: false,
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#ffffff',
                                    fontSize: 17,
                                },
                            },
                            data: myData.map(function (value) {
                                return {
                                    value: value,
                                    textStyle: {
                                        align: 'left', // 进度条左侧文字对齐方式
                                    },
                                }
                            }),
                        },
                        {
                            gridIndex: 2,
                            type: 'category',
                            inverse: true,
                            position: 'left',
                            axisLine: {
                                show: false,
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLabel: {
                                show: false,
                            },
                            data: myData,
                        },
                    ],
                    series: [],
                },
                options: [],
            }

            option.baseOption.timeline.data.push(timeLineData[0])
            option.options.push({
                series: [
                    {
                        type: 'pictorialBar',
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        symbol: 'rect',
                        itemStyle: {
                            normal: {
                                color:
                                    (this.colors && this.colors[1]) ||
                                    'rgba(54,215,182,0.27)', // 进度条阴影颜色
                            },
                        },
                        barWidth: 10,
                        symbolRepeat: true, // 是否显示进度条阴影
                        symbolSize: 14, // 进度条阴影格子大小
                        data: lineData,
                        barGap: '-100%',
                        barCategoryGap: 0,
                        label: {
                            normal: {
                                show: true, // 是否显示进度条上方的百分比
                                formatter: (series) => {
                                    return (
                                        thisYearData[timeLineData[0]][
                                            series.dataIndex
                                        ] + '%'
                                    )
                                },
                                position: 'insideTopRight',
                                textStyle: {
                                    color: '#ffffff', // 进度条上方百分比字体颜色
                                    fontSize: 20,
                                },
                                offset: [0, -35],
                            },
                        },
                        z: -100,
                        animationEasing: 'elasticOut',
                        animationDelay: function (dataIndex, params) {
                            return params.index * 30
                        },
                    },
                    {
                        [this.title && 'name']: this.title,
                        type: 'pictorialBar',
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        symbol: 'rect',
                        barWidth: 10,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 5,
                                color:
                                    (this.colors && this.colors[0]) ||
                                    '#36d7b6', // 进度条颜色 #36d7b6
                            },
                        },
                        symbolRepeat: true,
                        symbolSize: 14, // 进度条格子大小
                        data: thisYearData[timeLineData[0]],
                        animationEasing: 'elasticOut',
                        animationDelay: function (dataIndex, params) {
                            return params.index * 30 * 1.1
                        },
                    },
                ],
            })

            return option
        },
    },
}
</script>