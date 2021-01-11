/*
 * @Description: 页面基础配置项（画布）
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-01-11 14:49:25
 * @LastEditTime: 2021-01-11 17:27:10
 */
export default [
    {
        key: 'title',
        label: '页面名称',
        compType: 'input',
    },
    {
        key: 'router',
        compType: 'input',
        label: '路由地址',
    },
    {
        key: 'screenSize',
        label: '画布尺寸',
        compType: 'numberArray',
    },
    {
        key: 'bgColor',
        compType: 'color',
        label: '背景颜色',
    },
    {
        key: 'useBgImage',
        compType: 'switch',
        label: '使用图片背景',
        displayItems: {
            t: ['bgImage'],
        }, //显隐控制
    },
    {
        key: 'bgImage',
        compType: 'image',
        label: '背景图片',
        hide: true,
    },
    {
        key: 'showGrid',
        compType: 'switch',
        label: '显示网格',
    },
]
