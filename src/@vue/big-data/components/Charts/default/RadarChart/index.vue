<!--
 * @Description: 标准饼图
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-17 09:25:39
 * @LastEditTime: 2020-12-30 16:58:56
-->
<template>
    <div style="width: 100%; height: 100%"></div>
</template>

<script>
import myChart from '../../../../mixins/myChart'
import Config from './inc/Config'
import echarts from 'echarts'
export default {
    name: 'PieChart',
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
                colors,
                radius,
                center,
                label,
                labelPosition,
                labelFmt,
                labelSize,
                showLegend,
                legendPosLeft,
                legendPosTop,
                legendPosRight,
                legendPosBottom,
                legendOrient,
                tooltipFmt,
                selectedCats,
                roseType,
                labelLineLength,
                selectedMode,
                borderColor,
                borderWidth,
            } = this.myOptions

            const series = useApiData ? dynamicData : chartData

            //使用字符串方式对对象进行内存复制（非引用）,以防止图层状态中的option数据易值
            let mySeries = JSON.parse(JSON.stringify(series))
            //图例，需去重
            let legends = []

            //配置饼图格式
            mySeries.forEach((item, index) => {
                item.type = 'pie'
                item.roseType = roseType //是否为南丁格尔玫瑰图及其格式
                item.selectedMode = selectedMode //选中模式
                item.label = {
                    //数据标签
                    show: label, //是否显示
                    textStyle: {
                        fontSize:
                            labelSize instanceof Array
                                ? labelSize[index]
                                : labelSize,
                    },
                    position:
                        labelPosition instanceof Array
                            ? labelPosition[index]
                            : labelPosition, //inside\outside
                    [labelFmt && 'formatter']:
                        labelFmt instanceof Array ? labelFmt[index] : labelFmt, //字符串模板
                }
                item.labelLine = {
                    normal: {
                        length: labelLineLength, //标线引出线长度,默认10
                    },
                }
                item.itemStyle = {
                    borderColor, //描边色
                    borderWidth, //描边宽
                    emphasis: {
                        label: {
                            //高亮显示标签
                            show: true,
                            textStyle: {
                                fontSize:
                                    (labelSize instanceof Array
                                        ? labelSize[index]
                                        : labelSize) + 5,
                                fontWeight: 'bold',
                            },
                        },
                    },
                }
                //饼图大小，考虑到嵌套饼图情况,这里只能嵌套一层
                if (radius && radius instanceof Array) {
                    let myRadius = JSON.parse(JSON.stringify(radius))
                    myRadius = myRadius.map((item) =>
                        typeof item == 'number' ? `${item}%` : item
                    )
                    if (myRadius.length == 1) {
                        item.radius = myRadius[0]
                    } else if (myRadius.length == 2) {
                        item.radius = myRadius
                    } else if (myRadius.length == 3 || myRadius.length == 4) {
                        index == 0 && (item.radius = myRadius.slice(0, 2))
                        index == 1 && (item.radius = myRadius.slice(2))
                    }
                    //设置内部饼图标签
                    if (parseFloat(myRadius[1]) < parseFloat(myRadius[2])) {
                        index == 0 && (item.label.position = 'inside')
                    } else {
                        index == 1 && (item.label.position = 'inside')
                    }
                } else {
                    item.radius = radius || '50%'
                }
                //饼图位置
                let myCenter = JSON.parse(JSON.stringify(center))
                myCenter = myCenter.map((item) =>
                    typeof item == 'number' ? `${item}%` : item
                )
                item.center = myCenter || ['50%', '50%']
                //图例
                legends = legends.concat(item.data.map((item) => item.name))
                //默认选中的项目类型
                item.data.forEach((child) => {
                    selectedCats &&
                        selectedCats.includes(child.name) &&
                        (child.selected = true)
                })
            })

            //返回饼图配置项
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
                legend: {
                    show: showLegend,
                    data: [...new Set(legends)], //去重
                    left: legendPosLeft,
                    top: legendPosTop,
                    right: legendPosRight,
                    bottom: legendPosBottom,
                    orient: legendOrient, //vertical/horizontal
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
                series: mySeries, //数据赋值
            }
        },
    },
}
</script>
