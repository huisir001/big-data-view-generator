/*
 * @Description: 配置Option line
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2020-12-03 18:27:29
 */
import common from './common'
export default [
    ...common,
    {
        key: 'label',
        compType: 'switch',
        label: '显示标签',
        displayItems: {
            t: ['labelPosition'],
        }, //显隐控制
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
        key: 'stack',
        compType: 'switch',
        label: '是否堆叠',
    },
    {
        key: 'horizontal',
        compType: 'switch',
        label: '是否横向',
    },
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
        key: 'catLabelRowLen',
        compType: 'number',
        min: 2,
        label: '类型轴换行字数',
    },
    {
        key: 'showValAxisLabel',
        compType: 'switch',
        label: '显示数据轴刻度',
    },
    {
        key: 'showValAxisLine',
        compType: 'switch',
        label: '显示数据轴轴线',
    },
    {
        key: 'showValSplitLine',
        compType: 'switch',
        label: '显示数据轴分隔线',
    },
    {
        key: 'showCatAxisLine',
        compType: 'switch',
        label: '显示类型轴轴线',
    },
    {
        key: 'boundaryGap',
        compType: 'switch',
        label: '有无边界',
    },
    {
        key: 'smooth',
        compType: 'switch',
        label: '平滑曲线',
    },
    {
        key: 'limitAxisMinVal',
        compType: 'switch',
        label: '限制刻度最小值',
        displayItems: {
            t: ['axisScopeMin'],
        }, //显隐控制
    },
    {
        key: 'limitAxisMaxVal',
        compType: 'switch',
        label: '限制刻度最大值',
        displayItems: {
            t: ['axisScopeMax'],
        }, //显隐控制
    },
    {
        key: 'axisScopeMin',
        compType: 'number',
        label: '刻度最小值',
        hide: true,
    },
    {
        key: 'axisScopeMax',
        compType: 'number',
        label: '刻度最大值',
        hide: true,
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
    },
    {
        key: 'dataZoomSplitType',
        compType: 'select',
        label: '数据分隔方式',
        options: [
            { value: 'index', label: '按下标' },
            { value: 'ratio', label: '按比例' },
        ],
    },
    {
        key: 'dataZoomSplitScope',
        compType: 'rangeSlider',
        label: '数据分隔范围',
        step: 1,
        min: 0,
        max: 100,
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
        key: 'lineType',
        compType: 'select',
        label: '线型',
        options: [
            { value: 'solid', label: '实线' },
            { value: 'dashed', label: '虚线' },
            { value: 'dotted', label: '点线' },
        ],
    },
    {
        key: 'lineWidth',
        compType: 'slider',
        label: '线宽',
        min: 0,
        max: 20,
    },
    {
        key: 'opacity',
        compType: 'slider',
        label: '透明度',
        min: 0,
        max: 1,
        step: 0.1,
    },
    {
        key: 'showShadow',
        compType: 'switch',
        label: '线条阴影',
        displayItems: {
            t: ['shadowBlur', 'shadowOffsetX', 'shadowOffsetY', 'shadowColor'],
        },
    },
    {
        key: 'shadowColor',
        compType: 'color',
        label: '阴影色',
    },
    {
        key: 'shadowBlur',
        compType: 'slider',
        label: '阴影模糊尺寸',
        min: 0,
        max: 20,
    },
    {
        key: 'shadowOffsetX',
        compType: 'slider',
        label: '阴影水平偏移',
        min: 0,
        max: 20,
    },
    {
        key: 'shadowOffsetY',
        compType: 'slider',
        label: '阴影垂直偏移',
        min: 0,
        max: 20,
    },
    {
        key: 'areaFill',
        compType: 'switch',
        label: '区域填充面积图',
        displayItems: {
            t: ['areaStyle'],
        },
    },
    {
        key: 'areaStyle',
        compType: 'input',
        label: '区域填充配置',
        inputType: 'textarea',
        readonly: true,
        showBtnGroup: true,
        stringify: true,
    },
]
