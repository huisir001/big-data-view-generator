<!--
 * @Description: 表单分发组件
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月30日 10:36:54
 * @LastEditTime: 2020-11-04 17:12:08
-->
<template>
    <el-form-item :label="formItemOption.label"
                  class="formOptions">
        <template v-if="formItemOption.compType=='input'">
            <el-input class="inputBox"
                      v-model="formModelVal"
                      size="small"
                      clearable
                      :placeholder="formItemOption.placeholder || ''"
                      :disabled="formItemOption.disabled || false"
                      :type="formItemOption.inputType || 'text'"
                      :maxlength="formItemOption.maxlength || false"
                      :readonly="formItemOption.readonly || false"
                      resize="none"
                      show-word-limit
                      :autosize="{ minRows: 3, maxRows:10 }"></el-input>
            <!-- 操作按钮组 -->
            <el-button-group v-if="formItemOption.showBtnGroup"
                             class="formItemBtnGroup">
                <el-button type="info"
                           icon="el-icon-document-copy"
                           size="mini"
                           title="复制"
                           @click="formItemCopy"></el-button>
                <el-button type="info"
                           icon="el-icon-edit"
                           size="mini"
                           title="编辑"
                           @click="formItemEdit"></el-button>
            </el-button-group>
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
        //表单项绑定的数据（这里手写get和set方法以便能实时更新state中的数据）
        formModelVal: {
            get() {
                try {
                    const { optionKey, activeLayer, stringifyOptionKeys } = this
                    const compOptionVal = activeLayer.compOptions[optionKey]
                    // 如果需要转义字符串的 将对象转义后的字符串显示在文本框（一般为代码才需要转义）
                    return activeLayer &&
                        stringifyOptionKeys.includes(optionKey)
                        ? JSON.stringify(compOptionVal, null, 2) //格式化json，2个空格缩进
                        : compOptionVal
                } catch (error) {
                    //如果转义出错，说明转义的内容格式错误
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
                    //如果转义出错，说明转义的内容格式错误
                    console.error(
                        '[Options error]: Check the content format in the configuration form is correct.'
                    )
                }
            },
        },
    },
    methods: {
        //复制
        formItemCopy() {
            this.$copyText(this.formModelVal).then(
                (res) => {
                    this.$message({
                        type: 'success',
                        message: '复制成功!',
                    })
                },
                (err) => {
                    console.error('[CopyText error]:', err)
                    this.$message({
                        type: 'error',
                        message: '复制出错!',
                    })
                }
            )
        },
        //编辑
        formItemEdit() {
            this.$alert('请确保 JSON格式 及 数据结构 正确', '数据代码编辑', {
                customClass: 'myMessageBox',
                showCancelButton: true,
                confirmButtonText: '确定',
                showInput: true,
                inputType: 'textarea',
                inputValue: this.formModelVal,
                beforeClose(action, instance, done) {
                    instance.editorErrorMessage = ''
                    if (action == 'cancel') {
                        done()
                        return
                    }
                    //JSON格式验证
                    let jsonObj
                    try {
                        jsonObj = JSON.parse(instance.inputValue)
                    } catch (error) {
                        instance.editorErrorMessage = error
                        return
                    }
                    //数据格式验证
                    if (
                        jsonObj.xAxis &&
                        jsonObj.series &&
                        jsonObj.xAxis instanceof Array &&
                        jsonObj.series instanceof Array
                    ) {
                        done()
                    } else {
                        instance.editorErrorMessage =
                            '数据格式有误，请与默认数据进行比对。'
                    }
                },
            })
                .then(({ value }) => {
                    this.formModelVal = value
                })
                .catch(() => false)
        },
    },
}
</script>
<style lang="scss" scoped>
.formItemBtnGroup {
    position: absolute;
    right: 15px;
    top: 28px;
    transition: 0.4s opacity;
    opacity: 0;
    &:hover {
        opacity: 1;
    }
}
.inputBox:hover {
    & + .formItemBtnGroup {
        opacity: 1;
    }
}
</style>