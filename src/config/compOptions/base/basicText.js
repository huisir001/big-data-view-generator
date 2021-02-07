/*
 * @Description: 基础文本组件配置项
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-02-05 16:40:53
 * @LastEditTime: 2021-02-07 18:40:27
 */

import { publicOpts } from './common'
export default {
    ...publicOpts,
    staticData: '示例文字',
    isHtml: false,
    isLink: false,
    href: '',
    target: '_blank',
    fontFamily: 'auto',
    fontSize: 15,
    fontColor: '#cccccc',
    fontWeight: 'normal',
    textDecoration: 'none',
    textIndent: 0,
    textAlign: 'unset',
    background: 'rgba(255,255,255,0)',
    showTextShadow: false,
    textShadowColor: '#000000',
    textShadowBlur: 3,
    textShadowOffsetX: 2,
    textShadowOffsetY: 2,
}
