/*
 * @Description: 参数配置（工厂模式） pie
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-27 10:08:27
 * @LastEditTime: 2021-01-19 15:37:30
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
            radius: [String, Array], //饼图大小（所占盒子的比例），默认为50%，若为数组，则为环饼图尺寸
            center: Array, //饼图位置，数组两个值分别为圆心的横向位置比和纵向位置比，默认为["50%","50%"]
            label: Boolean, //是否显示数据标签（申明即填充）
            labelPosition: [String, Array], //标签位置inside\outside 如果为嵌套饼图可传数组
            labelFmt: [String, Array], //数据标注的字符串模板，如`{b}: {c} ({d}%)`，如果为多个类型(嵌套图)，可传数组
            labelSize: [Number, Array], //标注字号，如果为嵌套饼图可传数组
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
        const optionsLen = chartDataVerify(options)

        //默认配置
        this.defaultOptions = {
            ...commonDefaultVal,
            ...legendDefaultVal,
            [optionsLen == 0 && 'chartData']: mockData, //没有配置项时给一个预览数据
            labelPosition: 'outside',
            label: false,
            labelSize: 10,
            roseType: false,
            selectedMode: false,
            borderColor: 'rgba(255,255,255,0)',
            borderWidth: 0,
            selectedCats: [],
            labelLineLength: 10,
            legendPosTop: 'bottom',
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
