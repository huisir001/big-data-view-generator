/*
 * @Description: 配置公共Option
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2020-12-05 11:49:02
 */
export default [
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
    /* 图表 */
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
    {
        key: 'title',
        compType: 'input',
        label: '图表标题',
    },
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
    {
        key: 'showLegend',
        compType: 'switch',
        label: '显示图例',
    },
    {
        key: 'valEnding',
        compType: 'input',
        label: '刻度后缀',
    },
    {
        key: 'colors',
        compType: 'colors',
        label: '颜色配置',
        labelOnTop: true, //标签在上面
    },
    /* 事件 */
    {
        key: 'chartEvents',
        compType: 'events',
        label: null,
        labelOnTop: true, //标签在上面
    },
]
