<!--
 * @Description: 自定义图表（所有配置项完全自定义传入）
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-06 10:56:39
 * @LastEditTime: 2020-12-05 14:28:00
-->
<template>
    <div style="width: 100%; height: 100%"></div>
</template>

<script>
import myChart from '../../../../mixins/myChart'
import Config from './inc/Config'
import echarts from 'echarts'
export default {
    name: 'BarChart',
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
                barWidth,
                stack,
                barBorderRadius,
                label,
                labelPosition,
                valEnding,
                showMarkPoint,
                showMarkLine,
                showMarkArea,
                markPoint,
                markLine,
                markArea,
                title,
                showVisualMap,
                visualMap,
                left,
                top,
                right,
                bottom,
                horizontal,
                showDataZoom,
                dataZoomAxis,
                dataZoomSplitType,
                dataZoomSplitScope,
                yName,
                xName,
                catLabelRowLen,
                showCatAxisLine,
                showValAxisLabel,
                showValAxisLine,
                showValSplitLine,
                limitAxisMinVal,
                limitAxisMaxVal,
                axisScopeMin,
                axisScopeMax,
                colors,
                colorMode,
                showLegend,
            } = this.myOptions

            const { xAxis, series } = useApiData ? dynamicData : chartData

            //使用字符串方式对对象进行内存复制（非引用）,以防止图层状态中的option数据易值
            let mySeries = JSON.parse(JSON.stringify(series))

            //所有数据 方便计算最大值
            let allDatas = []

            //配置柱图格式
            mySeries.forEach((item) => {
                allDatas = allDatas.concat(item.data)
                item.type = 'bar'
                item.barWidth = barWidth
                //堆叠
                if (stack) {
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
                        [colorMode == 'byAxis' && 'color']: (e) => {
                            //自定义单柱子颜色
                            const colorItem = colors[e.dataIndex]
                            if (colors && colorItem) {
                                return colorItem.isGradient
                                    ? new echarts.graphic.LinearGradient(
                                          0,
                                          horizontal ? 0 : 1,
                                          horizontal ? 1 : 0,
                                          0,
                                          [
                                              {
                                                  offset: colorItem.gdScope[0],
                                                  color:
                                                      colorItem.color ||
                                                      'rgba(0,0,0,0)',
                                              },
                                              {
                                                  offset: colorItem.gdScope[1],
                                                  color:
                                                      colorItem.gdColor ||
                                                      'rgba(0,0,0,0)',
                                              },
                                          ]
                                      )
                                    : colorItem.color
                            }
                        },
                    },
                }
                showMarkPoint && (item.markPoint = markPoint) //气泡标注
                showMarkLine && (item.markLine = markLine) //标线
                showMarkArea && (item.markArea = markArea) //标域
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
                [colors && colorMode == 'byLegend' && 'color']: colors.map(
                    (item) => {
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
                                          color:
                                              item.gdColor || 'rgba(0,0,0,0)',
                                      },
                                  ]
                              )
                            : item.color
                    }
                ),
            }
        },
    },
}
</script>
