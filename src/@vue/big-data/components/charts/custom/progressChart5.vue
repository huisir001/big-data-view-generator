<!--
 * @Description: 环形多进度图
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月2日 10:55:23
 * @LastEditTime: 2020-09-07 17:13:39
-->
<template>
    <div style="width:100%;height:100%"></div>
</template>

<script>
import echarts from 'echarts'
import common from '@/components/mixin/charts.common'
export default {
    name: 'progressChart5',
    mixins: [common],
    props: {
        colors: Array, //自定义颜色
    },
    data() {
        return {}
    },
    methods: {
        getOptions(percentData) {
            //配置项
            var titleArr = [],
                seriesArr = [],
                colors = this.colors || [
                    ['#389af4', '#dfeaff'],
                    ['#ff8c37', '#ffdcc3'],
                    ['#ffc257', '#ffedcc'],
                    ['#fd6f97', '#fed4e0'],
                    ['#a181fc', '#e3d9fe'],
                    ['#389af4', '#dfeaff'],
                    ['#ff8c37', '#ffdcc3'],
                    ['#ffc257', '#ffedcc'],
                    ['#fd6f97', '#fed4e0'],
                    ['#a181fc', '#e3d9fe'],
                ]
            percentData.forEach(function (item, index) {
                titleArr.push({
                    text: item.name,
                    x:
                        index > 3
                            ? (index - 4) * 23 + 14.3 + '%'
                            : index * 23 + 14.3 + '%',
                    y: index > 3 ? '92%' : '42%',
                    // top: '65%',
                    textAlign: 'center',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: '16',
                        color: colors[index][0],
                        textAlign: 'center',
                    },
                })
                seriesArr.push({
                    // name: item.name,
                    type: 'pie',
                    clockWise: false,
                    radius: [50, 60],
                    itemStyle: {
                        normal: {
                            color: colors[index][0],
                            shadowColor: colors[index][0],
                            shadowBlur: 0,
                            label: {
                                show: false,
                            },
                            labelLine: {
                                show: false,
                            },
                        },
                    },
                    hoverAnimation: false,
                    center: [
                        index > 3
                            ? (index - 4) * 23 + 15 + '%'
                            : index * 23 + 15 + '%',
                        index > 3 ? '75%' : '25%',
                    ],
                    data: [
                        {
                            value: item.value,
                            label: {
                                normal: {
                                    formatter: function (params) {
                                        return params.value + '%'
                                    },
                                    position: 'center',
                                    show: true,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'bold',
                                        color: colors[index][0],
                                    },
                                },
                            },
                        },
                        {
                            value: 100 - item.value,
                            name: 'invisible',
                            itemStyle: {
                                normal: {
                                    color: colors[index][1],
                                },
                                emphasis: {
                                    color: colors[index][1],
                                },
                            },
                        },
                    ],
                })
            })

            let option = {
                title: titleArr,
                series: seriesArr,
            }

            return option
        },
    },
}
</script>