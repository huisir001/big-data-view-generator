<!--
 * @Description: 边框组件3
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-07 18:00:52
 * @LastEditTime: 2021-02-18 11:35:04
-->
<template>
    <div class="border-box-3">
        <svg class="border-svg-container" :width="width" :height="height">
            <polygon
                :fill="backgroundColor"
                :points="`23, 23 ${width - 24}, 23 ${width - 24}, ${
                    height - 24
                } 23, ${height - 24}`"
            />
            <polyline
                class="bb3-line1"
                :stroke="color[0]"
                :points="`4, 4 ${width - 22} ,4 ${width - 22}, ${
                    height - 22
                } 4, ${height - 22} 4, 4`"
            />
            <polyline
                class="bb3-line2"
                :stroke="color[1]"
                :points="`10, 10 ${width - 16}, 10 ${width - 16}, ${
                    height - 16
                } 10, ${height - 16} 10, 10`"
            />
            <polyline
                class="bb3-line2"
                :stroke="color[1]"
                :points="`16, 16 ${width - 10}, 16 ${width - 10}, ${
                    height - 10
                } 16, ${height - 10} 16, 16`"
            />
            <polyline
                class="bb3-line2"
                :stroke="color[1]"
                :points="`22, 22 ${width - 4}, 22 ${width - 4}, ${
                    height - 4
                } 22, ${height - 4} 22, 22`"
            />
        </svg>
        <div class="border-box-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import autoResize from '../../../mixins/autoResize'
export default {
    name: 'BorderBox3',
    mixins: [autoResize],
    props: {
        color: {
            //线条色
            type: Array,
            default: () => ['#2862b7', '#2862b7'],
            validator(val) {
                return val.length >= 2 //限制颜色为双色
            },
        },
        backgroundColor: {
            //背景色
            type: String,
            default: 'transparent',
        },
    },
}
</script>

<style lang="scss" scoped>
.border-box-3 {
    position: relative;
    width: 100%;
    height: 100%;

    .border-svg-container {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;

        & > polyline {
            fill: none;
        }
    }

    .bb3-line1 {
        stroke-width: 3;
    }

    .bb3-line2 {
        stroke-width: 1;
    }

    .border-box-content {
        position: relative;
        width: 100%;
        height: 100%;
    }
}
</style>
