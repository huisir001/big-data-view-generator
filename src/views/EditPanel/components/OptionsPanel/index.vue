<!--
 * @Description: 配置项面板
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月10日 10:55:08
 * @LastEditTime: 2020-09-30 16:41:27
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
                    <FormOptions v-if="layers[0]"
                                 :param="layers[0].defaultOptions.title"></FormOptions>
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
import FormOptions from '@/components/FormOptions'
const {
    mapState: mapStateLayer,
    mapMutations: mapMutationLayer,
} = createNamespacedHelpers('layer')
export default {
    name: 'OptionsPanel',
    components: {
        FormOptions,
    },
    data() {
        return {
            optionTabAcName: 'layerOption',
        }
    },
    computed: {
        ...mapStateLayer(['layers']), //图层信息
        //layer string
        layerString() {
            return JSON.stringify(this.layers)
        },
    },
    watch: {
        layerString(data) {
            //实时存储
            // console.log(JSON.parse(data))
        },
    },
    methods: {
        optionTabClick() {
            console.log(2)
        },
    },
}
</script>
