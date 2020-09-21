<!--
 * @Description: 全局布局
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-09 11:51:40
 * @LastEditTime: 2020-09-21 10:48:27
-->
<template>
    <el-container>
        <el-aside :class="`aside ${asideState || 'hide'}`"
                  width="250px">
            <h1>大数据视图生成器1.0</h1>
            <!-- 侧边栏 -->
            <slot name="aside"></slot>
        </el-aside>
        <el-container class="content">
            <el-header class="header"
                       height="50px">
                <div class="left">
                    <!-- 抽屉按钮 -->
                    <i :class="[asideState?'el-icon-s-fold':'el-icon-s-unfold','aside-take-btn']"
                       @click="asideState=!asideState"></i>
                </div>
                <div class="right">
                    配置栏 <el-switch v-model="$store.state.system.optionPanelShow"></el-switch>
                </div>
            </el-header>
            <el-main class="main-box">
                <!-- x刻度尺 -->
                <div class="ruler-top"
                     :style="rulerTopStyle">
                    <!-- 60像素刻度线 -->
                    <div v-for="(_,i) in parseInt(screenSize[0]*viewPanelScale/60+1)"
                         :key="i"
                         class="l">
                        <span>{{parseInt(i*60/viewPanelScale)}}</span>
                        <!-- 均分10份 -->
                        <div class="s"></div>
                    </div>
                </div>
                <!-- y刻度尺 -->
                <div class="ruler-left"
                     :style="rulerLeftStyle">
                    <div v-for="(_,i) in parseInt(screenSize[1]*viewPanelScale/60+1)"
                         :key="i"
                         class="l">
                        <span>{{parseInt(i*60/viewPanelScale)}}</span>
                        <div class="s"></div>
                    </div>
                </div>
                <!-- 工作台 -->
                <slot name="main"></slot>
            </el-main>
        </el-container>
        <!-- 图层右键菜单 -->
        <div v-show="showLayerMenu"
             class="layermenu"
             :style="`left:${layerMenuPos[0]}px;top:${layerMenuPos[1]}px;`"
             @contextmenu.prevent>
            <div v-for="(item,index) in layermenuOptions"
                 :key="index"
                 :class="{disabled:item.disabled}"
                 @mousedown="touchLayermenu(item)">
                <span :class="item.icon"></span> {{item.name}}
            </div>
        </div>
    </el-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateSystem } = createNamespacedHelpers('system')
const {
    mapState: mapStateLayer,
    mapMutations: mapMutationsLayer,
} = createNamespacedHelpers('layer')
export default {
    name: 'layout',
    data() {
        return {
            asideState: true,
        }
    },
    computed: {
        ...mapStateSystem([
            'screenSize',
            'platformPos',
            'viewPanelScale',
            'showLayerMenu',
            'layerMenu',
            'viewPanelDomRect',
        ]),
        ...mapStateLayer(['layers', 'copyLayer']),
        //标尺样式
        rulerTopStyle() {
            return {
                left: this.platformPos[0] + 'px',
            }
        },
        //左标尺样式
        rulerLeftStyle() {
            return {
                top: this.platformPos[1] + 'px',
            }
        },
        //菜单位置
        layerMenuPos() {
            //菜单位置适应（防止被遮挡）
            let pos = this.layerMenu.pos,
                refSize = [110, 31 * this.layermenuOptions.length + 1],
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
        //选定图层
        activeLayers() {
            return this.layers.filter((item) => item.active)
        },
        //图层菜单数据
        layermenuOptions() {
            const {
                layerMenu,
                delLayer,
                moveupLayer,
                movedownLayer,
                toTopLayer,
                toBotLayer,
                layers,
                setCopyLayer,
                pasteLayer,
                copyLayer,
                viewPanelDomRect,
                setLayer,
                activeLayers,
            } = this
            return [
                {
                    name: '复制',
                    icon: 'el-icon-document-copy',
                    disabled: !layerMenu.layer, //在图层上右键激活
                    func() {
                        //只能复制一个图层不能复制多个
                        setCopyLayer({
                            ...layerMenu.layer, //这样操作防止粘贴时影响原图层（同一栈）
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
                            layerMenu.pos[0] - viewPanelDomRect.x,
                            layerMenu.pos[1] - viewPanelDomRect.y,
                        ])
                    },
                },
                {
                    name: '锁定',
                    icon: 'el-icon-lock',
                    disabled:
                        layerMenu.layer != null
                            ? layerMenu.layer.locked
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
                        layerMenu.layer !== null
                            ? !layerMenu.layer.locked
                            : true,
                    func() {
                        //只能解锁一个图层
                        let newLayer = {
                            ...layerMenu.layer,
                        }
                        newLayer.locked = false
                        setLayer(newLayer)
                    },
                },
                {
                    name: '置顶',
                    icon: 'el-icon-upload2',
                    disabled: !layerMenu.layer || layerMenu.layer.locked, //补充条件：非锁定图层
                    func() {
                        //层级移动只能移动一个图层，不能移动多个
                        toTopLayer(layerMenu.layer)
                    },
                },
                {
                    name: '置底',
                    icon: 'el-icon-download',
                    disabled: !layerMenu.layer || layerMenu.layer.locked,
                    func() {
                        toBotLayer(layerMenu.layer)
                    },
                },
                {
                    name: '上移一层',
                    icon: 'el-icon-top',
                    disabled: !layerMenu.layer || layerMenu.layer.locked,
                    func() {
                        moveupLayer(layerMenu.layer)
                    },
                },
                {
                    name: '下移一层',
                    icon: 'el-icon-bottom',
                    disabled: !layerMenu.layer || layerMenu.layer.locked,
                    func() {
                        movedownLayer(layerMenu.layer)
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
        //图层菜单执行
        touchLayermenu({ disabled, func }) {
            if (disabled) return //不可选状态不执行
            func()
        },
    },
}
</script>

<style lang="scss" scoped>
$menu-bg: #212528;
$menu-color: #fff;
$boder-color: #999;
$header-height: 50px;
.aside {
    position: relative;
    height: 100vh;
    color: $menu-color;
    background: $menu-bg;
    overflow-x: hidden;
    overflow-y: auto;
    transition: 0.5s;
    z-index: 1;
    &.hide {
        margin-left: -251px;
    }
    h1 {
        margin: 0;
        padding: 0 15px;
        font-size: 20px;
        height: $header-height;
        line-height: $header-height;
    }
}
.content {
    height: 100vh;
    .header {
        background: $menu-bg;
        line-height: $header-height;
        padding: 0 15px 0 0;
        color: $menu-color;
        border-left: 1px solid $boder-color;
        display: flex;
        justify-content: space-between;
        z-index: 1;
        .left {
            .aside-take-btn {
                padding: 0 15px;
                font-size: 18px;
                line-height: 50px;
                cursor: pointer;
            }
        }
    }
    .main-box {
        padding: 0;
        border: 1px solid $boder-color;
        border-right: 0;
        border-bottom: 0;
        position: relative;
        overflow: hidden;
        @mixin ruler {
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
            display: flex;
            background: #000;
            color: #7a8286;
            font-size: 12px;
            .l {
                border-color: #3f4346;
                line-height: 25px;
                position: relative;
                /* 禁止选择文字 */
                -webkit-touch-callout: none;
                user-select: none;
                .s {
                    position: absolute;
                    background-size: 6px 6px;
                }
            }
        }
        .ruler-top {
            @include ruler;
            height: 25px;
            padding-left: 60px;
            .l {
                width: 60px;
                height: 100%;
                border-left: 1px solid;
                padding-left: 3px;
                .s {
                    width: 100%;
                    height: 5px;
                    bottom: 0;
                    left: 0;
                    background-image: linear-gradient(
                        to left,
                        transparent 5px,
                        #5a6064 6px
                    );
                }
            }
        }
        .ruler-left {
            @include ruler;
            flex-direction: column;
            width: 25px;
            padding-top: 60px;
            .l {
                height: 60px;
                width: 100%;
                border-top: 1px solid;
                padding-top: 3px;
                .s {
                    height: 100%;
                    width: 5px;
                    right: 0;
                    top: 0;
                    background-image: linear-gradient(
                        to top,
                        transparent 5px,
                        #5a6064 6px
                    );
                }
                span {
                    display: inline-block;
                    width: 25px;
                    height: 25px;
                    transform: rotate(90deg);
                    transform-origin: center;
                }
            }
        }
    }
}
.layermenu {
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
    }
}
</style>
