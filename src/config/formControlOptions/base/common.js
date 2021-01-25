/*
 * @Description: 配置公共Option
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2021-01-25 16:53:33
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
    /* 样式 */
    {
        key: 'color',
        label: '字体颜色',
        compType: 'color',
    },
    {
        key: 'background',
        label: '背景颜色',
        compType: 'color',
    },

    /* 图表数据 */
    // {
    //     key: 'useApiData',
    //     compType: 'switch',
    //     label: '动态数据',
    //     displayItems: {
    //         t: [
    //             'apiReqUrl',
    //             'apiMethod',
    //             'apiParam',
    //             'apiResHandle',
    //             'openTimingRefresh',
    //             'refreshPeriod',
    //         ],
    //         f: ['chartData'],
    //     }, //显隐控制
    // },
    {
        key: 'chartData',
        compType: 'input',
        label: '图表数据',
        inputType: 'textarea',
        readonly: true,
        showBtnGroup: true,
        stringify: true, //需要转义为字符串显示在表单中
    },
    // {
    //     key: 'apiReqUrl',
    //     compType: 'input',
    //     label: '接口地址',
    //     hide: true, //默认隐藏
    // },
    // {
    //     key: 'apiMethod',
    //     compType: 'select',
    //     label: '请求方式',
    //     options: [
    //         { value: 'get', label: 'GET请求' },
    //         { value: 'post', label: 'POST请求' },
    //     ],
    //     hide: true,
    // },
    // {
    //     key: 'apiParam',
    //     compType: 'input',
    //     label: '请求传参',
    //     inputType: 'textarea',
    //     readonly: true,
    //     showBtnGroup: true,
    //     stringify: true,
    //     hide: true,
    // },
    // {
    //     key: 'apiResHandle',
    //     compType: 'input',
    //     label: '数据处理',
    //     inputType: 'textarea',
    //     readonly: true,
    //     showBtnGroup: true,
    //     hide: true,
    // },
    // {
    //     key: 'openTimingRefresh',
    //     compType: 'switch',
    //     label: '定时刷新',
    //     hide: true,
    // },
    // {
    //     key: 'refreshPeriod',
    //     compType: 'slider',
    //     label: '定时刷新周期/秒',
    //     min: 1,
    //     max: 15,
    //     hide: true,
    // },
    /* 事件 */
    // {
    //     key: 'chartEvents',
    //     compType: 'events',
    //     label: null,
    //     labelOnTop: true, //标签在上面
    // },
]
