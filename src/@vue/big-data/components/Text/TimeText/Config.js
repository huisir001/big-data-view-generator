/*
 * @Description: 时间文本配置项
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-02-08 14:39:25
 * @LastEditTime: 2021-02-08 16:17:21
 */
import { ObjVerify } from '../../../utils/myUtils'
import { compDataVerify } from '../../../mixins/baseCompConfig'

class Config {
    constructor(options = {}) {
        const optionsTypeObj = {
            lastChangeTime: Number, //reset时间戳
            timeFormat: String, //日期格式
            isHtml: Boolean, //是否含HTML标签
            openTimingRefresh: Boolean, //开启定时刷新
            refreshPeriod: Number, //刷新周期，单位秒
            fontSize: Number, //字号
            fontColor: String, //文字颜色
            fontWeight: String, //字粗:bold/bolder/normal/lighter
            wordSpacing: Number, //文字间距
            fontFamily: String, //字体类型
            textDecoration: String, //文字修饰:line-through/underline/none
            textAlign: String, //字体排版位置:left/center/right/unset
            background: String, //背景
            showTextShadow: Boolean, //显示文字阴影
            textShadowColor: String, //文字阴影色
            textShadowBlur: Number, //文字阴模糊度,单位px
            textShadowOffsetX: Number, //文字阴影横向偏移,单位px
            textShadowOffsetY: Number, //文字阴影纵向偏移,单位px
        }

        //类型验证
        ObjVerify(optionsTypeObj, options)

        //数据为必传项，这里验证一下(当父组件传options参数的时候)
        const OptionsLen = compDataVerify(options, ['timeFormat'])
        const _data =
            OptionsLen > 0 ? {} : { timeFormat: 'yyyy-MM-dd hh:mm:ss' }

        //默认配置
        this.defaultOptions = {
            ..._data,
            isHtml: false,
            openTimingRefresh: false,
            refreshPeriod: 1,
            fontFamily: 'auto',
            fontSize: 15,
            fontColor: '#cccccc',
            fontWeight: 'normal',
            wordSpacing: 2,
            textDecoration: 'none',
            textAlign: 'unset',
            background: 'rgba(255,255,255,0)',
            showTextShadow: false,
            textShadowColor: '#000000',
            textShadowBlur: 3,
            textShadowOffsetX: 2,
            textShadowOffsetY: 2,
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
