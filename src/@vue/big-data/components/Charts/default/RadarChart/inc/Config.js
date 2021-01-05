/*
 * @Description: 参数配置（工厂模式） RadarChart
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-27 10:08:27
 * @LastEditTime: 2021-01-05 18:11:37
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
            title: String, //标题，可有可无
            titleSize: Number, //标题字号
            titleFontWeight: String, //标题粗细 bold/normal/bolder/lighter
            titleFontFamily: String, //标题字体
            titleColor: String, //标题颜色
            titlePosLeft: [String, Number], //标题左边距,
            titlePosTop: [String, Number], //标题上边距,
            titlePosRight: [String, Number], //标题右边距,
            titlePosBottom: [String, Number], //标题下边距,
            tooltipFmt: String, //提示框的字符串模板，如`{a} <br/>{b} : {c} ({d}%)`
            showLegend: Boolean, //显示图例
            legendPosLeft: [String, Number], //图例左边距
            legendPosTop: [String, Number], //图例上边距
            legendPosRight: [String, Number], //图例右边距
            legendPosBottom: [String, Number], //图例下边距
            legendOrient: String, //图例布局 vertical/horizontal 默认horizontal
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
            colors: Array, //自定义颜色
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
            showLegend: true,
            legendPosLeft: 'center',
            legendPosTop: 'bottom',
            legendPosRight: 'auto',
            legendPosBottom: 'auto',
            legendOrient: 'horizontal',
            radius: '60%',
            center: ['50%', '55%'],
            min: 0,
            maxValOffset: 10,
            splitNumber: 4,
            radarType: 'polygon',
            startAngle: 0, //起始角度
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
            splitAreaColor: [
                'rgba(255,255,255,.2)',
                'rgba(255,255,255,.1)',
                'rgba(255,255,255,.2)',
                'rgba(255,255,255,.1)',
            ],
            showAxisLabel: false,
            axisLabelColor: '#ffaa00',
            axisLabelSize: 10,
            showCatName: true,
            catNameFmt: '{value}',
            catNameColor: '#333',
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
