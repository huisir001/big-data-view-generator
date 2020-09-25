<!--
 * @Description: 标准散点图
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年8月31日 16:59:34
 * @LastEditTime: 2020-09-25 15:11:31
-->
<template>
    <div style="width:100%;height:100%"></div>
</template>

<script>
import common from '../../../mixins/charts.common'
export default {
    name: 'ScatterChart',
    mixins: [common],
    props: {
        title: String, //标题，可有可无
        xValEnding: String, //x值的结尾，比如"%"，默认为空
        yValEnding: String, //y值的结尾，比如"%"，默认为空
        xName: String, //x轴名，可有可无
        yName: String, //y轴名，可有可无
        left: String, //左边距，有默认
        top: String, //上边距，有默认
        right: String, //右边距，有默认
        bottom: String, //下边距，有默认
        tooltipFmt: Function, //提示框模板
        dataZoom: Object, //数据缩放滚动条
        markPoint: Object, //气泡标注
        markLine: Object, //标线
        markArea: Object, //标域
        label: Boolean, //是否显示数据标签（申明即填充，默认显示在上侧，不支持自定义）
        visualMap: Object, //视觉映射（改变某些数据区域的颜色）
        colors: Array, //自定义颜色
        yAxisDegreeScope: Object, //y轴刻度范围
        xAxisDegreeScope: Object, //x轴刻度范围
        legend: Object, //图例配置
        symbolSize: Number | Function, //浮点尺寸 默认10
        itemStyles: Array, //浮点样式
    },
    data() {
        return {}
    },
    methods: {
        getOptions(series) {
            //所有数据 方便计算最大值
            let allDatas = []

            //配置散点图格式
            series.forEach((item, index) => {
                allDatas = allDatas.concat(item.data)
                item.type = 'scatter'
                item.symbolSize = this.symbolSize || 10 //浮点尺寸
                item.label = {
                    //数据标签
                    show: this.label,
                    position: 'top',
                    textStyle: {
                        fontSize: 10,
                    },
                }

                this.itemStyles && (item.itemStyle = this.itemStyles[index]) //浮点样式
                this.markPoint && (item.markPoint = this.markPoint) //气泡标注
                this.markLine && (item.markLine = this.markLine) //标线
                this.markArea && (item.markArea = this.markArea) //标域
            })

            //返回线图配置项
            return {
                title: { text: this.title },
                tooltip: {
                    trigger: 'axis',
                    showDelay: 0,
                    axisPointer: {
                        type: 'cross',
                        lineStyle: {
                            type: 'dashed',
                            width: 1,
                        },
                    },
                    [this.tooltipFmt && 'formatter']: this.tooltipFmt,
                },
                legend: this.legend || {
                    right: 35,
                    y: this.title ? 37 : 10,
                },
                [this.visualMap && 'visualMap']: this.visualMap, //视觉映射
                grid: {
                    x:
                        this.left ||
                        ((Math.max.apply(null, allDatas) + '').length + 1) *
                            10 +
                            (this.yValEnding || '').length * 10, //纵向图根据最大值位数计算宽度
                    y: this.top || (this.title ? 70 : 50),
                    x2:
                        this.right ||
                        (this.dataZoom && this.dataZoom.yAxisIndex ? 48 : 35),
                    y2:
                        this.bottom ||
                        (this.dataZoom && this.dataZoom.xAxisIndex ? 45 : 30),
                },
                xAxis: {
                    type: 'value',
                    name: (this.xName || '')
                        .split('')
                        .map((word) => word + '\n')
                        .join(''), //纵排x轴名称
                    scale: true,
                    power: 1,
                    axisLabel: {
                        formatter: '{value}' + (this.xValEnding || ''),
                    },
                    nameTextStyle: {
                        align: 'center', //x轴名称位置
                    },
                    ...(this.xAxisDegreeScope || {}), //刻度显示范围
                },
                yAxis: {
                    type: 'value',
                    name: this.yName || '',
                    power: 1,
                    scale: true,
                    axisLabel: {
                        formatter: '{value}' + (this.yValEnding || ''),
                    },
                    ...(this.yAxisDegreeScope || {}), //刻度显示范围
                },
                series,
                [this.dataZoom && 'dataZoom']: [
                    //这里默认只支持单个滚动条
                    {
                        show: true,
                        [this.dataZoom &&
                        this.dataZoom.xAxisIndex &&
                        'bottom']: 5, //位置，如果在左侧，则设left，右侧right
                        [this.dataZoom &&
                        this.dataZoom.yAxisIndex &&
                        'right']: 8, //位置，如果在左侧，则设left，右侧right
                        [this.dataZoom &&
                        this.dataZoom.xAxisIndex &&
                        'height']: 12, //滚动条粗细，若为x轴，则设height
                        [this.dataZoom &&
                        this.dataZoom.yAxisIndex &&
                        'width']: 12, //滚动条粗细，若为Y轴，则设width
                        ...this.dataZoom, //参数

                        /* 传参配置项说明 */
                        // xAxisIndex: [0], //滚动数据源，这里默认第一条X轴，若为横向图可设置y轴。若为多轴图，可调整下标
                        // minValueSpan: 1, //最小显示到的折线下标，1为2单位折线
                        // maxValueSpan: 9, //最大显示到的折线下标，9为10单位折线
                        // start: 0, //滚动条默认显示当前轴数据范围，start为起始值，end为结束值，这里为百分比，最小0，最大100
                        // end: 50,    //minValueSpan/maxValueSpan  start/end 不要同时使用，故这里不设默认值，需要由父组件传参
                    },
                ],
                [this.colors && 'color']: this.colors, //自定义颜色
            }
        },
    },
}
</script>