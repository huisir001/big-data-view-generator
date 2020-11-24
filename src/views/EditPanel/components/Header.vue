<!--
 * @Description: 头部
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月22日 11:58:59
 * @LastEditTime: 2020-11-24 15:57:34
-->
<template>
    <div class="header">
        <!-- 左侧菜单 -->
        <div class="left">
            <!-- 抽屉按钮 -->
            <i
                :class="[
                    asideShow ? 'el-icon-s-fold' : 'el-icon-s-unfold',
                    'aside-take-btn',
                ]"
                @click="setAsideShow"
            ></i>
        </div>
        <!-- 右侧菜单 -->
        <div class="right">
            <!-- 新窗口打开 -->
            <span @click="openPreview" style="cursor: pointer">预览</span>
            <!-- <router-link tag="a" target="_blank" :to="{name:'Preview',query:{id: 'val'}}">详情页</router-link> -->
            配置栏
            <el-switch
                v-model="$store.state.system.optionPanelShow"
            ></el-switch>
        </div>
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('system')
export default {
    name: 'Header',
    data() {
        return {}
    },
    computed: {
        ...mapState(['asideShow']),
    },
    methods: {
        ...mapMutations(['setAsideShow']),
        openPreview() {
            //缓存图层信息
            sessionStorage.setItem(
                `layers`,
                this.$store.getters['layer/layerString']
            )
            let routeData = this.$router.resolve({ path: '/Preview' })
            window.open(routeData.href, '_blank') //打开新窗口
        },
    },
}
</script>
<style lang="scss" scoped>
.header {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    a {
        color: #fff !important;
        text-decoration: none;
    }
    .left {
        .aside-take-btn {
            padding: 0 15px;
            font-size: 18px;
            line-height: 50px;
            cursor: pointer;
        }
    }
}
</style>
