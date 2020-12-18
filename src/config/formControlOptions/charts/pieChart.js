/*
 * @Description: 配置Option
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2020-12-18 18:51:08
 */
import common from './common'
export default [
    {
        key: 'labelPosition',
        compType: 'select',
        label: '标签位置',
        options: [
            { value: 'outside', label: '外侧' },
            { value: 'inside', label: '内侧' },
        ],
        hide: true,
    },
    {
        key: 'tooltipFmt',
        compType: 'input',
        label: '提示框模板',
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
        label: '标题左边距',
    },
    {
        key: 'titlePosTop',
        compType: 'number',
        label: '标题上边距',
    },
    {
        key: 'legendPosLeft',
        compType: 'number',
        label: '图例左边距',
    },
    {
        key: 'legendPosTop',
        compType: 'number',
        label: '图例上边距',
    },
    {
        key: 'labelSize',
        compType: 'slider',
        label: '标签字号',
        min: 0,
        max: 50,
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
        label: '默认选中项(“,”隔开)',
    },
    {
        key: 'labelLineLength',
        compType: 'slider',
        label: '标线引出长度',
        min: 0,
        max: 50,
    },
    ...common,
]
