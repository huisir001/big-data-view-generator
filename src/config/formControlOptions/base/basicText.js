/*
 * @Description: 基础文本组件配置项
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-02-05 16:40:53
 * @LastEditTime: 2021-02-05 17:59:22
 */

import { publicOpts } from './common'
export default [
    ...publicOpts,
    {
        key: 'isHtml',
        compType: 'switch',
        label: '渲染HTML标签',
        tooltip: '可添加p标签用于分段<br>添加br标签用于换行',
    },
    {
        key: 'isLink',
        compType: 'switch',
        label: '添加超链',
        displayItems: {
            t: ['href'],
        }, //显隐控制
    },
    {
        key: 'href',
        compType: 'input',
        label: '跳转链接',
        tooltip: '请填写带`http://`的链接<br>也可以使用`javascript:`执行js脚本',
        hide: true,
    },
    {
        key: 'target',
        label: '跳转方式',
        compType: 'select',
        options: [
            { value: '_blank', label: '新窗口打开' },
            { value: '_self', label: '当前框架中打开' },
            { value: '_parent', label: '父框架中打开' },
            { value: '_top', label: '当前窗口中打开' },
        ],
    },
    {
        key: 'fontFamily',
        compType: 'input',
        label: '字体类型',
    },
    {
        key: 'fontSize',
        compType: 'slider',
        label: '字号',
        min: 12,
        max: 50,
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
        key: 'textIndent',
        compType: 'slider',
        label: '缩进/em',
        min: 0,
        max: 10,
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
