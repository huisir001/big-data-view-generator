/*
 * @Description: 表单配置项
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-01-22 10:14:38
 * @LastEditTime: 2021-01-22 17:41:59
 */

import { publicOpts } from './common'

export default [
    ...publicOpts,
    {
        key: 'type',
        label: '表单类型',
        compType: 'select',
        options: [
            { value: 'text', label: '文本框' },
            { value: 'select', label: '下拉选框' },
            { value: 'date', label: '日期选择' },
        ],
    },
    {
        key: 'formKey',
        label: '表单字段',
        compType: 'input',
        tooltip: '请输入英文字段',
    },
    {
        key: 'placeholder',
        label: '提示信息',
        compType: 'input',
    },
    {
        key: 'formWidth',
        label: '表单宽度',
        compType: 'number',
        min: 50,
    },
    {
        key: 'formHeight',
        label: '表单高度',
        compType: 'number',
        min: 10,
    },
    {
        key: 'borderWidth',
        label: '边框线宽',
        compType: 'slider',
        min: 0,
    },
    {
        key: 'borderStyle',
        label: '边框类型',
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
        key: 'borderColor',
        label: '边框颜色',
        compType: 'color',
    },
    {
        key: 'selectOptions',
        label: '下拉选项',
        compType: 'selectOption',
    },
    {
        key: 'dateType',
        label: '日期格式',
        compType: 'select',
        options: [
            { label: 'yyyy-MM-dd', value: '1' },
            { label: 'yyyy-MM', value: '2' },
            { label: 'yyyy', value: '3' },
            { label: 'HH:mm', value: '4' },
            { label: 'yyyy-MM-dd HH:mm', value: '5' },
        ],
    },
]
