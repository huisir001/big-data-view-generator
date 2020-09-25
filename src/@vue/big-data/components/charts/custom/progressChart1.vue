<!--
 * @Description: 环形进度图1
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月1日 17:01:10
 * @LastEditTime: 2020-09-25 15:05:32
-->
<template>
    <div style="width:100%;height:100%"></div>
</template>

<script>
import echarts from 'echarts'
import common from '../../../mixins/charts.common'
export default {
    name: 'ProgressChart1',
    mixins: [common],
    props: {
        title: String, //标题
        colors: Array, //自定义颜色，两个值
        radius: Array, //大小（所占盒子的比例），默认为['54%', '60%']
        center: Array, //位置，数组两个值分别为圆心的横向位置比和纵向位置比，默认为["50%","50%"]
    },
    data() {
        return {}
    },
    methods: {
        getOptions(percent) {
            //配置项
            return {
                title: [
                    {
                        text: this.title || '',
                        x: 'center',
                        top: '52%',
                        textStyle: {
                            color: (this.colors && this.colors[1]) || '#fdf914',
                            fontSize: 20,
                            fontWeight: '100',
                        },
                    },
                    {
                        text: percent + '%',
                        x: 'center',
                        top: '42%',
                        textStyle: {
                            fontSize: '40',
                            color: (this.colors && this.colors[1]) || '#fdf914',
                            fontFamily: 'Lato',
                            foontWeight: '600',
                        },
                    },
                ],
                polar: {
                    radius: this.radius || ['54%', '60%'],
                    center: this.center || ['50%', '50%'],
                },
                angleAxis: {
                    max: 100,
                    show: false,
                },
                radiusAxis: {
                    type: 'category',
                    show: true,
                    axisLabel: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                },
                series: [
                    {
                        name: '',
                        type: 'bar',
                        roundCap: true,
                        barWidth: 60,
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(66, 66, 66, .3)',
                        },
                        data: [percent],
                        coordinateSystem: 'polar',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    1,
                                    0,
                                    0,
                                    [
                                        {
                                            offset: 0,
                                            color:
                                                (this.colors &&
                                                    this.colors[1]) ||
                                                '#fdf914',
                                        },
                                        {
                                            offset: 1,
                                            color:
                                                (this.colors &&
                                                    this.colors[0]) ||
                                                '#38a700',
                                        },
                                    ]
                                ),
                            },
                        },
                    },
                ],
            }
        },
    },
}
</script>