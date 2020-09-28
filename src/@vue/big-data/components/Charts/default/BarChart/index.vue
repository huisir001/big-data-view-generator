<!--
 * @Description: 标准柱图单数据轴（不支持多轴，不支持时间轴）
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-06 10:56:39
 * @LastEditTime: 2020-09-28 14:44:59
-->
<template>
    <div style="width:100%;height:100%"></div>
</template>

<script>
import myChart from '../../../../mixins/myChart'
import Config from './inc/Config'
export default {
    name: 'BarChart',
    mixins: [myChart],
    data() {
        return {
            Config,
        }
    },
    methods: {
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
                visualMap,
                left,
                top,
                right,
                bottom,
                horizontal,
                dataZoom,
                yName,
                xName,
                catLabelRowLen,
                showCatAxisLine,
                showValAxisLabel,
                showValAxisLine,
                showValSplitLine,
                axisDegreeScope,
                colors,
                showLegend,
            } = this.myConfig.options

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
                    show: showLegend,
                    right: 35,
                    y: title ? 37 : 10,
                },
                [visualMap && 'visualMap']: visualMap, //视觉映射
                grid: {
                    x:
                        left ||
                        (horizontal
                            ? (Math.max.apply(
                                  null,
                                  xAxis.map((item) => item.length)
                              ) +
                                  1) *
                              10 //横向柱图根据最长标签长度计算
                            : ((Math.max.apply(null, allDatas) + '').length +
                                  1) *
                                  10 +
                              valEnding.length * 10), //纵向柱图根据最大值位数计算宽度
                    y: top || (title ? 70 : 50),
                    x2: right || (dataZoom && dataZoom.yAxisIndex ? 48 : 10),
                    y2: bottom || (dataZoom && dataZoom.xAxisIndex ? 45 : 30),
                },
                //是否横向判断
                [horizontal ? 'yAxis' : 'xAxis']: {
                    type: 'category',
                    name: horizontal
                        ? yName
                        : xName
                              .split('')
                              .map((word) => word + '\n')
                              .join(''), //纵排x轴名称
                    nameTextStyle: {
                        align: 'center', //x轴名称位置
                    },
                    data: xAxis.map((item) => {
                        if (item.length <= catLabelRowLen) return item
                        return item
                            .split('')
                            .map((v, i) => {
                                if (i > 0 && (i + 1) % catLabelRowLen == 0)
                                    return v + '\n'
                                else return v
                            })
                            .join('')
                    }),
                    axisLine: { show: showCatAxisLine }, //类型轴轴线
                },
                [horizontal ? 'xAxis' : 'yAxis']: [
                    {
                        type: 'value',
                        name: horizontal
                            ? xName
                                  .split('')
                                  .map((word) => word + '\n')
                                  .join('') //纵排x轴名称
                            : yName,
                        axisLabel: {
                            //刻度
                            show: showValAxisLabel, //数据轴刻度是否显示
                            formatter: '{value}' + valEnding,
                        },
                        ...axisDegreeScope, //刻度显示范围
                        axisLine: { show: showValAxisLine }, //轴线
                        splitLine: { show: showValSplitLine }, //刻度分割线
                    },
                ],
                series,
                [dataZoom && 'dataZoom']: [
                    //这里默认只支持单个滚动条
                    {
                        show: true,
                        [dataZoom && dataZoom.xAxisIndex && 'bottom']: 5, //位置，如果在左侧，则设left，右侧right
                        [dataZoom && dataZoom.yAxisIndex && 'right']: 8, //位置，如果在左侧，则设left，右侧right
                        [dataZoom && dataZoom.xAxisIndex && 'height']: 12, //滚动条粗细，若为x轴，则设height
                        [dataZoom && dataZoom.yAxisIndex && 'width']: 12, //滚动条粗细，若为Y轴，则设width
                        ...dataZoom, //参数

                        /* 传参配置项说明 */
                        // xAxisIndex: [0], //滚动数据源，这里默认第一条X轴，若为横向柱图可设置y轴。若为多轴图，可调整下标
                        // minValueSpan: 1, //最小显示到的柱子下标，1为2单位柱子
                        // maxValueSpan: 9, //最大显示到的柱子下标，9为10单位柱子
                        // start: 0, //滚动条默认显示当前轴数据范围，start为起始值，end为结束值，这里为百分比，最小0，最大100
                        // end: 50,    //minValueSpan/maxValueSpan  start/end 不要同时使用，故这里不设默认值，需要由父组件传参
                    },
                ],
                [colors && 'color']: colors, //自定义颜色
            }
        },
    },
}
</script>