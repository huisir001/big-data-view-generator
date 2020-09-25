<!--
 * @Description: 标准仪表盘（当前只支持单表盘单指针图表）
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年8月19日 12:00:03
 * @LastEditTime: 2020-09-25 15:07:01
-->
<template>
    <div style="width:100%;height:100%"></div>
</template>

<script>
import common from '../../../mixins/charts.common'
export default {
    name: 'GaugeChart',
    mixins: [common],
    props: {
        title: String, //标题，可有可无
        titleDiy: Object, //自定义标题格式（一般用于环饼图中间显示总数据）
        radius: String, //仪表盘大小（所占盒子的比例），默认为80%
        center: Array, //仪表盘位置，数组两个值分别为圆心的横向位置比和纵向位置比，默认为['50%', '60%']
        valFmt: String, //数据标注的字符串模板，如`{value}%`，如果为多个类型，可传数组
        tooltipFmt: String, //提示框的字符串模板，如`{a} <br/>{b} : {c}%`
        axisWidth: String, //表盘宽度
        axisColors: Array, //表盘分段及颜色
        startAngle: Number, //表盘开始角度（单位为度数）
        endAngle: Number, //表盘结束角度
        min: Number, //最小刻度
        max: Number, //最大刻度
        detail: Object, //数据值样式
        seriesTitle: Object, //数据名称样式
        splitNumber: Number, //表盘分割段数
        axisLine: Object, //自定义表盘样式
        splitLine: Object, //表盘分割线
        axisTick: Object, //表盘刻度线
        axisLabel: Object, //表盘刻度
        itemStyle: Object, //指针样式
        pointer: Object, //指针配置
        anticlockwise: Boolean, //刻度是否按逆时针，申明即逆时针
    },
    data() {
        return {}
    },
    watch: {
        axisLine() {
            this.chartRender(this.curChartData) //数据变化重新渲染（由于titleDIY中的值是父组件计算得来的，有延迟，故需要监听重新渲染）
        },
    },
    methods: {
        getOptions(series) {
            //配置仪表盘格式
            Object.assign(series, {
                type: 'gauge',
                //仪表盘大小
                radius: this.radius || '80%',
                center: this.center || ['50%', '60%'], //仪表盘位置
                //仪表盘数值详情用于显示数据
                detail: this.detail || {
                    textStyle: {
                        // fontSize: 20,    //数据值大小
                        color: '#fff',
                    },
                    // offsetCenter: [0, '40%'], //数据值位置
                    [this.valFmt && 'formatter']: this.valFmt, //值模板
                },
                //仪表盘键名配置用于显示名称
                title: this.seriesTitle || {
                    show: true,
                    color: '#fff',
                    //fontSize: 20,   //名称字体大小
                    // offsetCenter: ['0', '-40%'], //名称位置
                },
                //表盘设置
                axisLine: this.axisLine || {
                    show: true, //是否显示表盘
                    lineStyle: {
                        width: this.axisWidth || '30', //表盘宽度
                        color: this.axisColors || [
                            //分段及颜色自定义
                            [0.2, '#27bf99'],
                            [0.8, '#1d88eb'],
                            [1, '#ff4500'],
                        ],
                    },
                },
                //是否顺时针
                clockwise: this.anticlockwise ? false : true,
                //分割线
                [this.splitLine && 'splitLine']: this.splitLine,
                //刻度线
                [this.axisTick && 'axisTick']: this.axisTick,
                //刻度
                [this.axisLabel && 'axisLabel']: this.axisLabel,
                //指针样式
                [this.itemStyle && 'itemStyle']: this.itemStyle,
                //指针配置
                [this.pointer && 'pointer']: this.pointer,
                startAngle: this.startAngle || 225, //表盘开始角度（单位为度数）
                endAngle: this.endAngle || -45, //表盘结束角度
                min: this.min || 0, //最小刻度
                max: this.max || 100, //最大刻度
                splitNumber: this.splitNumber || 5, //表盘分割段数
            })

            //返回配置项
            return {
                title: this.titleDiy || {
                    text: this.title,
                },
                tooltip: {
                    //提示
                    trigger: 'item',
                    [this.tooltipFmt && 'formatter']: this.tooltipFmt,
                },
                series, //数据赋值
            }
        },
    },
}
</script>