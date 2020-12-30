/*
 * @Description: 参数配置（工厂模式） Gauge
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-27 10:08:27
 * @LastEditTime: 2020-12-30 16:56:23
 */

import { ObjVerify } from '../../../../../utils/myUtils'
import mockData from './mockData'

class Config {
    constructor(options = {}) {
        const optionsTypeObj = {
            lastChangeTime: Number, //reset时间戳
            chartData: [Object, Array], //图表静态数据
            dynamicData: [Object, Array], //图表动态数据
            useApiData: Boolean, //使用接口请求的动态数据，默认使用静态数据
            apiReqUrl: String, //完整接口地址如`http://192.168.1.1/api/users`
            apiMethod: String, //这里只能为get或者post，默认get
            apiParam: Object, //请求传参，空为{}空对象
            apiResHandle: [String, Function], //数据处理，若为字符串，则为`(function(x){return xxx})`格式，传入请求结果，返回新的数据
            chartEvents: Array,
            //事件绑定，格式`[{event:"click",setQuery: false,query:{},callback:(e)=>{console.log(e)}},{event:"click",setQuery: true,query:"series",callback:(e)=>{console.log(e)}}]`,
            //其中的 query 可为 string 或者 Object，具体看echarts文档
            title: String, //标题，可为空
            titleSize: Number, //标题字号
            titleFontWeight: String, //标题粗细 bold/normal/bolder/lighter
            titleFontFamily: String, //标题字体
            titleColor: String, //标题颜色
            titlePosLeft: [String, Number], //标题左边距,
            titlePosTop: [String, Number], //标题上边距,
            titlePosRight: [String, Number], //标题右边距,
            titlePosBottom: [String, Number], //标题下边距,
            radius: String, //仪表盘大小（所占盒子的比例），默认为80%
            center: Array, //仪表盘位置，数组两个值分别为圆心的横向位置比和纵向位置比，默认为['50%', '60%']
            tooltipFmt: String, //提示框的字符串模板，如`{a} <br/>{b} : {c} ({d}%)`
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
            colors: Array, //表盘分段及颜色
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
            showAxisLabel: Boolean, //是否显示刻度值
            axisLabelSize: Number, //刻度值字号
            axisLabelStyle: String, //刻度值字体样式  normal/italic
            axisLabelWeight: String, //刻度值字体粗细 bold/normal/bolder/lighter
            axisLabelFmt: String, //刻度值模板，默认`{value}`
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
        //若未传options参数，这里不验证，直接给默认值
        const optionsLen = Object.keys(options).length
        if (optionsLen > 0) {
            if (options.useApiData && !options.apiReqUrl) {
                throw new Error(
                    'Lack of data, Please send "apiReqUrl" in parent component.'
                )
            }
            if (!options.useApiData && !options.chartData) {
                throw new Error(
                    'Lack of data, Please send "chartData" in parent component.'
                )
            }
        }

        //默认配置
        this.defaultOptions = {
            [optionsLen == 0 && 'chartData']: mockData, //没有配置项时给一个预览数据
            useApiData: false,
            apiMethod: 'get',
            apiParam: {},
            apiResHandle: function (res) {
                console.log(res)
                return res
            },
            chartEvents: [],
            tooltipFmt: '{a} <br/>{b}: {c} ({d}%)',
            titleSize: 10,
            titleFontWeight: 'bold', //标题粗细
            titleFontFamily: 'Microsoft YaHei', //标题字体
            titleColor: '#ffffff', //标题颜色
            titlePosLeft: 'center',
            titlePosTop: 'bottom',
            titlePosRight: 'auto',
            titlePosBottom: 'auto',
            radius: '80%',
            center: ['50%', '60%'],
            tooltipFmt: '{a} <br/>{b} : {c} ({d}%)',
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
            showAxisLabel: true,
            axisLabelSize: 12,
            axisLabelStyle: 'normal',
            axisLabelWeight: 'normal',
            axisLabelFmt: '{value}',
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
