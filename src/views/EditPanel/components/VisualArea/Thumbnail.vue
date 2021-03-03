<!--
 * @Description: 缩略图/导览图
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月10日 09:33:27
 * @LastEditTime: 2021-03-03 11:05:42
-->
<template>
    <div class="thumbnail" :style="thumbnailStyle">
        <!-- 按钮 -->
        <div class="btn-group">
            <i
                class="el-icon-sort"
                title="窗口推拉"
                @click="isMin = !isMin"
            ></i>
            <i
                class="el-icon-zoom-in"
                title="放大"
                @click="setBlueprintScale(0.1)"
            ></i>
            <i
                class="el-icon-zoom-out"
                title="缩小"
                @click="setBlueprintScale(-0.1)"
            ></i>
            <i
                class="el-icon-refresh-left"
                title="还原"
                @click="setThumbnailRefresh"
            ></i>
        </div>
        <!-- 操作面板区 -->
        <div class="viewBox" :style="viewBoxStyle"></div>
        <!-- 缩放比例 -->
        <div class="scaleTxt">{{ parseInt(blueprintScale * 100) }}%</div>
        <!-- 悬浮快用于点击事件 -->
        <div class="floatBox" @click="floatBoxClick"></div>
        <!-- 滑块 -->
        <div
            class="slider"
            :style="sliderStyle"
            @mousedown.prevent="sliderClick"
            @mouseup.prevent="sliderClick"
        ></div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('system')
export default {
    name: 'Thumbnail',
    props: ['visualAreaSize', 'platformSize'],
    data() {
        return {
            isMin: false,
            sliderMouseEnter: false,
            sliderMouseOffset: [0, 0],
            sliderPos: [0, 0],
            initialSliderPos: [0, 0], //记录初始滑块位置
            /* Dom层事件状态 */
            domMouseEnter: false, //鼠标按下
            mouseMoveState: false, //鼠标拖动状态
        }
    },
    computed: {
        ...mapState([
            'pageOptions',
            'blueprintPos',
            'blueprintScale',
            'optionPanelShow',
            'platformPos',
        ]),
        //操作区域实际尺寸
        blueprintSize() {
            const { pageOptions, blueprintScale } = this
            return [
                pageOptions.screenSize[0] * blueprintScale,
                pageOptions.screenSize[1] * blueprintScale,
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
                right: optionPanelShow ? '325px' : '5px',
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
    mounted() {
        //document添加事件
        const {
            domAddEventListener,
            domMousedown,
            domMousemove,
            domMouseup,
        } = this
        domAddEventListener({
            evType: 'onmousedown',
            func: domMousedown,
        })
        domAddEventListener({
            evType: 'onmousemove',
            func: domMousemove,
        })
        domAddEventListener({
            evType: 'onmouseup',
            func: domMouseup,
        })
    },
    methods: {
        ...mapMutations(['setBlueprintScale', 'setPlatformPos']),
        ...mapActions(['domAddEventListener']),
        //全局鼠标按下
        domMousedown({ button }) {
            if (button != 0) return false //非鼠标左键return
            //状态改变
            this.domMouseEnter = true
        },
        //全局鼠标拖拽
        domMousemove({ button, clientX, clientY }) {
            //非鼠标左键return
            if (button != 0) return false
            //拖动指示
            this.mouseMoveState = true
            //滑块拖动
            let {
                sliderMouseEnter,
                sliderMouseOffset,
                sliderPos,
                domMouseEnter,
                initialSliderPos,
            } = this
            if (sliderMouseEnter && domMouseEnter) {
                this.sliderPos = [
                    initialSliderPos[0] + clientX - sliderMouseOffset[0],
                    initialSliderPos[1] + clientY - sliderMouseOffset[1],
                ]
            }
        },
        //全局鼠标抬起
        domMouseup({ button }) {
            if (button != 0) return false //非鼠标左键return
            //状态改变
            this.domMouseEnter = false
            this.sliderMouseEnter = false
        },
        //滑块鼠标按下抬起
        sliderClick({ type, button, clientX, clientY }) {
            //以下内容非鼠标左键return
            if (button != 0) return false
            this.sliderMouseEnter = type == 'mousedown'
            //记录鼠标位置
            this.sliderMouseOffset = [clientX, clientY]
            //鼠标按下重置拖动状态
            this.sliderMouseEnter && (this.mouseMoveState = false)
            //记录滑块初始位置状态
            this.initialSliderPos = JSON.parse(JSON.stringify(this.sliderPos))
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
        setThumbnailRefresh() {
            this.setBlueprintScale(0)
            this.sliderPos = [0, 0]
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