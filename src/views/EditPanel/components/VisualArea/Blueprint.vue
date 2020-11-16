<!--
 * @Description: 蓝图
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月10日 09:33:27
 * @LastEditTime: 2020-11-16 18:15:31
-->
<template>
    <div class="blueprint"
         :style="blueprintStyle"
         @contextmenu.prevent="layerCtxMenu">
        <!-- 图层渲染(采用动态组件) -->
        <div v-for="(item,index) in layers"
             v-show="item.show"
             :key="index"
             :class="{viewItem:true,act:item.active,locked:item.locked}"
             :data-index="index"
             @mousemove.prevent="layerMove"
             @mousedown.prevent="layerClick"
             @mouseup.prevent="layerClick"
             @mouseleave.prevent="layerLeave"
             :style="`width:${item.width}px;height:${item.height}px;left:${item.pos[0]}px;top:${item.pos[1]}px;z-index:${item.zIndex};`">
            <!-- 位置标线/缩放锚点 -->
            <template v-if="item.active">
                <div class="posLine-x"></div>
                <div class="posLine-y"></div>
                <!-- 锚点 -->
                <div v-for="anchor in 8"
                     :key="anchor"
                     :class="`anchor anchor-${anchor}`"
                     :data-index="index"
                     :data-anchor="anchor"
                     @mousemove.stop.prevent="anchorMove"
                     @mousedown.stop.prevent="anchorClick"
                     @mouseup.stop.prevent="anchorClick"
                     @mouseleave.stop.prevent="anchorLeave">{{anchor}}</div>
            </template>
            <!-- 动态组件 -->
            <component :is="item.type"
                       :options="item.compOptions"></component>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import autoResize from '@/mixin/autoResize'
const {
    mapState: mapStateSystem,
    mapMutations: mapMutationSystem,
    mapActions: mapActionSystem,
} = createNamespacedHelpers('system')
const {
    mapState: mapStateLayer,
    mapMutations: mapMutationLayer,
    mapGetters: mapGettersLayer,
} = createNamespacedHelpers('layer')
export default {
    name: 'Blueprint',
    mixins: [autoResize],
    data() {
        return {
            /* 图层拖拽状态 */
            layerMouseEnter: false, //是否按下鼠标
            layerMouseButton: 0, //按下鼠标键号（0-左键，1中键盘，2右键）
            layerMouseOffset: [0, 0], //鼠标相对于图层的位置
            layerMoveState: false, //鼠标按下拖动状态
            /* resize锚点状态 */
            anchorMouseEnter: false, //是否按下鼠标
            anchorMouseButton: 0, //按下鼠标键号（0-左键，1中键盘，2右键）
            anchorMouseOffset: [0, 0], //鼠标相对于图层的位置
            anchorMoveState: false, //鼠标按下拖动状态
        }
    },
    computed: {
        ...mapStateSystem([
            'screenSize',
            'blueprintPos',
            'blueprintScale',
            'curkeydownCodes',
            'showLayerCtxMenu',
        ]), //系统信息
        ...mapStateLayer(['layers']), //图层信息,已选定图层
        ...mapGettersLayer(['activeLayers', 'layerString']), //选定图层、layer string
        blueprintStyle() {
            const { screenSize, blueprintPos, blueprintScale } = this
            return {
                width: screenSize[0] + 'px',
                height: screenSize[1] + 'px',
                left: blueprintPos[0] + 'px',
                top: blueprintPos[1] + 'px',
                transform: `scale(${blueprintScale})`,
                // backgroundImage: 'url(assets/img/bg.jpg)',
            }
        },
    },
    watch: {
        layerString(data) {
            //实时存储
            sessionStorage.setItem(`layers`, data)
        },
    },
    methods: {
        ...mapMutationSystem([
            'setBlueprintDomRect',
            'setShowLayerCtxMenu',
            'setLayerCtxMenu',
        ]),
        ...mapActionSystem(['domAddEventListener']),
        ...mapMutationLayer(['setLayer']), //修改图层，设置选定图层
        //初始化钩子
        afterAutoResizeMixinInit() {
            //更新视图操作面板实际参数
            this.setBlueprintDomRect()
        },
        //dom变化及窗口调整钩子
        onResize() {
            //更新视图操作面板实际参数
            this.setBlueprintDomRect()
        },
        //改变图层选定状态
        setActiveLayer(layer, isAct) {
            let newLayer = { ...layer }
            newLayer.active = isAct
            this.setLayer(newLayer)
        },
        //图层选定
        layerSelect(layer) {
            //新增选定图层
            //按住ctrl单击为多选
            const {
                curkeydownCodes,
                setLayer,
                layerMouseEnter,
                activeLayers,
                setActiveLayer,
            } = this

            if (curkeydownCodes.includes(17)) {
                //多选时，鼠标抬起为选定，单选时鼠标按下即为选定
                //取消选定时，判断是否有拖动，没拖动的话则取消选定
                if (!layerMouseEnter) {
                    if (this.activeLayers.find((item) => item.id == layer.id)) {
                        this.layerMoveState || setActiveLayer(layer, false)
                    } else {
                        setActiveLayer(layer, true)
                    }
                }
            } else {
                //如果没有选定，则选定，如果已选定，则无效
                //只有按下才选定，抬起不选定
                if (
                    !this.activeLayers.find((item) => item.id == layer.id) &&
                    layerMouseEnter
                ) {
                    //单选时只选定一个，取消其他选定的图层
                    activeLayers.forEach((item) => {
                        setActiveLayer(item, false)
                    })
                    //选定当前图层
                    setActiveLayer(layer, true)
                }
            }
        },
        /* 图层事件绑定 */
        layerClick({ type, button, offsetX, offsetY, target }) {
            const { index } = target.dataset
            if (this.layers[index].locked) return false //上锁图层return
            //状态改变
            this.layerMouseEnter = type == 'mousedown'
            //鼠标按键改变
            this.layerMouseButton = button
            //鼠标按下重置拖动状态
            this.layerMouseEnter && (this.layerMoveState = false)
            //图层选择
            this.layerSelect(this.layers[index])
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
            //只有按下+左键才能拖动，右键不可
            if (layerMouseEnter && this.layerMouseButton == 0) {
                //拖动指示
                this.layerMoveState = true
                //改变图层位置
                activeLayers.forEach((item) => {
                    item.pos = [
                        item.pos[0] + offsetX - layerMouseOffset[0],
                        item.pos[1] + offsetY - layerMouseOffset[1],
                    ]
                    setLayer(item)
                })
            }
        },
        //鼠标离开图层
        layerLeave() {
            this.layerMouseEnter = false
        },
        /* Resize锚点事件绑定 */
        anchorClick({ type, button, offsetX, offsetY, target }) {
            const { index } = target.dataset
            if (this.layers[index].locked) return false //上锁图层return
            //状态改变
            this.anchorMouseEnter = type == 'mousedown'
            //鼠标按键改变
            this.anchorMouseButton = button
            //鼠标按下重置拖动状态
            this.anchorMouseEnter && (this.anchorMoveState = false)
            //记录鼠标位置
            this.anchorMouseOffset = [offsetX, offsetY]
        },
        anchorMove({ offsetX, offsetY, target }) {
            const { index, anchor } = target.dataset
            let {
                anchorMouseEnter,
                anchorMouseOffset,
                anchorMouseButton,
                setLayer,
                layers,
            } = this
            let curLayer = layers[index] //当前图层

            //只有按下+左键才能拖动，右键不可
            if (anchorMouseEnter && anchorMouseButton == 0) {
                //拖动指示
                this.anchorMoveState = true

                console.log(anchor)

                //改变图层尺寸及位置
                curLayer.width = curLayer.width + offsetX - anchorMouseOffset[0]
                curLayer.height =
                    curLayer.height + offsetY - anchorMouseOffset[1]
                curLayer.compOptions.lastChangeTime = Date.now() //改变图表配置时间戳以便实时刷新图表
                setLayer(curLayer)
            }
        },
        anchorLeave() {
            this.anchorMouseEnter = false
        },
        //图层右键菜单事件
        layerCtxMenu({ clientX, clientY, target }) {
            const { setShowLayerCtxMenu, setLayerCtxMenu, layers } = this
            //显示菜单
            setShowLayerCtxMenu(true)
            //设置当前菜单(判断当前右键事件是在图层上点击还是面板上)
            setLayerCtxMenu({
                pos: [clientX, clientY],
                layer:
                    target.dataset.index == undefined
                        ? null
                        : layers[target.dataset.index],
            })
        },
    },
    mounted() {
        //document添加事件-左键按下隐藏右键菜单
        const { domAddEventListener, setShowLayerCtxMenu } = this
        let self = this
        domAddEventListener({
            evType: 'onmousedown',
            func({ button }) {
                if (button != 0 || !self.showLayerCtxMenu) return false //非鼠标左键或菜单非激活return
                setShowLayerCtxMenu(false) //隐藏图层右键菜单
            },
        })
    },
}
</script>
<style lang="scss" scoped>
.blueprint {
    position: absolute;
    background-image: url(../../../../assets/img/bg.jpg);
    background-position: center top;
    background-size: cover;
    background-repeat: no-repeat;
    transform-origin: 0 0 0; //缩放参考点
    box-shadow: #000 0 0 30px 0;
    .viewItem {
        position: absolute;
        cursor: move;
        border: 1px solid rgba(117, 242, 247, 0.2);
        $border-act: 1px dashed #0ff;
        &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
        }
        @mixin act {
            border: $border-act;
            background-color: rgba(115, 170, 229, 0.5);
            opacity: 0.9;
        }
        &:hover {
            @include act;
        }
        &.locked {
            border: none;
            cursor: default;
            &:hover {
                border: none;
                background-color: transparent;
                opacity: 1;
            }
        }
        &.act {
            @include act;
            .posLine-x {
                position: absolute;
                width: 1px;
                height: 1000vh;
                border-left: $border-act;
                left: -1px;
                bottom: 0;
            }
            .posLine-y {
                position: absolute;
                width: 1000vw;
                height: 1px;
                border-top: $border-act;
                top: -1px;
                right: 0;
            }
            .anchor {
                position: absolute;
                width: 10px;
                height: 10px;
                border: 5px solid transparent;
                background: #0ff;
                border-radius: 50%;
                &.anchor-1,
                &.anchor-2,
                &.anchor-3 {
                    top: -5px;
                }
                &.anchor-1,
                &.anchor-4,
                &.anchor-6 {
                    left: -5px;
                }
                &.anchor-2,
                &.anchor-7 {
                    left: calc(50% - 5px);
                }
                &.anchor-3,
                &.anchor-5,
                &.anchor-8 {
                    right: -5px;
                }
                &.anchor-4,
                &.anchor-5 {
                    top: calc(50% - 5px);
                }
                &.anchor-6,
                &.anchor-7,
                &.anchor-8 {
                    bottom: -5px;
                }
                &.anchor-3,
                &.anchor-6 {
                    cursor: ne-resize;
                }
                &.anchor-1,
                &.anchor-8 {
                    cursor: nw-resize;
                }
                &.anchor-2,
                &.anchor-7 {
                    cursor: n-resize;
                }
                &.anchor-4,
                &.anchor-5 {
                    cursor: w-resize;
                }
            }
        }
    }
}
</style>