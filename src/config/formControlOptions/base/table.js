/*
 * @Description: 表格配置项
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-02-02 17:18:04
 * @LastEditTime: 2021-02-05 09:45:32
 */

import { publicOpts } from './common'
export default [
    ...publicOpts,
    {
        key: 'staticData',
        compType: 'input',
        label: '表格数据',
        inputType: 'textarea',
        readonly: true,
        showBtnGroup: true,
        stringify: true,
    },
    {
        key: 'nowrap',
        compType: 'switch',
        label: '不许换行',
    },
    {
        key: 'tableLayoutAuto',
        compType: 'switch',
        label: '自动布局',
        tooltip: '若此处关闭自动布局<br>单元格宽度须完全靠自定义',
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
        tooltip:
            '若行数较少无法填满图层<br>行高会自适应填充图层<br>则此处设置的行高无效',
    },
    {
        key: 'thFontSize',
        compType: 'slider',
        label: '表头字号',
        min: 10,
        max: 50,
    },
    {
        key: 'tdFontSize',
        compType: 'slider',
        label: '表体字号',
        min: 10,
        max: 50,
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
        key: 'showTableOutBorder',
        compType: 'switch',
        label: '显示表格外边框',
        displayItems: {
            t: [
                'tableOutBorderWidth',
                'tableOutBorderStyle',
                'tableOutBorderColor',
            ],
        },
    },
    {
        key: 'tableOutBorderWidth',
        compType: 'slider',
        label: '表格外边框线宽',
        min: 0,
        max: 20,
        hide: true,
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
        hide: true,
    },
    {
        key: 'tableOutBorderColor',
        compType: 'color',
        label: '表格外边框颜色',
        hide: true,
    },
    {
        key: 'showTableCelBorder',
        compType: 'switch',
        label: '显示单元格边框',
        displayItems: {
            t: [
                'tableCelBorderWidth',
                'tableCelBorderStyle',
                'tableCelBorderColor',
            ],
        },
    },
    {
        key: 'tableCelBorderWidth',
        compType: 'slider',
        label: '单元格边框线宽',
        min: 0,
        max: 20,
        hide: true,
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
        hide: true,
    },
    {
        key: 'tableCelBorderColor',
        compType: 'color',
        label: '单元格边框颜色',
        hide: true,
    },
    {
        key: 'showPage',
        compType: 'switch',
        label: '开启分页',
        displayItems: {
            t: [
                'itemsPerPage',
                'pageNavAlign',
                'pageNavStyle',
                'pageNavFontSize',
                'pageNavFontColor',
            ],
        },
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
    {
        key: 'tableCols',
        compType: 'complexArray',
        label: '列项配置',
        labelOnTop: true,
        cols: [
            {
                lable: '标签',
                field: 'label',
                type: 'text',
                default: '',
            },
            {
                lable: '字段',
                field: 'field',
                type: 'text',
                default: '',
            },
            {
                lable: '固定',
                field: 'fixed',
                type: 'select',
                options: [
                    { value: 'left', label: '左侧' },
                    { value: 'right', label: '右侧' },
                ],
                width: 70,
                default: 'left',
                allowEmpty: true,
            },
            {
                lable: '宽度',
                field: 'width',
                type: 'number',
                width: 70,
                min: 12,
                default: 50,
                allowEmpty: true,
            },
        ],
    },
]
