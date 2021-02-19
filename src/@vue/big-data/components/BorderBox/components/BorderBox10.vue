<!--
 * @Description: 边框组件10
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-07 18:03:24
 * @LastEditTime: 2021-02-19 10:41:08
-->
<template>
    <div
        class="border-box-10"
        :style="`box-shadow: inset 0 0 25px 3px ${color[0]}`"
    >
        <svg class="border-svg-container" :width="width" :height="height">
            <polygon
                :fill="backgroundColor"
                :points="`
                        4, 0 ${width - 4}, 0 ${width}, 4 ${width}, ${
                    height - 4
                } ${width - 4}, ${height}
                        4, ${height} 0, ${height - 4} 0, 4
                    `"
            />
        </svg>
        <svg
            width="150px"
            height="150px"
            :key="item"
            v-for="item in border"
            :class="`${item} border-svg-container`"
        >
            <polygon
                :fill="color[1]"
                points="40, 0 5, 0 0, 5 0, 16 3, 19 3, 7 7, 3 35, 3"
            />
        </svg>
        <div class="border-box-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BorderBox10',
    props: {
        color: {
            //线条色
            type: Array,
            default: () => ['#1d48c4', '#d3e1f8'],
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
        return {
            border: ['left-top', 'right-top', 'left-bottom', 'right-bottom'],
        }
    },
}
</script>

<style lang="scss" scoped>
.border-box-10 {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 6px;

    .border-svg-container {
        position: absolute;
        display: block;
    }

    .right-top {
        right: 0px;
        transform: rotateY(180deg);
    }

    .left-bottom {
        bottom: 0px;
        transform: rotateX(180deg);
    }

    .right-bottom {
        right: 0px;
        bottom: 0px;
        transform: rotateX(180deg) rotateY(180deg);
    }

    .border-box-content {
        position: relative;
        width: 100%;
        height: 100%;
    }
}
</style>
