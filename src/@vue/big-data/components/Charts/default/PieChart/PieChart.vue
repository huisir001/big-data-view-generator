<!--
 * @Description: 标准饼图
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-17 09:25:39
 * @LastEditTime: 2020-09-25 15:10:59
-->
<template>
    <div style="width:100%;height:100%"></div>
</template>

<script>
import common from '../../../mixins/charts.common'
export default {
    name: 'PieChart',
    mixins: [common],
    props: {
        title: String, //标题，可有可无
        titleDIY: Object, //自定义标题格式（一般用于环饼图中间显示总数据，这里需要用到子父传参及数据监听重新渲染）
        centerTitle: Boolean, //名称是否显示在中心（一般用于环饼图,申明即居中，若设置titleDIY，则此项无效）
        colors: Array, //自定义颜色
        radius: String | Array, //饼图大小（所占盒子的比例），默认为50%，若为数组，则为环饼图尺寸
        center: Array, //饼图位置，数组两个值分别为圆心的横向位置比和纵向位置比，默认为["50%","50%"]
        label: Boolean, //是否显示数据标签（申明即填充）
        labelFmt: String | Array, //数据标注的字符串模板，如`{b}: {c} ({d}%)`，如果为多个类型(前套图)，可传数组
        tooltipFmt: String, //提示框的字符串模板，如`{a} <br/>{b} : {c} ({d}%)`
        legendOptions: Object, //图例配置项，默认不配置则为横排、底部居中，可配置项如：{x:"",y:"",x2:"",y2:"",orient:"vertical/horizontal"}，orient默认为横向可不设置
        labelInsideCats: Array, //标签在饼图内部的项目类型（一般嵌套图的内部的饼图标签显示在饼图内，这里若为嵌套图，已默认配置，故无需配置）
        selectedCats: Array, //默认选中的项目类型
        roseType: String, //是否为南丁格尔玫瑰图及其格式
        labelLineLength: Number, //标线引出线长度
    },
    data() {
        return {}
    },
    watch: {
        titleDIY() {
            this.chartRender(this.curChartData) //数据变化重新渲染（由于titleDIY中的总数是父组件计算得来的，有延迟，故需要监听重新渲染）
        },
    },
    methods: {
        getOptions(series) {
            //图例，需去重
            let legends = []
            //配置饼图格式
            series.forEach((item, index) => {
                item.type = 'pie'
                this.roseType && (item.roseType = this.roseType) //是否为南丁格尔玫瑰图及其格式
                item.label = {
                    //数据标签
                    show: this.label, //是否显示
                    textStyle: { fontSize: 10 },
                    position:
                        this.labelInsideCats &&
                        this.labelInsideCats.includes(item.name)
                            ? 'inside'
                            : 'outside', //标签显示在饼图内还是外
                    [this.labelFmt && 'formatter']:
                        this.labelFmt instanceof Array
                            ? this.labelFmt[index]
                            : this.labelFmt, //字符串模板
                }
                item.labelLine = {
                    normal: {
                        length: this.labelLineLength || 10, //标线引出线长度,默认10
                    },
                }
                item.itemStyle = {
                    emphasis: {
                        label: {
                            //高亮显示标签
                            show: true,
                            textStyle: {
                                fontSize: '15',
                                fontWeight: 'bold',
                            },
                        },
                    },
                }
                //饼图大小，考虑到嵌套饼图情况
                if (this.radius && this.radius[0] instanceof Array) {
                    item.radius = this.radius[index]
                    //设置内部饼图标签
                    if (
                        parseFloat(this.radius[0][1]) <
                        parseFloat(this.radius[1][0])
                    ) {
                        index == 0 && (item.label.position = 'inside')
                    } else {
                        index == 1 && (item.label.position = 'inside')
                    }
                } else {
                    item.radius = this.radius || '50%'
                }
                item.center = this.center || ['50%', '50%'] //饼图位置
                legends = legends.concat(item.data.map((item) => item.name)) //图例
                //默认选中的项目类型
                item.data.forEach((child) => {
                    this.selectedCats &&
                        this.selectedCats.includes(child.name) &&
                        (child.selected = true)
                })
            })

            //返回饼图配置项
            return {
                title: this.titleDIY || {
                    text: this.title,
                    ...(this.centerTitle && {
                        x: 'center',
                        y: 'center',
                        textStyle: {
                            fontSize: 15, //标题中间字体
                        },
                    }), //标题显示在中间
                },
                tooltip: {
                    //提示
                    trigger: 'item',
                    [this.tooltipFmt && 'formatter']: this.tooltipFmt,
                },
                legend: {
                    data: [...new Set(legends)], //去重
                    ...(this.legendOptions || { x: 'center', y2: 15 }),
                },
                [this.colors && 'color']: this.colors, //自定义颜色
                series, //数据赋值
            }
        },
    },
}
</script>