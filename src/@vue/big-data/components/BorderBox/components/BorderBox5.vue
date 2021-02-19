<!--
 * @Description: 边框组件5
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-07 18:00:52
 * @LastEditTime: 2021-02-19 10:40:31
-->
<template>
    <div class="border-box-5">
        <svg
            :class="`border-svg-container  ${reverse && 'reverse'}`"
            :width="width"
            :height="height"
        >
            <polygon
                :fill="backgroundColor"
                :points="`10, 22 ${width - 22}, 22 ${width - 22}, ${
                    height - 86
                } ${width - 84}, ${height - 24} 10, ${height - 24}`"
            />
            <polyline
                class="bb5-line-1"
                :stroke="color[0]"
                :points="`8, 5 ${width - 5}, 5 ${width - 5}, ${height - 100} ${
                    width - 100
                }, ${height - 5} 8, ${height - 5} 8, 5`"
            />
            <polyline
                class="bb5-line-2"
                :stroke="color[1]"
                :points="`3, 5 ${width - 20}, 5 ${width - 20}, ${height - 60} ${
                    width - 74
                }, ${height - 5} 3, ${height - 5} 3, 5`"
            />
            <polyline
                class="bb5-line-3"
                :stroke="color[1]"
                :points="`50, 13 ${width - 35}, 13`"
            />
            <polyline
                class="bb5-line-4"
                :stroke="color[1]"
                :points="`15, 20 ${width - 35}, 20`"
            />
            <polyline
                class="bb5-line-5"
                :stroke="color[1]"
                :points="`15, ${height - 20} ${width - 110}, ${height - 20}`"
            />
            <polyline
                class="bb5-line-6"
                :stroke="color[1]"
                :points="`15, ${height - 13} ${width - 110}, ${height - 13}`"
            />
        </svg>
        <div class="border-box-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BorderBox5',
    props: {
        color: {
            //线条色
            type: Array,
            default: () => [
                'rgba(255, 255, 255, 0.35)',
                'rgba(255, 255, 255, 0.20)',
            ],
            validator(val) {
                return val.length >= 2 //限制颜色为双色
            },
        },
        reverse: {
            //翻转
            type: Boolean,
            default: false,
        },
        backgroundColor: {
            //背景色
            type: String,
            default: 'transparent',
        },
        width: Number,
        height: Number,
    },
}
</script>

<style lang="scss" scoped>
.border-box-5 {
    position: relative;
    width: 100%;
    height: 100%;

    .reverse {
        transform: rotate(180deg);
    }

    .border-svg-container {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;

        & > polyline {
            fill: none;
        }
    }

    .bb5-line-1,
    .bb5-line-2 {
        stroke-width: 1;
    }

    .bb5-line-3,
    .bb5-line-6 {
        stroke-width: 5;
    }

    .bb5-line-4,
    .bb5-line-5 {
        stroke-width: 2;
    }

    .border-box-content {
        position: relative;
        width: 100%;
        height: 100%;
    }
}
</style>
