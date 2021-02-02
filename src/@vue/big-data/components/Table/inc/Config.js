/*
 * @Description: 表格参数配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-02-01 11:46:53
 * @LastEditTime: 2021-02-02 18:48:54
 */
import { ObjVerify } from '../../../utils/myUtils'
import { tableColsMock, compDataMock } from './mockData'
import {
    commonTypes,
    commonDefaultVal,
    compDataVerify,
} from '../../../mixins/baseCompConfig'

class Config {
    constructor(options = {}) {
        const optionsTypeObj = {
            ...commonTypes,
            tableCols: Array, //表格字段配置
            tableData: Array, //表格静态数据
            nowrap: Boolean, //是否不允许换行，默认不换行true
            tableLayoutAuto: Boolean, //是否自动布局，默认自动，若非自动布局（自动宽度），则根据每个字段自定义的宽度布局
            cellCentered: Boolean, //单元格居中，默认不居中（居左）
            thHeight: Number, //表头行高
            tdHeight: Number, //表体行高
            thBgColor: String, //表头背景颜色
            tdOddBgColor: String, //奇数行背景颜色
            tdEvenBgColor: String, //偶数行背景颜色
            thFontColor: String, //表头文字颜色
            tdFontColor: String, //表体文字颜色
            thFontSize: Number, //表头文字大小
            tdFontSize: Number, //表体文字大小
            showTableOutBorder: Boolean, //显示表格外边框
            tableOutBorderWidth: Number, //表格外边框线宽
            tableOutBorderStyle: String, //表格外边框线型 solid/dashed/dotted/double/groove
            tableOutBorderColor: String, //表格外边框颜色
            showTableCelBorder: Boolean, //显示单元格边框
            tableCelBorderWidth: Number, //单元格边框线宽
            tableCelBorderStyle: String, //单元格边框线型 solid/dashed/dotted/double/groove
            tableCelBorderColor: String, //单元格边框颜色
            showPage: Boolean, //开启分页
            itemsPerPage: Number, //每页条数
            pageNavAlign: String, //页码位置left/center/right
            pageNavStyle: String, //页面样式select/button
            pageNavFontSize: Number, //页码文字大小
            pageNavFontColor: String, //页码文字颜色
        }

        //类型验证
        ObjVerify(optionsTypeObj, options)

        //数据为必传项，这里验证一下(当父组件传options参数的时候)
        const OptionsLen = compDataVerify(options, ['compData', 'tableCols'])
        const TableData =
            OptionsLen > 0
                ? {}
                : {
                      tableCols: tableColsMock,
                      compData: compDataMock,
                  }

        //默认配置
        this.defaultOptions = {
            ...commonDefaultVal,
            ...TableData,
            nowrap: true,
            tableLayoutAuto: true,
            cellCentered: false,
            thHeight: 40,
            tdHeight: 40,
            thBgColor: '#7cc3fd',
            tdOddBgColor: '#e9f5ff',
            tdEvenBgColor: '#fafaeb',
            thFontColor: '#ffffff',
            tdFontColor: '#444444',
            thFontSize: 13,
            tdFontSize: 12,
            showTableOutBorder: false,
            tableOutBorderStyle: 'solid',
            tableOutBorderWidth: 1,
            tableOutBorderColor: '#333333',
            showTableCelBorder: false,
            tableCelBorderStyle: 'solid',
            tableCelBorderWidth: 1,
            tableCelBorderColor: '#333333',
            showPage: true,
            itemsPerPage: 10,
            pageNavAlign: 'center',
            pageNavStyle: 'select',
            pageNavFontSize: 15,
            pageNavFontColor: '#444444',
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
