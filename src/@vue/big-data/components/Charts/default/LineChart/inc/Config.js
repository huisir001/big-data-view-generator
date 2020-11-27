/*
 * @Description: 参数配置（工厂模式） line
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-27 10:08:27
 * @LastEditTime: 2020-11-27 11:23:01
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
            title: String, //标题，可有可无,若没有则为""
            valEnding: String, //值的结尾，比如"%"，默认为空
            xName: String, //x轴名，可有可无
            yName: String, //y轴名，可有可无
            left: [String, Number], //左边距
            top: [String, Number], //上边距
            right: [String, Number], //右边距
            bottom: [String, Number], //下边距
            showLegend: Boolean, //显示图例
            horizontal: Boolean, //是否横向，声明即横向
            dataZoom: Object, //数据缩放滚动条
            markPoint: Object, //气泡标注
            markLine: Object, //标线
            markArea: Object, //标域
            boundaryGap: Boolean, //数据轴上是否取点，申明即不取，默认取点
            smooth: Boolean, //是否平滑曲线（申明即平滑）
            lineStyle: Object, //线条样式
            areaStyle: [String, Boolean, Object], //区域是否填充-面积图（申明即填充，这里为填充默认色，支持自定义）
            stack: Boolean, //是否堆积-此参数配合areaStyle实现堆积面积图，单用此参无意义（申明即堆积）
            colors: Array, //自定义颜色
            label: Boolean, //是否显示数据标签
            labelPosition: String, //数据标签位置,默认在上方
            visualMap: Object, //视觉映射（改变某些数据区域的颜色）
            limitAxisMinVal: Boolean, //是否限制刻度最小值
            limitAxisMaxVal: Boolean, //是否限制刻度最大值
            axisScopeMin: Number, //数据轴刻度范围最小值
            axisScopeMax: Number, //数据轴刻度范围最大值
            showValAxisLabel: Boolean, //显示数据轴刻度
            showValAxisLine: Boolean, //显示数据轴轴线
            showValSplitLine: Boolean, //显示数据轴刻度分隔线
            showCatAxisLine: Boolean, //显示类型轴轴线
            catLabelRowLen: Number, //类型轴类型名称每行字数（多少字换行）
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
            valEnding: '',
            xName: '',
            yName: '',
            labelPosition: 'top',
            showLegend: true,
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
