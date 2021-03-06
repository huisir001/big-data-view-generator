/*
 * @Description: 配置公共Option
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2021-01-19 10:58:59
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
            t: [
                'apiReqUrl',
                'apiMethod',
                'apiParam',
                'apiResHandle',
                'openTimingRefresh',
                'refreshPeriod',
            ],
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
    {
        key: 'openTimingRefresh',
        compType: 'switch',
        label: '定时刷新',
        hide: true,
    },
    {
        key: 'refreshPeriod',
        compType: 'slider',
        label: '定时刷新周期/秒',
        min: 1,
        max: 15,
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
        compType: 'numOrSelect',
        label: '标题左侧偏移',
        options: [
            { value: 'left', label: '居左' },
            { value: 'center', label: '居中' },
            { value: 'right', label: '居右' },
        ],
    },
    {
        key: 'titlePosTop',
        compType: 'numOrSelect',
        label: '标题上侧偏移',
        options: [
            { value: 'top', label: '居上' },
            { value: 'center', label: '居中' },
            { value: 'bottom', label: '居下' },
        ],
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
        displayItems: {
            t: [
                'legendPosLeft',
                'legendPosTop',
                'legendOrient',
                'legendFontColor',
                'legendFontWeight',
                'legendFontSize',
                'legendItemWidth',
                'legendItemHeight',
                'legendItemGap',
            ],
        },
    },
    {
        key: 'legendPosLeft',
        compType: 'numOrSelect',
        label: '图例左侧偏移',
        options: [
            { value: 'left', label: '居左' },
            { value: 'center', label: '居中' },
            { value: 'right', label: '居右' },
        ],
    },
    {
        key: 'legendPosTop',
        compType: 'numOrSelect',
        label: '图例上侧偏移',
        options: [
            { value: 'top', label: '居上' },
            { value: 'center', label: '居中' },
            { value: 'bottom', label: '居下' },
        ],
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
        key: 'legendFontColor',
        compType: 'color',
        label: '图例字体颜色',
    },
    {
        key: 'legendFontWeight',
        compType: 'select',
        label: '图例字体粗细',
        options: [
            { value: 'normal', label: '正常' },
            { value: 'bold', label: '加粗' },
            { value: 'bolder', label: '更粗' },
            { value: 'lighter', label: '更细' },
        ],
    },
    {
        key: 'legendFontSize',
        compType: 'slider',
        label: '图例字号',
        min: 0,
        max: 50,
    },
    {
        key: 'legendItemWidth',
        compType: 'slider',
        label: '图例图标宽度',
        min: 0,
        max: 50,
    },
    {
        key: 'legendItemHeight',
        compType: 'slider',
        label: '图例图标高度',
        min: 0,
        max: 50,
    },
    {
        key: 'legendItemGap',
        compType: 'slider',
        label: '图例各项间隔宽度',
        min: 0,
        max: 50,
    },
]

/* 边距 */
export const backGauge = [
    {
        key: 'left',
        compType: 'slider',
        label: '左边距',
        min: 0,
        max: 200,
    },
    {
        key: 'top',
        compType: 'slider',
        label: '上边距',
        min: 0,
        max: 200,
    },
    {
        key: 'right',
        compType: 'slider',
        label: '右边距',
        min: 0,
        max: 200,
    },
    {
        key: 'bottom',
        compType: 'slider',
        label: '下边距',
        min: 0,
        max: 200,
    },
]
