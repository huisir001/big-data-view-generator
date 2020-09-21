<!--
 * @Description: 首页
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月9日 17:08:29
 * @LastEditTime: 2020-09-21 18:41:02
-->
<template>
    <div @contextmenu.prevent>
        <Layout>
            <!-- 侧边栏 -->
            <template v-slot:aside>
                <CompLibrary />
            </template>
            <template v-slot:main>
                <VisualArea>
                    <!-- <template v-slot:layerList>
                        <LayerList />
                    </template> -->
                    <template v-slot:options>
                        <OptionsPanel />
                    </template>
                </VisualArea>
            </template>
        </Layout>
    </div>
</template>

<script>
import {
    // Header,
    Layout,
    CompLibrary,
    // LayerList,
    OptionsPanel,
    VisualArea,
} from './components'
export default {
    name: 'EditPanel',
    components: {
        // Header,
        Layout,
        CompLibrary,
        // LayerList,
        OptionsPanel,
        VisualArea,
    },
}
</script>
<style lang="scss" scoped>
</style>