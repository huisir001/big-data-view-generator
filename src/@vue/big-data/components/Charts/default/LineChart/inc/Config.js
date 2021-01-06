/*
 * @Description: 参数配置（工厂模式） line
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-27 10:08:27
 * @LastEditTime: 2021-01-06 16:25:44
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
            title: String, //标题，可有可无,若没有则为""
            titleSize: Number, //标题字号
            titleFontWeight: String, //标题粗细 bold/normal/bolder/lighter
            titleFontFamily: String, //标题字体
            titleColor: String, //标题颜色
            titlePosLeft: [String, Number], //标题左边距,
            titlePosTop: [String, Number], //标题上边距,
            titlePosRight: [String, Number], //标题右边距,
            titlePosBottom: [String, Number], //标题下边距,
            valEnding: String, //值的结尾，比如"%"，默认为空
            xName: String, //x轴名，可有可无
            yName: String, //y轴名，可有可无
            left: [String, Number], //左边距
            top: [String, Number], //上边距
            right: [String, Number], //右边距
            bottom: [String, Number], //下边距
            showLegend: Boolean, //显示图例
            legendPosLeft: [String, Number], //图例左边距,可以为数字像素，也可以为字符串`center/left/right`
            legendPosTop: [String, Number], //图例上边距,可以为数字像素，也可以为字符串`center/top/bottom`
            legendPosRight: [String, Number], //图例右边距
            legendPosBottom: [String, Number], //图例下边距
            legendOrient: String, //图例布局 vertical/horizontal 默认horizontal
            legendFontColor: String, //图例字体颜色
            legendFontWeight: String, //图例字体粗细 bold/normal/bolder/lighter
            legendFontSize: Number, //图例字号
            legendItemWidth: Number, //图例图标宽
            legendItemHeight: Number, //图例图标高
            legendItemGap: Number, //图例项目间隔
            horizontal: Boolean, //是否横向，声明即横向
            showDataZoom: Boolean, //显示滚动条
            dataZoomAxis: String, //滚动条映射的数据轴这里4个值：`y0,y1,x0,x1`
            dataZoomSplitType: String, //滚动条数据分隔方式:`index`按下标，`ratio`按比例
            dataZoomSplitScope: Array, //滚动条数据分隔范围，是2个值的数组：`[0,9]`,`[0,50]`,dataZoomSplitType按比例的话，范围为0-100，按下标的话，范围为0-(值的长度-1)
            boundaryGap: Boolean, //数据轴上是否取点，申明即不取，默认取点
            smooth: Boolean, //是否平滑曲线（申明即平滑）
            areaFill: Boolean, //区域是否填充-面积图
            areaStyle: Object, //区域填充自定义
            stack: Boolean, //是否堆积-此参数配合areaStyle实现堆积面积图，单用此参无意义（申明即堆积）
            colors: Array, //自定义颜色
            label: Boolean, //是否显示数据标签
            labelPosition: String, //数据标签位置,默认在上方
            limitAxisMinVal: Boolean, //是否限制刻度最小值
            limitAxisMaxVal: Boolean, //是否限制刻度最大值
            axisScopeMin: Number, //数据轴刻度范围最小值
            axisScopeMax: Number, //数据轴刻度范围最大值
            showValAxisLabel: Boolean, //显示数据轴刻度
            showValAxisLine: Boolean, //显示数据轴轴线
            showValSplitLine: Boolean, //显示数据轴刻度分隔线
            showCatAxisLine: Boolean, //显示类型轴轴线
            catLabelRowLen: Number, //类型轴类型名称每行字数（多少字换行）
            showVisualMap: Boolean, //是否显示视觉映射
            visualMap: Object, //视觉映射（改变某些数据区域的颜色）
            showMarkPoint: Boolean, //显示标注
            showMarkLine: Boolean, //显示标线
            showMarkArea: Boolean, //显示标域
            markPoint: Object, //气泡标注
            markLine: Object, //标线
            markArea: Object, //标域
            lineWidth: Number, //线宽
            lineType: String, //线型 solid\dashed\dotted
            showShadow: Boolean, //显示阴影
            shadowBlur: Number, //线条阴影模糊尺寸
            shadowColor: String, //阴影色
            shadowOffsetX: Number, //阴影水平偏移
            shadowOffsetY: Number, //阴影垂直偏移
            opacity: Number, //透明度 0-1
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
            titleSize: 10,
            titleFontWeight: 'bold', //标题粗细
            titleFontFamily: 'Microsoft YaHei', //标题字体
            titleColor: '#ffffff', //标题颜色
            titlePosLeft: 'center',
            titlePosTop: 'bottom',
            titlePosRight: 'auto',
            titlePosBottom: 'auto',
            valEnding: '',
            xName: '',
            yName: '',
            labelPosition: 'top',
            showLegend: true,
            legendPosLeft: 'center',
            legendPosTop: 35,
            legendPosRight: 'auto',
            legendPosBottom: 'auto',
            legendOrient: 'horizontal',
            legendFontColor: '#ddd',
            legendFontWeight: 'normal',
            legendFontSize: 10,
            legendItemWidth: 18,
            legendItemHeight: 12,
            legendItemGap: 14,
            areaFill: false,
            areaStyle: { type: 'default' },
            stack: false,
            label: false,
            horizontal: false,
            limitAxisMinVal: false,
            limitAxisMaxVal: false,
            axisScopeMin: 0,
            axisScopeMax: 100,
            boundaryGap: false,
            smooth: false,
            showValAxisLabel: true,
            showValAxisLine: true,
            showValSplitLine: true,
            showCatAxisLine: true,
            catLabelRowLen: 4,
            showDataZoom: false,
            dataZoomAxis: 'x0',
            dataZoomSplitType: 'index',
            dataZoomSplitScope: [0, 9],
            showVisualMap: false,
            showMarkPoint: false,
            showMarkLine: false,
            showMarkArea: false,
            lineWidth: 2,
            lineType: 'solid',
            opacity: 1,
            showShadow: false,
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
