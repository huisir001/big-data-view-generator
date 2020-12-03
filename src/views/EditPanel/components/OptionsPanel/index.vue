<!--
 * @Description: 配置项面板
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月10日 10:55:08
 * @LastEditTime: 2020-12-03 17:40:06
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
        <el-tabs
            v-model="optionTabAcName"
            @tab-click="optionTabClick"
            :stretch="true"
        >
            <el-tab-pane
                v-if="activeLayers.length == 1"
                label="图层配置"
                name="layerOption"
            >
                <div
                    v-if="!showLyOptBox"
                    v-loading="true"
                    style="height: 100px"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0)"
                ></div>
                <LayerOptions v-if="showLyOptBox"></LayerOptions>
            </el-tab-pane>
            <el-tab-pane label="系统配置" name="systemOption"> </el-tab-pane>
        </el-tabs>
    </el-drawer>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import LayerOptions from './LayerOptions' //图层配置栏-表单项组件
const { mapGetters } = createNamespacedHelpers('layer')

export default {
    name: 'OptionsPanel',
    components: {
        LayerOptions,
    },
    data() {
        return {
            optionTabAcName: 'layerOption',
            showLyOptBox: false,
        }
    },
    computed: {
        ...mapGetters(['activeLayers']), //选定图层
        activeLayersStr() {
            return JSON.stringify(this.activeLayers)
        },
    },
    watch: {
        activeLayersStr(val, oldVal) {
            let curLayer = JSON.parse(val)[0],
                oldLayer = JSON.parse(oldVal)[0],
                oldLayers = JSON.parse(oldVal)

            if (
                !curLayer ||
                (oldLayer &&
                    this.activeLayers.length == 1 &&
                    oldLayers.length == 1 &&
                    curLayer.id == oldLayer.id) ||
                (oldLayer &&
                    this.activeLayers.length == 1 &&
                    oldLayers.length == 1 &&
                    curLayer.type == oldLayer.type)
            ) {
                return
            }

            /* 关闭配置栏 */
            this.showLyOptBox = false

            if (this.activeLayers.length != 1) return

            /* 延时加载配置栏 */
            let showLyOptBoxTimer = setTimeout(() => {
                this.showLyOptBox = true
                clearTimeout(showLyOptBoxTimer)
            })
        },
    },
    methods: {
        optionTabClick() {
            console.log(2)
        },
    },
}
</script>
