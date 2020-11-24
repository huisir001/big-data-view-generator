<!--
 * @Description: 蓝图
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月10日 09:33:27
 * @LastEditTime: 2020-11-24 10:35:12
-->
<template>
    <div
        class="blueprint"
        :style="blueprintStyle"
        @contextmenu.prevent="layerCtxMenu"
    >
        <!-- 图层渲染(采用动态组件) -->
        <div
            v-for="(item, index) in layers"
            v-show="item.show"
            :key="index"
            :class="{ viewItem: true, act: item.active, locked: item.locked }"
            :data-index="index"
            @mousedown.prevent="layerClick"
            @mouseup.prevent="layerClick"
            :style="`width:${item.width}px;height:${item.height}px;left:${item.pos[0]}px;top:${item.pos[1]}px;z-index:${item.zIndex};`"
        >
            <!-- 位置标线/缩放锚点 -->
            <template v-if="item.active">
                <div class="posLine-x"></div>
                <div class="posLine-y"></div>
                <!-- 锚点 -->
                <div
                    v-for="anchor in 8"
                    :key="anchor"
                    :class="`anchor anchor-${anchor}`"
                    :data-index="index"
                    :data-anchor="anchor"
                    @mousedown.prevent="anchorClick"
                    @mouseup.prevent="anchorClick"
                ></div>
            </template>
            <!-- 动态组件 -->
            <component
                :is="item.type"
                :options="item.compOptions"
                style="overflow: hidden"
            ></component>
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
            /* Dom层事件状态 */
            domMouseEnter: false, //鼠标按下
            /* 图层事件拖拽状态 */
            layerMouseEnter: false, //是否按下鼠标
            layerMouseOffset: [0, 0], //鼠标位置
            layerMoveState: false, //鼠标按下拖动状态
            /* resize锚点事件状态 */
            anchorMouseEnter: false, //是否按下鼠标
            anchorMouseOffset: [0, 0], //鼠标位置
            curAnchor: null, //当前锚点
            curAnchorLayer: null, //记录锚点所在图层
            curAnchorLayerSize: null, //拷贝锚点所在图层尺寸
            curAnchorLayerPos: null, //拷贝锚点所在图层位置
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
        layerString(data, old) {
            //实时存储(实际不需要，只要在需要时候存储就行)
            // sessionStorage.setItem(`layers`, data)
            //缩放完成时改变图表配置时间戳以便实时刷新图表(这里处理手动更改配置栏尺寸的情况，非鼠标拖拽的情况)
            const oldLayers = JSON.parse(old),
                newLayers = JSON.parse(data)
            if (
                oldLayers[0] &&
                newLayers[0] &&
                (oldLayers[0].width != newLayers[0].width ||
                    oldLayers[0].height != newLayers[0].height)
            ) {
                this.curAnchorLayer ||
                    (this.activeLayers[0].compOptions.lastChangeTime = Date.now())
            }
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
        layerClick({ type, button, target, clientX, clientY }) {
            const { index } = target.dataset
            if (index && this.layers[index].locked) return false //上锁图层return
            //状态改变
            this.layerMouseEnter = type == 'mousedown'
            //鼠标按下重置拖动状态
            this.layerMouseEnter && (this.layerMoveState = false)
            //图层选择
            index && this.layerSelect(this.layers[index])

            //以下内容非鼠标左键return
            if (button != 0) return false

            //记录鼠标位置
            this.layerMouseOffset = [clientX, clientY]
            //记录图层初始状态
            this.initialActiveLayers = JSON.parse(
                JSON.stringify(this.activeLayers)
            )
        },
        /* Resize锚点事件绑定 */
        anchorClick({ type, button, clientX, clientY, target }) {
            const { index, anchor } = target.dataset
            if (button != 0 || (index && this.layers[index].locked))
                return false //非鼠标左键、上锁图层return
            //状态改变
            this.anchorMouseEnter = type == 'mousedown'
            //记录鼠标位置
            this.anchorMouseOffset = [clientX, clientY]
            //记录当前锚点
            this.curAnchor = anchor
            //记录当前图层
            this.curAnchorLayer = this.layers[index]
            //拷贝当前图层尺寸
            const copyLayer = JSON.parse(JSON.stringify(this.layers[index]))
            this.curAnchorLayerSize = {
                width: copyLayer.width,
                height: copyLayer.height,
            }
            //拷贝当前图层位置
            this.curAnchorLayerPos = copyLayer.pos
        },
        //全局鼠标按下
        domMousedown({ button }) {
            if (button != 0) return false //非鼠标左键return
            const { showLayerCtxMenu, setShowLayerCtxMenu } = this
            //如果菜单激活隐藏图层右键菜单
            if (showLayerCtxMenu) {
                this.setShowLayerCtxMenu(false) //隐藏图层右键菜单
            }
            //状态改变
            this.domMouseEnter = true
        },
        //全局鼠标拖动
        domMousemove({ button, clientX, clientY }) {
            //非鼠标左键return
            if (button != 0) return false
            //拖动指示
            this.layerMoveState = true

            let {
                domMouseEnter,
                layerMouseEnter,
                layerMouseOffset,
                initialActiveLayers,
                activeLayers,
                setLayer,
                anchorMouseEnter,
                anchorMouseOffset,
                curAnchorLayer,
                curAnchorLayerSize,
                curAnchorLayerPos,
                curAnchor,
                blueprintScale,
            } = this

            //图层缩放（锚点事件）
            if (anchorMouseEnter && domMouseEnter) {
                //改变图层位置
                function curAnchorLayerPosReset(
                    { x, y } = { x: true, y: true }
                ) {
                    curAnchorLayer.pos = [
                        x
                            ? Math.floor(
                                  curAnchorLayerPos[0] +
                                      (clientX - layerMouseOffset[0]) /
                                          blueprintScale
                              )
                            : curAnchorLayerPos[0],
                        y
                            ? Math.floor(
                                  curAnchorLayerPos[1] +
                                      (clientY - layerMouseOffset[1]) /
                                          blueprintScale
                              )
                            : curAnchorLayerPos[1],
                    ]
                }
                //改变图层尺寸
                function curAnchorLayerSizeReset({ w, h }) {
                    const widthStr = w
                        ? `curAnchorLayer.width = Math.floor(curAnchorLayerSize.width ${w} (clientX - anchorMouseOffset[0]) / blueprintScale);`
                        : ''
                    const heightStr = h
                        ? `curAnchorLayer.height = Math.floor(curAnchorLayerSize.height ${h} (clientY - anchorMouseOffset[1]) / blueprintScale);`
                        : ''
                    eval(widthStr + heightStr) //字符串运行
                }
                //根据不同锚点执行不同运算
                switch (Number(curAnchor)) {
                    case 1:
                        curAnchorLayerSizeReset({ w: '-', h: '-' })
                        curAnchorLayerPosReset()
                        break
                    case 2:
                        curAnchorLayerSizeReset({ h: '-' })
                        curAnchorLayerPosReset({ x: false, y: true })
                        break
                    case 3:
                        curAnchorLayerSizeReset({ w: '+', h: '-' })
                        curAnchorLayerPosReset({ x: false, y: true })
                        break
                    case 4:
                        curAnchorLayerSizeReset({ w: '-' })
                        curAnchorLayerPosReset({ x: true, y: false })
                        break
                    case 5:
                        curAnchorLayerSizeReset({ w: '+' })
                        break
                    case 6:
                        curAnchorLayerSizeReset({ w: '-', h: '+' })
                        curAnchorLayerPosReset({ x: true, y: false })
                        break
                    case 7:
                        curAnchorLayerSizeReset({ h: '+' })
                        break
                    default:
                        curAnchorLayerSizeReset({ w: '+', h: '+' })
                        break
                }

                //视图更新
                setLayer(curAnchorLayer)

                //缩放不触发后面的拖拽
                return
            }

            //图层拖动（改变位置）
            if (layerMouseEnter && domMouseEnter) {
                //改变图层位置
                activeLayers.forEach((item, index) => {
                    item.pos = [
                        Math.floor(
                            initialActiveLayers[index].pos[0] +
                                (clientX - layerMouseOffset[0]) / blueprintScale
                        ),
                        Math.floor(
                            initialActiveLayers[index].pos[1] +
                                (clientY - layerMouseOffset[1]) / blueprintScale
                        ),
                    ]
                    setLayer(item)
                })
            }
        },
        //全局鼠标抬起
        domMouseup({ button }) {
            if (button != 0) return false //非鼠标左键return
            //缩放完成时改变图表配置时间戳以便实时刷新图表
            this.curAnchorLayer &&
                (this.curAnchorLayer.compOptions.lastChangeTime = Date.now())
            //状态改变
            this.domMouseEnter = false
            this.layerMouseEnter = false
            this.anchorMouseEnter = false
            this.curAnchorLayer = null
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
        //document添加事件
        const {
            domAddEventListener,
            domMousedown,
            domMousemove,
            domMouseup,
        } = this
        //左键按下拖拽
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
