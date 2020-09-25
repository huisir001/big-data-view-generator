<!--
 * @Description: 导航组件
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-12 10:31:42
 * @LastEditTime: 2020-09-03 16:06:52
-->
<template>
    <div class="routerNav">
        <!-- 循环所有组件 -->
        <router-link v-for="(item,index) in routes"
                     :to="item.path"
                     :key="index">{{item.meta.title}}</router-link>
    </div>
</template>

<script>
export default {
    name: 'routerNav',
    data() {
        return {
            //获取所有组件
            routes: this.$router.options.routes.filter(
                (item) => item.path != '/'
            ),
        }
    },
}
</script>

<style lang="scss" scoped>
.routerNav {
    position: absolute;
    z-index: 999;
    padding: 6px 8px;
    background: #1d88eb;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    a {
        color: #fff;
        text-decoration: none;
        margin: 0 10px;
        transition: 0.4s;
        &:hover,
        &.router-link-active {
            display: inline-block;
            color: #ffee5b;
            text-shadow: 2px 2px #e91e63;
            transform: translateY(-1px);
        }
    }
}
</style>