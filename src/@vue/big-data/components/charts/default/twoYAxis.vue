<!--
 * @Description: 双Y轴图表（暂支持柱图、线图，只支持数据轴双轴，不支持横向图）
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-14 09:56:39
 * @LastEditTime: 2020-09-25 15:11:43
-->
<template>
    <div style="width:100%;height:100%"></div>
</template>

<script>
import common from '../../../mixins/charts.common'
export default {
    name: 'TwoYAxis',
    mixins: [common],
    props: {
        twoYAxisOptions: Object, //类型及分轴配置，必传
        title: String, //标题，可有可无
        valEnding1: String, //轴1值的结尾，比如"%"，默认为空
        valEnding2: String, //轴2值的结尾，比如"%"，默认为空
        xName1: String, //x1轴名，可有可无
        xName2: String, //x2轴名，可有可无
        yName1: String, //y1轴名，可有可无
        yName2: String, //y2轴名，可有可无
        left: String, //左边距，有默认
        top: String, //上边距，有默认
        right: String, //右边距，有默认
        bottom: String, //下边距，有默认
        dataZoom: Object, //数据缩放滚动条
        markPoint: Object, //气泡标注
        markLine: Object, //标线
        markArea: Object, //标域
        label: Boolean, //是否显示数据标签（申明即填充，默认显示在线条上侧，不支持自定义）
        visualMap: Object, //视觉映射（改变某些数据区域的颜色）
        colors: Array, //自定义颜色
        stack: Array, //是否堆积-(折线图此参数配合areaStyle实现堆积面积图，柱状图实现堆积)
        boundaryGap: Boolean, //数据轴上是否取点，申明即不取，默认取点
        axisDegreeScope1: Object, //轴1刻度范围
        axisDegreeScope2: Object, //轴2刻度范围
        /* line */
        smooth: Boolean, //是否平滑曲线（申明即平滑）
        lineStyle: Object, //线条样式
        areaStyle: String | Boolean | Object, //区域是否填充-面积图（申明即填充，这里为填充默认色，支持自定义）
        /* bar */
        barBorderRadius: Array | Number, //柱子是否圆角，可传数组或数字如30或[30,30,30,30]
        barWidth: String, //柱粗，默认30%
    },
    data() {
        return {}
    },
    methods: {
        getOptions({ xAxis, series }) {
            //所有数据 方便计算最大值
            let allDatas = []

            //配置图表格式
            series.forEach((item) => {
                allDatas = allDatas.concat(item.data)
                Object.assign(item, this.twoYAxisOptions[item.name]) //类型及分轴
                item.barWidth = this.barWidth || '30%' //柱图粗细
                item.smooth = this.smooth //平滑曲线
                //堆叠
                if (this.stack) {
                    this.stack.forEach((obj) => {
                        obj.names.includes(item.name) && (item.stack = obj.type)
                    })
                }
                //圆角、数据标签
                item.itemStyle = {
                    normal: {
                        barBorderRadius: this.barBorderRadius
                            ? this.barBorderRadius
                            : 0, //只柱图有效
                        label: {
                            //数据标签
                            show: this.label,
                            position: 'top',
                            textStyle: {
                                fontSize: 10,
                            },
                        },
                    },
                }
                //区域填充(折线图-默认)
                if (
                    typeof this.areaStyle == 'string' ||
                    typeof this.areaStyle == 'boolean'
                )
                    item.areaStyle = { type: 'default' }

                //区域填充(折线图-自定义)
                typeof this.areaStyle == 'object' &&
                    (item.areaStyle = this.areaStyle)
                this.markPoint && (item.markPoint = this.markPoint) //气泡标注
                this.markLine && (item.markLine = this.markLine) //标线
                this.markArea && (item.markArea = this.markArea) //标域
                this.lineStyle && (item.lineStyle = this.lineStyle) //线条样式-折线图
            })

            //返回配置项
            return {
                title: { text: this.title },
                tooltip: {
                    show: true,
                    // axisPointer: {
                    //     type: 'shadow',  //鼠标移入显示阴影背景
                    // },
                },
                legend: {
                    right: this.yName2 ? this.yName2.length * 10 + 50 : 35,
                    y: this.title ? 37 : 10,
                },
                [this.visualMap && 'visualMap']: this.visualMap, //视觉映射
                grid: {
                    x:
                        this.left ||
                        ((Math.max.apply(null, allDatas) + '').length + 1) *
                            10 +
                            (this.valEnding1 || '').length * 10, //纵向图根据最大值位数计算宽度
                    y: this.top || (this.title ? 70 : 50),
                    x2:
                        this.right ||
                        (this.dataZoom && this.dataZoom.yAxisIndex
                            ? ((Math.max.apply(null, allDatas) + '').length +
                                  1) *
                                  10 +
                              (this.valEnding2 || '').length * 10 +
                              16
                            : ((Math.max.apply(null, allDatas) + '').length +
                                  1) *
                                  10 +
                              (this.valEnding2 || '').length * 10),
                    y2:
                        this.bottom ||
                        (this.dataZoom && this.dataZoom.xAxisIndex ? 45 : 30),
                },
                //是否横向判断
                xAxis: {
                    type: 'category',
                    boundaryGap: this.boundaryGap, //数据轴上是否取点，默认取点
                    name: this.xName1 ? `\n\n\n${this.xName1}` : '',
                    nameTextStyle: {
                        align: 'center', //x轴名称位置
                    },
                    data: xAxis.map((item) => {
                        if (item.length <= 3) return item
                        return item
                            .split('')
                            .map((v, i) => {
                                if (i > 0 && (i + 1) % 2 == 0) return v + '\n'
                                else return v
                            })
                            .join('')
                    }),
                },
                yAxis: [
                    {
                        type: 'value',
                        name: this.yName1 || '',
                        axisLabel: {
                            formatter: '{value}' + (this.valEnding1 || ''),
                        },
                        ...(this.axisDegreeScope1 || {}), //刻度显示范围
                    },
                    {
                        type: 'value',
                        name: this.yName2 || '',
                        axisLabel: {
                            formatter: '{value}' + (this.valEnding2 || ''),
                        },
                        ...(this.axisDegreeScope2 || {}), //刻度显示范围
                    },
                ],
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