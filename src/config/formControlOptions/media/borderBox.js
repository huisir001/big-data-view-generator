/*
 * @Description: 内置边框组件配置项
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-02-18 16:27:07
 * @LastEditTime: 2021-02-18 17:50:48
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
    {
        key: 'borderBoxId',
        label: '选择边框',
        compType: 'select',
        options: [
            {
                label: '边框1',
                value: '1',
                displayItems: {
                    f: ['reverse', 'transDur', 'titleWidth', 'title'],
                },
            },
            {
                label: '边框2',
                value: '2',
                displayItems: {
                    f: ['reverse', 'transDur', 'titleWidth', 'title'],
                },
            },
            {
                label: '边框3',
                value: '3',
                displayItems: {
                    f: ['reverse', 'transDur', 'titleWidth', 'title'],
                },
            },
            {
                label: '边框4',
                value: '4',
                displayItems: {
                    f: ['transDur', 'titleWidth', 'title'],
                    t: ['reverse'],
                },
            },
            {
                label: '边框5',
                value: '5',
                displayItems: {
                    f: ['transDur', 'titleWidth', 'title'],
                    t: ['reverse'],
                },
            },
            {
                label: '边框6',
                value: '6',
                displayItems: {
                    f: ['reverse', 'transDur', 'titleWidth', 'title'],
                },
            },
            {
                label: '边框7',
                value: '7',
                displayItems: {
                    f: ['reverse', 'transDur', 'titleWidth', 'title'],
                },
            },
            {
                label: '边框8',
                value: '8',
                displayItems: {
                    f: ['titleWidth', 'title'],
                    t: ['reverse', 'transDur'],
                },
            },
            {
                label: '边框9',
                value: '9',
                displayItems: {
                    f: ['reverse', 'transDur', 'titleWidth', 'title'],
                },
            },
            {
                label: '边框10',
                value: '10',
                displayItems: {
                    f: ['reverse', 'transDur', 'titleWidth', 'title'],
                },
            },
            {
                label: '边框11',
                value: '11',
                displayItems: {
                    f: ['reverse', 'transDur'],
                    t: ['titleWidth', 'title'],
                },
            },
            {
                label: '边框12',
                value: '12',
                displayItems: {
                    f: ['reverse', 'transDur', 'titleWidth', 'title'],
                },
            },
            {
                label: '边框13',
                value: '13',
                displayItems: {
                    f: ['reverse', 'transDur', 'titleWidth', 'title'],
                },
            },
        ],
    },
    {
        key: 'useDefaultColor',
        compType: 'switch',
        label: '默认色',
        displayItems: {
            f: ['colors'],
        },
    },
    {
        key: 'colors',
        compType: 'baseArray',
        label: '颜色配置',
        labelOnTop: true,
        itemType: 'color',
        hide: true,
    },
    {
        key: 'bgColor',
        compType: 'color',
        label: '填充色',
    },
    {
        key: 'reverse',
        compType: 'switch',
        label: '翻转',
        hide: true,
    },
    {
        key: 'transDur',
        compType: 'slider',
        label: '动画时长',
        min: 2,
        max: 10,
        hide: true,
    },
    {
        key: 'titleWidth',
        label: '标题宽度',
        compType: 'number',
        min: 50,
        hide: true,
    },
    {
        key: 'title',
        label: '标题',
        compType: 'input',
        hide: true,
    },
]
