<!--
 * @Description: 系统配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月21日 16:25:50
 * @LastEditTime: 2021-01-12 15:16:13
-->
<template>
    <div class="systemOptionsBox">
        <el-form label-position="left" label-width="66px">
            <el-collapse
                v-model="cpActiveName"
                accordion
                @change="collapseChange"
            >
                <el-collapse-item
                    v-for="(catItem, i) in systemFormCats"
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
                                :pageOptions="pageOptions"
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
import systemFormCats from '@/config/systemFormCats'
const { mapState, mapGetters } = createNamespacedHelpers('system')
export default {
    name: 'SystemOptions',
    components: {
        FormItems,
    },
    data() {
        return {
            systemFormCats,
            cpActiveName: 0, //折叠面板当前激活项
            collapseLoading: false,
        }
    },
    watch: {
        pageOptionsStr(val, oldVal) {
            let newPageOptions = val ? JSON.parse(val) : {},
                oldPageOptions = oldVal ? JSON.parse(oldVal) : {}

            if (!val) {
                return
            }

            /* 控制数据配置表单项显隐 */
            if (this.curCollapseOptions.length > 0) {
                this.curCollapseOptions.forEach((item) => {
                    if (
                        item.compType == 'switch' &&
                        item.displayItems &&
                        newPageOptions[item.key] == !oldPageOptions[item.key]
                    ) {
                        this.curCollapseOptions.forEach((optionItem) => {
                            if (
                                item.displayItems.t &&
                                item.displayItems.t.includes(optionItem.key)
                            ) {
                                optionItem.hide = !newPageOptions[item.key]
                            }
                            if (
                                item.displayItems.f &&
                                item.displayItems.f.includes(optionItem.key)
                            ) {
                                optionItem.hide = newPageOptions[item.key]
                            }
                        })
                        this.$store.commit(
                            'system/setPageOptions',
                            newPageOptions
                        )
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
        ...mapState(['pageOptions']),
        ...mapGetters(['pageOptionsStr']),
        curCollapseOptions() {
            return this.cpActiveName === ''
                ? []
                : this.systemFormCats[this.cpActiveName].formControlOptions
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
.systemOptionsBox {
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
