/*
 * @Description: 配置Option
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2021-02-04 15:35:28
 */
import { publicOpts, legendOpts } from './common'
export default [
    ...publicOpts,
    ...legendOpts,
    {
        key: 'label',
        compType: 'switch',
        label: '显示标签',
        displayItems: {
            t: ['labelPosition', 'labelLineLength', 'labelSize', 'labelFmt'],
        }, //显隐控制
    },
    {
        key: 'labelPosition',
        compType: 'select',
        label: '标签位置',
        options: [
            { value: 'outside', label: '外侧' },
            { value: 'inside', label: '内侧' },
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
        key: 'labelLineLength',
        compType: 'slider',
        label: '标线引出长度',
        min: 0,
        max: 50,
    },
    {
        key: 'labelFmt',
        compType: 'stringArray',
        label: '标签模板字符串',
        tooltip: '例：`{b}: {c} ({d}%)`',
    },
    {
        key: 'borderWidth',
        compType: 'slider',
        label: '描边线宽',
        min: 0,
        max: 20,
    },
    {
        key: 'borderColor',
        compType: 'color',
        label: '描边颜色',
    },
    {
        key: 'selectedCats',
        compType: 'input',
        label: '默认选中项名称',
        placeholder: '用“,”隔开',
        tooltip: '填写选中项的name名称，用英文逗号隔开',
    },
    {
        key: 'radius',
        compType: 'baseArray',
        label: '饼图半径(%)',
        labelOnTop: true,
        itemType: 'number',
        default: 80,
        tooltip:
            '这里可以调整数组，<br>以显示环形图或嵌套饼图。<br>嵌套饼图只支持一层。',
    },
    {
        key: 'center',
        compType: 'numberArray',
        label: '饼图圆心坐标(%)',
    },
    {
        key: 'roseType',
        compType: 'switch',
        label: '玫瑰图',
    },
    /* 颜色配置 */
    {
        key: 'colors',
        compType: 'colors',
        label: '颜色配置',
        labelOnTop: true, //标签在上面
    },
]
