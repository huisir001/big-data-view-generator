<!--
 * @Description: 入口组件
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-04 15:14:43
 * @LastEditTime: 2020-09-08 17:44:29
-->
<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style lang="scss">
#app {
    width: 100vw;
    height: 100vh;
    background-image: url(./assets/img/bg.jpg);
    background-position: center top;
    background-size: cover;
    background-attachment: fixed;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    overflow: hidden;
    * {
        box-sizing: border-box;
    }
}
</style>