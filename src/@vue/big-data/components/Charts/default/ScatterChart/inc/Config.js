/*
 * @Description: 参数配置（工厂模式） 浮点图
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-27 10:08:27
 * @LastEditTime: 2021-01-19 15:51:49
 */
import {
    commonChartTypes,
    positionTypes,
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
            ...positionTypes,
            ...legendTypes,
            showxAxisLabel: Boolean, //显示X轴标签
            showyAxisLabel: Boolean, //显示Y轴标签
            showxAxisLine: Boolean, //显示x轴线
            showxSplitLine: Boolean, //显示x轴分隔线
            showyAxisLine: Boolean, //显示y轴线
            showySplitLine: Boolean, //显示y轴分割线
            limitxAxisMinVal: Boolean, //限制x轴最小刻度
            limitxAxisMaxVal: Boolean, //限制x轴最大刻度
            limityAxisMinVal: Boolean, //限制y轴最小刻度
            limityAxisMaxVal: Boolean, //限制y轴最大刻度
            xAxisScopeMin: Number, //x轴刻度范围最小值
            xAxisScopeMax: Number, //x轴刻度范围最大值
            yAxisScopeMin: Number, //y轴刻度范围最小值
            yAxisScopeMax: Number, //y轴刻度范围最大值
            xAxisLabelFmt: String, //x轴标签模板
            yAxisLabelFmt: String, //y轴标签模板
            xName: String, //x轴名，可有可无
            yName: String, //y轴名，可有可无
            showDataZoom: Boolean, //显示滚动条
            dataZoomAxis: String, //滚动条映射的数据轴这里4个值：`y0,y1,x0,x1`
            dataZoomSplitType: String, //滚动条数据分隔方式:`index`按下标，`ratio`按比例
            dataZoomSplitScope: Array, //滚动条数据分隔范围，是2个值的数组：`[0,9]`,`[0,50]`,dataZoomSplitType按比例的话，范围为0-100，按下标的话，范围为0-(值的长度-1)
            showVisualMap: Boolean, //是否显示视觉映射
            visualMap: Object, //视觉映射（改变某些数据区域的颜色）
            showMarkPoint: Boolean, //显示标注
            showMarkLine: Boolean, //显示标线
            showMarkArea: Boolean, //显示标域
            markPoint: Object, //气泡标注
            markLine: Object, //标线
            markArea: Object, //标域
            label: Boolean, //是否显示数据标签
            labelPosition: String, //标签位置，支持：top/left/right/bottom/inside/insideLeft/insideRight/insideTop/insideBottom/insideTopLeft/insideBottomLeft/insideTopRight/insideBottomRight
            labelFmt: String, //数据标注的字符串模板，如`{a} {b}: {c}`，
            labelSize: Number, //标注字号
            symbolSize: Number, //浮点尺寸 默认10
            isBubble: Boolean, //是否为气泡图
            minBubbleSize: Number, //气泡最小半径
            maxBubbleSize: Number, //气泡最大半径
            symbolType: [String, Array], //浮点标志类型
            showShadow: Boolean, //显示浮点阴影
            shadowBlur: Number, //浮点阴影模糊尺寸
            shadowColor: String, //浮点阴影色
            shadowOffsetX: Number, //浮点阴影水平偏移
            shadowOffsetY: Number, //浮点阴影垂直偏移
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
            showxAxisLabel: true,
            showyAxisLabel: true,
            showxAxisLine: true,
            showxSplitLine: true,
            showyAxisLine: true,
            showySplitLine: true,
            limitxAxisMinVal: false,
            limitxAxisMaxVal: false,
            limityAxisMinVal: false,
            limityAxisMaxVal: false,
            xAxisScopeMin: 0,
            yAxisScopeMin: 0,
            xAxisLabelFmt: '{value}',
            yAxisLabelFmt: '{value}',
            showDataZoom: false,
            dataZoomAxis: 'x0',
            dataZoomSplitType: 'index',
            dataZoomSplitScope: [0, 9],
            showVisualMap: false,
            showMarkPoint: false,
            showMarkLine: false,
            showMarkArea: false,
            label: false,
            labelPosition: 'top',
            labelFmt: '{c}',
            labelSize: 10,
            symbolSize: 10,
            isBubble: false,
            minBubbleSize: 3,
            maxBubbleSize: 15,
            symbolType: '',
            showShadow: false,
            shadowBlur: 15,
            shadowColor: 'rgba(255, 255, 255, 0.5)',
            shadowOffsetX: 3,
            shadowOffsetY: 5,
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
