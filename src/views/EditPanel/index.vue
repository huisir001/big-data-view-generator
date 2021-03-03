<!--
 * @Description: 编辑操作面板
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月9日 17:08:29
 * @LastEditTime: 2021-03-03 11:36:09
-->
<template>
    <div @contextmenu.prevent>
        <Layout>
            <!-- 可用组件库 -->
            <template v-slot:compLibrary>
                <CompLibrary />
            </template>
            <!-- 图层管理 -->
            <template v-slot:layerList>
                <LayerList />
            </template>
            <!-- 顶栏 -->
            <template v-slot:head>
                <Header />
            </template>
            <template v-slot:main>
                <!-- 操作可视区 -->
                <VisualArea>
                    <!-- 配置项面板 -->
                    <template v-slot:options>
                        <OptionsPanel />
                    </template>
                </VisualArea>
            </template>
            <!-- 右键菜单 -->
            <template v-slot:layerCtxMenu>
                <LayerCtxMenu />
            </template>
        </Layout>
    </div>
</template>

<script>
import {
    Layout,
    Header,
    CompLibrary,
    LayerList,
    OptionsPanel,
    VisualArea,
    LayerCtxMenu,
} from './components'
export default {
    name: 'EditPanel',
    components: {
        Layout,
        Header,
        CompLibrary,
        LayerList,
        OptionsPanel,
        VisualArea,
        LayerCtxMenu,
    },
    /* keep-alive缓存路由生命周期钩子,若为路由直接切换，则不执行beforeCreate等钩子 */
    async activated() {
        const { $store, $route } = this

        // 监听页面关闭和刷新
        window.onbeforeunload = function (e) {
            e.returnValue = '您确认离开吗？系统不会保存您所做的任何修改！'
        }
        //重新监听dom事件
        $store.dispatch('system/domResetEventListener')
    },
    /* 路由跳转钩子 */
    beforeRouteLeave(to, from, next) {
        // 取消所有事件监听
        window.onbeforeunload = null
        this.$store.dispatch('system/domRemoveEventListener')

        // 路由跳转后清空数据
        this.$store.commit('system/clearPageOptions') //清空page信息
        this.$store.commit('layer/clearLayers') //清空图层，避免残影

        if (to.name != 'EditPanel') {
            next()
        }
    },
}
</script>