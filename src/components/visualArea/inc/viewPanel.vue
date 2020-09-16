<!--
 * @Description: 视图面板
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月10日 09:33:27
 * @LastEditTime: 2020-09-16 22:55:36
-->
<template>
    <div class="viewPanel"
         :style="viewPanelStyle">
        <!-- 图层渲染 -->
        <div v-for="(item,index) in layers"
             class="viewItem"
             title="左键选定图层，ctrl+左键多选或取消"
             :key="index"
             :ref="item.id"
             :data-id="item.id"
             :data-index="index"
             :data-type="item.type"
             @mousemove="layerMove"
             @mousedown="layerDown"
             @mouseup="layerDown"
             @mouseleave="layerLeave"
             :style="`width:${item.width}px;height:${item.height}px;left:${item.pos[0]}px;top:${item.pos[1]}px;z-index:${item.zIndex};`"></div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import autoResize from '@/components/mixin/autoResize'
const {
    mapState: mapStateSystem,
    mapMutations: mapMutationSystem,
} = createNamespacedHelpers('system')
const {
    mapState: mapStateLayer,
    mapMutations: mapMutationLayer,
} = createNamespacedHelpers('layer')
export default {
    name: 'viewPanel',
    mixins: [autoResize],
    data() {
        return {
            activeLayers: [], //已激活图层（已选定）
            layerMouseEnter: false,
            layerMouseOffset: [0, 0],
        }
    },
    computed: {
        ...mapStateSystem([
            'screenSize',
            'viewPanelPos',
            'viewPanelScale',
            'curkeydownCodes',
        ]), //系统信息
        ...mapStateLayer(['layers']), //图层信息
        viewPanelStyle() {
            const { screenSize, viewPanelPos, viewPanelScale } = this
            return {
                width: screenSize[0] + 'px',
                height: screenSize[1] + 'px',
                left: viewPanelPos[0] + 'px',
                top: viewPanelPos[1] + 'px',
                transform: `scale(${viewPanelScale})`,
                // backgroundImage: 'url(assets/img/bg.jpg)',
            }
        },
    },
    methods: {
        ...mapMutationSystem(['setViewPanelDomRect']),
        ...mapMutationLayer(['setLayer']),
        //初始化钩子
        afterAutoResizeMixinInit() {
            //更新视图操作面板实际参数
            this.setViewPanelDomRect()
        },
        //dom变化及窗口调整钩子
        onResize() {
            //更新视图操作面板实际参数
            this.setViewPanelDomRect()
        },
        //图层选定
        layerSelect(layer) {
            //新增选定图层
            //按住ctrl单击为多选
            const { curkeydownCodes } = this
            const hasLyIndex = this.activeLayers
                .map((item) => item.id)
                .indexOf(layer.id)
            if (curkeydownCodes.includes(17)) {
                //若无 则push
                if (hasLyIndex >= 0) {
                    this.activeLayers.splice(hasLyIndex, 1) //若有-删除图层
                } else {
                    this.activeLayers
                        .map((item) => item.id)
                        .includes(layer.id) || this.activeLayers.push(layer)
                }
            } else {
                this.activeLayers = [layer]
            }
            //选定样式
            for (let ref in this.$refs) {
                this.activeLayers.map((item) => item.id).includes(ref)
                    ? (this.$refs[ref][0].className = 'viewItem act')
                    : (this.$refs[ref][0].className = 'viewItem')
            }
        },

        /* 图层事件绑定 */
        layerDown({ type, offsetX, offsetY, target }) {
            const { index } = target.dataset
            //状态改变
            this.layerMouseEnter = type == 'mousedown'
            //图层选择
            this.layerMouseEnter && this.layerSelect(this.layers[index])
            //记录鼠标位置
            this.layerMouseOffset = [offsetX, offsetY]
            return false
        },
        layerMove({ offsetX, offsetY }) {
            let {
                layerMouseEnter,
                layerMouseOffset,
                activeLayers,
                setLayer,
            } = this
            if (layerMouseEnter) {
                activeLayers.forEach((item) => {
                    item.pos = [
                        item.pos[0] + offsetX - layerMouseOffset[0],
                        item.pos[1] + offsetY - layerMouseOffset[1],
                    ]
                    setLayer(item)
                })
            }
            return false
        },
        layerLeave() {
            this.layerMouseEnter = false
            return false
        },
    },
}
</script>
<style lang="scss" scoped>
.viewPanel {
    position: absolute;
    background-image: url(../../../assets/img/bg.jpg);
    background-position: center top;
    background-size: cover;
    background-repeat: no-repeat;
    transform-origin: 0 0 0; //缩放参考点
    box-shadow: #000 0 0 30px 0;
    .viewItem {
        position: absolute;
        background: red;
        border: 1px solid yellow;
        @mixin act {
            content: '';
            display: block;
            position: absolute;
        }
        $border-act: 1px dashed #0ff;
        &.act {
            border: $border-act;
            opacity: 0.5;
            &::before {
                @include act;
                width: 1px;
                height: 200vh;
                border-left: $border-act;
                left: -1px;
                bottom: -100vh;
            }
            &::after {
                @include act;
                width: 200vw;
                height: 1px;
                border-top: $border-act;
                top: -1px;
                right: -100vw;
            }
        }
    }
}
</style>