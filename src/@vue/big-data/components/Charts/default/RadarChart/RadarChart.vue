<!--
 * @Description: 标准雷达图
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年8月31日 10:59:20
 * @LastEditTime: 2021-01-05 18:05:34
-->
<template>
    <div style="width: 100%; height: 100%"></div>
</template>

<script>
import myChart from '../../../../mixins/myChart'
import Config from './inc/Config'
import echarts from 'echarts'
export default {
    name: 'RadarChart',
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
                tooltipFmt,
                showLegend,
                legendPosLeft,
                legendPosTop,
                legendPosRight,
                legendPosBottom,
                legendOrient,
                radius,
                center,
                max,
                min,
                maxValOffset,
                showAxisLabel,
                axisLabelColor,
                axisLabelSize,
                splitNumber,
                areaOpacity,
                colors,
                showAxisLine,
                axisLineColor,
                axisLineWidth,
                axisLineType,
                showSplitLine,
                splitLineColor,
                splitLineWidth,
                splitLineType,
                showSplitArea,
                splitAreaColorAuto,
                splitAreaColor,
                showCatName,
                catNameFmt,
                catNameColor,
                label,
                labelPosition,
                labelFmt,
                labelSize,
            } = this.myOptions

            const { cats, series } = useApiData ? dynamicData : chartData

            //使用字符串方式对对象进行内存复制（非引用）,以防止图层状态中的option数据易值
            let mySeries = JSON.parse(JSON.stringify(series))

            //所有数据 方便计算最大值
            let allDatas = [],
                legends = []
            mySeries.forEach((item) => {
                allDatas = allDatas.concat(item.value)
                legends.push(item.name)
            })

            //返回配置项
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
                legend: {
                    show: showLegend,
                    data: legends,
                    left: legendPosLeft,
                    top: legendPosTop,
                    right: legendPosRight,
                    bottom: legendPosBottom,
                    orient: legendOrient,
                },
                tooltip: {
                    //提示
                    trigger: 'item',
                    [tooltipFmt && 'formatter']: tooltipFmt,
                },
                radar: {
                    radius: radius,
                    center: center,
                    indicator: cats.map((item, index) => {
                        item = { name: item }
                        item.max =
                            max || Math.max.apply(null, allDatas) + maxValOffset
                        item.min = min || 0
                        showAxisLabel &&
                            index > 0 &&
                            (item.axisLabel = { show: false }) //只显示一侧刻度
                        return item
                    }),
                    /* 刻度值 */
                    axisLabel: {
                        show: showAxisLabel,
                        color: axisLabelColor,
                        fontSize: axisLabelSize,
                    },
                    /* 轴线 */
                    axisLine: {
                        show: showAxisLine,
                        lineStyle: {
                            color: axisLineColor,
                            width: axisLineWidth,
                            type: axisLineType,
                        },
                    },
                    /* 分割线 */
                    splitLine: {
                        show: showSplitLine,
                        lineStyle: {
                            color: splitLineColor,
                            width: splitLineWidth,
                            type: splitLineType,
                        },
                    },
                    /* 指示器名称 */
                    name: {
                        show: showCatName,
                        formatter: catNameFmt, //'{value}'
                        textStyle: {
                            color: catNameColor,
                        },
                    },
                    /* 分隔区域 */
                    splitArea: {
                        show: showSplitArea,
                        [splitAreaColorAuto || 'areaStyle']: {
                            color: splitAreaColor,
                        },
                    },
                    type: radarType, //底盘形状polygon、circle
                    startAngle, //起始角度
                    splitNumber, //分隔数
                },
                series: {
                    //数据赋值
                    type: 'radar',
                    data: mySeries,
                    areaStyle: {
                        opacity: areaOpacity, //默认为0
                    },
                    label: {
                        show: label,
                        [labelPosition && 'position']: labelPosition,
                        [labelFmt && 'formatter']: labelFmt,
                        [labelSize && 'fontSize']: labelSize,
                    },
                },
                [colors && 'color']: colors.map((item) => {
                    //渐变色（横向渐变0,0,1,0、纵向渐变0, 1, 0, 0）
                    return item.isGradient
                        ? new echarts.graphic.LinearGradient(0, 0, 1, 0, [
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
