/*
 * @Description: 配置Option line
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2020-11-26 17:49:08
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
    ...common,
]
