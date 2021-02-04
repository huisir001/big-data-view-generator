/*
 * @Description: 配置Option ScatterChart
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2021-02-04 15:08:43
 */
import { publicOpts, legendOpts, backGauge } from './common'
export default [
    ...publicOpts,
    ...legendOpts,
    ...backGauge,
    {
        key: 'xName',
        compType: 'input',
        label: 'x轴名称',
    },
    {
        key: 'yName',
        compType: 'input',
        label: 'y轴名称',
    },
    {
        key: 'showxAxisLabel',
        compType: 'switch',
        label: 'X轴标签',
        displayItems: {
            t: ['xAxisLabelFmt'],
        },
    },
    {
        key: 'xAxisLabelFmt',
        compType: 'input',
        label: 'X轴标签模板',
        tooltip: '例：`{value}`',
    },
    {
        key: 'showyAxisLabel',
        compType: 'switch',
        label: 'Y轴标签',
        displayItems: {
            t: ['yAxisLabelFmt'],
        },
    },
    {
        key: 'yAxisLabelFmt',
        compType: 'input',
        label: 'Y轴标签模板',
        tooltip: '例：`{value}`',
    },
    {
        key: 'showxAxisLine',
        compType: 'switch',
        label: 'X轴线',
    },
    {
        key: 'showyAxisLine',
        compType: 'switch',
        label: 'Y轴线',
    },
    {
        key: 'showxSplitLine',
        compType: 'switch',
        label: '显示X轴分隔线',
    },
    {
        key: 'showySplitLine',
        compType: 'switch',
        label: '显示Y轴分隔线',
    },
    {
        key: 'limitxAxisMinVal',
        compType: 'switch',
        label: '限制X轴最小刻度',
        displayItems: {
            t: ['xAxisScopeMin'],
        },
    },
    {
        key: 'xAxisScopeMin',
        compType: 'number',
        label: 'X轴最小刻度',
        hide: true,
    },
    {
        key: 'limitxAxisMaxVal',
        compType: 'switch',
        label: '限制X轴最大刻度',
        displayItems: {
            t: ['xAxisScopeMax'],
        },
    },
    {
        key: 'xAxisScopeMax',
        compType: 'number',
        label: 'X轴最大刻度',
        hide: true,
    },
    {
        key: 'limityAxisMinVal',
        compType: 'switch',
        label: '限制Y轴最小刻度',
        displayItems: {
            t: ['yAxisScopeMin'],
        },
    },
    {
        key: 'yAxisScopeMin',
        compType: 'number',
        label: 'Y轴最小刻度',
        hide: true,
    },
    {
        key: 'limityAxisMaxVal',
        compType: 'switch',
        label: '限制Y轴最大刻度',
        displayItems: {
            t: ['yAxisScopeMax'],
        },
    },
    {
        key: 'yAxisScopeMax',
        compType: 'number',
        label: 'Y轴最大刻度',
        hide: true,
    },
    {
        key: 'colors',
        compType: 'colors',
        label: '颜色配置',
        labelOnTop: true,
    },
    {
        key: 'showDataZoom',
        compType: 'switch',
        label: '显示滚动条',
        displayItems: {
            //显隐控制
            t: ['dataZoomAxis', 'dataZoomSplitType', 'dataZoomSplitScope'],
        },
    },
    {
        key: 'dataZoomAxis',
        compType: 'select',
        label: '数据轴映射',
        options: [
            { value: 'y0', label: 'Y轴一' },
            { value: 'y1', label: 'Y轴二' },
            { value: 'x0', label: 'X轴一' },
            { value: 'x1', label: 'X轴二' },
        ],
        hide: true,
    },
    {
        key: 'dataZoomSplitType',
        compType: 'select',
        label: '数据分隔方式',
        options: [
            { value: 'index', label: '按下标' },
            { value: 'ratio', label: '按比例' },
        ],
        hide: true,
    },
    {
        key: 'dataZoomSplitScope',
        compType: 'rangeSlider',
        label: '数据分隔范围',
        step: 1,
        min: 0,
        max: 100,
        hide: true,
    },
    {
        key: 'showVisualMap',
        compType: 'switch',
        label: '显示视觉映射',
        displayItems: {
            t: ['visualMap'],
        },
    },
    {
        key: 'visualMap',
        compType: 'input',
        label: '视觉映射配置',
        inputType: 'textarea',
        readonly: true,
        showBtnGroup: true,
        stringify: true, //需要转义为字符串显示在表单中
        hide: true, //默认隐藏
    },
    {
        key: 'showMarkPoint',
        compType: 'switch',
        label: '显示标注',
        displayItems: {
            t: ['markPoint'],
        },
    },
    {
        key: 'markPoint',
        compType: 'input',
        label: '标注配置',
        inputType: 'textarea',
        readonly: true,
        showBtnGroup: true,
        stringify: true,
        hide: true,
    },
    {
        key: 'showMarkLine',
        compType: 'switch',
        label: '显示标线',
        displayItems: {
            t: ['markLine'],
        },
    },
    {
        key: 'markLine',
        compType: 'input',
        label: '标线配置',
        inputType: 'textarea',
        readonly: true,
        showBtnGroup: true,
        stringify: true,
        hide: true,
    },
    {
        key: 'showMarkArea',
        compType: 'switch',
        label: '显示标域',
        displayItems: {
            t: ['markArea'],
        },
    },
    {
        key: 'markArea',
        compType: 'input',
        label: '标域配置',
        inputType: 'textarea',
        readonly: true,
        showBtnGroup: true,
        stringify: true,
        hide: true,
    },
    {
        key: 'label',
        compType: 'switch',
        label: '显示标签',
        displayItems: {
            t: ['labelPosition', 'labelSize', 'labelFmt'],
        },
    },
    {
        key: 'labelPosition',
        compType: 'select',
        label: '标签位置',
        options: [
            { value: 'top', label: '上侧' },
            { value: 'right', label: '右侧' },
            { value: 'bottom', label: '下侧' },
            { value: 'left', label: '左侧' },
            { value: 'inside', label: '内侧' },
            { value: 'insideTop', label: '内侧偏上' },
            { value: 'insideBottom', label: '内侧偏下' },
            { value: 'insideLeft', label: '内侧偏左' },
            { value: 'insideRight', label: '内侧偏右' },
            { value: 'insideTopLeft', label: '内侧左上' },
            { value: 'insideBottomLeft', label: '内侧左下' },
            { value: 'insideTopRight', label: '内侧右上' },
            { value: 'insideBottomRight', label: '内侧右下' },
        ],
    },
    {
        key: 'labelSize',
        compType: 'slider',
        label: '标签字号',
        min: 0,
        max: 50,
    },
    {
        key: 'labelFmt',
        compType: 'input',
        label: '标签模板字符串',
        tooltip: '例：`{a} {b}: {c}`',
    },
    {
        key: 'isBubble',
        compType: 'switch',
        label: '气泡图',
        displayItems: {
            t: ['minBubbleSize', 'maxBubbleSize'],
            f: ['symbolSize', 'symbolType'],
        },
    },
    {
        key: 'minBubbleSize',
        compType: 'slider',
        label: '气泡最小半径',
        min: 0,
        max: 50,
        hide: true,
    },
    {
        key: 'maxBubbleSize',
        compType: 'slider',
        label: '气泡最大半径',
        min: 0,
        max: 100,
        hide: true,
    },
    {
        key: 'symbolSize',
        compType: 'slider',
        label: '浮点尺寸',
        min: 0,
        max: 100,
    },
    {
        key: 'symbolType',
        compType: 'baseArray',
        label: '浮点标志图类型',
        itemType: 'select',
        options: [
            { value: 'circle', label: '圆' },
            { value: 'rectangle', label: '矩形' },
            { value: 'pin', label: '标注' },
            { value: 'arrow', label: '箭头' },
            { value: 'diamond', label: '菱形' },
            { value: 'triangle', label: '三角形' },
        ],
        default: 'circle',
        labelOnTop: true,
    },
    {
        key: 'showShadow',
        compType: 'switch',
        label: '显示浮点阴影',
        displayItems: {
            t: ['shadowBlur', 'shadowOffsetX', 'shadowOffsetY', 'shadowColor'],
        },
    },
    {
        key: 'shadowBlur',
        compType: 'slider',
        label: '浮点阴影模糊尺寸',
        min: 0,
        max: 20,
        hide: true,
    },
    {
        key: 'shadowColor',
        compType: 'color',
        label: '浮点阴影色',
        hide: true,
    },
    {
        key: 'shadowOffsetX',
        compType: 'slider',
        label: '浮点阴影水平偏移',
        min: 0,
        max: 20,
        hide: true,
    },
    {
        key: 'shadowOffsetY',
        compType: 'slider',
        label: '浮点阴影垂直偏移',
        min: 0,
        max: 20,
        hide: true,
    },
]
