<!--
 * @Description: 表单分发组件
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月30日 10:36:54
 * @LastEditTime: 2020-09-30 11:39:46
-->
<template>
    <el-form-item :label="param.label"
                  class="formOptions">
        <template v-if="param.compType=='input'">
            <el-input v-model="param.value"
                      size="small"
                      clearable
                      :placeholder="param.placeholder || ''"
                      :disabled="param.disabled || false"
                      :type="param.inputType || 'text'"
                      :autosize="{ minRows: 3, maxRows:10 }"></el-input>
        </template>
    </el-form-item>
</template>
<script>
export default {
    name: 'FormOptions',
    props: ['param'],
    data() {
        return {}
    },
    mounted() {
        console.log(this.param)
    },
    computed: {},
    methods: {},
}
</script>
<style lang="scss" scoped>
// .FormOptions {
// }
</style>