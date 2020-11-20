/*
 * @Description: 配置Option
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2020-11-20 15:43:07
 */
import common from './common'
export default [
    {
        key: 'barWidth',
        compType: 'slider',
        label: '柱宽',
        min: 0,
        max: 100,
    },
    {
        key: 'barBorderRadius',
        compType: 'numberArray',
        label: '圆角配置',
        min: 0,
        max: 50,
    },
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
    ...common,
]
