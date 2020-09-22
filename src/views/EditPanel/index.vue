<!--
 * @Description: 编辑操作面板
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月9日 17:08:29
 * @LastEditTime: 2020-09-22 17:33:29
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
}
</script>
<style lang="scss" scoped>
</style>