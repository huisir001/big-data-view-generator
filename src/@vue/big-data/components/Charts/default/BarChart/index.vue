<!--
 * @Description: 标准柱图单数据轴（不支持多轴，不支持时间轴）
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-06 10:56:39
 * @LastEditTime: 2020-09-27 18:03:48
-->
<template>
    <div style="width:100%;height:100%"></div>
</template>

<script>
import common from '../../../../mixins/charts.common'
import Config from './inc/Config'
export default {
    name: 'BarChart',
    mixins: [common],
    props: {
        options: {
            //参数，必传
            type: Object,
            required: true,
        },
    },
    computed: {
        getEchartsOptions({ xAxis, series }) {
            //获取配置项
            const {
                barWidth,
                stack,
                barBorderRadius,
                label,
                labelPosition,
                valEnding,
                seriesColors,
                markPoint,
                markLine,
                markArea,
                title,
            } = Config.getOptions(this.options)

            //所有数据 方便计算最大值
            let allDatas = []

            //配置柱图格式
            series.forEach((item) => {
                allDatas = allDatas.concat(item.data)
                item.type = 'bar'
                item.barWidth = barWidth
                //堆叠
                if (!stack) {
                    item.stack = '0'
                } else if (stack instanceof Array) {
                    stack.forEach((obj) => {
                        obj.names.includes(item.name) && (item.stack = obj.type)
                    })
                }
                //圆角、数据标签
                item.itemStyle = {
                    normal: {
                        barBorderRadius,
                        label: {
                            //数据标签
                            show: label,
                            position: labelPosition,
                            formatter: '{c}' + valEnding,
                            textStyle: {
                                fontSize: 10,
                            },
                        },
                        color: (e) => {
                            return (
                                //自定义柱子颜色
                                seriesColors && seriesColors[e.dataIndex]
                            )
                        },
                    },
                }
                markPoint && (item.markPoint = markPoint) //气泡标注
                markLine && (item.markLine = markLine) //标线
                markArea && (item.markArea = markArea) //标域
            })

            //*****************************************以下待重构*********************************************** */

            //返回柱图配置项
            return {
                title: { text: title },
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