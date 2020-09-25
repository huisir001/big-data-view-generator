<!--
 * @Description: 边框组件7
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-07 18:02:15
 * @LastEditTime: 2020-09-08 14:34:53
-->
<template>
    <div class="border-box-7"
         :style="`box-shadow: inset 0 0 40px ${color[0]}; border: 1px solid ${color[0]}; background-color: ${backgroundColor}`">
        <svg class="border-svg-container"
             :width="width"
             :height="height">
            <polyline class="bb7-line-width-2"
                      :stroke="color[0]"
                      :points="`0, 25 0, 0 25, 0`" />
            <polyline class="bb7-line-width-2"
                      :stroke="color[0]"
                      :points="`${width - 25}, 0 ${width}, 0 ${width}, 25`" />
            <polyline class="bb7-line-width-2"
                      :stroke="color[0]"
                      :points="`${width - 25}, ${height} ${width}, ${height} ${width}, ${height - 25}`" />
            <polyline class="bb7-line-width-2"
                      :stroke="color[0]"
                      :points="`0, ${height - 25} 0, ${height} 25, ${height}`" />
            <polyline class="bb7-line-width-5"
                      :stroke="color[1]"
                      :points="`0, 10 0, 0 10, 0`" />
            <polyline class="bb7-line-width-5"
                      :stroke="color[1]"
                      :points="`${width - 10}, 0 ${width}, 0 ${width}, 10`" />
            <polyline class="bb7-line-width-5"
                      :stroke="color[1]"
                      :points="`${width - 10}, ${height} ${width}, ${height} ${width}, ${height - 10}`" />
            <polyline class="bb7-line-width-5"
                      :stroke="color[1]"
                      :points="`0, ${height - 10} 0, ${height} 10, ${height}`" />
        </svg>

        <div class="border-box-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import autoResize from '../../mixins/autoResize'

export default {
    name: 'BorderBox7',
    mixins: [autoResize],
    props: {
        color: {
            //线条色
            type: Array,
            default: () => ['rgba(128,128,128,0.3)', 'rgba(128,128,128,0.5)'],
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
.border-box-7 {
    position: relative;
    width: 100%;
    height: 100%;

    .border-svg-container {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;

        & > polyline {
            fill: none;
            stroke-linecap: round;
        }
    }

    .bb7-line-width-2 {
        stroke-width: 2;
    }

    .bb7-line-width-5 {
        stroke-width: 5;
    }

    .border-box-content {
        position: relative;
        width: 100%;
        height: 100%;
    }
}
</style>
