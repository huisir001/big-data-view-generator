<!--
 * @Description: 全局容器(计算缩放比例)
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-03 18:30:51
 * @LastEditTime: 2020-09-04 11:25:23
-->
<template>
    <div class="screenContainer"
         :style="{width:screenWidth+'px',height:screenHeight+'px',transform}">
        <template v-if="ready">
            <slot></slot>
        </template>
    </div>
</template>

<script>
import autoResize from '../../mixins/autoResize'

export default {
    name: 'screenContainer',
    mixins: [autoResize],
    data() {
        return {
            screenWidth: document.head
                .querySelector('[name=screen]')
                .getAttribute('width'), //屏幕分辨率-宽
            screenHeight: document.head
                .querySelector('[name=screen]')
                .getAttribute('height'), //屏幕分辨率-高
            transform: 'scale(1)',
            ready: false,
        }
    },
    methods: {
        afterAutoResizeMixinInit() {
            //初始化
            this.onResize()
            this.ready = true
        },
        onResize() {
            const currentWidth = document.body.clientWidth
            this.transform = `scale(${currentWidth / this.screenWidth})` //计算缩放比例
        },
    },
}
</script>

<style lang="scss" scoped>
.screenContainer {
    position: fixed;
    left: 0px;
    overflow: hidden;
    transform-origin: left center;
    z-index: 999;
    padding: 2vw 3vw;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
}
</style>
