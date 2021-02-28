<!--
 * @Description: 编辑操作面板
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月9日 17:08:29
 * @LastEditTime: 2021-02-28 18:30:10
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
    /* keep-alive缓存路由生命周期钩子 */
    activated() {
        // 监听页面关闭和刷新
        window.onbeforeunload = function (e) {
            e.returnValue = '您确认离开吗？系统不会保存您所做的任何修改！'
        }
        //重新监听dom事件
        this.$store.dispatch('system/domResetEventListener')
    },
    /* 路由跳转钩子 */
    beforeRouteLeave(to, from, next) {
        // 取消所有事件监听
        window.onbeforeunload = null
        this.$store.dispatch('system/domRemoveEventListener')
        next()
        //判断是否已保存，已保存的话直接销毁页面
        //...待判断是否保存
        //如若未保存则弹出提示
        // this.$confirm('当前工作暂未保存，是否保存?', '提示', {
        //     confirmButtonText: '确定',
        //     cancelButtonText: '取消',
        //     type: 'warning',
        // })
        //     .then(() => {
        //         this.$message({
        //             type: 'success',
        //             message: '保存成功!',
        //         })
        //         this.$destroy()
        //         next()
        //     })
        //     .catch(() => {})
    },
}
</script>
