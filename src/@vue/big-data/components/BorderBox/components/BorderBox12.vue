<!--
 * @Description: 边框组件12
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-07 18:00:52
 * @LastEditTime: 2021-02-19 10:41:26
-->
<template>
    <div class="border-box-12">
        <svg class="border-svg-container" :width="width" :height="height">
            <defs>
                <filter
                    :id="filterId"
                    height="150%"
                    width="150%"
                    x="-25%"
                    y="-25%"
                >
                    <feMorphology
                        operator="dilate"
                        radius="1"
                        in="SourceAlpha"
                        result="thicken"
                    />
                    <feGaussianBlur
                        in="thicken"
                        stdDeviation="2"
                        result="blurred"
                    />
                    <feFlood
                        :flood-color="colorToRgba(color[1], 0.7)"
                        result="glowColor"
                    >
                        <animate
                            attributeName="flood-color"
                            :values="`
                                    ${colorToRgba(color[1], 0.7)};
                                    ${colorToRgba(color[1], 0.3)};
                                    ${colorToRgba(color[1], 0.7)};
                                `"
                            dur="3s"
                            begin="0s"
                            repeatCount="indefinite"
                        />
                    </feFlood>
                    <feComposite
                        in="glowColor"
                        in2="blurred"
                        operator="in"
                        result="softGlowColored"
                    />
                    <feMerge>
                        <feMergeNode in="softGlowColored" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <path
                v-if="width && height"
                :fill="backgroundColor"
                stroke-width="2"
                :stroke="color[0]"
                :d="`
          M15 5 L ${width - 15} 5 Q ${width - 5} 5, ${width - 5} 15
          L ${width - 5} ${height - 15} Q ${width - 5} ${height - 5}, ${
                    width - 15
                } ${height - 5}
          L 15, ${height - 5} Q 5 ${height - 5} 5 ${height - 15} L 5 15
          Q 5 5 15 5
        `"
            />

            <path
                stroke-width="2"
                fill="transparent"
                stroke-linecap="round"
                :filter="`url(#${filterId})`"
                :stroke="color[1]"
                :d="`M 20 5 L 15 5 Q 5 5 5 15 L 5 20`"
            />

            <path
                stroke-width="2"
                fill="transparent"
                stroke-linecap="round"
                :filter="`url(#${filterId})`"
                :stroke="color[1]"
                :d="`M ${width - 20} 5 L ${width - 15} 5 Q ${width - 5} 5 ${
                    width - 5
                } 15 L ${width - 5} 20`"
            />

            <path
                stroke-width="2"
                fill="transparent"
                stroke-linecap="round"
                :filter="`url(#${filterId})`"
                :stroke="color[1]"
                :d="`
          M ${width - 20} ${height - 5} L ${width - 15} ${height - 5}
          Q ${width - 5} ${height - 5} ${width - 5} ${height - 15}
          L ${width - 5} ${height - 20}
        `"
            />

            <path
                stroke-width="2"
                fill="transparent"
                stroke-linecap="round"
                :filter="`url(#${filterId})`"
                :stroke="color[1]"
                :d="`
          M 20 ${height - 5} L 15 ${height - 5}
          Q 5 ${height - 5} 5 ${height - 15}
          L 5 ${height - 20}
        `"
            />
        </svg>

        <div class="border-box-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { getRanId, colorToRgba } from '../../../utils/myUtils'

export default {
    name: 'BorderBox12',
    props: {
        color: {
            //线条色
            type: Array,
            default: () => ['#2e6099', '#7ce7fd'],
            validator(val) {
                return val.length >= 2 //限制颜色为双色
            },
        },
        backgroundColor: {
            //背景色
            type: String,
            default: 'transparent',
        },
        width: Number,
        height: Number,
    },
    data() {
        const id = getRanId()
        return {
            filterId: `borderr-box-12-filterId-${id}`,
        }
    },
    methods: {
        colorToRgba,
    },
}
</script>

<style lang="scss" scoped>
.border-box-12 {
    position: relative;
    width: 100%;
    height: 100%;

    .border-svg-container {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
    }

    .border-box-content {
        position: relative;
        width: 100%;
        height: 100%;
    }
}
</style>
