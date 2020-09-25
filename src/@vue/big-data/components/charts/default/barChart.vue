<!--
 * @Description: 标准柱图单数据轴（不支持多轴，不支持时间轴）
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-06 10:56:39
 * @LastEditTime: 2020-09-25 15:06:39
-->
<template>
    <div style="width:100%;height:100%"></div>
</template>

<script>
import common from '../../../mixins/charts.common'
export default {
    name: 'BarChart',
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
        barWidth: String, //柱粗，默认20%
        stack: Array | String, //是否堆叠，堆叠的项目有哪些，只申明stack不传值为所有柱子都堆叠在一柱上，且不考虑堆叠的类型名
        horizontal: Boolean, //是否横向，声明即横向
        barBorderRadius: Array | Number, //柱子是否圆角，可传数组或数字如30或[30,30,30,30]
        dataZoom: Object, //数据缩放滚动条
        markPoint: Object, //气泡标注
        markLine: Object, //标线
        markArea: Object, //标域
        colors: Array, //自定义同类柱子颜色
        seriesColors: Array, //自定义不同柱子颜色
        label: Boolean, //是否显示数据标签，申明即显示，默认在柱子上方
        labelPosition: String, //数据标签位置
        visualMap: Object, //视觉映射（改变某些数据区域的颜色）
        axisDegreeScope: Object, //数据轴刻度范围
        hideValAxisLabel: Boolean, //隐藏数据轴刻度（申明即隐藏）
        hideValAxisLine: Boolean, //隐藏数据轴轴线（申明即隐藏）
        hideValSplitLine: Boolean, //隐藏数据轴刻度分隔线（申明即隐藏）
        hideCatAxisLine: Boolean, //隐藏类型轴轴线（申明即隐藏）
        catLabelRowLen: {
            //类型轴类型名称每行字数（多少字换行）
            type: Number,
            default: 4,
        },
    },
    data() {
        return {}
    },
    methods: {
        getOptions({ xAxis, series }) {
            //所有数据 方便计算最大值
            let allDatas = []

            //配置柱图格式
            series.forEach((item) => {
                allDatas = allDatas.concat(item.data)
                item.type = 'bar'
                item.barWidth = this.barWidth || '20%'
                //堆叠
                if (this.stack == '') {
                    item.stack = '0'
                } else if (this.stack instanceof Array) {
                    this.stack.forEach((obj) => {
                        obj.names.includes(item.name) && (item.stack = obj.type)
                    })
                }
                //圆角、数据标签
                item.itemStyle = {
                    normal: {
                        barBorderRadius: this.barBorderRadius
                            ? this.barBorderRadius
                            : 0,
                        label: {
                            //数据标签
                            show: this.label,
                            position: this.labelPosition || 'top',
                            formatter: '{c}' + (this.valEnding || ''),
                            textStyle: {
                                fontSize: 10,
                            },
                        },
                        color: (e) => {
                            return (
                                //自定义柱子颜色
                                this.seriesColors &&
                                this.seriesColors[e.dataIndex]
                            )
                        },
                    },
                }
                this.markPoint && (item.markPoint = this.markPoint) //气泡标注
                this.markLine && (item.markLine = this.markLine) //标线
                this.markArea && (item.markArea = this.markArea) //标域
            })

            //返回柱图配置项
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
                              10 //横向柱图根据最长标签长度计算
                            : ((Math.max.apply(null, allDatas) + '').length +
                                  1) *
                                  10 +
                              (this.valEnding || '').length * 10), //纵向柱图根据最大值位数计算宽度
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
                        if (item.length <= this.catLabelRowLen) return item
                        return item
                            .split('')
                            .map((v, i) => {
                                if (i > 0 && (i + 1) % this.catLabelRowLen == 0)
                                    return v + '\n'
                                else return v
                            })
                            .join('')
                    }),
                    axisLine: { show: !this.hideCatAxisLine }, //类型轴轴线
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
                            //刻度
                            show: !this.hideValAxisLabel, //数据轴刻度是否显示
                            formatter: '{value}' + (this.valEnding || ''),
                        },
                        ...(this.axisDegreeScope || {}), //刻度显示范围
                        axisLine: { show: !this.hideValAxisLine }, //轴线
                        splitLine: { show: !this.hideValSplitLine }, //刻度分割线
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
                        // xAxisIndex: [0], //滚动数据源，这里默认第一条X轴，若为横向柱图可设置y轴。若为多轴图，可调整下标
                        // minValueSpan: 1, //最小显示到的柱子下标，1为2单位柱子
                        // maxValueSpan: 9, //最大显示到的柱子下标，9为10单位柱子
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