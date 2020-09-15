<!--
 * @Description: 缩略图
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月10日 09:33:27
 * @LastEditTime: 2020-09-15 14:20:07
-->
<template>
    <div class="thumbnail"
         :style="thumbnailStyle">
        <!-- 按钮 -->
        <div class="btn-group">
            <i class="el-icon-sort"
               title="窗口推拉"
               @click="isMin=!isMin"></i>
            <i class="el-icon-zoom-in"
               title="放大"
               @click="setViewPanelScale(.1)"></i>
            <i class="el-icon-zoom-out"
               title="缩小"
               @click="setViewPanelScale(-.1)"></i>
            <i class="el-icon-refresh-left"
               title="还原"
               @click="setViewPanelScale(0)"></i>
        </div>
        <!-- 滑块 -->
        <div class="slider"
             :style="sliderStyle"
             @mousemove="sliderMove"
             @mousedown="sliderDown"
             @mouseup="sliderDown"
             @mouseleave="sliderLeave">展示区域</div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('system')
export default {
    name: 'thumbnail',
    props: ['platformSize'],
    data() {
        return {
            isMin: false,
            sliderMouseEnter: false,
            sliderMouseOffset: [0, 0],
            sliderPos: [0, 0],
        }
    },
    computed: {
        ...mapState(['screenSize', 'viewPanelPos', 'viewPanelScale']),
        //操作区域实际尺寸
        viewPanelSize() {
            const { screenSize, viewPanelScale } = this
            return [
                screenSize[0] * viewPanelScale,
                screenSize[1] * viewPanelScale,
            ]
        },
        //缩略图缩略倍数
        thumbnailSizeScale() {
            return Math.max(this.screenSize[0] / 250, this.screenSize[1] / 150)
        },
        //缩略图样式
        thumbnailStyle() {
            const {
                viewPanelSize,
                isMin,
                thumbnailSizeScale,
                platformSize,
            } = this
            let temp = []
            viewPanelSize[0] < platformSize[0]
                ? (temp[0] = platformSize[0])
                : (temp[0] = viewPanelSize[0])
            viewPanelSize[1] < platformSize[1]
                ? (temp[1] = platformSize[1])
                : (temp[1] = viewPanelSize[1])
            return {
                width: temp[0] / thumbnailSizeScale + 2 + 'px',
                height: temp[1] / thumbnailSizeScale + 2 + 'px',
                bottom: isMin
                    ? temp[1] / -thumbnailSizeScale - 2 + 'px'
                    : '5px',
            }
        },
        //滑块样式
        sliderStyle() {
            const { platformSize, sliderPos, thumbnailSizeScale } = this
            return {
                width: platformSize[0] / thumbnailSizeScale + 'px',
                height: platformSize[1] / thumbnailSizeScale + 'px',
                left: sliderPos[0] + 'px',
                top: sliderPos[1] + 'px',
            }
        },
    },
    watch: {
        sliderPos(val) {
            const {
                viewPanelSize,
                platformSize,
                setViewPanelPos,
                thumbnailSizeScale,
            } = this
            //限制滑块移动位置
            val[0] < 0 && (val[0] = 0)
            val[1] < 0 && (val[1] = 0)
            const maxLeft =
                    viewPanelSize[0] < platformSize[0]
                        ? 0
                        : Math.abs(
                              viewPanelSize[0] / thumbnailSizeScale +
                                  2 -
                                  platformSize[0] / thumbnailSizeScale -
                                  2
                          ),
                maxTop =
                    viewPanelSize[1] < platformSize[1]
                        ? 0
                        : Math.abs(
                              viewPanelSize[1] / thumbnailSizeScale +
                                  2 -
                                  platformSize[1] / thumbnailSizeScale -
                                  2
                          )
            val[0] > maxLeft && (val[0] = maxLeft)
            val[1] > maxTop && (val[1] = maxTop)
            //视图跟随
            setViewPanelPos([
                val[0] * -thumbnailSizeScale,
                val[1] * -thumbnailSizeScale,
            ])
        },
    },
    methods: {
        ...mapMutations(['setViewPanelPos', 'setViewPanelScale']),
        //鼠标按下抬起
        sliderDown({ type, offsetX, offsetY }) {
            this.sliderMouseEnter = type == 'mousedown'
            this.sliderMouseOffset = [offsetX, offsetY]
            return false
        },
        //鼠标滑动
        sliderMove({ offsetX, offsetY }) {
            let { sliderMouseEnter, sliderMouseOffset, sliderPos } = this
            if (sliderMouseEnter) {
                this.sliderPos = [
                    sliderPos[0] + offsetX - sliderMouseOffset[0],
                    sliderPos[1] + offsetY - sliderMouseOffset[1],
                ]
            }
            return false
        },
        //鼠标区域离开
        sliderLeave() {
            this.sliderMouseEnter = false
            return false
        },
    },
}
</script>
<style lang="scss" scoped>
.thumbnail {
    position: absolute;
    bottom: 5px;
    left: 5px;
    z-index: 999;
    border: 1px solid #fff;
    transition: 0.3s;
    background: rgba(255, 255, 255, 0.3);
    @mixin btn-group {
        position: absolute;
        color: #fff;
        line-height: 1;
        font-size: 20px;
        left: 0;
        z-index: 1000;
        i {
            padding: 5px;
            cursor: pointer;
        }
    }
    .btn-group {
        @include btn-group;
        top: -32px;
        transition: 0.3s;
    }
    .slider {
        position: absolute;
        background: rgba(0, 0, 0, 0.4);
        cursor: all-scroll;
        color: #aaa;
        display: flex;
        align-items: center;
        justify-content: center;
        -webkit-touch-callout: none;
        user-select: none;
        font-size: 12px;
    }
}
</style>