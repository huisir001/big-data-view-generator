/*
 * @Description: 时间文本组件配置项
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-02-05 16:40:53
 * @LastEditTime: 2021-02-08 16:35:15
 */

export default [
    {
        key: 'name',
        label: '图层名称',
        compType: 'input',
        layerOption: true,
    },
    {
        key: 'pos',
        label: '坐标',
        compType: 'numberArray', //position类型为固定格式如[10,10]
        layerOption: true, //图层本身配置
    },
    {
        key: 'width',
        label: '宽度',
        compType: 'number',
        layerOption: true,
    },
    {
        key: 'height',
        label: '高度',
        compType: 'number',
        layerOption: true,
    },

    {
        key: 'timeFormat',
        compType: 'input',
        label: '时间格式',
        tooltip:
            '时间匹配规则：<br>年-yyyy<br>月份-MM<br>日期-dd<br>小时-hh<br>分钟-mm<br>秒-ss<br>星期-day',
    },
    {
        key: 'isHtml',
        compType: 'switch',
        label: '渲染HTML',
        tooltip: '可添加p标签用于分段<br>添加br标签用于换行',
    },
    {
        key: 'openTimingRefresh',
        compType: 'switch',
        label: '定时刷新',
        displayItems: {
            t: ['refreshPeriod'],
        }, //显隐控制
    },
    {
        key: 'refreshPeriod',
        compType: 'slider',
        label: '定时刷新周期/秒',
        min: 1,
        hide: true,
    },
    {
        key: 'fontFamily',
        compType: 'input',
        label: '字体类型',
    },
    {
        key: 'fontSize',
        compType: 'slider',
        label: '文本字号',
        min: 12,
        max: 100,
    },
    {
        key: 'wordSpacing',
        compType: 'slider',
        label: '文字间距',
        min: 0,
    },
    {
        key: 'fontColor',
        compType: 'color',
        label: '文字颜色',
    },
    {
        key: 'fontWeight',
        label: '文字粗细',
        compType: 'select',
        options: [
            { value: 'normal', label: '正常' },
            { value: 'bold', label: '加粗' },
            { value: 'bolder', label: '更粗' },
            { value: 'lighter', label: '更细' },
        ],
    },
    {
        key: 'textDecoration',
        label: '文字修饰',
        compType: 'select',
        options: [
            { value: 'none', label: '正常' },
            { value: 'underline', label: '下划线' },
            { value: 'line-through', label: '删除线' },
        ],
    },
    {
        key: 'textAlign',
        label: '排版位置',
        compType: 'select',
        options: [
            { value: 'unset', label: '默认' },
            { value: 'left', label: '靠左' },
            { value: 'center', label: '居中' },
            { value: 'right', label: '靠右' },
        ],
    },
    {
        key: 'background',
        compType: 'color',
        label: '背景颜色',
    },
    {
        key: 'showTextShadow',
        compType: 'switch',
        label: '文字阴影',
        displayItems: {
            t: [
                'textShadowColor',
                'textShadowBlur',
                'textShadowOffsetX',
                'textShadowOffsetY',
            ],
        }, //显隐控制
    },
    {
        key: 'textShadowColor',
        compType: 'color',
        label: '阴影颜色',
        hide: true,
    },
    {
        key: 'textShadowBlur',
        compType: 'slider',
        label: '阴影模糊',
        min: 0,
        max: 20,
        hide: true,
    },
    {
        key: 'textShadowOffsetX',
        compType: 'slider',
        label: '阴影横向偏移',
        min: 0,
        max: 20,
        hide: true,
    },
    {
        key: 'textShadowOffsetY',
        compType: 'slider',
        label: '阴影纵向偏移',
        min: 0,
        max: 20,
        hide: true,
    },
]
