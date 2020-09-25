<!--
 * @Description: 多进度条2
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月2日 10:47:37
 * @LastEditTime: 2020-09-07 17:12:32
-->
<template>
    <div style="width:100%;height:100%"></div>
</template>

<script>
import echarts from 'echarts'
import common from '@/components/mixin/charts.common'
export default {
    name: 'progressChart4',
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
            let getmydmc = percentData.map((item) => item.name) //数据点名称
            let getmyd = percentData.map((item) => item.value) //百分比
            let getmydzd = [] //100%
            for (let i = 0; i < getmyd.length; i++) {
                getmydzd.push(100)
            }

            let option = {
                grid: {
                    left: '170',
                    right: '75',
                    bottom: '3%',
                    top: '3%',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'none',
                    },
                    formatter: (params) => {
                        return (
                            this.title +
                            '<br>' +
                            params[0].name +
                            ': ' +
                            params[0].value +
                            '%'
                        )
                    },
                },
                xAxis: {
                    show: false,
                    type: 'value',
                },
                yAxis: [
                    {
                        type: 'category',
                        inverse: true,
                        axisLabel: {
                            formatter: function (value) {
                                var ret = '' //拼接加\n返回的类目项
                                var maxLength = 5 //每项显示文字个数
                                var valLength = value.length //X轴类目项的文字个数
                                var rowN = Math.ceil(valLength / maxLength) //类目项需要换行的行数
                                if (rowN > 1) {
                                    //如果类目项的文字大于5,
                                    var temp = '' //每次截取的字符串
                                    var start = 0 //开始截取的位置
                                    var end = maxLength //结束截取的位置
                                    temp =
                                        value.substring(start, end) +
                                        '\n' +
                                        value.substring(end, valLength)
                                    ret += temp //凭借最终的字符串

                                    return ret
                                } else {
                                    return value
                                }
                            },
                            textStyle: {
                                color: '#fff',
                                fontSize: '14',
                            },
                        },
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                        },
                        data: getmydmc,
                    },
                    {
                        type: 'category',
                        inverse: true,
                        axisTick: 'none',
                        axisLine: 'none',
                        show: true,
                        axisLabel: {
                            textStyle: {
                                color: '#fff',
                                fontSize: '14',
                            },
                            formatter: '{value}%',
                        },
                        data: getmyd,
                    },
                ],
                series: [
                    {
                        name: '值',
                        type: 'bar',
                        zlevel: 1,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 5,
                                color:
                                    (this.colors && this.colors[0]) ||
                                    '#4E7BFE',
                            },
                        },
                        barWidth: 15,
                        data: getmyd,
                    },
                    {
                        name: '背景',
                        type: 'bar',
                        barWidth: 15,
                        barGap: '-100%',
                        data: getmydzd,
                        itemStyle: {
                            normal: {
                                color:
                                    (this.colors && this.colors[1]) ||
                                    'rgba(103,150,253,0.3)',
                                barBorderRadius: 5,
                            },
                        },
                    },
                ],
            }

            return option
        },
    },
}
</script>