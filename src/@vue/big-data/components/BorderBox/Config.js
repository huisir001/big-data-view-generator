/*
 * @Description: 边框参数配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-02-01 11:46:53
 * @LastEditTime: 2021-02-18 16:32:50
 */
import { ObjVerify } from '../../utils/myUtils'

class Config {
    constructor(options = {}) {
        const optionsTypeObj = {
            lastChangeTime: Number, //reset时间戳
            borderBoxId: String, //边框ID
            useDefaultColor: Boolean, //使用默认颜色
            colors: Array, //颜色
            bgColor: String, //背景色，默认透明
            reverse: Boolean, //翻转或反向动画
            transDur: Number, //单次动画时长,s
            titleWidth: Number, //标题框宽度
            title: String, //标题
        }

        //类型验证
        ObjVerify(optionsTypeObj, options)

        //默认配置
        this.defaultOptions = {
            borderBoxId: '1',
            useDefaultColor: true,
            colors: ['#6586ec', '#2cf7fe'],
            bgColor: 'rgba(0,0,0,0)',
            reverse: false,
            transDur: 3,
            titleWidth: 200,
            title: '',
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
