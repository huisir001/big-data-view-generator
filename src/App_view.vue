<!--
 * @Description: 入口组件
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-04 15:14:43
 * @LastEditTime: 2021-03-02 23:39:05
-->
<template>
    <div id="app">
        <Preview />
    </div>
</template>

<script>
import Preview from './views/Preview/preview2'
export default {
    components: {
        Preview,
    },
}
</script>

<style lang="scss">
#app {
    width: 100vw;
    height: 100vh;
}
</style>
