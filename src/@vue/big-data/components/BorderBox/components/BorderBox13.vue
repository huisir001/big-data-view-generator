<!--
 * @Description: 边框组件13
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-07 18:04:14
 * @LastEditTime: 2021-02-18 11:37:19
-->
<template>
    <div class="border-box-13">
        <svg class="border-svg-container" :width="width" :height="height">
            <path
                :fill="backgroundColor"
                :stroke="color[0]"
                :d="`
          M 5 20 L 5 10 L 12 3  L 60 3 L 68 10
          L ${width - 20} 10 L ${width - 5} 25
          L ${width - 5} ${height - 5} L 20 ${height - 5}
          L 5 ${height - 20} L 5 20
        `"
            />

            <path
                fill="transparent"
                stroke-width="3"
                stroke-linecap="round"
                stroke-dasharray="10, 5"
                :stroke="color[0]"
                :d="`M 16 9 L 61 9`"
            />

            <path
                fill="transparent"
                :stroke="color[1]"
                :d="`M 5 20 L 5 10 L 12 3  L 60 3 L 68 10`"
            />

            <path
                fill="transparent"
                :stroke="color[1]"
                :d="`M ${width - 5} ${height - 30} L ${width - 5} ${
                    height - 5
                } L ${width - 30} ${height - 5}`"
            />
        </svg>

        <div class="border-box-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BorderBox13',
    props: {
        color: {
            //线条色
            type: Array,
            default: () => ['#6586ec', '#2cf7fe'],
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
.border-box-13 {
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
