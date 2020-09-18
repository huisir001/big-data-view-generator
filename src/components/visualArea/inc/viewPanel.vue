<!--
 * @Description: 视图面板
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月10日 09:33:27
 * @LastEditTime: 2020-09-18 13:55:29
-->
<template>
    <div class="viewPanel"
         :style="viewPanelStyle">
        <!-- 图层渲染 -->
        <div v-for="(item,index) in layers"
             class="viewItem"
             :key="index"
             :ref="item.id"
             :data-id="item.id"
             :data-index="index"
             :data-type="item.type"
             @mousemove.prevent="layerMove"
             @mousedown.prevent="layerClick"
             @mouseup.prevent="layerClick"
             @mouseleave.prevent="layerLeave"
             @contextmenu.prevent="layerMenu"
             :style="`width:${item.width}px;height:${item.height}px;left:${item.pos[0]}px;top:${item.pos[1]}px;z-index:${item.zIndex};`">
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import autoResize from '@/components/mixin/autoResize'
const {
    mapState: mapStateSystem,
    mapMutations: mapMutationSystem,
    mapActions: mapActionSystem,
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
            activeLayers: [], //已激活图层（已选定）,只存图层id，避免图层改变同时改变
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
            'showLayerMenu',
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
        //反序列化图层(避免watch中监听的图层新旧图层参数一致)
        layersString() {
            return JSON.stringify(this.layers)
        },
    },
    watch: {
        layersString(newStr, oldStr) {
            //有layers删除的话，更新activeLayers已激活图层
            const newLayers = JSON.parse(newStr),
                oldLayers = JSON.parse(oldStr)
            if (newLayers.length < oldLayers.length) {
                //求差集
                let diff = oldLayers.find(
                    ({ id }) => !newLayers.map((item) => item.id).includes(id)
                )
                this.deleteActiveLayer(diff)
            }
            //有图层上锁的话，移除选定图层
            if (newLayers.length == oldLayers.length) {
                //求上锁差集
                let diff = oldLayers.find(
                    ({ id, locked }, index) =>
                        newLayers[index].id == id &&
                        newLayers[index].locked != locked
                )
                //有上锁图层的话执行删除，无上锁图层的话考虑是配置项变动或拖拽（位置变动）
                diff && this.deleteActiveLayer(diff)
            }
        },
    },
    methods: {
        ...mapMutationSystem([
            'setViewPanelDomRect',
            'setShowLayerMenu',
            'setLayerMenu',
        ]),
        ...mapActionSystem(['domAddEventListener']),
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
            const hasLyIndex = this.activeLayers.indexOf(layer.id)
            if (curkeydownCodes.includes(17)) {
                //若无 则push
                if (hasLyIndex >= 0) {
                    // this.activeLayers.splice(hasLyIndex, 1) //若有-删除图层(多图层拖拽时会删除，故bug)
                    return
                } else {
                    this.activeLayers.includes(layer.id) ||
                        this.activeLayers.push(layer.id)
                }
            } else {
                this.activeLayers = [layer.id]
            }
            //选定样式
            for (let ref in this.$refs) {
                //已删除的图层这里没更新，排除一下
                if (this.$refs[ref].length != 0) {
                    this.activeLayers.includes(ref)
                        ? (this.$refs[ref][0].className = 'viewItem act')
                        : (this.$refs[ref][0].className = 'viewItem')
                }
            }
        },
        //删除选定图层
        deleteActiveLayer(layer) {
            //已激活图层中是否有删除的图层
            let delindex = this.activeLayers.indexOf(layer.id)
            if (delindex >= 0) {
                //删除已激活图层中的删除的图层
                this.activeLayers.splice(delindex, 1)
                //选定样式
                for (let ref in this.$refs) {
                    //已删除的图层这里没更新，排除一下
                    if (this.$refs[ref].length != 0) {
                        this.activeLayers.includes(ref)
                            ? (this.$refs[ref][0].className = 'viewItem act')
                            : (this.$refs[ref][0].className = 'viewItem')
                    }
                }
            }
        },

        /* 图层事件绑定 */
        layerClick({ type, button, offsetX, offsetY, target }) {
            const { index } = target.dataset
            if (button != 0 || this.layers[index].locked) return false //非鼠标左键及上锁图层return
            //状态改变
            this.layerMouseEnter = type == 'mousedown'
            //图层选择
            this.layerMouseEnter && this.layerSelect(this.layers[index])
            //记录鼠标位置
            this.layerMouseOffset = [offsetX, offsetY]
        },
        layerMove({ offsetX, offsetY }) {
            let {
                layerMouseEnter,
                layerMouseOffset,
                activeLayers,
                setLayer,
                layers,
            } = this
            if (layerMouseEnter) {
                activeLayers.forEach((_id) => {
                    //赋值另一个变量，防止操作出错
                    let item = {
                        ...layers.find(({ id }) => id == _id),
                    }
                    item.pos = [
                        item.pos[0] + offsetX - layerMouseOffset[0],
                        item.pos[1] + offsetY - layerMouseOffset[1],
                    ]
                    setLayer(item)
                })
            }
        },
        layerLeave() {
            this.layerMouseEnter = false
        },
        //右键菜单事件
        layerMenu({ clientX, clientY, target }) {
            const { setShowLayerMenu, setLayerMenu, layers } = this
            //显示菜单
            setShowLayerMenu(true)
            //设置当前菜单
            setLayerMenu({
                pos: [clientX, clientY],
                layer: layers[target.dataset.index],
            })
        },
    },
    mounted() {
        //document添加事件-左键按下隐藏右键菜单
        const { domAddEventListener, setShowLayerMenu } = this
        let self = this
        domAddEventListener({
            evType: 'onmousedown',
            func({ button }) {
                if (button != 0 || !self.showLayerMenu) return false //非鼠标左键或菜单非激活return
                setShowLayerMenu(false) //隐藏图层右键菜单
            },
        })
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
        cursor: grab;
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