<!--
 * @Description: 入口组件
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-04 15:14:43
 * @LastEditTime: 2021-03-03 10:08:23
-->
<template>
    <div id="app">
        <!-- 缓存编辑器路由 -->
        <keep-alive include="EditPanel">
            <router-view />
        </keep-alive>
    </div>
</template>

<style lang="scss">
#app {
    width: 100vw;
    height: 100vh;
}
</style>