<!--
 * @Description: 图层右键菜单(右键菜单)
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月21日 16:19:54
 * @LastEditTime: 2020-11-19 18:07:16
-->
<template>
    <div
        v-show="showLayerCtxMenu"
        class="layerCtxMenu"
        :style="`left:${layerCtxMenuPos[0]}px;top:${layerCtxMenuPos[1]}px;`"
        @contextmenu.prevent
    >
        <div
            v-for="(item, index) in layerCtxMenuOptions"
            :key="index"
            :class="{ disabled: item.disabled }"
            @mousedown="touchLayerCtxMenu(item)"
        >
            <span :class="item.icon"></span> {{ item.name }}
        </div>
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateSystem } = createNamespacedHelpers('system')
const {
    mapState: mapStateLayer,
    mapMutations: mapMutationsLayer,
} = createNamespacedHelpers('layer')
export default {
    name: 'LayerCtxMenu',
    computed: {
        ...mapStateSystem([
            'showLayerCtxMenu',
            'layerCtxMenu',
            'blueprintDomRect',
            'blueprintScale', //视图层缩放
            'platformPos', //工作台位置
        ]),
        ...mapStateLayer(['layers', 'copyLayer']),
        //选定图层
        activeLayers() {
            return this.layers.filter((item) => item.active)
        },
        //隐藏图层
        hiddenLayers() {
            return this.layers.filter((item) => !item.show)
        },
        //菜单位置
        layerCtxMenuPos() {
            //菜单位置适应（防止被遮挡）
            let pos = this.layerCtxMenu.pos,
                refSize = [110, 31 * this.layerCtxMenuOptions.length + 1],
                bodySize = [
                    document.body.clientWidth,
                    document.body.clientHeight,
                ]

            let left =
                    pos[0] + refSize[0] > bodySize[0]
                        ? pos[0] - refSize[0]
                        : pos[0],
                top =
                    pos[1] + refSize[1] > bodySize[1]
                        ? pos[1] - refSize[1]
                        : pos[1]

            return [left, top]
        },
        //图层右键菜单数据
        layerCtxMenuOptions() {
            const {
                layerCtxMenu,
                delLayer,
                moveupLayer,
                movedownLayer,
                toTopLayer,
                toBotLayer,
                layers,
                setCopyLayer,
                pasteLayer,
                copyLayer,
                blueprintDomRect,
                blueprintScale, //视图层缩放
                platformPos, //工作台位置
                setLayer,
                activeLayers,
                hiddenLayers,
            } = this
            return [
                {
                    name: '复制',
                    icon: 'el-icon-document-copy',
                    disabled: !layerCtxMenu.layer, //在图层上右键激活
                    func() {
                        //只能复制一个图层不能复制多个
                        setCopyLayer({
                            ...layerCtxMenu.layer, //这样操作防止粘贴时影响原图层（同一栈）
                        })
                    },
                },
                {
                    name: '粘贴',
                    icon: 'el-icon-files',
                    disabled: !copyLayer,
                    func() {
                        //存在复制图层时，粘贴，传入粘贴实际位置
                        pasteLayer([
                            parseInt(
                                (layerCtxMenu.pos[0] -
                                    blueprintDomRect.x -
                                    platformPos[0]) /
                                    blueprintScale
                            ),
                            parseInt(
                                (layerCtxMenu.pos[1] -
                                    blueprintDomRect.y -
                                    platformPos[1]) /
                                    blueprintScale
                            ),
                        ])
                    },
                },
                {
                    name: '锁定',
                    icon: 'el-icon-lock',
                    disabled:
                        layerCtxMenu.layer != null
                            ? layerCtxMenu.layer.locked
                            : activeLayers.length == 0, //在面板上右键时，判断当前是否有选定图层
                    func() {
                        //可以锁定多个图层
                        //找到已选定的图层
                        layers.forEach((item) => {
                            if (
                                activeLayers
                                    .map(({ id }) => id)
                                    .includes(item.id)
                            ) {
                                let newLayer = { ...item } //这样操作防止直接修改内存
                                newLayer.locked = true
                                newLayer.active = false //上锁后移除选定
                                setLayer(newLayer)
                            }
                        })
                    },
                },
                {
                    name: '解锁',
                    icon: 'el-icon-unlock',
                    disabled:
                        layerCtxMenu.layer !== null
                            ? !layerCtxMenu.layer.locked
                            : true,
                    func() {
                        //只能解锁一个图层
                        let newLayer = {
                            ...layerCtxMenu.layer,
                        }
                        newLayer.locked = false
                        setLayer(newLayer)
                    },
                },
                {
                    name: '置顶',
                    icon: 'el-icon-upload2',
                    disabled: !layerCtxMenu.layer || layerCtxMenu.layer.locked, //补充条件：非锁定图层
                    func() {
                        //层级移动只能移动一个图层，不能移动多个
                        toTopLayer(layerCtxMenu.layer)
                    },
                },
                {
                    name: '置底',
                    icon: 'el-icon-download',
                    disabled: !layerCtxMenu.layer || layerCtxMenu.layer.locked,
                    func() {
                        toBotLayer(layerCtxMenu.layer)
                    },
                },
                {
                    name: '上移一层',
                    icon: 'el-icon-top',
                    disabled: !layerCtxMenu.layer || layerCtxMenu.layer.locked,
                    func() {
                        moveupLayer(layerCtxMenu.layer)
                    },
                },
                {
                    name: '下移一层',
                    icon: 'el-icon-bottom',
                    disabled: !layerCtxMenu.layer || layerCtxMenu.layer.locked,
                    func() {
                        movedownLayer(layerCtxMenu.layer)
                    },
                },
                {
                    name: '删除选定',
                    icon: 'el-icon-delete',
                    disabled: activeLayers.length == 0,
                    func: () => {
                        //可以删除多个图层
                        this.$confirm(
                            '此操作将永久删除已选定的图层, 是否继续?',
                            '提示',
                            {
                                confirmButtonText: '确定删除',
                                cancelButtonText: '取消',
                                type: 'warning',
                            }
                        )
                            .then(() => {
                                //已选定的图层
                                //执行删除
                                activeLayers.forEach((item) => {
                                    delLayer(item)
                                })
                                //提示
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!',
                                })
                            })
                            .catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消删除',
                                })
                            })
                    },
                },
                {
                    name: '取消选定',
                    icon: 'el-icon-thumb not',
                    disabled: activeLayers.length == 0, //有选定图层
                    func() {
                        activeLayers.forEach((item) => {
                            item.active = false //取消选定
                            setLayer(item)
                        })
                    },
                },
                {
                    name: '隐藏选定',
                    icon: 'el-icon-view not',
                    disabled: activeLayers.length == 0, //有选定图层
                    func() {
                        activeLayers.forEach((item) => {
                            item.show = false
                            item.active = false //取消选定
                            setLayer(item)
                        })
                    },
                },
                {
                    name: '显示所有',
                    icon: 'el-icon-view',
                    disabled: hiddenLayers.length == 0, //有选定图层
                    func() {
                        hiddenLayers.forEach((item) => {
                            item.show = true
                            setLayer(item)
                        })
                    },
                },
            ]
        },
    },
    methods: {
        ...mapMutationsLayer([
            'delLayer',
            'moveupLayer',
            'movedownLayer',
            'toTopLayer',
            'toBotLayer',
            'setCopyLayer',
            'pasteLayer',
            'setLayer',
        ]),
        //图层右键菜单执行
        touchLayerCtxMenu({ disabled, func }) {
            if (disabled) return //不可选状态不执行
            func()
        },
    },
}
</script>
<style lang="scss" scoped>
.layerCtxMenu {
    position: absolute;
    width: 110px;
    color: #bcc9d4;
    background: #27343e;
    border: 1px solid #3a4659;
    z-index: 999;
    cursor: pointer;
    div {
        font-size: 14px;
        padding: 5px 10px;
        border-bottom: 1px solid #3a4659;
        &:last-child {
            border-bottom: 0;
        }
        &:hover {
            color: #0081fd;
            background: #191f23;
        }
        &.disabled {
            color: #bcc9d440;
            cursor: default;
            &:hover {
                color: #bcc9d440;
                background: transparent;
            }
        }
        [class^='el-icon-'].not::after {
            content: '—';
            font-size: 12px;
            transform: rotate(-45deg) translate(-11px, -6px);
            display: inline-block;
            width: 0;
        }
    }
}
</style>
