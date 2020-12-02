<!--
 * @Description: 标准折线图单数据轴（不支持多轴，不支持时间轴）
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-12 10:56:39
 * @LastEditTime: 2020-12-02 18:15:16
-->
<template>
    <div style="width: 100%; height: 100%"></div>
</template>

<script>
import myChart from '../../../../mixins/myChart'
import Config from './inc/Config'
import echarts from 'echarts'
export default {
    name: 'LineChart',
    mixins: [myChart],
    data() {
        return {
            Config,
        }
    },
    methods: {
        getEchartsOptions() {
            //获取配置项
            const {
                chartData,
                useApiData,
                dynamicData,
                smooth,
                label,
                labelPosition,
                areaFill,
                areaStyle,
                stack,
                showMarkPoint,
                showMarkLine,
                showMarkArea,
                markPoint,
                markLine,
                markArea,
                lineWidth,
                lineType,
                showShadow,
                shadowBlur,
                shadowColor,
                shadowOffsetX,
                shadowOffsetY,
                opacity,
                title,
                showLegend,
                left,
                top,
                right,
                bottom,
                showDataZoom,
                dataZoomAxis,
                dataZoomSplitType,
                dataZoomSplitScope,
                xName,
                yName,
                horizontal,
                valEnding,
                boundaryGap,
                catLabelRowLen,
                showCatAxisLine,
                showValAxisLabel,
                limitAxisMinVal,
                limitAxisMaxVal,
                axisScopeMin,
                axisScopeMax,
                showValAxisLine,
                showValSplitLine,
                colors,
                showVisualMap,
                visualMap,
            } = this.myOptions

            const { xAxis, series } = useApiData ? dynamicData : chartData

            //使用字符串方式对对象进行内存复制（非引用）,以防止图层状态中的option数据易值
            let mySeries = JSON.parse(JSON.stringify(series))

            //所有数据 方便计算最大值
            let allDatas = []

            //配置折线图格式
            mySeries.forEach((item) => {
                allDatas = allDatas.concat(item.data)
                item.type = 'line'
                item.smooth = smooth //平滑曲线
                item.label = {
                    //数据标签
                    show: label,
                    position: labelPosition,
                    formatter: '{c}' + valEnding,
                    textStyle: {
                        fontSize: 10,
                    },
                }

                stack && (item.stack = '1') //实现堆积面积图
                areaFill && (item.areaStyle = areaStyle) //区域填充
                showMarkPoint && (item.markPoint = markPoint) //气泡标注
                showMarkLine && (item.markLine = markLine) //标线
                showMarkArea && (item.markArea = markArea) //标域

                //线条样式
                const shadowOption = showShadow
                    ? { shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY }
                    : {}
                item.lineStyle = {
                    width: lineWidth,
                    type: lineType,
                    opacity,
                    ...shadowOption,
                }
            })

            //返回线图配置项
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
                    right:
                        right ||
                        (showDataZoom && dataZoomAxis[0] == 'y'
                            ? 48
                            : xName
                            ? 25
                            : 8),
                    y: title ? 37 : 10,
                },
                [showVisualMap && 'visualMap']: visualMap, //视觉映射
                grid: {
                    //这里的left+""避免left为数字0时判定为false
                    x:
                        left + '' ||
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
                    y: top + '' || (title ? 70 : 50),
                    x2:
                        right + '' ||
                        (showDataZoom && dataZoomAxis[0] == 'y'
                            ? 48
                            : xName
                            ? 30
                            : 10),
                    y2:
                        bottom + '' ||
                        (showDataZoom && dataZoomAxis[0] == 'x' ? 42 : 30),
                },
                //是否横向判断
                [horizontal ? 'yAxis' : 'xAxis']: {
                    type: 'category',
                    boundaryGap: boundaryGap, //数据轴上是否取点，默认取点
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
                        nameTextStyle: {
                            align: 'right', //y轴名称位置
                        },
                        axisLabel: {
                            //刻度
                            show: showValAxisLabel, //数据轴刻度是否显示
                            formatter: '{value}' + valEnding,
                        },
                        //刻度显示范围
                        [limitAxisMinVal && 'min']: axisScopeMin,
                        [limitAxisMaxVal && 'max']: axisScopeMax,
                        axisLine: { show: showValAxisLine }, //轴线
                        splitLine: { show: showValSplitLine }, //刻度分割线
                    },
                ],
                series: mySeries,
                [showDataZoom && 'dataZoom']: [
                    //这里默认只支持单个滚动条
                    {
                        show: showDataZoom,
                        [dataZoomAxis[0] == 'x' && 'bottom']: 5,
                        [dataZoomAxis[0] == 'y' && 'right']: 8,
                        [dataZoomAxis[0] == 'x' && 'height']: 12,
                        [dataZoomAxis[0] == 'y' && 'width']: 12,
                        [dataZoomAxis[0] == 'x' && 'xAxisIndex']: [
                            Number(dataZoomAxis[1]),
                        ], //滚动数据源，这里默认第一条X轴，若为横向柱图可设置y轴。若为多轴图，可调整下标
                        [dataZoomAxis[0] == 'y' && 'yAxisIndex']: [
                            Number(dataZoomAxis[1]),
                        ],
                        [dataZoomSplitType == 'index' &&
                        'minValueSpan']: dataZoomSplitScope[0], //最小显示到的柱子下标，1为2单位柱子
                        [dataZoomSplitType == 'index' &&
                        'maxValueSpan']: dataZoomSplitScope[1], //最大显示到的柱子下标，9为10单位柱子
                        [dataZoomSplitType == 'ratio' &&
                        'start']: dataZoomSplitScope[0], //滚动条默认显示当前轴数据范围，start为起始值，end为结束值，这里为百分比，最小0，最大100
                        [dataZoomSplitType == 'ratio' &&
                        'end']: dataZoomSplitScope[1], //minValueSpan/maxValueSpan  start/end 不要同时使用，故这里不设默认值，需要由父组件传参
                    },
                ],
                [colors && 'color']: colors.map((item) => {
                    //渐变色（横向渐变0,0,1,0、纵向渐变0, 1, 0, 0）
                    return item.isGradient
                        ? new echarts.graphic.LinearGradient(
                              0,
                              horizontal ? 0 : 1,
                              horizontal ? 1 : 0,
                              0,
                              [
                                  {
                                      offset: item.gdScope[0],
                                      color: item.color || 'rgba(0,0,0,0)',
                                  },
                                  {
                                      offset: item.gdScope[1],
                                      color: item.gdColor || 'rgba(0,0,0,0)',
                                  },
                              ]
                          )
                        : item.color
                }),
            }
        },
    },
}
</script>
