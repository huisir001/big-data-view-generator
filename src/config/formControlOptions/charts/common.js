/*
 * @Description: 配置公共Option
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2021-01-04 16:56:34
 */

/* 共有 */
export const publicOpts = [
    /* 图层 */
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
    /* 图表数据 */
    {
        key: 'useApiData',
        compType: 'switch',
        label: '动态数据',
        displayItems: {
            t: ['apiReqUrl', 'apiMethod', 'apiParam', 'apiResHandle'],
            f: ['chartData'],
        }, //显隐控制
    },
    {
        key: 'chartData',
        compType: 'input',
        label: '图表数据',
        inputType: 'textarea',
        readonly: true,
        showBtnGroup: true,
        stringify: true, //需要转义为字符串显示在表单中
    },
    {
        key: 'apiReqUrl',
        compType: 'input',
        label: '接口地址',
        hide: true, //默认隐藏
    },
    {
        key: 'apiMethod',
        compType: 'select',
        label: '请求方式',
        options: [
            { value: 'get', label: 'GET请求' },
            { value: 'post', label: 'POST请求' },
        ],
        hide: true,
    },
    {
        key: 'apiParam',
        compType: 'input',
        label: '请求传参',
        inputType: 'textarea',
        readonly: true,
        showBtnGroup: true,
        stringify: true,
        hide: true,
    },
    {
        key: 'apiResHandle',
        compType: 'input',
        label: '数据处理',
        inputType: 'textarea',
        readonly: true,
        showBtnGroup: true,
        hide: true,
    },
    /* 提示框 */
    {
        key: 'tooltipFmt',
        compType: 'input',
        label: '提示框模板字符串',
        tooltip: '例：`{a} &lt;br/&gt;{b} : {c} ({d}%)`',
    },
    /* 标题配置 */
    {
        key: 'title',
        compType: 'input',
        label: '图表标题',
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
        compType: 'numOrText',
        label: '标题左侧偏移',
        tooltip: '可以为像素值或位置字符串(left/center/right)',
    },
    {
        key: 'titlePosTop',
        compType: 'numOrText',
        label: '标题上侧偏移',
        tooltip: '可以为像素值或位置字符串(top/center/bottom)',
    },
    /* 事件 */
    {
        key: 'chartEvents',
        compType: 'events',
        label: null,
        labelOnTop: true, //标签在上面
    },
]

/* 图例 */
export const legendOpts = [
    {
        key: 'showLegend',
        compType: 'switch',
        label: '显示图例',
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
        key: 'legendOrient',
        compType: 'select',
        label: '图例排列',
        options: [
            { value: 'horizontal', label: '横排' },
            { value: 'vertical', label: '竖排' },
        ],
    },
]
