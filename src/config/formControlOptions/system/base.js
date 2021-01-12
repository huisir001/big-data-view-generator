/*
 * @Description: 页面基础配置项（画布）
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-01-11 14:49:25
 * @LastEditTime: 2021-01-12 16:54:53
 */
export default [
    {
        key: 'title',
        label: '页面名称',
        compType: 'input',
    },
    {
        key: 'screenSize',
        label: '画布尺寸',
        compType: 'numberArray',
        min: 0,
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
        galleryType: 'page',
        hide: true,
    },
    {
        key: 'showGrid',
        compType: 'switch',
        label: '显示网格',
    },
]
