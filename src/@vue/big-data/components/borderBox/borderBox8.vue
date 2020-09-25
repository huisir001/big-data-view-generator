<!--
 * @Description: 边框组件8
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-07 18:00:52
 * @LastEditTime: 2020-09-08 14:40:57
-->
<template>
    <div class="border-box-8">
        <svg class="border-svg-container"
             :width="width"
             :height="height">
            <defs>
                <path :id="path"
                      :d="pathD"
                      fill="transparent" />
                <radialGradient :id="gradient"
                                cx="50%"
                                cy="50%"
                                r="50%">
                    <stop offset="0%"
                          stop-color="#fff"
                          stop-opacity="1" />
                    <stop offset="100%"
                          stop-color="#fff"
                          stop-opacity="0" />
                </radialGradient>
                <mask :id="mask">
                    <circle cx="0"
                            cy="0"
                            r="150"
                            :fill="`url(#${gradient})`">
                        <animateMotion :dur="`${dur}s`"
                                       :path="pathD"
                                       rotate="auto"
                                       repeatCount="indefinite" />
                    </circle>
                </mask>
            </defs>
            <polygon :fill="backgroundColor"
                     :points="`5, 5 ${width - 5}, 5 ${width - 5} ${height - 5} 5, ${height - 5}`" />
            <use :stroke="color[0]"
                 stroke-width="1"
                 :xlink:href="`#${path}`" />
            <use :stroke="color[1]"
                 stroke-width="3"
                 :xlink:href="`#${path}`"
                 :mask="`url(#${mask})`">
                <animate attributeName="stroke-dasharray"
                         :from="`0, ${length}`"
                         :to="`${length}, 0`"
                         :dur="`${dur}s`"
                         repeatCount="indefinite" />
            </use>
        </svg>
        <div class="border-box-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import autoResize from '../../mixins/autoResize'
import { getRanId } from '@/utils/myUtils'

export default {
    name: 'BorderBox8',
    mixins: [autoResize],
    props: {
        color: {
            //线条色
            type: Array,
            default: () => ['#235fa7', '#4fd2dd'],
            validator(val) {
                return val.length >= 2 //限制颜色为双色
            },
        },
        dur: {
            //单次动画时长/秒-默认3秒
            type: Number,
            default: 3,
        },
        backgroundColor: {
            //背景色
            type: String,
            default: 'transparent',
        },
        reverse: {
            //反向动画
            type: Boolean,
            default: false,
        },
    },
    data() {
        const id = getRanId()
        return {
            path: `border-box-8-path-${id}`,
            gradient: `border-box-8-gradient-${id}`,
            mask: `border-box-8-mask-${id}`,
        }
    },
    computed: {
        length() {
            const { width, height } = this
            return (width + height - 5) * 2
        },
        pathD() {
            const { reverse, width, height } = this

            if (reverse)
                return `M 2.5, 2.5 L 2.5, ${height - 2.5} L ${width - 2.5}, ${
                    height - 2.5
                } L ${width - 2.5}, 2.5 L 2.5, 2.5`

            return `M2.5, 2.5 L${width - 2.5}, 2.5 L${width - 2.5}, ${
                height - 2.5
            } L2.5, ${height - 2.5} L2.5, 2.5`
        },
    },
}
</script>

<style lang="scss" scoped>
.border-box-8 {
    position: relative;
    width: 100%;
    height: 100%;

    .border-svg-container {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0px;
        top: 0px;
    }

    .border-box-content {
        position: relative;
        width: 100%;
        height: 100%;
    }
}
</style>
