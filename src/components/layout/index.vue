<!--
 * @Description: 全局布局
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-09 11:51:40
 * @LastEditTime: 2020-09-16 23:36:24
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
        <!-- 右键菜单 -->
        <div v-show="showLayerMenu"
             class="layermenu"
             :style="`left:${layerMenuPos[0]}px;top:${layerMenuPos[1]}px;`">
            <div>复制</div>
            <div>粘贴</div>
        </div>
    </el-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('system')
export default {
    name: 'layout',
    data() {
        return {
            asideState: true,
        }
    },
    computed: {
        ...mapState([
            'screenSize',
            'platformPos',
            'viewPanelScale',
            'showLayerMenu',
            'layerMenuPos',
        ]),
        rulerTopStyle() {
            return {
                left: this.platformPos[0] + 'px',
            }
        },
        rulerLeftStyle() {
            return {
                top: this.platformPos[1] + 'px',
            }
        },
    },
    methods: {},
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
    z-index: 999;
    background: #fff;
    padding: 5px 0;
    div {
        font-size: 18px;
        padding: 5px 10px;
    }
}
</style>
