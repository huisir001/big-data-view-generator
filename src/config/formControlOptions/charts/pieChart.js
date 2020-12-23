/*
 * @Description: 配置Option
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2020-12-23 18:13:35
 */
import common from './common'
export default [
    ...common,
    {
        key: 'tooltipFmt',
        compType: 'input',
        label: '提示框模板字符串',
    },
    {
        key: 'titleSize',
        compType: 'slider',
        label: '标题字号',
        min: 0,
        max: 50,
    },
    {
        key: 'titleFontWeight',
        compType: 'select',
        label: '标题粗细',
        options: [
            { value: 'normal', label: '正常' },
            { value: 'bold', label: '加粗' },
            { value: 'bolder', label: '更粗' },
            { value: 'lighter', label: '更细' },
        ],
    },
    {
        key: 'titleFontFamily',
        compType: 'input',
        label: '标题字体',
    },
    {
        key: 'titleColor',
        compType: 'color',
        label: '标题颜色',
    },
    {
        key: 'titlePosLeft',
        compType: 'number',
        label: '标题左侧偏移/px',
    },
    {
        key: 'titlePosTop',
        compType: 'number',
        label: '标题上侧偏移/px',
    },
    {
        key: 'legendPosLeft',
        compType: 'number',
        label: '图例左侧偏移/px',
    },
    {
        key: 'legendPosTop',
        compType: 'number',
        label: '图例上侧偏移/px',
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
        key: 'legendOrient',
        compType: 'select',
        label: '图例排列',
        options: [
            { value: 'horizontal', label: '横排' },
            { value: 'vertical', label: '竖排' },
        ],
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
        compType: 'numberArrayModifier',
        label: '饼图半径(%)',
        labelOnTop: true,
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
]
