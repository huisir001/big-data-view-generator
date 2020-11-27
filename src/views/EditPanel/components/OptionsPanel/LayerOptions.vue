<!--
 * @Description: 图层配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月21日 16:27:27
 * @LastEditTime: 2020-11-27 14:36:41
-->
<template>
    <div class="layerOptionsBox">
        <!-- 表单项，activeLayer为当前编辑图层（第一个已激活图层，暂不支持多图层编辑） -->
        <template v-if="activeLayers.length == 1">
            <el-collapse v-model="cpActiveName" accordion>
                <el-collapse-item
                    v-for="(catItem, i) in formCatsFilter"
                    :key="i"
                    :title="catItem.category"
                    :name="i + 1"
                >
                    <FormItems
                        v-for="(item,
                        index) in curformControlOptions.filter((option) =>
                            catItem.optionsFilter.includes(option.key)
                        )"
                        :key="index"
                        :formItemOption="item"
                        :optionKey="item.key"
                        :activeLayer="activeLayers[0]"
                    ></FormItems>
                </el-collapse-item>
            </el-collapse>
        </template>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import FormItems from './inc/FormItems' //图层配置栏-表单项组件
import layerFormCats from '@/config/layerFormCats'
import { debounce } from '@/utils/myUtils'
const { mapGetters } = createNamespacedHelpers('layer')
export default {
    name: 'LayerOptions',
    components: {
        FormItems,
    },
    data() {
        return {
            layerFormCats,
            cpActiveName: 1, //折叠面板当前激活项
        }
    },
    watch: {
        activeLayersStr(val) {
            let curLayer = JSON.parse(val)[0]

            if (!curLayer) {
                return
            }

            /* 控制数据配置表单项显隐 */
            if (curLayer && curLayer.compOptions) {
                curLayer.formControlOptions.forEach((item) => {
                    if (item.displayItems) {
                        curLayer.formControlOptions.forEach((optionItem) => {
                            if (
                                item.displayItems.t &&
                                item.displayItems.t.includes(optionItem.key)
                            ) {
                                optionItem.hide = !curLayer.compOptions[
                                    item.key
                                ]
                            }
                            if (
                                item.displayItems.f &&
                                item.displayItems.f.includes(optionItem.key)
                            ) {
                                optionItem.hide = curLayer.compOptions[item.key]
                            }
                        })
                    }
                })
            }

            this.$store.commit('layer/setLayer', curLayer)
        },
    },
    computed: {
        ...mapGetters(['activeLayers']), //选定图层
        activeLayersStr() {
            return JSON.stringify(this.activeLayers)
        },
        formCatsFilter() {
            return this.layerFormCats.filter((cat) =>
                cat.compTypeFilter.includes(this.activeLayers[0].type)
            )
        },
        curformControlOptions() {
            return this.activeLayers[0].formControlOptions
        },
    },
}
</script>
<style lang="scss" scoped>
.formOptions:last-child {
    margin-bottom: 0;
}
</style>
