/*
 * @Description: 参数配置（工厂模式）
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-27 10:08:27
 * @LastEditTime: 2021-01-19 16:02:39
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
            valEnding: String, //值的结尾，比如"%"，默认为空
            xName: String, //x轴名，可有可无
            yName: String, //y轴名，可有可无
            barWidth: [String, Number], //柱粗（可以是百分比`20%`或数字20）
            stack: [Array, Boolean], //是否堆叠，堆叠的项目有哪些，stack为true时所有柱子都堆叠在一柱上，且不考虑堆叠的类型名
            horizontal: Boolean, //是否横向，声明即横向
            barBorderRadius: [Array, Number], //柱子是否圆角，可传数组或数字如30或[30,30,30,30]
            showDataZoom: Boolean, //显示滚动条
            dataZoomAxis: String, //滚动条映射的数据轴这里4个值：`y0,y1,x0,x1`
            dataZoomSplitType: String, //滚动条数据分隔方式:`index`按下标，`ratio`按比例
            dataZoomSplitScope: Array, //滚动条数据分隔范围，是2个值的数组：`[0,9]`,`[0,50]`,dataZoomSplitType按比例的话，范围为0-100，按下标的话，范围为0-(值的长度-1)
            colorMode: String, //  颜色展示模式(分为`byLegend`和`byAxis`)
            label: Boolean, //是否显示数据标签
            labelPosition: String, //数据标签位置,默认在柱子上方
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
            valEnding: '',
            xName: '',
            yName: '',
            barWidth: 10,
            labelPosition: 'top',
            colorMode: 'byLegend',
            stack: false,
            label: false,
            horizontal: false,
            barBorderRadius: 0,
            showValAxisLabel: true,
            showValAxisLine: true,
            showValSplitLine: true,
            showCatAxisLine: true,
            catLabelRowLen: 4,
            limitAxisMinVal: false,
            limitAxisMaxVal: false,
            axisScopeMin: 0,
            axisScopeMax: 100,
            showDataZoom: false,
            dataZoomAxis: 'x0',
            dataZoomSplitType: 'index',
            dataZoomSplitScope: [0, 9],
            showVisualMap: false,
            showMarkPoint: false,
            showMarkLine: false,
            showMarkArea: false,
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
