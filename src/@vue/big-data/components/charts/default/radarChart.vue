<!--
 * @Description: 标准雷达图
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年8月31日 10:59:20
 * @LastEditTime: 2020-09-07 16:45:32
-->
<template>
    <div style="width:100%;height:100%"></div>
</template>

<script>
import common from '@/components/mixin/charts.common'
export default {
    name: 'radarChart',
    mixins: [common],
    props: {
        title: String, //标题，可有可无
        tooltipFmt: String, //提示框格式
        titleDiy: Object, //自定义标题格式
        radius: String, //雷达图大小，默认60%
        center: Array, //雷达图位置，默认['50%', '55%']
		max:Number, //最大值
        maxValOffset: Number, //雷达图最大值偏移量，默认100
        showLegend: Boolean, //是否显示图例，默认不显示
        showAxisLabel: Boolean, //是否显示刻度值
        nameColor: String | Array, //外圈标签名称颜色
        splitLineColor: String | Array, //分割线颜色
        splitAreaColor: String | Array, //分割区域颜色
        axisLineColor: String, //轴线颜色
        splitNumber: Number, //分隔数量，默认5
        areaFill: Boolean, //区域填充，默认透明度为0.3
        colors: Array, //自定义颜色
        label: Boolean, //显示标签（数据值）
    },
    data() {
        return {}
    },
    methods: {
        getOptions({ cats, series }) {
            //所有数据 方便计算最大值
            let allDatas = [],
                legends = []
            series.forEach((item) => {
                allDatas = allDatas.concat(item.value)
                legends.push(item.name)
            })

            //返回配置项
            return {
                title: this.titleDiy || {
                    text: this.title,
                },
                legend: {
                    show: this.showLegend,
                    orient: 'vertical',
                    x: 'right',
                    y: 'center',
                    data: legends,
                },
                tooltip: {
                    //提示
                    trigger: 'item',
                    [this.tooltipFmt && 'formatter']: this.tooltipFmt,
                },
                radar: {
                    radius: this.radius || '60%',
                    center: this.center || ['50%', '55%'],
                    axisLabel: {
                        //刻度
                        show: this.showAxisLabel,
                        color: '#ffaa00',
                    },
                    indicator: cats.map((item, index) => {
                        item = { name: item }
                        item.max = this.max ||
                            (Math.max.apply(null, allDatas) +
                            (this.maxValOffset || 100))
                        this.showAxisLabel &&
                            index > 0 &&
                            (item.axisLabel = { show: false }) //只显示一侧刻度
                        return item
                    }),
                    axisLine: {
                        lineStyle: {
                            color: this.axisLineColor || '#babab2',
                            // type: 'dotted',
                        },
                    },
                    [this.nameColor && 'name']: {
                        textStyle: {
                            color: this.nameColor,
                        },
                    },
                    [this.splitLineColor && 'splitLine']: {
                        lineStyle: {
                            color: this.splitLineColor,
                            width: 1,
                        },
                    },
                    [this.splitAreaColor && 'splitArea']: {
                        areaStyle: {
                            color: this.splitAreaColor,
                        },
                    },
                    splitNumber: this.splitNumber || 4,
                },
                series: {
                    //数据赋值
                    type: 'radar',
                    data: series,
                    [this.areaFill && 'areaStyle']: {
                        opacity: 0.3,
                    },
                    label: {
                        show: this.label,
                    },
                },
                [this.colors && 'color']: this.colors, //自定义颜色
            }
        },
    },
}
</script>