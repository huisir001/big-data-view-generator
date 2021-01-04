/*
 * @Description: 配置Option Gauge
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2021-01-04 15:48:50
 */
import { publicOpts } from './common'
export default [
    ...publicOpts,
    {
        key: 'radius',
        compType: 'slider',
        label: '仪表大小',
        suffix: '%', //  后缀
        min: 40,
        max: 110,
    },
    {
        key: 'center',
        compType: 'numberArray',
        label: '仪表圆心坐标%',
        min: 0,
        max: 100,
    },
    {
        key: 'startAngle',
        compType: 'number',
        label: '表盘开始角度 °',
        min: -360,
        max: 360,
    },
    {
        key: 'endAngle',
        compType: 'number',
        label: '表盘结束角度 °',
        min: -360,
        max: 360,
    },
    {
        key: 'min',
        compType: 'number',
        label: '最小刻度',
    },
    {
        key: 'max',
        compType: 'number',
        label: '最大刻度',
    },
    {
        key: 'splitNumber',
        compType: 'slider',
        label: '仪表盘分割段数',
        min: 0,
        max: 10,
    },
    {
        key: 'clockwise',
        compType: 'switch',
        label: '顺时针',
    },
    /* 表盘 */
    {
        key: 'showAxis',
        compType: 'switch',
        label: '表盘显隐',
        displayItems: {
            t: [
                'axisWidth',
                'axisShadowBlur',
                'axisShadowColor',
                'axisShadowOffsetX',
                'axisShadowOffsetY',
            ],
        },
    },
    {
        key: 'axisWidth',
        compType: 'number',
        label: '表盘宽度',
        min: 0,
    },
    {
        key: 'axisShadowBlur',
        compType: 'slider',
        label: '表盘阴影模糊度',
        min: 0,
        max: 100,
    },
    {
        key: 'axisShadowColor',
        compType: 'color',
        label: '表盘阴影色',
    },
    {
        key: 'axisShadowOffsetX',
        compType: 'number',
        label: '表盘阴影横向偏移',
    },
    {
        key: 'axisShadowOffsetY',
        compType: 'number',
        label: '表盘阴影纵向偏移',
    },
    {
        key: 'colors',
        compType: 'colors',
        label: '表盘颜色配置',
        section: true,
        labelOnTop: true,
    },
    /* 盘内标题 */
    {
        key: 'showDialTitle',
        compType: 'switch',
        label: '盘内标题显隐',
        displayItems: {
            t: [
                'dialTitleCenter',
                'dialTitleSize',
                'dialTitleWeight',
                'dialTitleColor',
            ],
        },
    },
    {
        key: 'dialTitleCenter',
        compType: 'numberArray',
        label: '盘内标题位置',
    },
    {
        key: 'dialTitleSize',
        compType: 'slider',
        label: '盘内标题字号',
        min: 0,
        max: 100,
    },
    {
        key: 'dialTitleWeight',
        compType: 'select',
        label: '盘内标题粗细',
        options: [
            { value: 'normal', label: '正常' },
            { value: 'bold', label: '加粗' },
            { value: 'bolder', label: '更粗' },
            { value: 'lighter', label: '更细' },
        ],
    },
    {
        key: 'dialTitleColor',
        compType: 'color',
        label: '盘内标题颜色',
    },
    /* 数据值 */
    {
        key: 'showDetail',
        compType: 'switch',
        label: '是否显示数据值',
        displayItems: {
            t: [
                'detailFmt',
                'detailCenter',
                'detailSize',
                'detailFontWeight',
                'detailColorAuto',
            ],
        },
    },
    {
        key: 'detailFmt',
        compType: 'input',
        label: '数据值模板',
    },
    {
        key: 'detailCenter',
        compType: 'numberArray',
        label: '数据值位置',
    },
    {
        key: 'detailSize',
        compType: 'slider',
        label: '数据值字号',
        min: 0,
        max: 100,
    },
    {
        key: 'detailFontWeight',
        compType: 'select',
        label: '数据值字体粗细',
        options: [
            { value: 'normal', label: '正常' },
            { value: 'bold', label: '加粗' },
            { value: 'bolder', label: '更粗' },
            { value: 'lighter', label: '更细' },
        ],
    },
    {
        key: 'detailColorAuto',
        compType: 'switch',
        label: '数据值颜色自适应',
        displayItems: {
            f: ['detailColor'],
        },
    },
    {
        key: 'detailColor',
        compType: 'color',
        label: '自定义数据值颜色',
        hide: true,
    },
    /* 刻度值 */
    {
        key: 'showAxisLabel',
        compType: 'switch',
        label: '是否显示刻度值',
        displayItems: {
            t: [
                'axisLabelSize',
                'axisLabelStyle',
                'axisLabelWeight',
                'axisLabelFmt',
                'axisLabelColorAuto',
            ],
        },
    },
    {
        key: 'axisLabelSize',
        compType: 'slider',
        label: '刻度值字号',
        min: 0,
        max: 100,
    },
    {
        key: 'axisLabelStyle',
        compType: 'select',
        label: '刻度值字体样式',
        options: [
            { value: 'normal', label: '正常' },
            { value: 'italic', label: '斜体' },
        ],
    },
    {
        key: 'axisLabelWeight',
        compType: 'select',
        label: '刻度值字体粗细',
        options: [
            { value: 'normal', label: '正常' },
            { value: 'bold', label: '加粗' },
            { value: 'bolder', label: '更粗' },
            { value: 'lighter', label: '更细' },
        ],
    },
    {
        key: 'axisLabelFmt',
        compType: 'input',
        label: '刻度值模板',
    },
    {
        key: 'axisLabelColorAuto',
        compType: 'switch',
        label: '刻度值颜色自适应',
        displayItems: {
            f: ['axisLabelColor'],
        },
    },
    {
        key: 'axisLabelColor',
        compType: 'color',
        label: '自定义刻度值颜色',
        hide: true,
    },
    /* 刻度线 */
    {
        key: 'showAxisTick',
        compType: 'switch',
        label: '是否显示刻度线',
        displayItems: {
            t: [
                'axisTickType',
                'axisTickWidth',
                'axisTickLength',
                'axisTickSplitNum',
            ],
        },
    },
    {
        key: 'axisTickType',
        compType: 'select',
        label: '刻度线型',
        options: [
            { value: 'solid', label: '直线' },
            { value: 'dotted', label: '点线' },
            { value: 'dashed', label: '虚线' },
        ],
    },
    {
        key: 'axisTickWidth',
        compType: 'slider',
        label: '刻度线宽',
        min: 0,
        max: 40,
    },
    {
        key: 'axisTickLength',
        compType: 'number',
        label: '刻度线长',
        min: 0,
    },
    {
        key: 'axisTickSplitNum',
        compType: 'slider',
        label: '刻度线分隔数',
        min: 0,
        max: 10,
    },
    /* 分割线 */
    {
        key: 'showSplitLine',
        compType: 'switch',
        label: '表盘分割线显隐',
        displayItems: {
            t: [
                'splitLineLength',
                'splitLineWidth',
                'splitLineType',
                'axisTickSplitNum',
            ],
        },
    },
    {
        key: 'splitLineLength',
        compType: 'number',
        label: '表盘分割线线长',
        min: 0,
    },
    {
        key: 'splitLineWidth',
        compType: 'slider',
        label: '表盘分割线宽',
        min: 0,
        max: 40,
    },
    {
        key: 'splitLineType',
        compType: 'select',
        label: '表盘分割线类型',
        options: [
            { value: 'solid', label: '直线' },
            { value: 'dotted', label: '点线' },
            { value: 'dashed', label: '虚线' },
        ],
    },
    /* 指针 */
    {
        key: 'pointerLength',
        compType: 'slider',
        label: '指针长度',
        suffix: '%',
        min: 0,
        max: 110,
    },
    {
        key: 'pointerWidth',
        compType: 'number',
        label: '指针宽度',
        min: 0,
    },
    {
        key: 'pointerColorAuto',
        compType: 'switch',
        label: '指针颜色自适应',
        displayItems: {
            f: ['pointerColor'],
        },
    },
    {
        key: 'pointerColor',
        compType: 'color',
        label: '自定义指针颜色',
        hide: true,
    },
    {
        key: 'pointerOpacity',
        compType: 'slider',
        label: '指针透明度',
        min: 0,
        max: 1,
        step: 0.1,
    },
    {
        key: 'pointerBorderColor',
        compType: 'color',
        label: '指针描边色',
    },
    {
        key: 'pointerBorderWidth',
        compType: 'slider',
        label: '指针描边线宽',
        min: 0,
        max: 40,
    },
    {
        key: 'pointerBorderType',
        compType: 'select',
        label: '指针描边线型',
        options: [
            { value: 'solid', label: '直线' },
            { value: 'dotted', label: '点线' },
            { value: 'dashed', label: '虚线' },
        ],
    },
]
