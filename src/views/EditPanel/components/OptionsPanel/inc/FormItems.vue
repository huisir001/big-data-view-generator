<!--
 * @Description: 表单分发组件
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月30日 10:36:54
 * @LastEditTime: 2021-01-13 11:00:43
-->
<template>
    <el-tooltip
        effect="light"
        :disabled="!formItemOption.tooltip"
        placement="left"
    >
        <div slot="content" v-html="formItemOption.tooltip"></div>
        <el-form-item
            v-if="!formItemOption.hide"
            :label="formItemOption.label"
            :class="`formOptions${
                formItemOption.labelOnTop ? ' labelOnTop' : ''
            }`"
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

            <!-- 计数器和下拉框切换 -->
            <template v-if="formItemOption.compType == 'numOrSelect'">
                <el-input-number
                    v-if="numOrSelectInputType == 'number'"
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
                    style="width: calc(100% - 38px)"
                ></el-input-number>
                <el-select
                    v-else
                    v-model="formModelVal"
                    placeholder="请选择"
                    style="width: calc(100% - 38px)"
                >
                    <el-option
                        v-for="option in formItemOption.options"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                    >
                    </el-option>
                </el-select>
                <el-tooltip
                    class="item"
                    effect="dark"
                    :content="
                        numOrSelectInputType == 'string'
                            ? '切换为计数器'
                            : '切换为选择框'
                    "
                    placement="top-end"
                >
                    <i
                        class="el-icon-sort numOrSelectBtn"
                        @click="
                            numOrSelectInputType =
                                numOrSelectInputType == 'string'
                                    ? 'number'
                                    : 'string'
                        "
                    ></i>
                </el-tooltip>
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
                    :style="`${
                        formModelVal.length == 1 ? 'width:100%;' : 'width:49%;'
                    }margin-left: ${index % 2 == 0 ? 0 : 2}%;margin-top: ${
                        index < 2 ? 0 : 2
                    }%;`"
                ></el-input-number>
            </template>

            <!-- 数字数组增删组件 -->
            <template v-if="formItemOption.compType == 'numberArrayModifier'">
                <table class="formItemTable numberArray">
                    <thead>
                        <tr>
                            <th>下标</th>
                            <th>数组项</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(_, index) in formModelVal" :key="index">
                            <td width="60">{{ index }}</td>
                            <td>
                                <el-input-number
                                    size="small"
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
                                    class="numberArrayModifierInput"
                                ></el-input-number>
                            </td>
                            <td width="70">
                                <el-button
                                    size="mini"
                                    type="danger"
                                    @click="delNumberArray(index)"
                                    >删除</el-button
                                >
                            </td>
                        </tr>
                        <tr>
                            <td colspan="5">
                                <el-button
                                    size="mini"
                                    type="primary"
                                    @click="addNumberArray"
                                    >+ 新增</el-button
                                >
                            </td>
                        </tr>
                    </tbody>
                </table>
            </template>

            <!-- 字符串数组 -->
            <template v-if="formItemOption.compType == 'stringArray'">
                <el-input
                    size="small"
                    v-for="(_, index) in formModelVal"
                    :key="index"
                    v-model="formModelVal[index]"
                    :style="`${
                        formModelVal.length == 1 ? 'width:100%;' : 'width:49%;'
                    }margin-left: ${index % 2 == 0 ? 0 : 2}%;margin-top: ${
                        index < 2 ? 0 : 2
                    }%;`"
                ></el-input>
            </template>

            <!-- 下拉框数组增删组件 -->
            <template v-if="formItemOption.compType == 'selectArrayModifier'">
                <table class="formItemTable selectArray">
                    <thead>
                        <tr>
                            <th>下标</th>
                            <th>数组项</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(_, index) in formModelVal" :key="index">
                            <td width="60">{{ index }}</td>
                            <td>
                                <el-select
                                    size="small"
                                    v-model="formModelVal[index]"
                                    placeholder="请选择"
                                >
                                    <el-option
                                        v-for="option in formItemOption.options"
                                        :key="option.value"
                                        :label="option.label"
                                        :value="option.value"
                                    >
                                    </el-option>
                                </el-select>
                            </td>
                            <td width="70">
                                <el-button
                                    size="mini"
                                    type="danger"
                                    @click="delSelectArray(index)"
                                    >删除</el-button
                                >
                            </td>
                        </tr>
                        <tr>
                            <td colspan="5">
                                <el-button
                                    size="mini"
                                    type="primary"
                                    @click="addSelectArray"
                                    >+ 新增</el-button
                                >
                            </td>
                        </tr>
                    </tbody>
                </table>
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
                    {{ formModelVal + (formItemOption.suffix || '') }}
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

            <!-- 图片选择器 -->
            <template v-if="formItemOption.compType == 'image'">
                <div @click="imageDialogVisible = true">
                    <el-image
                        style="
                            width: 100%;
                            height: 125px;
                            background: #33434f;
                            border-radius: 3px;
                        "
                        fit="contain"
                        :src="formModelVal"
                    >
                        <div slot="error" class="image-slot">
                            <i class="el-icon-picture"></i>
                        </div>
                    </el-image>
                    <!-- 图库选择弹窗 -->
                    <el-dialog
                        title="背景图库"
                        :append-to-body="true"
                        :visible.sync="imageDialogVisible"
                        width="60%"
                    >
                        <Gallery
                            :type="formItemOption.galleryType"
                            @handleSelect="imageSelect"
                        ></Gallery>
                    </el-dialog>
                </div>
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
                    show-alpha
                ></el-color-picker>
            </template>

            <!-- 多颜色选择器 -->
            <template v-if="formItemOption.compType == 'colors'">
                <table class="formItemTable">
                    <thead>
                        <tr>
                            <th>基础</th>
                            <th v-if="formItemOption.section">分段</th>
                            <th v-if="!formItemOption.section">渐变</th>
                            <th v-if="!formItemOption.section">是否渐变</th>
                            <th v-if="!formItemOption.section">渐变范围</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in formModelVal" :key="index">
                            <td width="45">
                                <el-color-picker
                                    v-model="item.color"
                                    size="mini"
                                    show-alpha
                                ></el-color-picker>
                            </td>
                            <td v-if="formItemOption.section" width="180">
                                <el-slider
                                    v-model="item.per"
                                    :step="0.1"
                                    :max="1"
                                >
                                </el-slider>
                            </td>
                            <td v-if="!formItemOption.section" width="45">
                                <el-color-picker
                                    v-model="item.gdColor"
                                    size="mini"
                                    show-alpha
                                ></el-color-picker>
                            </td>
                            <td v-if="!formItemOption.section">
                                <el-switch
                                    v-model="item.isGradient"
                                    active-color="#409EFF"
                                    inactive-color="#33434f"
                                >
                                </el-switch>
                            </td>
                            <td v-if="!formItemOption.section">
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
                                    @click="deleteColor(index)"
                                    >删除</el-button
                                >
                            </td>
                        </tr>
                        <tr>
                            <td :colspan="formItemOption.section ? 3 : 5">
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

            <!-- 事件添加器 -->
            <template v-if="formItemOption.compType == 'events'">
                <div
                    class="eventItem"
                    v-for="(item, index) in formModelVal"
                    :key="index"
                >
                    <el-form-item label="事件类型">
                        <el-select v-model="item.event" placeholder="请选择">
                            <el-option
                                v-for="e in events"
                                :key="e"
                                :label="e"
                                :value="e"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="指定元素">
                        <el-switch
                            v-model="item.setQuery"
                            active-color="#409EFF"
                            inactive-color="#33434f"
                        >
                        </el-switch>
                    </el-form-item>
                    <el-form-item v-if="item.setQuery" label="元素配置">
                        <el-select v-model="item.query" placeholder="请选择">
                            <el-option
                                v-for="q in eventQuerys"
                                :key="q"
                                :label="q"
                                :value="q"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="回调函数">
                        <el-input
                            class="inputBox"
                            v-model="item.callback"
                            size="small"
                            clearable
                            type="textarea"
                            readonly
                            resize="none"
                            show-word-limit
                            :autosize="{ minRows: 3, maxRows: 10 }"
                        ></el-input>
                        <!-- 操作按钮组 -->
                        <el-button-group class="formItemBtnGroup">
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
                                @click="eventCbEdit(index, item.callback)"
                            ></el-button>
                        </el-button-group>
                    </el-form-item>
                    <div style="text-align: right; margin-bottom: -6px">
                        <el-button
                            size="mini"
                            type="danger"
                            @click="delEvent(index)"
                            >删除</el-button
                        >
                    </div>
                    <el-divider></el-divider>
                </div>
                <el-button
                    size="small"
                    style="width: 100%"
                    type="primary"
                    @click="addEvent"
                    >+ 新增事件</el-button
                >
            </template>
        </el-form-item>
    </el-tooltip>
</template>
<script>
import Gallery from './Gallery'
export default {
    name: 'FormItems',
    props: ['optionKey', 'formItemOption', 'activeLayer', 'pageOptions'],
    components: {
        Gallery,
    },
    data() {
        return {
            imageDialogVisible: false,
            events: [
                'click',
                'dblclick',
                'mousedown',
                'mousemove',
                'mouseup',
                'mouseover',
                'mouseout',
                'globalout',
                'contextmenu',
                'rendered',
                'restore',
                'finished',
                'legendselectchanged',
                'legendselected',
                'legendunselected',
                'legendselectall',
                'legendinverseselect',
                'legendscroll',
                'datazoom',
                'datarangeselected',
                'geoselectchanged',
                'geoselected',
                'geounselected',
                'pieselectchanged',
                'pieselected',
                'pieunselected',
                'mapselected',
                'mapunselected',
            ],
            eventQuerys: [
                'series',
                'series.line',
                'series.bar',
                'dataZoom',
                'xAxis.category',
                'markPoint',
            ],
        }
    },
    computed: {
        //表单项绑定的数据（这里手写get和set方法以便能实时更新state中的数据）
        formModelVal: {
            get() {
                try {
                    const {
                        formItemOption,
                        optionKey,
                        activeLayer,
                        pageOptions,
                    } = this
                    let compOptionVal = pageOptions
                        ? pageOptions[optionKey]
                        : formItemOption.layerOption //系统配置项
                        ? activeLayer[optionKey] //图层本身配置项
                        : activeLayer.compOptions[optionKey] //图层内组件配置项

                    //判断数字是否有后缀（不含数组情况）
                    if (
                        formItemOption.suffix &&
                        typeof compOptionVal == 'string'
                    ) {
                        compOptionVal = parseFloat(compOptionVal)
                    }

                    // 如果需要转义字符串的 将对象转义后的字符串显示在文本框（一般为json才需要转义）
                    return formItemOption.stringify
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
                    const {
                        formItemOption,
                        optionKey,
                        activeLayer,
                        pageOptions,
                    } = this
                    let optionVal =
                        activeLayer && formItemOption.stringify
                            ? JSON.parse(value)
                            : value

                    //判断数字是否有后缀（不含数组情况）
                    if (formItemOption.suffix && typeof optionVal == 'number') {
                        optionVal = optionVal + formItemOption.suffix
                    }

                    //系统配置项
                    if (pageOptions) {
                        let newPageOptions = {}
                        newPageOptions[optionKey] = optionVal
                        this.$store.commit(
                            'system/setPageOptions',
                            newPageOptions
                        )
                        return
                    }

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
        /* 数字框切换文本框类型 */
        numOrSelectInputType: {
            get() {
                const { formItemOption, formModelVal } = this
                if (formItemOption.compType == 'numOrSelect') {
                    return typeof formModelVal
                }
            },
            set(value) {
                if (value == 'string') {
                    this.formModelVal = this.formItemOption.options[0].value
                } else {
                    this.formModelVal = 0
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
        //新增数字数组对象
        addNumberArray() {
            this.formModelVal.push(80)
        },
        //删除数字数组对象
        delNumberArray(index) {
            this.formModelVal.splice(index, 1)
        },
        //新增下拉选数组对象
        addSelectArray() {
            this.formModelVal.push('')
        },
        //删除下拉选数组对象
        delSelectArray(index) {
            this.formModelVal.splice(index, 1)
        },
        //图片选择
        imageSelect(picUrl) {
            this.formModelVal = picUrl
            this.imageDialogVisible = false
        },
        //新增事件
        addEvent() {
            this.formModelVal = this.formModelVal || []
            this.formModelVal.push({
                event: 'click',
                setQuery: false,
                callback: `function(e){\n  console.log(e)\n}`,
            })
            this.$notify({
                title: '添加事件成功',
                message: '请注意不要添加重复的事件，否则会出现未知的意外。',
                position: 'bottom-right',
                type: 'success',
            })
        },
        //删除事件
        delEvent(index) {
            this.formModelVal.splice(index, 1)
        },
        //编辑事件回调
        eventCbEdit(index, eventCbVal) {
            const { $alert } = this
            $alert('请确保JSON格式、数据结构或代码逻辑正确', '数据代码编辑', {
                customClass: 'myMessageBox',
                showCancelButton: true,
                confirmButtonText: '确定',
                showInput: true,
                inputType: 'textarea',
                inputValue: eventCbVal,
                beforeClose(action, instance, done) {
                    instance.editorErrorMessage = ''
                    if (action == 'cancel') {
                        done()
                        return
                    }

                    //函数代码验证
                    try {
                        eval(`(${instance.inputValue})()`)
                    } catch (error) {
                        instance.editorErrorMessage = error
                        return
                    }

                    done()
                    return
                },
            })
                .then(({ value }) => {
                    this.formModelVal[index].callback = value
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
    width: 28px;
    text-align: center;
    background-color: #33434f;
    border: 1px solid #000000;
    border-radius: 2px;
    height: 24px;
}
.numOrSelectBtn {
    padding: 8px 10px;
    background: #33434f;
    border-radius: 3px;
    transform: translateY(1px);
    margin-left: 4px;
    cursor: pointer;
    &:active {
        background: #409eff;
    }
}
</style>
<style lang="scss">
.labelOnTop {
    display: flex;
    flex-direction: column;
    & > .el-form-item__content {
        margin-left: 0 !important;
    }
    label.el-form-item__label {
        width: 100% !important;
    }
}
.numberArrayModifierInput {
    line-height: 25px !important;
    .el-input__inner {
        padding-left: 10px !important;
        height: 26px !important;
        line-height: 26px !important;
    }
    span.el-input-number__decrease,
    span.el-input-number__increase {
        width: 24px !important;
        line-height: 12px !important;
    }
}
.formOptions {
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
        &.numberArray,
        &.selectArray {
            td,
            th {
                padding: 5px;
            }
        }
    }
    .eventItem {
        .el-divider {
            background-color: #666668;
        }
    }
}
.image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #909399;
    font-size: 25px;
}
</style>
