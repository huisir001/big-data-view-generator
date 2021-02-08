<!--
 * @Description: 时间文本（支持年月日时分秒、星期等各种格式）
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-02-05 10:48:14
 * @LastEditTime: 2021-02-08 16:38:36
-->
<template>
    <div class="time-text" :style="textStyle">
        <div v-if="myOptions.isHtml" v-html="content"></div>
        <template v-else>{{ content }}</template>
    </div>
</template>

<script>
import Config from './Config'
import others from '../../../mixins/others'
import { formatDate } from '../../../utils/myUtils'
export default {
    name: 'TimeText',
    mixins: [others],
    data() {
        return { Config }
    },
    computed: {
        content() {
            return formatDate(new Date(), this.myOptions.timeFormat)
        },
        textStyle() {
            const {
                fontSize,
                wordSpacing,
                fontColor,
                fontWeight,
                fontFamily,
                textDecoration,
                textAlign,
                background,
                showTextShadow,
                textShadowColor,
                textShadowBlur,
                textShadowOffsetX,
                textShadowOffsetY,
            } = this.myOptions
            return {
                fontSize: fontSize + 'px',
                wordSpacing: wordSpacing + 'px',
                color: fontColor,
                fontWeight: fontWeight,
                fontFamily: fontFamily || 'inherit',
                textDecoration: textDecoration,
                textAlign: textAlign,
                textShadow: showTextShadow
                    ? `${textShadowOffsetX}px ${textShadowOffsetY}px ${textShadowBlur}px ${textShadowColor}`
                    : 'none',
                background,
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.time-text {
    width: 100%;
    height: 100%;
    * {
        /* 全部继承父节点 */
        font-size: inherit;
        word-spacing: inherit;
        color: inherit;
        font-weight: inherit;
        font-family: inherit;
        text-decoration: inherit;
        text-shadow: inherit;
        text-align: inherit;
        background: inherit;
    }
}
</style>
