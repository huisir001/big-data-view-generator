/*
 * @Description: 基础文本参数配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-02-05 15:33:56
 * @LastEditTime: 2021-02-05 16:23:36
 */
import { ObjVerify } from '../../../utils/myUtils'
import { commonTypes, commonDefaultVal } from '../../../mixins/baseCompConfig'

class Config {
    constructor(options = {}) {
        const optionsTypeObj = {
            ...commonTypes,
            isHtml: Boolean, //是否含HTML标签
            isLink: Boolean, //是否添加超链接
            href: String, //跳转链接（带http://前缀,也可以为`javascript:`代码）
            target: String, //跳转方式:_blank/_self/_parent/_top/framename(指定iframe)
            fontSize: Number, //字号
            fontColor: String, //文字颜色
            fontWeight: String, //字粗:bold/bolder/normal/lighter
            fontFamily: String, //字体类型
            textDecoration: String, //文字修饰:line-through/underline/none
            textIndent: Number, //缩进 单位em
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

        //默认配置
        this.defaultOptions = {
            ...commonDefaultVal,
            isHtml: false,
            isLink: false,
            href: '',
            target: '_blank',
            fontSize: 15,
            fontColor: '#cccccc',
            fontWeight: 'normal',
            textDecoration: 'none',
            textIndent: 0,
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
