<!--
 * @Description: 标准仪表盘（当前只支持单表盘单指针图表）
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年8月19日 12:00:03
 * @LastEditTime: 2020-12-31 15:28:24
-->
<template>
    <div style="width: 100%; height: 100%"></div>
</template>

<script>
import myChart from '../../../../mixins/myChart'
import Config from './inc/Config'
import echarts from 'echarts'
export default {
    name: 'GaugeChart',
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
                radius,
                center,
                tooltipFmt,
                showAxis,
                axisWidth,
                axisShadowBlur,
                axisShadowColor,
                axisShadowOffsetX,
                axisShadowOffsetY,
                colors,
                startAngle,
                endAngle,
                min,
                max,
                splitNumber,
                clockwise,
                showDialTitle,
                dialTitleColor,
                dialTitleCenter,
                dialTitleSize,
                dialTitleWeight,
                showDetail,
                detailFmt,
                detailCenter,
                detailSize,
                detailFontWeight,
                showAxisLabel,
                axisLabelSize,
                axisLabelStyle,
                axisLabelWeight,
                axisLabelFmt,
                axisTickType,
                axisTickWidth,
                showAxisTick,
                axisTickLength,
                axisTickSplitNum,
                showSplitLine,
                splitLineLength,
                splitLineWidth,
                splitLineType,
                pointerLength,
                pointerWidth,
                pointerColorAuto,
                pointerColor,
                pointerOpacity,
                pointerBorderColor,
                pointerBorderWidth,
                pointerBorderType,
            } = this.myOptions

            const series = useApiData ? dynamicData : chartData

            //使用字符串方式对对象进行内存复制（非引用）,以防止图层状态中的option数据易值
            let mySeries = JSON.parse(JSON.stringify(series))

            //配置仪表盘格式
            Object.assign(series, {
                type: 'gauge',
                //仪表盘大小
                radius,
                center: center.map((item) =>
                    typeof item == 'number' ? `${item}%` : item
                ), //仪表盘位置,这里默认为百分比
                splitNumber, //表盘分割段数
                clockwise, //是否顺时针
                startAngle, //表盘开始角度（单位为度数）
                endAngle, //表盘结束角度
                min, //最小刻度
                max, //最大刻度
                //仪表盘数值详情用于显示数据
                detail: {
                    show: showDetail,
                    formatter: detailFmt,
                    offsetCenter: detailCenter,
                    textStyle: {
                        fontSize: detailSize,
                        fontWeight: detailFontWeight,
                    },
                },
                //仪表盘键名配置用于显示名称
                title: {
                    show: showDialTitle,
                    offsetCenter: dialTitleCenter, //名称位置
                    textStyle: {
                        color: dialTitleColor,
                        fontSize: dialTitleSize, //名称字体大小
                        fontWeight: dialTitleWeight, //粗细
                    },
                },
                //表盘设置
                axisLine: {
                    show: showAxis, //是否显示表盘
                    lineStyle: {
                        width: axisWidth, //表盘宽
                        shadowBlur: axisShadowBlur, //表盘阴影模糊度
                        shadowColor: axisShadowColor, //表盘阴影色
                        shadowOffsetX: axisShadowOffsetX, //表盘阴影横向偏移
                        shadowOffsetY: axisShadowOffsetY, //表盘阴影纵向偏移
                        color: colors
                            ? colors.map((item) => {
                                  //渐变色（横向渐变0,0,1,0、纵向渐变0, 1, 0, 0）
                                  return item.isGradient
                                      ? [
                                            item.per,
                                            new echarts.graphic.LinearGradient(
                                                0,
                                                0,
                                                1,
                                                0,
                                                [
                                                    {
                                                        offset: item.gdScope[0],
                                                        color:
                                                            item.color ||
                                                            'rgba(0,0,0,0)',
                                                    },
                                                    {
                                                        offset: item.gdScope[1],
                                                        color:
                                                            item.gdColor ||
                                                            'rgba(0,0,0,0)',
                                                    },
                                                ]
                                            ),
                                        ]
                                      : [item.per, item.color]
                              })
                            : [
                                  //默认分段及颜色自定义
                                  [0.2, '#27bf99'],
                                  [0.8, '#1d88eb'],
                                  [1, '#ff4500'],
                              ],
                    },
                },
                //表盘分割线
                splitLine: {
                    show: showSplitLine,
                    length: splitLineLength,
                    lineStyle: {
                        width: splitLineWidth,
                        type: splitLineType,
                    },
                },
                //刻度线
                axisTick: {
                    lineStyle: {
                        type: axisTickType,
                        width: axisTickWidth,
                    },
                    show: showAxisTick,
                    length: axisTickLength,
                    splitNumber: axisTickSplitNum, //刻度线分隔数（每大段分隔段数）
                },
                //刻度值
                axisLabel: {
                    show: showAxisLabel,
                    textStyle: {
                        fontSize: axisLabelSize,
                        fontStyle: axisLabelStyle,
                        fontWeight: axisLabelWeight,
                    },
                    formatter: axisLabelFmt,
                },
                //指针样式
                itemStyle: {
                    color: pointerColorAuto ? 'auto' : pointerColor,
                    opacity: pointerOpacity,
                    borderColor: pointerBorderColor,
                    borderWidth: pointerBorderWidth,
                    borderType: pointerBorderType,
                },
                //指针配置
                pointer: {
                    length: pointerLength,
                    width: pointerWidth,
                },
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
                tooltip: {
                    //提示
                    trigger: 'item',
                    [tooltipFmt && 'formatter']: tooltipFmt,
                },
                series, //数据赋值
            }
        },
    },
}
</script>
