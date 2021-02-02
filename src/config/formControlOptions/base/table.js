/*
 * @Description: 表格配置项
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-02-02 17:18:04
 * @LastEditTime: 2021-02-02 18:21:04
 */

import { publicOpts } from './common'
export default [
    ...publicOpts,
    {
        key: 'nowrap',
        compType: 'switch',
        label: '不许换行',
    },
    {
        key: 'tableLayoutAuto',
        compType: 'switch',
        label: '自动布局',
    },
    {
        key: 'cellCentered',
        compType: 'switch',
        label: '单元格居中',
    },
    {
        key: 'thHeight',
        compType: 'number',
        label: '表头行高',
        min: 15,
    },
    {
        key: 'tdHeight',
        compType: 'number',
        label: '表体行高',
        min: 15,
    },
    {
        key: 'thBgColor',
        compType: 'color',
        label: '表头背景颜色',
    },
    {
        key: 'tdOddBgColor',
        compType: 'color',
        label: '奇数行背景颜色',
    },
    {
        key: 'tdEvenBgColor',
        compType: 'color',
        label: '偶数行背景颜色',
    },
    {
        key: 'thFontColor',
        compType: 'color',
        label: '表头文字颜色',
    },
    {
        key: 'tdFontColor',
        compType: 'color',
        label: '表体文字颜色',
    },
    {
        key: 'thFontSize',
        compType: 'slider',
        label: '表头字号',
        min: 12,
        max: 50,
    },
    {
        key: 'tdFontSize',
        compType: 'slider',
        label: '表体字号',
        min: 12,
        max: 50,
    },
    {
        key: 'showTableOutBorder',
        compType: 'switch',
        label: '显示表格外边框',
    },
    {
        key: 'tableOutBorderWidth',
        compType: 'slider',
        label: '表格外边框线宽',
        min: 0,
        max: 20,
    },
    {
        key: 'tableOutBorderStyle',
        label: '表格外边框线型',
        compType: 'select',
        options: [
            { value: 'solid', label: '实线' },
            { value: 'dashed', label: '虚线' },
            { value: 'dotted', label: '点线' },
            { value: 'double', label: '双线' },
            { value: 'groove', label: '凹槽' },
        ],
    },
    {
        key: 'tableOutBorderColor',
        compType: 'color',
        label: '表格外边框颜色',
    },
    {
        key: 'showTableCelBorder',
        compType: 'switch',
        label: '显示单元格边框',
    },
    {
        key: 'tableCelBorderWidth',
        compType: 'slider',
        label: '单元格边框线宽',
        min: 0,
        max: 20,
    },
    {
        key: 'tableCelBorderStyle',
        label: '单元格边框线型',
        compType: 'select',
        options: [
            { value: 'solid', label: '实线' },
            { value: 'dashed', label: '虚线' },
            { value: 'dotted', label: '点线' },
            { value: 'double', label: '双线' },
            { value: 'groove', label: '凹槽' },
        ],
    },
    {
        key: 'tableCelBorderColor',
        compType: 'color',
        label: '单元格边框颜色',
    },
    {
        key: 'showPage',
        compType: 'switch',
        label: '开启分页',
    },
    {
        key: 'itemsPerPage',
        compType: 'number',
        label: '每页条数',
        min: 1,
    },
    {
        key: 'pageNavAlign',
        compType: 'select',
        label: '页码位置',
        options: [
            { value: 'left', label: '居左' },
            { value: 'center', label: '居中' },
            { value: 'right', label: '居右' },
        ],
    },
    {
        key: 'pageNavStyle',
        compType: 'select',
        label: '页码样式',
        options: [
            { value: 'select', label: '下拉选' },
            { value: 'button', label: '按钮' },
        ],
    },
    {
        key: 'pageNavFontSize',
        compType: 'slider',
        label: '页码字号',
        min: 12,
        max: 50,
    },
    {
        key: 'pageNavFontColor',
        compType: 'color',
        label: '页码文字颜色',
    },
]
