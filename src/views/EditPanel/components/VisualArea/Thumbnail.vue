<!--
 * @Description: 缩略图/导览图
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月10日 09:33:27
 * @LastEditTime: 2020-09-22 09:47:10
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
               @click="setBlueprintScale(.1)"></i>
            <i class="el-icon-zoom-out"
               title="缩小"
               @click="setBlueprintScale(-.1)"></i>
            <i class="el-icon-refresh-left"
               title="还原"
               @click="setBlueprintScale(0)"></i>
        </div>
        <!-- 操作面板区 -->
        <div class="viewBox"
             :style="viewBoxStyle"></div>
        <!-- 缩放比例 -->
        <div class="scaleTxt">{{parseInt(blueprintScale*100)}}%</div>
        <!-- 悬浮快用于点击事件 -->
        <div class="floatBox"
             @click="floatBoxClick"></div>
        <!-- 滑块 -->
        <div class="slider"
             :style="sliderStyle"
             @mousemove="sliderMove"
             @mousedown="sliderDown"
             @mouseup="sliderDown"
             @mouseleave="sliderLeave"></div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('system')
export default {
    name: 'Thumbnail',
    props: ['visualAreaSize', 'platformSize'],
    data() {
        return {
            isMin: false,
            sliderMouseEnter: false,
            sliderMouseOffset: [0, 0],
            sliderPos: [0, 0],
        }
    },
    computed: {
        ...mapState([
            'screenSize',
            'blueprintPos',
            'blueprintScale',
            'optionPanelShow',
            'platformPos',
        ]),
        //操作区域实际尺寸
        blueprintSize() {
            const { screenSize, blueprintScale } = this
            return [
                screenSize[0] * blueprintScale,
                screenSize[1] * blueprintScale,
            ]
        },
        //缩略图缩略倍数
        thumbnailSizeScale() {
            const { platformSize } = this
            return Math.max(platformSize[0] / 220, platformSize[1] / 120)
        },
        //缩略图样式
        thumbnailStyle() {
            const {
                blueprintSize,
                isMin,
                thumbnailSizeScale,
                platformSize,
                optionPanelShow,
            } = this
            return {
                width: platformSize[0] / thumbnailSizeScale + 2 + 'px',
                height: platformSize[1] / thumbnailSizeScale + 2 + 'px',
                bottom: isMin
                    ? platformSize[1] / -thumbnailSizeScale - 2 + 'px'
                    : '5px',
                right: optionPanelShow ? '285px' : '5px',
            }
        },
        //操作面板区样式
        viewBoxStyle() {
            const { blueprintPos, blueprintSize, thumbnailSizeScale } = this
            return {
                width: blueprintSize[0] / thumbnailSizeScale + 'px',
                height: blueprintSize[1] / thumbnailSizeScale + 'px',
                left: blueprintPos[0] / thumbnailSizeScale + 'px',
                top: blueprintPos[1] / thumbnailSizeScale + 'px',
            }
        },
        //滑块尺寸
        sliderSize() {
            const { visualAreaSize, thumbnailSizeScale } = this
            return [
                visualAreaSize[0] / thumbnailSizeScale,
                visualAreaSize[1] / thumbnailSizeScale,
            ]
        },
        //滑块样式
        sliderStyle() {
            const { sliderSize, sliderPos } = this
            return {
                width: sliderSize[0] + 'px',
                height: sliderSize[1] + 'px',
                left: sliderPos[0] + 'px',
                top: sliderPos[1] + 'px',
            }
        },
    },
    watch: {
        sliderPos(val) {
            //限制滑块及视图跟随
            this.sliderEmit(val)
        },
    },
    methods: {
        ...mapMutations(['setBlueprintScale', 'setPlatformPos']),
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
        //限制滑块及视图跟随
        sliderEmit(val) {
            const {
                visualAreaSize,
                platformSize,
                thumbnailSizeScale,
                setPlatformPos,
            } = this
            //限制滑块移动位置
            val[0] < 0 && (val[0] = 0)
            val[1] < 0 && (val[1] = 0)
            const maxLeft =
                    visualAreaSize[0] >= platformSize[0]
                        ? 0
                        : Math.abs(
                              visualAreaSize[0] / thumbnailSizeScale -
                                  platformSize[0] / thumbnailSizeScale
                          ),
                maxTop =
                    visualAreaSize[1] >= platformSize[1]
                        ? 0
                        : Math.abs(
                              visualAreaSize[1] / thumbnailSizeScale -
                                  platformSize[1] / thumbnailSizeScale
                          )
            val[0] > maxLeft && (val[0] = maxLeft)
            val[1] > maxTop && (val[1] = maxTop)
            //视图跟随
            setPlatformPos([
                val[0] * -thumbnailSizeScale,
                val[1] * -thumbnailSizeScale,
            ])
        },
        //点击缩略图改变工作台位置
        floatBoxClick({ offsetX, offsetY }) {
            this.sliderPos = [
                offsetX - this.sliderSize[0] / 2,
                offsetY - this.sliderSize[1] / 2,
            ]
        },
    },
}
</script>
<style lang="scss" scoped>
.thumbnail {
    position: fixed;
    bottom: 5px;
    z-index: 999;
    border: 1px solid #fff;
    transition: 0.3s;
    background: rgba(0, 0, 0, 0.6);
    @mixin btn-group {
        position: absolute;
        color: #fff;
        line-height: 1;
        font-size: 20px;
        right: 0;
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
    .viewBox {
        position: absolute;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid #1f5277;
    }
    .floatBox {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }
    .slider {
        position: absolute;
        border: 1px solid #2681ff;
        background: #2680ff3f;
        cursor: all-scroll;
    }
    .scaleTxt {
        position: absolute;
        bottom: 2px;
        right: 4px;
        font-size: 12px;
        color: #68696b;
        font-family: emoji;
        -webkit-touch-callout: none;
        user-select: none;
    }
}
</style>