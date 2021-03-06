/*
 * @Description: 参数配置（工厂模式） Gauge
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-27 10:08:27
 * @LastEditTime: 2021-01-19 15:58:06
 */
import {
    commonChartTypes,
    commonDefaultVal,
    chartDataVerify,
} from '../../../../../mixins/chartConfig'
import { ObjVerify } from '../../../../../utils/myUtils'
import mockData from './mockData'

class Config {
    constructor(options = {}) {
        const optionsTypeObj = {
            ...commonChartTypes,
            radius: [String, Number], //仪表盘大小（字符串为所占盒子的比例），默认为80%，数字类型为像素
            center: Array, //仪表盘位置，数组两个值分别为圆心的横向位置比和纵向位置比，默认为['50%', '60%']
            startAngle: Number, //表盘开始角度（单位为度数）
            endAngle: Number, //表盘结束角度
            min: Number, //最小刻度
            max: Number, //最大刻度
            splitNumber: Number, //表盘分割段数
            clockwise: Boolean, //刻度是否按顺时针，默认为顺时针
            showAxis: Boolean, //是否显示表盘
            axisWidth: [Number, String], //表盘宽度 默认30，可为数字或百分比
            axisShadowBlur: Number, //表盘阴影模糊度
            axisShadowColor: String, //表盘阴影色
            axisShadowOffsetX: Number, //表盘阴影横向偏移
            axisShadowOffsetY: Number, //表盘阴影纵向偏移
            showDialTitle: Boolean, //表盘内部标题显隐，默认显示
            dialTitleCenter: Array, //盘内标题位置,如[0,40],可以为数字数组，也可以为百分比字符串
            dialTitleSize: Number, //盘内标题字号
            dialTitleWeight: String, //盘内标题粗细 bold/normal/bolder/lighter
            dialTitleColor: String, //盘内标题颜色
            showDetail: Boolean, //是否显示数据值
            detailFmt: String, //数据值模板，默认`{value}%`
            detailCenter: Array, //数据值位置，可以为数字数组，也可以为百分比字符串
            detailSize: Number, //数据值字号
            detailFontWeight: String, //数据值字体粗细 bold/normal/bolder/lighter
            detailColorAuto: Boolean, //数据值颜色自适应
            detailColor: String, //自定义数据值颜色
            showAxisLabel: Boolean, //是否显示刻度值
            axisLabelSize: Number, //刻度值字号
            axisLabelStyle: String, //刻度值字体样式  normal/italic
            axisLabelWeight: String, //刻度值字体粗细 bold/normal/bolder/lighter
            axisLabelFmt: String, //刻度值模板，默认`{value}`
            axisLabelColorAuto: Boolean, //刻度值颜色是否自适应
            axisLabelColor: String, //自定义刻度值颜色
            showAxisTick: Boolean, //是否显示刻度线（非表盘分割线）
            axisTickType: String, //刻度线类型 solid/dotted/dashed
            axisTickWidth: Number, //刻度线线宽
            axisTickLength: Number, //刻度线线长
            axisTickSplitNum: Number, //刻度线分隔数（细分，非表盘分割数）
            showSplitLine: Boolean, //是否显示表盘分隔线
            splitLineLength: Number, //表盘分隔线线长
            splitLineWidth: Number, //表盘分隔线线宽
            splitLineType: String, //表盘分隔线类型 solid/dotted/dashed
            pointerLength: [Number, String], //指针长度，可为数字或百分比
            pointerWidth: Number, //指针宽度
            pointerColorAuto: Boolean, //指针颜色是否自适应，默认自适应为所在的区间的颜色
            pointerColor: String, //自定义指针颜色
            pointerOpacity: Number, //指针透明度 0-1
            pointerBorderColor: String, //指针描边色
            pointerBorderWidth: Number, //指针描边宽
            pointerBorderType: String, //指针描边线型 solid/dotted/dashed
        }

        //类型验证
        ObjVerify(optionsTypeObj, options)

        //数据为必传项，这里验证一下(当父组件传options参数的时候)
        const optionsLen = chartDataVerify(options)

        //默认配置
        this.defaultOptions = {
            ...commonDefaultVal,
            [optionsLen == 0 && 'chartData']: mockData, //没有配置项时给一个预览数据
            radius: '100%',
            center: ['50%', '60%'],
            startAngle: 225,
            endAngle: -45,
            min: 0,
            max: 100,
            splitNumber: 5,
            clockwise: true,
            showAxis: true,
            axisWidth: 30,
            axisShadowBlur: 0,
            axisShadowColor: '#ffffff',
            axisShadowOffsetX: 0,
            axisShadowOffsetY: 0,
            showDialTitle: true,
            dialTitleCenter: [0, -40],
            dialTitleSize: 15,
            dialTitleWeight: 'normal',
            dialTitleColor: '#ffffff',
            showDetail: true,
            detailFmt: '{value}%',
            detailCenter: [0, 45],
            detailSize: 30,
            detailFontWeight: 'normal',
            detailColorAuto: true,
            detailColor: '#ffffff',
            showAxisLabel: true,
            axisLabelSize: 12,
            axisLabelStyle: 'normal',
            axisLabelWeight: 'normal',
            axisLabelFmt: '{value}',
            axisLabelColorAuto: true,
            axisLabelColor: '#ffffff',
            showAxisTick: true,
            axisTickType: 'solid',
            axisTickWidth: 1,
            axisTickLength: 10,
            axisTickSplitNum: 5,
            showSplitLine: true,
            splitLineLength: 30,
            splitLineWidth: 2,
            splitLineType: 'solid',
            pointerLength: '70%',
            pointerWidth: 8,
            pointerColorAuto: true,
            pointerColor: '#ff4500',
            pointerOpacity: 1,
            pointerBorderColor: '#ffffff',
            pointerBorderWidth: 0,
            pointerBorderType: 'solid',
        }

        this.options = Object.assign(this.defaultOptions, options)
    }

    /* 获取配置项 */
    static getOptions(options) {
        return new Config(options).options
    }

    /* 获取默认配置项 */
    static getDefaultOptions() {
        return new Config().defaultOptions
    }
}

export default Config
