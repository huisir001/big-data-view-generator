<!--
 * @Description: 单进度图条形
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月2日 11:13:55
 * @LastEditTime: 2020-09-07 17:28:38
-->
<template>
    <div style="width:100%;height:100%"></div>
</template>

<script>
import echarts from 'echarts'
import common from '@/components/mixin/charts.common'
export default {
    name: 'progressChart6',
    mixins: [common],
    props: {
        color: String, //自定义颜色
        titleText: String, //标题
    },
    data() {
        return {}
    },
    methods: {
        getOptions(percentData) {
            //配置项
            var data = percentData
            var position = ''
            if (data >= 50) {
                position = 'inside'
            } else if (data < 50) {
                position = 'right'
            }

            var option = {
                title: {
                    text: this.titleText || '',
                },
                animationDuration: 5000,
                grid: {
                    top: 'center',
                    left: '8%',
                    right: '8%',
                    height: '20%',
                    containLabel: false,
                },
                xAxis: {
                    type: 'value',
                    axisLabel: {
                        show: false,
                    },
                    max: 100,
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                    },
                    splitLine: {
                        show: false,
                    },
                },
                yAxis: [
                    {
                        type: 'category',
                        data: [],
                        axisLabel: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                        z: 10,
                    },
                    {
                        type: 'category',
                        axisLabel: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                        data: [],
                    },
                ],
                series: [
                    {
                        name: '',
                        type: 'bar',
                        barWidth: '100%',
                        // barMaxWidth: '100%',
                        label: {
                            normal: {
                                show: true,
                                position: position,
                                formatter: '{c} %',
                                textStyle: {
                                    color: '#FFFFFF',
                                    fontWeight: 'bold',
                                    fontFamily: 'Microsoft YaHei',
                                    fontSize: 35,
                                },
                            },
                        },
                        itemStyle: {
                            normal: {
                                barBorderRadius: 5,
                                shadowBlur: 10,
                                shadowColor: '#111',
                                color: this.color || '#2FD04F',
                            },
                        },
                        data: [data],
                        z: 10,
                    },
                    {
                        type: 'bar',
                        barWidth: '100%',
                        yAxisIndex: 1,
                        silent: true,
                        // barMaxWidth: '100%',
                        itemStyle: {
                            normal: {
                                barBorderRadius: 5,
                                color: '#42475B',
                            },
                        },
                        data: [100],
                    },
                ],
            }

            return option
        },
    },
}
</script>