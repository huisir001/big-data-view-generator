<!--
 * @Description: 布局组件
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-09 11:51:40
 * @LastEditTime: 2020-09-22 16:26:01
-->
<template>
    <el-container>
        <el-aside :class="`aside ${asideShow || 'hide'}`"
                  width="250px">
            <h1>{{title}}</h1>
            <!-- 侧边栏 -->
            <slot name="aside"></slot>
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
export default {
    name: 'Layout',
    computed: {
        ...mapState(['title', 'asideShow']),
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
