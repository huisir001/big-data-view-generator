<!--
 * @Description: 标准散点图
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年8月31日 16:59:34
 * @LastEditTime: 2021-01-07 17:51:03
-->
<template>
    <div style="width: 100%; height: 100%"></div>
</template>

<script>
import myChart from '../../../../mixins/myChart'
import Config from './inc/Config'
import echarts from 'echarts'
export default {
    name: 'ScatterChart',
    mixins: [myChart],
    data() {
        return { Config }
    },
    methods: {
        getEchartsOptions() {
            const {
                chartData,
                useApiData,
                dynamicData,
                title,
                titleSize,
                titleFontWeight,
                titleFontFamily,
                titleColor,
                titlePosLeft,
                titlePosTop,
                titlePosRight,
                titlePosBottom,
                showLegend,
                legendPosLeft,
                legendPosTop,
                legendPosRight,
                legendPosBottom,
                legendOrient,
                legendFontColor,
                legendFontWeight,
                legendFontSize,
                legendItemWidth,
                legendItemHeight,
                legendItemGap,
                left,
                top,
                right,
                bottom,
                tooltipFmt,
                showxAxisLabel,
                showyAxisLabel,
                showxAxisLine,
                showxSplitLine,
                showyAxisLine,
                showySplitLine,
                limitxAxisMinVal,
                limitxAxisMaxVal,
                limityAxisMinVal,
                limityAxisMaxVal,
                xAxisScopeMin,
                xAxisScopeMax,
                yAxisScopeMin,
                yAxisScopeMax,
                xAxisLabelFmt,
                yAxisLabelFmt,
                xName,
                yName,
                colors,
                showDataZoom,
                dataZoomAxis,
                dataZoomSplitType,
                dataZoomSplitScope,
                showVisualMap,
                visualMap,
                showMarkPoint,
                showMarkLine,
                showMarkArea,
                markPoint,
                markLine,
                markArea,
                label,
                labelPosition,
                labelFmt,
                labelSize,
                symbolSize,
                isBubble,
                minBubbleSize,
                maxBubbleSize,
                symbolType,
                shadowBlur,
                shadowColor,
                shadowOffsetX,
                shadowOffsetY,
            } = this.myOptions

            const series = useApiData ? dynamicData : chartData

            let mySeries = JSON.parse(JSON.stringify(series))

            //所有数据 方便计算最大值
            let allDatas = []

            //配置散点图格式
            mySeries.forEach((item, index) => {
                allDatas = allDatas.concat(item.data)
                item.type = 'scatter'

                //浮点尺寸
                item.symbolSize = isBubble
                    ? (value) => {
                          let radius =
                              ((value[2] - 0) * (maxBubbleSize - 3)) / 100 +
                              minBubbleSize
                          return Math.max(Math.round(radius), 1) || 1
                      }
                    : symbolSize

                //浮点图形
                item.symbol = isBubble
                    ? 'circle'
                    : typeof symbolType == 'string'
                    ? symbolType
                    : symbolType[index] || 'circle'

                //浮点阴影
                item.itemStyle = {
                    shadowBlur,
                    shadowColor,
                    shadowOffsetX,
                    shadowOffsetY,
                }

                //数据标签
                item.label = {
                    show: label,
                    position: labelPosition,
                    formatter: labelFmt,
                    textStyle: {
                        fontSize: labelSize,
                    },
                }
                showMarkPoint && (item.markPoint = markPoint) //气泡标注
                showMarkLine && (item.markLine = markLine) //标线
                showMarkArea && (item.markArea = markArea) //标域
            })

            //返回线图配置项
            return {
                title: {
                    show: title && title.length > 0,
                    text: title,
                    left: titlePosLeft,
                    top: titlePosTop,
                    right: titlePosRight,
                    bottom: titlePosBottom,
                    textStyle: {
                        fontSize: titleSize,
                        fontWeight: titleFontWeight,
                        fontFamily: titleFontFamily,
                        color: titleColor,
                    },
                },
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
                    [tooltipFmt && 'formatter']: tooltipFmt,
                },
                legend: {
                    show: showLegend,
                    left: legendPosLeft,
                    top: legendPosTop,
                    right: legendPosRight,
                    bottom: legendPosBottom,
                    orient: legendOrient,
                    textStyle: {
                        color: legendFontColor,
                        fontWeight: legendFontWeight,
                        fontSize: legendFontSize,
                    },
                    itemWidth: legendItemWidth,
                    itemHeight: legendItemHeight,
                    itemGap: legendItemGap,
                },
                [showVisualMap && 'visualMap']: visualMap, //视觉映射
                grid: {
                    x:
                        left + '' ||
                        ((Math.max.apply(null, allDatas) + '').length + 2) * 10, //纵向图根据最大值位数计算宽度
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
                xAxis: {
                    type: 'value',
                    name: xName
                        .split('')
                        .map((word) => word + '\n')
                        .join(''), //纵排x轴名称
                    scale: true,
                    power: 1,
                    axisLabel: {
                        show: showxAxisLabel,
                        formatter: xAxisLabelFmt,
                    },
                    nameTextStyle: {
                        align: 'center', //x轴名称位置
                    },
                    //刻度显示范围
                    [limitxAxisMinVal && 'min']: xAxisScopeMin,
                    [limitxAxisMaxVal && 'max']: xAxisScopeMax,
                    axisLine: { show: showxAxisLine }, //轴线
                    splitLine: { show: showxSplitLine }, //刻度分割线
                },
                yAxis: {
                    type: 'value',
                    name: yName,
                    power: 1,
                    scale: true,
                    axisLabel: {
                        show: showyAxisLabel,
                        formatter: yAxisLabelFmt,
                    },
                    //刻度显示范围
                    [limityAxisMinVal && 'min']: yAxisScopeMin,
                    [limityAxisMaxVal && 'max']: yAxisScopeMax,
                    axisLine: { show: showyAxisLine }, //轴线
                    splitLine: { show: showySplitLine }, //刻度分割线
                },
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
                        ], //滚动数据源，这里默认第一条X轴
                        [dataZoomAxis[0] == 'y' && 'yAxisIndex']: [
                            Number(dataZoomAxis[1]),
                        ],
                        [dataZoomSplitType == 'index' &&
                        'minValueSpan']: dataZoomSplitScope[0], //最小显示到的浮点下标，1为2单位浮点
                        [dataZoomSplitType == 'index' &&
                        'maxValueSpan']: dataZoomSplitScope[1], //最大显示到的浮点下标，9为10单位浮点
                        [dataZoomSplitType == 'ratio' &&
                        'start']: dataZoomSplitScope[0], //滚动条默认显示当前轴数据范围，start为起始值，end为结束值，这里为百分比，最小0，最大100
                        [dataZoomSplitType == 'ratio' &&
                        'end']: dataZoomSplitScope[1], //minValueSpan/maxValueSpan  start/end 不要同时使用，故这里不设默认值，需要由父组件传参
                    },
                ],
                [colors && 'color']: colors.map((item) => {
                    //渐变色（中心辐射渐变）
                    return item.isGradient
                        ? new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                              {
                                  offset: item.gdScope[0],
                                  color: item.color || 'rgba(0,0,0,0)',
                              },
                              {
                                  offset: item.gdScope[1],
                                  color: item.gdColor || 'rgba(0,0,0,0)',
                              },
                          ])
                        : item.color
                }),
            }
        },
    },
}
</script>
