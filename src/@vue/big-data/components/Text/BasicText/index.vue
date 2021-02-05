<!--
 * @Description: 基础文本
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-02-05 10:42:42
 * @LastEditTime: 2021-02-05 16:26:18
-->
<template>
    <div class="basic-text" :style="textStyle">
        <template v-if="myOptions.isLink">
            <a :href="myOptions.href" :target="myOptions.target || '_self'">
                <template v-if="myOptions.isHtml" v-html="content"></template>
                <template v-else>{{ content }}</template>
            </a>
        </template>
        <template v-else>
            <template v-if="myOptions.isHtml" v-html="content"></template>
            <template v-else>{{ content }}</template>
        </template>
    </div>
</template>

<script>
import Config from './Config'
import others from '../../mixins/others'
export default {
    name: 'BasicText',
    mixins: [others],
    data() {
        return { Config }
    },
    computed: {
        content() {
            const { myOptions } = this
            return myOptions.useApiData
                ? myOptions.dynamicData || ''
                : myOptions.staticData
        },
        textStyle() {
            const {
                fontSize,
                fontColor,
                fontWeight,
                fontFamily,
                textDecoration,
                textIndent,
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
                color: fontColor,
                fontWeight: fontWeight,
                fontFamily: fontFamily || 'inherit',
                textDecoration: textDecoration,
                textIndent: textIndent + 'em',
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
.basic-text {
    width: 100%;
    height: 100%;
    * {
        /* 全部继承父节点 */
        font-size: inherit;
        color: inherit;
        font-weight: inherit;
        font-family: inherit;
        text-decoration: inherit;
        text-indent: inherit;
        text-shadow: inherit;
        text-align: inherit;
        background: inherit;
    }
}
</style>
