<!--
 * @Description: 布局组件
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-09 11:51:40
 * @LastEditTime: 2021-03-02 22:24:00
-->
<template>
    <el-container>
        <el-aside :class="`aside ${asideShow || 'hide'}`"
                  width="245px">
            <h1 :title="pageOptions.title">
                {{ pageOptions.title }}
            </h1>
            <!-- 侧边栏 -->
            <el-tabs v-model="asideTabAcName"
                     :stretch="true">
                <el-tab-pane label="可用组件"
                             name="comp">
                    <slot name="compLibrary"></slot>
                </el-tab-pane>
                <el-tab-pane v-if="layers.length > 0"
                             label="图层管理"
                             name="layer">
                    <slot name="layerList"></slot>
                </el-tab-pane>
            </el-tabs>
        </el-aside>
        <el-container class="content">
            <el-header class="head-box"
                       height="50px">
                <!-- 顶栏 -->
                <slot name="head"></slot>
            </el-header>
            <el-main class="main-box">
                <!-- 操作界面 -->
                <slot name="main"></slot>
            </el-main>
        </el-container>
        <!-- 图层右键菜单 -->
        <slot name="layerCtxMenu"></slot>
    </el-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('system')
const {
    mapState: mapStateLayer,
    mapGetters: mapGettersLayer,
} = createNamespacedHelpers('layer')
export default {
    name: 'Layout',
    data() {
        return {
            asideTabAcName: 'comp',
        }
    },
    computed: {
        ...mapState(['pageOptions', 'asideShow']),
        ...mapStateLayer(['layers']),
        ...mapGettersLayer(['layerString']),
    },
    watch: {
        layerString(val) {
            const layers = JSON.parse(val)
            if (layers.length == 0) {
                this.asideTabAcName = 'comp'
            }
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
    transition: 0.3s;
    z-index: 1;
    &.hide {
        margin-left: -246px;
    }
    h1 {
        margin: 0;
        padding: 0 14px 0 16px;
        font-size: 18px;
        height: $header-height;
        line-height: $header-height;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }
}
.content {
    height: 100vh;
    .head-box {
        background: $menu-bg;
        line-height: $header-height;
        color: $menu-color;
        border-left: 1px solid $boder-color;
        padding: 0 15px 0 0;
        z-index: 1;
    }
    .main-box {
        padding: 0;
        border: 1px solid $boder-color;
        border-right: 0;
        border-bottom: 0;
        position: relative;
        overflow: hidden;
    }
}
</style>
