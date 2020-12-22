/*
 * @Description: 配置Option
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2020-12-22 17:54:52
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
    },
    {
        key: 'radius',
        compType: 'numberArray',
        label: '饼图尺寸',
    },
    {
        key: 'center',
        compType: 'numberArray',
        label: '饼图位置',
    },
]
