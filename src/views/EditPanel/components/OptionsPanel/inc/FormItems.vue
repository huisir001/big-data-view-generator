<!--
 * @Description: 表单分发组件
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月30日 10:36:54
 * @LastEditTime: 2020-12-03 17:55:59
-->
<template>
    <el-form-item
        v-show="!formItemOption.hide"
        :label="formItemOption.label"
        :class="`formOptions${formItemOption.labelOnTop ? ' labelOnTop' : ''}`"
    >
        <!-- 输入框 -->
        <template v-if="formItemOption.compType == 'input'">
            <el-input
                class="inputBox"
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
                :autosize="{ minRows: 3, maxRows: 10 }"
            ></el-input>
            <!-- 操作按钮组 -->
            <el-button-group
                v-if="formItemOption.showBtnGroup"
                class="formItemBtnGroup"
            >
                <el-button
                    type="info"
                    icon="el-icon-document-copy"
                    size="mini"
                    title="复制"
                    @click="formItemCopy"
                ></el-button>
                <el-button
                    type="info"
                    icon="el-icon-edit"
                    size="mini"
                    title="编辑"
                    @click="formItemEdit"
                ></el-button>
            </el-button-group>
        </template>

        <!-- 计数器 -->
        <template v-if="formItemOption.compType == 'number'">
            <el-input-number
                size="small"
                v-model="formModelVal"
                controls-position="right"
                :min="
                    formItemOption.min
                        ? formItemOption.min
                        : formItemOption.min === 0
                        ? 0
                        : -Infinity
                "
                :max="
                    formItemOption.max
                        ? formItemOption.max
                        : formItemOption.max === 0
                        ? 0
                        : Infinity
                "
            ></el-input-number>
        </template>

        <!-- 数字数组 -->
        <template v-if="formItemOption.compType == 'numberArray'">
            <el-input-number
                size="small"
                v-for="(_, index) in formModelVal"
                :key="index"
                v-model="formModelVal[index]"
                controls-position="right"
                :min="
                    formItemOption.min
                        ? formItemOption.min
                        : formItemOption.min === 0
                        ? 0
                        : -Infinity
                "
                :max="
                    formItemOption.max
                        ? formItemOption.max
                        : formItemOption.max === 0
                        ? 0
                        : Infinity
                "
                :style="`width:49%; margin-left: ${
                    index % 2 == 0 ? 0 : 2
                }%;margin-top: ${index < 2 ? 0 : 2}%;`"
            ></el-input-number>
        </template>

        <!-- 滑块 -->
        <template v-if="formItemOption.compType == 'slider'">
            <el-slider
                v-model="formModelVal"
                :show-tooltip="false"
                :min="formItemOption.min || 0"
                :max="formItemOption.max || 100"
                :step="formItemOption.step || 1"
            ></el-slider>
            <div class="sliderValLabel">
                {{ formModelVal }}
            </div>
        </template>

        <!-- 范围滑块 -->
        <template v-if="formItemOption.compType == 'rangeSlider'">
            <el-slider
                class="rangeSlider"
                v-model="formModelVal"
                range
                show-tooltip
                :min="formItemOption.min || 0"
                :max="formItemOption.max || 100"
                :step="formItemOption.step || 1"
            ></el-slider>
        </template>

        <!-- 开关 -->
        <template v-if="formItemOption.compType == 'switch'">
            <el-switch
                v-model="formModelVal"
                active-color="#409EFF"
                inactive-color="#33434f"
            >
            </el-switch>
        </template>

        <!-- 下拉选 -->
        <template v-if="formItemOption.compType == 'select'">
            <el-select v-model="formModelVal" placeholder="请选择">
                <el-option
                    v-for="option in formItemOption.options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                >
                </el-option>
            </el-select>
        </template>

        <!-- 单颜色选择器 -->
        <template v-if="formItemOption.compType == 'color'">
            <el-color-picker
                v-model="formModelVal"
                size="mini"
            ></el-color-picker>
        </template>

        <!-- 多颜色选择器 -->
        <template v-if="formItemOption.compType == 'colors'">
            <table class="formItemTable">
                <thead>
                    <tr>
                        <th>基础</th>
                        <th>渐变</th>
                        <th>是否渐变</th>
                        <th>渐变范围</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in formModelVal" :key="index">
                        <td width="45">
                            <el-color-picker
                                v-model="item.color"
                                size="mini"
                            ></el-color-picker>
                        </td>
                        <td width="45">
                            <el-color-picker
                                v-model="item.gdColor"
                                size="mini"
                            ></el-color-picker>
                        </td>
                        <td>
                            <el-switch
                                v-model="item.isGradient"
                                active-color="#409EFF"
                                inactive-color="#33434f"
                            >
                            </el-switch>
                        </td>
                        <td>
                            <el-slider
                                v-model="item.gdScope"
                                range
                                :step="0.1"
                                :max="1"
                                :disabled="!item.isGradient"
                            >
                            </el-slider>
                        </td>
                        <td>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="deleteColor(index, item)"
                                >删除</el-button
                            >
                        </td>
                    </tr>
                    <tr>
                        <td colspan="5">
                            <el-button
                                size="mini"
                                type="primary"
                                @click="addColor"
                                >+ 新增</el-button
                            >
                        </td>
                    </tr>
                </tbody>
            </table>
        </template>
    </el-form-item>
</template>
<script>
export default {
    name: 'FormItems',
    props: ['optionKey', 'formItemOption', 'activeLayer'],
    computed: {
        //表单项绑定的数据（这里手写get和set方法以便能实时更新state中的数据）
        formModelVal: {
            get() {
                try {
                    const { formItemOption, optionKey, activeLayer } = this
                    const compOptionVal = formItemOption.layerOption
                        ? activeLayer[optionKey] //图层本身配置项
                        : activeLayer.compOptions[optionKey] //图层内组件配置项

                    // 如果需要转义字符串的 将对象转义后的字符串显示在文本框（一般为代码才需要转义）
                    return activeLayer && formItemOption.stringify
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
                    const { formItemOption, optionKey, activeLayer } = this
                    const optionVal =
                        activeLayer && formItemOption.stringify
                            ? JSON.parse(value)
                            : value
                    if (formItemOption.layerOption) {
                        //图层本身配置项
                        this.activeLayer[optionKey] = optionVal
                    } else {
                        //图层内组件配置项
                        this.activeLayer.compOptions[optionKey] = optionVal
                        this.activeLayer.compOptions.lastChangeTime = Date.now() //改变时间戳重新渲染图表
                    }
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
                    this.$notify({
                        title: '复制成功',
                        message: '已将代码复制到了剪贴板',
                        type: 'success',
                    })
                },
                (err) => {
                    console.error('[CopyText error]:', err)
                    this.$notify({
                        title: '复制出错',
                        message: '请到控制台查看具体报错信息',
                        type: 'error',
                    })
                }
            )
        },
        //编辑
        formItemEdit() {
            const { $alert, formModelVal, formItemOption } = this
            $alert('请确保JSON格式、数据结构或代码逻辑正确', '数据代码编辑', {
                customClass: 'myMessageBox',
                showCancelButton: true,
                confirmButtonText: '确定',
                showInput: true,
                inputType: 'textarea',
                inputValue: formModelVal,
                beforeClose(action, instance, done) {
                    instance.editorErrorMessage = ''
                    if (action == 'cancel') {
                        done()
                        return
                    }

                    if (
                        !formItemOption.stringify &&
                        !instance.inputValue.includes('function')
                    ) {
                        //
                        done()
                        return
                    }

                    //函数代码验证
                    if (instance.inputValue.includes('function')) {
                        try {
                            eval(`(${instance.inputValue})()`)
                        } catch (error) {
                            instance.editorErrorMessage = error
                            return
                        }

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
                    let FormModelVal = JSON.parse(formModelVal),
                        flag = true
                    Object.keys(FormModelVal).forEach((item) => {
                        if (
                            (jsonObj[item] != 0 && !jsonObj[item]) ||
                            FormModelVal[item].constructor.name !=
                                jsonObj[item].constructor.name
                        ) {
                            flag = false
                        }
                    })

                    if (flag) {
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
        //新增颜色列表
        addColor() {
            this.formModelVal.push({
                color: '#409EFF',
                gdColor: '#49FF83',
                isGradient: false,
                gdScope: [0, 1],
            })
        },
        //删除单颜色
        deleteColor(index) {
            this.formModelVal.splice(index, 1)
        },
    },
}
</script>
<style lang="scss" scoped>
.formItemBtnGroup {
    position: absolute;
    right: 15px;
    top: 6px;
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
.sliderValLabel {
    position: absolute;
    right: 0;
    top: 5px;
    line-height: 22px;
    color: #fff;
    font-size: 12px;
    font-family: cursive;
    width: 26px;
    text-align: center;
    background-color: #33434f;
    border: 1px solid #000000;
    border-radius: 2px;
    height: 24px;
}
</style>
<style lang="scss">
.labelOnTop {
    display: flex;
    flex-direction: column;
    .el-form-item__content {
        margin-left: 0 !important;
    }
}
.formItemTable {
    width: 100%;
    border-collapse: collapse;
    margin: 0 auto;
    text-align: center;
    td,
    th {
        border: 1px solid #000;
        color: #fff;
        height: 30px;
    }
    thead th {
        background-color: #33434f;
        font-size: 12px;
    }
    tr {
        background: #161f28;
    }
    .el-slider__runway {
        width: calc(100% - 20px);
        margin-left: 10px;
    }
}
</style>
