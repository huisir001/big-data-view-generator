<!--
 * @Description: 全局布局
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-09 11:51:40
 * @LastEditTime: 2020-09-10 11:49:13
-->
<template>
    <el-container>
        <el-header class="header"
                   height="50px">
            <h1>大数据视图生成器1.0.0</h1>
            <div class="right">
                配置栏 <el-switch v-model="$store.state.system.optionPanelShow"></el-switch>
            </div>
        </el-header>

        <el-container class="content">
            <el-aside :width="asideState?'250px':'48px'"
                      class="aside">
                <!-- 抽屉按钮 -->
                <i :class="[asideState?'el-icon-s-fold':'el-icon-s-unfold','aside-take-btn']"
                   @click="asideState=!asideState"></i>
                <!-- 侧边栏 -->
                <slot name="aside"></slot>
            </el-aside>
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
.header {
    background: $menu-bg;
    line-height: 50px;
    padding: 0 15px;
    color: $menu-color;
    h1 {
        margin: 0;
        font-size: 20px;
        display: inline-block;
    }
    .right {
        float: right;
    }
}
.content {
    height: calc(100vh - 50px);
    .aside {
        position: relative;
        height: 100%;
        color: $menu-color;
        font-size: 18px;
        border-top: 1px solid $boder-color;
        background: $menu-bg;
        padding: 15px;
        overflow-x: hidden;
        overflow-y: auto;
        transition: 0.5s;
        .aside-take-btn {
            position: absolute;
            top: 0;
            right: 0;
            padding: 15px;
            cursor: pointer;
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
