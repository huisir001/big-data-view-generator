<!--
 * @Description: 环形进度2
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月2日 10:24:52
 * @LastEditTime: 2020-09-07 17:01:44
-->
<template>
    <div style="width:100%;height:100%"></div>
</template>

<script>
import echarts from 'echarts'
import common from '@/components/mixin/charts.common'
export default {
    name: 'progressChart3',
    mixins: [common],
    props: {
        titleText: String, //标题
        titleSubText: String, //副标题
        color: String, //自定义颜色
        radius: Array, //大小（所占盒子的比例），默认为['54%', '60%']
        center: Array, //位置，数组两个值分别为圆心的横向位置比和纵向位置比，默认为["50%","50%"]
    },
    data() {
        return {}
    },
    methods: {
        getOptions(percentData) {
            //配置项
            let option = {
                title: {
                    text: this.titleText || '',
                    subtext: this.titleSubText || '',
                    show: true,
                    textStyle: {
                        color: '#fff',
                    },
                    top: '55%',
                    left: 'center',
                },
                series: [
                    {
                        radius: this.radius || ['54%', '60%'],
                        center: this.center || ['50%', '50%'],
                        clockWise: false,
                        hoverAnimation: false,
                        type: 'pie',
                        avoidLabelOverlap: false,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        fontSize: 40,
                                        color: '#ffffff',
                                    },
                                    position: 'center',
                                },
                                labelLine: {
                                    show: false,
                                },
                                color: this.color || '#25d055',
                                borderColor: this.color || '#25d055',
                                borderWidth: 8,
                            },
                        },
                        data: [
                            {
                                value: percentData,
                                name: percentData + '%',
                            },
                            {
                                name: ' ',
                                value: 100 - percentData,
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: false,
                                        },
                                        labelLine: {
                                            show: false,
                                        },
                                        color: '#eee',
                                        borderColor: '#eee',
                                        borderWidth: 0,
                                    },
                                },
                            },
                        ],
                    },
                ],
            }

            return option
        },
    },
}
</script>