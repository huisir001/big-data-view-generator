/*
 * @Description: 配置Option 雷达图
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2021-01-06 15:44:15
 */
import { publicOpts, legendOpts } from './common'
export default [
    ...publicOpts,
    ...legendOpts,
    {
        key: 'radius',
        compType: 'slider',
        label: '图表尺寸',
        suffix: '%',
        min: 40,
        max: 110,
    },
    {
        key: 'center',
        compType: 'numberArray',
        label: '图表中心位置(%)',
    },
    {
        key: 'max',
        compType: 'number',
        label: '雷达最大值',
    },
    {
        key: 'min',
        compType: 'number',
        label: '雷达最小值',
    },
    {
        key: 'showAxisLabel',
        compType: 'switch',
        label: '是否显示刻度值',
        displayItems: {
            t: ['axisLabelColor', 'axisLabelSize'],
        },
    },
    {
        key: 'axisLabelColor',
        compType: 'color',
        label: '刻度值颜色',
    },
    {
        key: 'axisLabelSize',
        compType: 'slider',
        label: '刻度值字号',
        min: 0,
        max: 50,
    },
    {
        key: 'splitNumber',
        compType: 'slider',
        label: '底盘分隔线数量',
        min: 0,
        max: 10,
    },
    {
        key: 'radarType',
        compType: 'select',
        label: '底盘形状',
        options: [
            { value: 'polygon', label: '多边形' },
            { value: 'circle', label: '圆形' },
        ],
    },
    {
        key: 'startAngle',
        compType: 'number',
        label: '底盘开始角度 °',
        min: -360,
        max: 360,
    },
    {
        key: 'areaOpacity',
        compType: 'slider',
        label: '区域填充透明度',
        min: 0,
        max: 1,
        step: 0.1,
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
        key: 'colors',
        compType: 'colors',
        label: '颜色配置',
        labelOnTop: true,
    },
    {
        key: 'showAxisLine',
        compType: 'switch',
        label: '显示轴线',
        displayItems: {
            t: ['axisLineColor', 'axisLineWidth', 'axisLineType'],
        },
    },
    {
        key: 'axisLineColor',
        compType: 'color',
        label: '轴线颜色',
    },
    {
        key: 'axisLineWidth',
        compType: 'slider',
        label: '轴线线宽',
        min: 0,
        max: 20,
    },
    {
        key: 'axisLineType',
        compType: 'select',
        label: '轴线线型',
        options: [
            { value: 'solid', label: '直线' },
            { value: 'dotted', label: '点线' },
            { value: 'dashed', label: '虚线' },
        ],
    },
    {
        key: 'showSplitLine',
        compType: 'switch',
        label: '是否显示分割线',
        displayItems: {
            t: ['splitLineColor', 'splitLineWidth', 'splitLineType'],
        },
    },
    {
        key: 'splitLineColor',
        compType: 'color',
        label: '分割线色',
    },
    {
        key: 'splitLineWidth',
        compType: 'slider',
        label: '分割线宽',
        min: 0,
        max: 20,
    },
    {
        key: 'splitLineType',
        compType: 'select',
        label: '分割线型',
        options: [
            { value: 'solid', label: '直线' },
            { value: 'dotted', label: '点线' },
            { value: 'dashed', label: '虚线' },
        ],
    },
    {
        key: 'showSplitArea',
        compType: 'switch',
        label: '是否显示分割区域',
        displayItems: {
            t: ['splitAreaColorAuto'],
        },
    },
    {
        key: 'splitAreaColorAuto',
        compType: 'switch',
        label: '分割区颜色自适应',
        displayItems: {
            f: ['splitAreaColor'],
        },
    },
    {
        key: 'splitAreaColor',
        compType: 'colors',
        label: '自定义分割区颜色',
        labelOnTop: true,
        hide: true,
    },
    {
        key: 'showCatName',
        compType: 'switch',
        label: '显示指示器名称',
        displayItems: {
            t: ['catNameFmt', 'catNameColor', 'nameGap'],
        },
    },
    {
        key: 'catNameFmt',
        compType: 'input',
        label: '指示器名称模板',
        tooltip: '字符串模板如：`{value}`',
    },
    {
        key: 'catNameSize',
        compType: 'slider',
        label: '指示器名称字号',
        min: 0,
        max: 50,
    },
    {
        key: 'catNameColor',
        compType: 'color',
        label: '指示器名称颜色',
    },
    {
        key: 'nameGap',
        compType: 'number',
        label: '指示器名称距离',
        min: 0,
    },
]
