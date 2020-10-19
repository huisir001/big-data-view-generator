<!--
 * @Description: 表单分发组件
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月30日 10:36:54
 * @LastEditTime: 2020-10-19 17:03:33
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
                try {
                    const { optionKey, activeLayer, stringifyOptionKeys } = this
                    const compOptionVal = activeLayer.compOptions[optionKey]
                    return activeLayer &&
                        stringifyOptionKeys.includes(optionKey)
                        ? JSON.stringify(compOptionVal)
                        : compOptionVal
                } catch (error) {
                    console.error(
                        '[Options error]: Check the content format in the configuration form is correct.'
                    )
                }
            },
            set(value) {
                try {
                    const { optionKey, activeLayer, stringifyOptionKeys } = this
                    const optionVal =
                        activeLayer && stringifyOptionKeys.includes(optionKey)
                            ? JSON.parse(value)
                            : value
                    this.activeLayer.compOptions[optionKey] = optionVal
                    this.$store.commit('layer/setLayer', this.activeLayer)
                } catch (error) {
                    console.error(
                        '[Options error]: Check the content format in the configuration form is correct.'
                    )
                }
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