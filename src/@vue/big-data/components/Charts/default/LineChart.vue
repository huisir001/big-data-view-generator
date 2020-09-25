<!--
 * @Description: 标准折线图单数据轴（不支持多轴，不支持时间轴）
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-12 10:56:39
 * @LastEditTime: 2020-09-25 15:07:17
-->
<template>
    <div style="width:100%;height:100%"></div>
</template>

<script>
import common from '../../../mixins/charts.common'
export default {
    name: 'LineChart',
    mixins: [common],
    props: {
        title: String, //标题，可有可无
        valEnding: String, //值的结尾，比如"%"，默认为空
        xName: String, //x轴名，可有可无
        yName: String, //y轴名，可有可无
        left: String, //左边距，有默认
        top: String, //上边距，有默认
        right: String, //右边距，有默认
        bottom: String, //下边距，有默认
        horizontal: Boolean, //是否横向，声明即横向
        dataZoom: Object, //数据缩放滚动条
        markPoint: Object, //气泡标注
        markLine: Object, //标线
        markArea: Object, //标域
        boundaryGap: Boolean, //数据轴上是否取点，申明即不取，默认取点
        smooth: Boolean, //是否平滑曲线（申明即平滑）
        lineStyle: Object, //线条样式
        label: Boolean, //是否显示数据标签（申明即填充，默认显示在线条上侧，不支持自定义）
        areaStyle: String | Boolean | Object, //区域是否填充-面积图（申明即填充，这里为填充默认色，支持自定义）
        stack: Boolean, //是否堆积-此参数配合areaStyle实现堆积面积图，单用此参无意义（申明即堆积）
        visualMap: Object, //视觉映射（改变某些数据区域的颜色）
        colors: Array, //自定义颜色
        axisDegreeScope: Object, //数据轴刻度范围
    },
    data() {
        return {}
    },
    methods: {
        getOptions({ xAxis, series }) {
            //所有数据 方便计算最大值
            let allDatas = []

            //配置折线图格式
            series.forEach((item) => {
                allDatas = allDatas.concat(item.data)
                item.type = 'line'
                item.smooth = this.smooth //平滑曲线
                item.label = {
                    //数据标签
                    show: this.label,
                    textStyle: {
                        fontSize: 10,
                    },
                }
                //区域填充(默认)
                if (
                    typeof this.areaStyle == 'string' ||
                    typeof this.areaStyle == 'boolean'
                )
                    item.areaStyle = { type: 'default' }

                //区域填充(自定义)
                typeof this.areaStyle == 'object' &&
                    (item.areaStyle = this.areaStyle)
                this.stack && (item.stack = '1') //实现堆积面积图
                this.markPoint && (item.markPoint = this.markPoint) //气泡标注
                this.markLine && (item.markLine = this.markLine) //标线
                this.markArea && (item.markArea = this.markArea) //标域
                this.lineStyle && (item.lineStyle = this.lineStyle) //线条样式
            })

            //返回线图配置项
            return {
                title: { text: this.title },
                tooltip: {
                    show: true,
                    // axisPointer: {
                    //     type: 'shadow',  //鼠标移入显示阴影背景
                    // },
                },
                legend: {
                    right: 35,
                    y: this.title ? 37 : 10,
                },
                [this.visualMap && 'visualMap']: this.visualMap, //视觉映射
                grid: {
                    x:
                        this.left ||
                        (this.horizontal
                            ? (Math.max.apply(
                                  null,
                                  xAxis.map((item) => item.length)
                              ) +
                                  1) *
                              10 //横向图根据最长标签长度计算
                            : ((Math.max.apply(null, allDatas) + '').length +
                                  1) *
                                  10 +
                              (this.valEnding || '').length * 10), //纵向图根据最大值位数计算宽度
                    y: this.top || (this.title ? 70 : 50),
                    x2:
                        this.right ||
                        (this.dataZoom && this.dataZoom.yAxisIndex ? 48 : 35),
                    y2:
                        this.bottom ||
                        (this.dataZoom && this.dataZoom.xAxisIndex ? 45 : 30),
                },
                //是否横向判断
                [this.horizontal ? 'yAxis' : 'xAxis']: {
                    type: 'category',
                    boundaryGap: this.boundaryGap, //数据轴上是否取点，默认取点
                    name: this.horizontal
                        ? this.yName || ''
                        : (this.xName || '')
                              .split('')
                              .map((word) => word + '\n')
                              .join(''), //纵排x轴名称
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
                [this.horizontal ? 'xAxis' : 'yAxis']: [
                    {
                        type: 'value',
                        name: this.horizontal
                            ? (this.xName || '')
                                  .split('')
                                  .map((word) => word + '\n')
                                  .join('') //纵排x轴名称
                            : this.yName || '',
                        axisLabel: {
                            formatter: '{value}' + (this.valEnding || ''),
                        },
                        ...(this.axisDegreeScope || {}), //刻度显示范围
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