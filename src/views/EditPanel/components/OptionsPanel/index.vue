<!--
 * @Description: 配置项面板
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月10日 10:55:08
 * @LastEditTime: 2020-10-12 16:20:16
-->
<template>
    <el-drawer direction="rtl"
               :close-on-press-escape="false"
               :wrapperClosable="false"
               :modal="false"
               :show-close="false"
               :visible.sync="$store.state.system.optionPanelShow">
        <el-tabs v-model="optionTabAcName"
                 @tab-click="optionTabClick"
                 :stretch="true">
            <el-tab-pane label="图层配置"
                         name="layerOption">
                <el-form>
                    <LayerOptions></LayerOptions>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="系统配置"
                         name="systemOption">
            </el-tab-pane>
        </el-tabs>
    </el-drawer>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import LayerOptions from './LayerOptions' //图层配置栏-表单项组件
export default {
    name: 'OptionsPanel',
    components: {
        LayerOptions,
    },
    data() {
        return {
            optionTabAcName: 'layerOption',
        }
    },
    methods: {
        optionTabClick() {
            console.log(2)
        },
    },
}
</script>
