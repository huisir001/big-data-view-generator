/*
 * @Description: 参数配置（工厂模式） RadarChart
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-27 10:08:27
 * @LastEditTime: 2021-01-19 15:58:46
 */
import {
    commonChartTypes,
    legendTypes,
    commonDefaultVal,
    legendDefaultVal,
    chartDataVerify,
} from '../../../../../mixins/chartConfig'
import { ObjVerify } from '../../../../../utils/myUtils'
import mockData from './mockData'

class Config {
    constructor(options = {}) {
        const optionsTypeObj = {
            ...commonChartTypes,
            ...legendTypes,
            radius: [String, Number], //雷达图大小，默认为60%，若为数字，则为像素尺寸
            center: Array, //雷达图位置，数组两个值分别为圆心的横向位置比和纵向位置比，默认为默认['50%', '55%']
            max: Number, //最大值
            min: Number, //最小值
            maxValOffset: Number, //雷达图最大值偏移量，默认10
            showAxisLabel: Boolean, //是否显示刻度值
            axisLabelColor: String, //刻度值颜色
            axisLabelSize: Number, //刻度值字号
            splitNumber: Number, //分隔线数量
            radarType: String, //底盘形状polygon、circle
            startAngle: Number, //起始角度
            areaOpacity: Number, //区域填充透明度，默认为0，范围为0-1
            label: Boolean, //是否显示数据标签
            labelPosition: String, //标签位置，支持：top/left/right/bottom/inside/insideLeft/insideRight/insideTop/insideBottom/insideTopLeft/insideBottomLeft/insideTopRight/insideBottomRight
            labelFmt: String, //数据标注的字符串模板，如`{a} {b}: {c}`，
            labelSize: Number, //标注字号
            showAxisLine: Boolean, //是否显示轴线
            axisLineColor: String, //轴线颜色
            axisLineWidth: Number, //轴线宽
            axisLineType: String, //轴线类型 solid/dotted/dashed
            showSplitLine: Boolean, //是否显示分隔线
            splitLineColor: [String, Array], //分隔线颜色，数组为每条分割线各自颜色
            splitLineWidth: Number, //分隔线宽
            splitLineType: String, //分隔线类型 solid/dotted/dashed
            showSplitArea: Boolean, //是否显示分隔区
            splitAreaColorAuto: Boolean, //分隔区颜色自适应
            splitAreaColor: [String, Array], //自定义分隔区颜色，数组为每个分割区各自颜色
            showCatName: Boolean, //显示指示器名称
            catNameFmt: String, //指示器名称模板'{value}'
            catNameColor: String, //指示器名称颜色
            catNameSize: Number, //指示器名称字号
            nameGap: Number, //指示器名称和轴之间距离
        }

        //类型验证
        ObjVerify(optionsTypeObj, options)

        //数据为必传项，这里验证一下(当父组件传options参数的时候)
        const optionsLen = chartDataVerify(options)

        //默认配置
        this.defaultOptions = {
            ...commonDefaultVal,
            ...legendDefaultVal,
            [optionsLen == 0 && 'chartData']: mockData, //没有配置项时给一个预览数据
            legendPosLeft: 'right',
            legendPosTop: 'bottom',
            legendOrient: 'vertical',
            radius: '50%',
            center: ['50%', '55%'],
            min: 0,
            maxValOffset: 10,
            splitNumber: 4,
            radarType: 'polygon',
            startAngle: 90, //起始角度
            areaOpacity: 0,
            label: false,
            labelPosition: 'inside',
            labelFmt: '{c}',
            labelSize: 10,
            showAxisLine: true,
            axisLineColor: '#babab2',
            axisLineWidth: 1,
            axisLineType: 'solid',
            showSplitLine: true,
            splitLineColor: '#babab2',
            splitLineWidth: 1,
            splitLineType: 'solid',
            showSplitArea: true,
            splitAreaColorAuto: true,
            showAxisLabel: false,
            axisLabelColor: '#ffaa00',
            axisLabelSize: 10,
            showCatName: true,
            catNameFmt: '{value}',
            catNameColor: '#fff',
            catNameSize: 10,
            nameGap: 10,
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
