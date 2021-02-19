<!--
 * @Description: 边框组件2
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-07 18:00:29
 * @LastEditTime: 2021-02-19 10:39:26
-->
<template>
    <div class="border-box-2">
        <svg class="border-svg-container" :width="width" :height="height">
            <polygon
                :fill="backgroundColor"
                :points="`7, 7 ${width - 7}, 7 ${width - 7}, ${height - 7} 7, ${
                    height - 7
                }`"
            />
            <polyline
                :stroke="color[0]"
                :points="`2, 2 ${width - 2} ,2 ${width - 2}, ${height - 2} 2, ${
                    height - 2
                } 2, 2`"
            />
            <polyline
                :stroke="color[1]"
                :points="`6, 6 ${width - 6}, 6 ${width - 6}, ${height - 6} 6, ${
                    height - 6
                } 6, 6`"
            />
            <circle :fill="color[0]" cx="11" cy="11" r="1" />
            <circle :fill="color[0]" :cx="width - 11" cy="11" r="1" />
            <circle :fill="color[0]" :cx="width - 11" :cy="height - 11" r="1" />
            <circle :fill="color[0]" cx="11" :cy="height - 11" r="1" />
        </svg>

        <div class="border-box-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BorderBox2',
    props: {
        color: {
            //线条色
            type: Array,
            default: () => ['#fff', 'rgba(255, 255, 255, 0.6)'],
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
}
</script>

<style lang="scss" scoped>
.border-box-2 {
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
            stroke-width: 1;
        }
    }

    .border-box-content {
        position: relative;
        width: 100%;
        height: 100%;
    }
}
</style>
