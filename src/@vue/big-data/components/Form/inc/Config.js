/*
 * @Description: 参数配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-01-21 17:35:49
 * @LastEditTime: 2021-01-22 18:21:25
 */

import { ObjVerify } from '../../../utils/myUtils'

class Config {
    constructor(options = {}) {
        const optionsTypeObj = {
            lastChangeTime: Number, //reset时间戳
            type: String, //表单类型，支持三种：text/select/date
            value: String, //表单值
            formKey: String, //表单字段
            placeholder: String, //表单提示内容
            formWidth: Number, //表单宽度，像素
            formHeight: Number, //表单高度，像素
            borderWidth: Number, //表单边框线宽，像素
            borderStyle: String, //表单边框类型，支持：solid/dashed/dotted/double/groove
            borderColor: String, //表单边框颜色
            selectOptions: Array, //下拉选项
            dateType: String, //日期格式，支持1-5
        }

        //类型验证
        ObjVerify(optionsTypeObj, options)

        //默认配置
        this.defaultOptions = {
            type: 'text',
            formKey: '',
            value: '',
            placeholder: '请输入...',
            formWidth: 150,
            formHeight: 30,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#333333',
            selectOptions: [],
            dateType: '1',
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
