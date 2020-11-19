<!--
 * @Description: 图层配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月21日 16:27:27
 * @LastEditTime: 2020-11-19 11:46:37
-->
<template>
    <div class="layerOptionsBox">
        <!-- 表单项，activeLayer为当前编辑图层（第一个已激活图层，暂不支持多图层编辑） -->
        <template v-if="activeLayers.length == 1">
            <el-collapse v-model="cpActiveName" accordion>
                <el-collapse-item
                    v-for="(catItem, i) in layerFormCats.filter((cat) =>
                        cat.compTypeFilter.includes(activeLayers[0].type)
                    )"
                    :key="i"
                    :title="catItem.category"
                    :name="i + 1"
                >
                    <FormItems
                        v-for="(item,
                        index) in activeLayers[0].formControlOptions.filter(
                            (option) =>
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
    computed: {
        ...mapGetters(['activeLayers']), //选定图层
    },
}
</script>
<style lang="scss" scoped>
.formOptions:last-child {
    margin-bottom: 0;
}
</style>
