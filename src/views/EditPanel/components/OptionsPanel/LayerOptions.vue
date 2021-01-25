<!--
 * @Description: 图层配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月21日 16:27:27
 * @LastEditTime: 2021-01-25 14:42:17
-->
<template>
    <div class="layerOptionsBox">
        <!-- 表单项，activeLayer为当前编辑图层（第一个已激活图层，暂不支持多图层编辑） -->
        <el-form label-position="left" label-width="66px">
            <el-collapse
                v-model="cpActiveName"
                accordion
                @change="collapseChange"
            >
                <el-collapse-item
                    v-for="(catItem, i) in formCatsFilter"
                    :key="i"
                    :title="catItem.category"
                    :name="i"
                >
                    <template v-if="cpActiveName == i">
                        <div
                            v-loading="collapseLoading"
                            style="min-height: 33px"
                            element-loading-background="rgba(0, 0, 0, 0.85)"
                        >
                            <FormItems
                                v-for="(item, index) in curCollapseOptions"
                                :key="index"
                                :formItemOption="item"
                                :optionKey="item.key"
                                :activeLayer="activeLayers[0]"
                                :style="`${
                                    index == curCollapseOptions.length - 1
                                        ? 'margin-bottom:0'
                                        : ''
                                }`"
                            ></FormItems>
                        </div>
                    </template>
                </el-collapse-item>
            </el-collapse>
        </el-form>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import FormItems from './inc/FormItems' //图层配置栏-表单项组件
import layerFormCats from '@/config/layerFormCats'
// import { debounce } from '@/utils/myUtils'
const { mapGetters } = createNamespacedHelpers('layer')
export default {
    name: 'LayerOptions',
    components: {
        FormItems,
    },
    data() {
        return {
            layerFormCats,
            cpActiveName: 0, //折叠面板当前激活项
            collapseLoading: false,
        }
    },
    watch: {
        activeLayersStr(val, oldVal) {
            let newLayer = val ? JSON.parse(val) : [],
                oldLayer = oldVal ? JSON.parse(oldVal) : [],
                curLayer = newLayer[0],
                oldCurLayer = oldLayer[0]

            if (!curLayer) {
                return
            }

            /* 控制数据配置表单项显隐 */
            if (curLayer.compOptions) {
                curLayer.formControlOptions.forEach((item) => {
                    //switch切换
                    if (
                        item.compType == 'switch' &&
                        item.displayItems &&
                        curLayer.compOptions[item.key] ==
                            !oldCurLayer.compOptions[item.key]
                    ) {
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
                        this.$store.commit('layer/setLayer', curLayer)
                    }
                    //下拉选择框
                    if (
                        item.compType == 'select' &&
                        item.options[0].displayItems &&
                        curLayer.compOptions[item.key] !=
                            oldCurLayer.compOptions[item.key]
                    ) {
                        curLayer.formControlOptions.forEach((optionItem) => {
                            const curDisplayItems = item.options.find(
                                (o) => o.value == curLayer.compOptions[item.key]
                            ).displayItems
                            if (
                                curDisplayItems.t &&
                                curDisplayItems.t.includes(optionItem.key)
                            ) {
                                optionItem.hide = !curLayer.compOptions[
                                    item.key
                                ]
                            }
                            if (
                                curDisplayItems.f &&
                                curDisplayItems.f.includes(optionItem.key)
                            ) {
                                optionItem.hide = curLayer.compOptions[item.key]
                            }
                        })
                        this.$store.commit('layer/setLayer', curLayer)
                    }
                })
            }
        },
        formCatsFilter() {
            this.collapseLoading = true
            this.cpActiveName = 0
        },
        curCollapseOptions(newVal) {
            this.$nextTick(() => {
                //这里是数据改变后视图渲染完成的回调
                let timer = setTimeout(() => {
                    this.collapseLoading = false
                    clearTimeout(timer)
                }, 400)
            })
        },
    },
    computed: {
        ...mapGetters(['activeLayers']), //选定图层
        activeLayersStr() {
            return JSON.stringify(this.activeLayers)
        },
        formCatsFilter() {
            if (this.activeLayers[0]) {
                return this.layerFormCats.filter((cat) =>
                    cat.compTypeFilter.includes(this.activeLayers[0].type)
                )
            } else {
                return []
            }
        },
        curformControlOptions() {
            return this.activeLayers[0].formControlOptions
        },
        curCollapseOptions() {
            return this.cpActiveName === ''
                ? []
                : this.curformControlOptions.filter((option) =>
                      this.formCatsFilter[
                          this.cpActiveName
                      ].optionsFilter.includes(option.key)
                  )
        },
    },
    methods: {
        collapseChange(e) {
            //面板折叠事件
            if (e === '') return
            this.collapseLoading = true
        },
    },
}
</script>
<style lang="scss">
.layerOptionsBox {
    .el-collapse-item__header {
        padding: 0 2px 0 10px;
    }
    .el-collapse-item__header {
        flex-direction: row-reverse;
        justify-content: flex-end;
    }
    .el-collapse-item__arrow {
        margin: 0 8px 0 0;
    }
}
</style>
