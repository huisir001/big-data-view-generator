<!--
 * @Description: 入口组件
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-04 15:14:43
 * @LastEditTime: 2021-03-02 22:31:30
-->
<template>
    <div id="app">
        <!-- 缓存编辑器路由 -->
        <keep-alive include="EditPanel">
            <router-view />
        </keep-alive>
        <!-- 登录弹窗 -->
        <LoginBox></LoginBox>
        <!-- 注册弹窗 -->
        <SignupBox></SignupBox>
    </div>
</template>

<script>
import LoginBox from '@/components/LoginBox'
import SignupBox from '@/components/SignupBox'
export default {
    components: {
        LoginBox,
        SignupBox,
    },
}
</script>

<style lang="scss">
#app {
    width: 100vw;
    height: 100vh;
}
</style>
