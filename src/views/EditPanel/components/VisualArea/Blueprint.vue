<!--
 * @Description: 蓝图
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月10日 09:33:27
 * @LastEditTime: 2021-02-28 18:55:01
-->
<template>
    <div class="blueprint"
         :style="blueprintStyle"
         @contextmenu.prevent="layerCtxMenu">
        <!-- 图层渲染(采用动态组件) -->
        <div v-for="(item, index) in layers"
             v-show="item.show"
             :key="index"
             :class="{
                viewItem: true,
                act: item.active,
                locked: item.locked,
                hover: item.hover,
            }"
             :data-index="index"
             @mousedown.prevent="layerClick"
             @mouseup.prevent="layerClick"
             :style="`width:${
                layersCache[item.id] ? layersCache[item.id].width : item.width
            }px;height:${
                layersCache[item.id] ? layersCache[item.id].height : item.height
            }px;left:${
                layersCache[item.id] ? layersCache[item.id].pos[0] : item.pos[0]
            }px;top:${
                layersCache[item.id] ? layersCache[item.id].pos[1] : item.pos[1]
            }px;z-index:${item.zIndex};`">
            <!-- 位置标线 -->
            <template v-if="item.active || item.hover">
                <div class="posLine-x"></div>
                <div class="posLine-y"></div>
            </template>
            <!-- 缩放锚点 -->
            <template v-if="item.active">
                <div v-for="anchor in 8"
                     :key="anchor"
                     :class="`anchor anchor-${anchor}`"
                     :data-index="index"
                     :data-anchor="anchor"
                     @mousedown.prevent="anchorClick"
                     @mouseup.prevent="anchorClick"></div>
            </template>
            <!-- 动态组件 -->
            <component :is="item.type"
                       :options="item.compOptions"
                       style="overflow: hidden"></component>
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
            curAnchorLayer: null, //缓存锚点所在图层
            initialAnchorLayer: null, //记录图层初始状态
            /* 图层缓存，防止拖拽时图层抖动（卡顿）的bug */
            initialActiveLayers: null, //图层初始位置状态
            activeLayersCache: null, //激活图层缓存
            layersCache: {}, //图层状态（用于视图实时更新）
        }
    },
    computed: {
        ...mapStateSystem([
            'pageOptions',
            'blueprintPos',
            'blueprintScale',
            'curkeydownCodes',
            'showLayerCtxMenu',
        ]), //系统信息
        ...mapStateLayer(['layers']), //图层信息,已选定图层
        ...mapGettersLayer(['activeLayers', 'layerString']), //选定图层、layer string
        blueprintStyle() {
            const { pageOptions, blueprintPos, blueprintScale } = this
            return {
                width: pageOptions.screenSize[0] + 'px',
                height: pageOptions.screenSize[1] + 'px',
                left: blueprintPos[0] + 'px',
                top: blueprintPos[1] + 'px',
                transform: `scale(${blueprintScale})`,
                backgroundImage:
                    pageOptions.showGrid || !pageOptions.useBgImage
                        ? 'none'
                        : `url(${pageOptions.bgImage})`,
                backgroundColor: pageOptions.showGrid
                    ? 'transparent'
                    : pageOptions.bgColor,
            }
        },
    },
    watch: {
        layerString(data, old) {
            //缩放、拖拽完成时改变时间戳实时更新图表视图
            const oldLayers = JSON.parse(old),
                newLayers = JSON.parse(data),
                activeLayers = this.activeLayers,
                curOldLayer =
                    activeLayers.length > 0
                        ? oldLayers.find(
                              (item) => item.id == activeLayers[0].id
                          )
                        : null
            if (
                oldLayers[0] &&
                newLayers[0] &&
                curOldLayer &&
                activeLayers[0] &&
                (curOldLayer.width != activeLayers[0].width ||
                    curOldLayer.height != activeLayers[0].height)
            ) {
                this.activeLayers[0].compOptions.lastChangeTime = Date.now()
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

            //拷贝激活图层
            const copyActiveLayers = JSON.parse(
                JSON.stringify(this.activeLayers)
            )

            //缓存激活图层（防内存被修改）
            this.activeLayersCache = copyActiveLayers.map((item) => {
                return { pos: item.pos, id: item.id }
            })

            //记录图层初始位置状态
            this.initialActiveLayers = copyActiveLayers.map((item) => item.pos)
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
            //拷贝图层
            const copyCurLayer = JSON.parse(JSON.stringify(this.layers[index]))
            //缓存当前图层位置及尺寸
            this.curAnchorLayer = {
                id: copyCurLayer.id,
                width: copyCurLayer.width,
                height: copyCurLayer.height,
                pos: copyCurLayer.pos,
            }
            //记录状态
            this.initialAnchorLayer = {
                width: copyCurLayer.width,
                height: copyCurLayer.height,
                pos: copyCurLayer.pos,
            }
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
                initialAnchorLayer,
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
                                  initialAnchorLayer.pos[0] +
                                      (clientX - layerMouseOffset[0]) /
                                          blueprintScale
                              )
                            : initialAnchorLayer.pos[0],
                        y
                            ? Math.floor(
                                  initialAnchorLayer.pos[1] +
                                      (clientY - layerMouseOffset[1]) /
                                          blueprintScale
                              )
                            : initialAnchorLayer.pos[1],
                    ]
                }
                //改变图层尺寸
                function curAnchorLayerSizeReset({ w, h }) {
                    const widthStr = w
                        ? `curAnchorLayer.width = Math.floor(initialAnchorLayer.width ${w} (clientX - anchorMouseOffset[0]) / blueprintScale);`
                        : ''
                    const heightStr = h
                        ? `curAnchorLayer.height = Math.floor(initialAnchorLayer.height ${h} (clientY - anchorMouseOffset[1]) / blueprintScale);`
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
                this.$set(this.layersCache, curAnchorLayer.id, curAnchorLayer)

                //缩放不触发后面的拖拽
                return
            }

            //图层拖动（改变位置）
            if (layerMouseEnter && domMouseEnter) {
                //改变图层位置
                this.activeLayersCache.forEach((item, index) => {
                    item.pos = [
                        Math.floor(
                            initialActiveLayers[index][0] +
                                (clientX - layerMouseOffset[0]) / blueprintScale
                        ),
                        Math.floor(
                            initialActiveLayers[index][1] +
                                (clientY - layerMouseOffset[1]) / blueprintScale
                        ),
                    ]

                    //视图更新
                    this.$set(this.layersCache, item.id, item)
                })
            }
        },
        //全局鼠标抬起
        domMouseup({ button }) {
            if (button != 0) return false //非鼠标左键return

            //位置拖拽后更新全局状态
            for (let key in this.layersCache) {
                this.setLayer(this.layersCache[key])
            }

            //状态改变
            this.domMouseEnter = false
            this.layerMouseEnter = false
            this.anchorMouseEnter = false
            this.curAnchorLayer = null
            this.layersCache = {}
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
    background-position: center top;
    background-size: cover;
    background-repeat: no-repeat;
    transform-origin: 0 0 0; //缩放参考点
    box-shadow: #000 0 0 30px 0;
    .viewItem {
        position: absolute;
        cursor: move;
        border: 1px solid transparent;
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
            cursor: default;
            &:hover {
                border: 1px solid transparent;
                background-color: transparent;
                opacity: 1;
            }
        }
        &.act,
        &.hover {
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
                z-index: 5;
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
