<!--
 * @Description: 边框组件6
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-07 18:00:52
 * @LastEditTime: 2020-09-08 14:40:43
-->
<template>
    <div class="border-box-6">
        <svg class="border-svg-container"
             :width="width"
             :height="height">
            <polygon :fill="backgroundColor"
                     :points="` 9, 7 ${width - 9}, 7 ${width - 9}, ${height - 7} 9, ${height - 7}`" />
            <circle :fill="color[1]"
                    cx="5"
                    cy="5"
                    r="2" />
            <circle :fill="color[1]"
                    :cx="width - 5"
                    cy="5"
                    r="2" />
            <circle :fill="color[1]"
                    :cx="width - 5"
                    :cy="height - 5"
                    r="2" />
            <circle :fill="color[1]"
                    cx="5"
                    :cy="height - 5"
                    r="2" />
            <polyline :stroke="color[0]"
                      :points="`10, 4 ${width - 10}, 4`" />
            <polyline :stroke="color[0]"
                      :points="`10, ${height - 4} ${width - 10}, ${height - 4}`" />
            <polyline :stroke="color[0]"
                      :points="`5, 70 5, ${height - 70}`" />
            <polyline :stroke="color[0]"
                      :points="`${width - 5}, 70 ${width - 5}, ${height - 70}`" />
            <polyline :stroke="color[0]"
                      :points="`3, 10, 3, 50`" />
            <polyline :stroke="color[0]"
                      :points="`7, 30 7, 80`" />
            <polyline :stroke="color[0]"
                      :points="`${width - 3}, 10 ${width - 3}, 50`" />
            <polyline :stroke="color[0]"
                      :points="`${width - 7}, 30 ${width - 7}, 80`" />
            <polyline :stroke="color[0]"
                      :points="`3, ${height - 10} 3, ${height - 50}`" />
            <polyline :stroke="color[0]"
                      :points="`7, ${height - 30} 7, ${height - 80}`" />
            <polyline :stroke="color[0]"
                      :points="`${width - 3}, ${height - 10} ${width - 3}, ${height - 50}`" />
            <polyline :stroke="color[0]"
                      :points="`${width - 7}, ${height - 30} ${width - 7}, ${height - 80}`" />
        </svg>
        <div class="border-box-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import autoResize from '../../mixins/autoResize'

export default {
    name: 'borderBox6',
    mixins: [autoResize],
    props: {
        color: {
            //线条色
            type: Array,
            default: () => ['rgba(255, 255, 255, 0.35)', 'gray'],
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
.border-box-6 {
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
