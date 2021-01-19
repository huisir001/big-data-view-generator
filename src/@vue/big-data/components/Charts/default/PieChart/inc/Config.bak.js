/*
 * @Description: 参数配置（工厂模式） pie
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-27 10:08:27
 * @LastEditTime: 2021-01-19 10:39:06
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
            openTimingRefresh: Boolean, //开启定时刷新
            refreshPeriod: Number, //刷新周期，单位秒
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
            colors: Array, //自定义颜色
            radius: [String, Array], //饼图大小（所占盒子的比例），默认为50%，若为数组，则为环饼图尺寸
            center: Array, //饼图位置，数组两个值分别为圆心的横向位置比和纵向位置比，默认为["50%","50%"]
            label: Boolean, //是否显示数据标签（申明即填充）
            labelPosition: [String, Array], //标签位置inside\outside 如果为嵌套饼图可传数组
            labelFmt: [String, Array], //数据标注的字符串模板，如`{b}: {c} ({d}%)`，如果为多个类型(嵌套图)，可传数组
            labelSize: [Number, Array], //标注字号，如果为嵌套饼图可传数组
            tooltipFmt: String, //提示框的字符串模板，如`{a} <br/>{b} : {c} ({d}%)`
            showLegend: Boolean, //显示图例
            legendPosLeft: [String, Number], //图例左边距
            legendPosTop: [String, Number], //图例上边距
            legendPosRight: [String, Number], //图例右边距
            legendPosBottom: [String, Number], //图例下边距
            legendOrient: String, //图例布局 vertical/horizontal 默认horizontal
            legendFontColor: String, //图例字体颜色
            legendFontWeight: String, //图例字体粗细 bold/normal/bolder/lighter
            legendFontSize: Number, //图例字号
            legendItemWidth: Number, //图例图标宽
            legendItemHeight: Number, //图例图标高
            legendItemGap: Number, //图例项目间隔
            selectedCats: [String, Array], //默认选中的项目类型（可以是逗号分隔字符串）
            roseType: [Boolean, String], //是否为南丁格尔玫瑰图及其格式,默认为false
            labelLineLength: Number, //标线引出线长度
            selectedMode: [Boolean, String], //扇形选中模式，默认为false,可选multiple、single
            borderColor: String, //扇形描边颜色
            borderWidth: Number, //扇形描边宽度
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
            openTimingRefresh: false,
            refreshPeriod: 3,
            chartEvents: [],
            showLegend: true,
            labelPosition: 'outside',
            tooltipFmt: '{a} <br/>{b}: {c} ({d}%)',
            label: false,
            labelSize: 10,
            roseType: false,
            selectedMode: false,
            borderColor: 'rgba(255,255,255,0)',
            borderWidth: 0,
            selectedCats: [],
            titleSize: 10,
            titleFontWeight: 'bold', //标题粗细
            titleFontFamily: 'Microsoft YaHei', //标题字体
            titleColor: '#ffffff', //标题颜色
            titlePosLeft: 'center',
            titlePosTop: 'bottom',
            titlePosRight: 'auto',
            titlePosBottom: 'auto',
            legendPosLeft: 'center',
            legendPosTop: 'bottom',
            legendPosRight: 'auto',
            legendPosBottom: 'auto',
            legendOrient: 'horizontal',
            legendFontColor: '#ddd',
            legendFontWeight: 'normal',
            legendFontSize: 10,
            legendItemWidth: 18,
            legendItemHeight: 12,
            legendItemGap: 14,
            labelLineLength: 10,
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
