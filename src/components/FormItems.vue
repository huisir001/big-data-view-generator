<!--
 * @Description: 表单分发组件
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月30日 10:36:54
 * @LastEditTime: 2020-10-12 17:51:46
-->
<template>
    <el-form-item :label="formItemOption.label"
                  class="formOptions">
        <template v-if="formItemOption.compType=='input'">
            <el-input v-model="formModelVal"
                      size="small"
                      clearable
                      :placeholder="formItemOption.placeholder || ''"
                      :disabled="formItemOption.disabled || false"
                      :type="formItemOption.inputType || 'text'"
                      :autosize="{ minRows: 3, maxRows:10 }"></el-input>
        </template>
    </el-form-item>
</template>
<script>
/* 待解决问题：修改form表单只修改对应的图层非所有图层、表单中的数据只显示原始数据，非图表重构数据 */
export default {
    name: 'FormItems',
    props: ['optionKey', 'formItemOption', 'activeLayer'],
    data() {
        return {
            stringifyOptionKeys: ['chartData'], //需要转字符串显示在表单中的参数项
        }
    },
    mounted() {},
    computed: {
        formModelVal: {
            get() {
                const { optionKey, activeLayer, stringifyOptionKeys } = this
                const compOptionVal = activeLayer.compOptions[optionKey]
                return activeLayer && stringifyOptionKeys.includes(optionKey)
                    ? JSON.stringify(compOptionVal)
                    : compOptionVal
            },
            set(value) {
                const { optionKey, activeLayer, stringifyOptionKeys } = this
                const optionVal =
                    activeLayer && stringifyOptionKeys.includes(optionKey)
                        ? JSON.parse(value)
                        : value
                this.activeLayer.compOptions[optionKey] = optionVal
                this.$store.commit('layer/setLayer', this.activeLayer)
            },
        },
    },
    methods: {},
}
</script>
<style lang="scss" scoped>
// .FormOptions {
// }
</style>