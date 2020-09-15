<!--
 * @Description: 全局布局
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-09 11:51:40
 * @LastEditTime: 2020-09-15 18:49:06
-->
<template>
    <el-container>
        <el-aside :class="`aside ${asideState || 'hide'}`"
                  width="250px">
            <h1>大数据视图生成器1.0.0</h1>
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
                <!-- 工作台 -->
                <slot name="main"></slot>
            </el-main>
        </el-container>

    </el-container>
</template>

<script>
export default {
    name: 'layout',
    data() {
        return {
            asideState: true,
        }
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
        margin-left: -250px;
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
    }
}
</style>
