<!--
 * @Description: 配置项面板
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月10日 10:55:08
 * @LastEditTime: 2021-01-12 14:31:44
-->
<template>
    <el-drawer
        direction="rtl"
        :close-on-press-escape="false"
        :wrapperClosable="false"
        :modal="false"
        :show-close="false"
        :visible.sync="$store.state.system.optionPanelShow"
    >
        <el-tabs v-model="optionTabAcName" :stretch="true">
            <el-tab-pane
                v-if="activeLayers.length == 1"
                label="图层配置"
                name="layerOption"
            >
                <LayerOptions></LayerOptions>
            </el-tab-pane>
            <el-tab-pane label="系统配置" name="systemOption">
                <SystemOptions></SystemOptions>
            </el-tab-pane>
        </el-tabs>
    </el-drawer>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import LayerOptions from './LayerOptions' //图层配置栏-表单项组件
import SystemOptions from './SystemOptions' //系统项组件
const { mapGetters } = createNamespacedHelpers('layer')

export default {
    name: 'OptionsPanel',
    components: {
        LayerOptions,
        SystemOptions,
    },
    computed: {
        ...mapGetters(['activeLayers']), //选定图层
        optionTabAcName: {
            get() {
                return this.activeLayers.length == 1
                    ? 'layerOption'
                    : 'systemOption'
            },
            set(value) {
                return value
            },
        },
    },
}
</script>
