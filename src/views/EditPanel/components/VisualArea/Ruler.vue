<!--
 * @Description: 刻度尺
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月21日 16:16:49
 * @LastEditTime: 2021-01-12 18:18:21
-->
<template>
    <div class="ruler">
        <!-- x刻度尺 -->
        <div class="ruler-top" :style="rulerTopStyle">
            <!-- 60像素刻度线 -->
            <div
                v-for="(_, i) in parseInt(
                    (pageOptions.screenSize[0] * blueprintScale) / 60 + 1
                )"
                :key="i"
                class="l"
            >
                <span>{{ parseInt((i * 60) / blueprintScale) }}</span>
                <!-- 均分10份 -->
                <div class="s"></div>
            </div>
        </div>
        <!-- y刻度尺 -->
        <div class="ruler-left" :style="rulerLeftStyle">
            <div
                v-for="(_, i) in parseInt(
                    (pageOptions.screenSize[1] * blueprintScale) / 60 + 1
                )"
                :key="i"
                class="l"
            >
                <span>{{ parseInt((i * 60) / blueprintScale) }}</span>
                <div class="s"></div>
            </div>
        </div>
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('system')
export default {
    name: 'Ruler',
    data() {
        return {}
    },
    computed: {
        ...mapState(['pageOptions', 'platformPos', 'blueprintScale']),
        //上标尺样式
        rulerTopStyle() {
            return {
                left: this.platformPos[0] + 'px',
            }
        },
        //左标尺样式
        rulerLeftStyle() {
            return {
                top: this.platformPos[1] + 'px',
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.ruler {
    @mixin ruler {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        display: flex;
        background: #000;
        color: #7a8286;
        font-size: 12px;
        .l {
            border-color: #3f4346;
            line-height: 25px;
            position: relative;
            /* 禁止选择文字 */
            -webkit-touch-callout: none;
            user-select: none;
            .s {
                position: absolute;
                background-size: 6px 6px;
            }
        }
    }
    .ruler-top {
        @include ruler;
        height: 25px;
        padding-left: 60px;
        .l {
            width: 60px;
            height: 100%;
            border-left: 1px solid;
            padding-left: 3px;
            .s {
                width: 100%;
                height: 5px;
                bottom: 0;
                left: -1px;
                background-image: linear-gradient(
                    to left,
                    transparent 5px,
                    #5a6064 6px
                );
            }
        }
    }
    .ruler-left {
        @include ruler;
        flex-direction: column;
        width: 25px;
        padding-top: 60px;
        .l {
            height: 60px;
            width: 100%;
            border-top: 1px solid;
            padding-top: 3px;
            .s {
                height: 100%;
                width: 5px;
                right: 0;
                top: -1px;
                background-image: linear-gradient(
                    to top,
                    transparent 5px,
                    #5a6064 6px
                );
            }
            span {
                display: inline-block;
                width: 25px;
                height: 25px;
                transform: rotate(90deg);
                transform-origin: center;
            }
        }
    }
}
</style>
