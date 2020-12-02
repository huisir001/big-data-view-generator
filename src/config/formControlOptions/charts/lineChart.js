/*
 * @Description: 配置Option line
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2020-12-02 15:06:28
 */
import common from './common'
export default [
    {
        key: 'label',
        compType: 'switch',
        label: '显示标签',
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
    ...common,
]
