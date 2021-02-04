<!--
 * @Description: 表单分发组件
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月30日 10:36:54
 * @LastEditTime: 2021-02-04 15:37:43
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
                <el-select
                    v-model="formModelVal"
                    :multiple="formItemOption.multiple || false"
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

            <!-- 基本数组增删组件 -->
            <template v-if="formItemOption.compType == 'baseArray'">
                <table class="formItemTable bAFormTable">
                    <thead>
                        <tr>
                            <th width="60">下标</th>
                            <th>数组项</th>
                            <th width="60">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(_, index) in formModelVal" :key="index">
                            <td>{{ index }}</td>
                            <td>
                                <el-input
                                    v-if="formItemOption.itemType == 'text'"
                                    v-model="formModelVal[index]"
                                    class="textArrayModifierInput"
                                    size="mini"
                                    type="text"
                                ></el-input>
                                <el-select
                                    v-if="formItemOption.itemType == 'select'"
                                    v-model="formModelVal[index]"
                                    class="selectArrayModifierInput"
                                    placeholder="请选择"
                                    size="small"
                                >
                                    <el-option
                                        v-for="option in formItemOption.options"
                                        :key="option.value"
                                        :label="option.label"
                                        :value="option.value"
                                    >
                                    </el-option>
                                </el-select>
                                <el-input-number
                                    v-if="formItemOption.itemType == 'number'"
                                    v-model="formModelVal[index]"
                                    class="numberArrayModifierInput"
                                    controls-position="right"
                                    size="small"
                                    :min="
                                        formModelVal.min
                                            ? formModelVal.min
                                            : formModelVal.min === 0
                                            ? 0
                                            : -Infinity
                                    "
                                    :max="
                                        formModelVal.max
                                            ? formModelVal.max
                                            : formModelVal.max === 0
                                            ? 0
                                            : Infinity
                                    "
                                ></el-input-number>
                            </td>
                            <td>
                                <el-button
                                    size="mini"
                                    type="danger"
                                    icon="el-icon-delete"
                                    style="padding: 3px 4px"
                                    @click="delBaseArray(index)"
                                ></el-button>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                <el-button
                                    size="mini"
                                    type="primary"
                                    @click="addBaseArray"
                                    >+ 新增</el-button
                                >
                            </td>
                        </tr>
                    </tbody>
                </table>
            </template>

            <!-- 复合数组增删组件 -->
            <template v-if="formItemOption.compType == 'complexArray'">
                <table class="formItemTable cAFormTable">
                    <thead>
                        <tr>
                            <th
                                v-for="col in formItemOption.cols"
                                :key="col.field"
                                :style="{
                                    width: col.width
                                        ? col.width + 'px'
                                        : 'auto',
                                }"
                            >
                                {{ col.lable }}
                            </th>
                            <th :width="formItemOption.btnColWidth || 36">
                                操作
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in formModelVal" :key="index">
                            <td
                                v-for="col in formItemOption.cols"
                                :key="col.field"
                            >
                                <template v-if="item.hasOwnProperty(col.field)">
                                    <el-input
                                        v-if="col.type == 'text'"
                                        v-model="item[col.field]"
                                        class="textArrayModifierInput"
                                        size="mini"
                                        type="text"
                                        :style="{
                                            width: col.allowEmpty
                                                ? 'calc(100% - 16px)'
                                                : '100%',
                                        }"
                                    ></el-input>
                                    <el-select
                                        v-if="col.type == 'select'"
                                        v-model="item[col.field]"
                                        size="small"
                                        class="selectArrayModifierInput"
                                        placeholder="请选择"
                                        :style="{
                                            width: col.allowEmpty
                                                ? 'calc(100% - 16px)'
                                                : '100%',
                                        }"
                                    >
                                        <el-option
                                            v-for="option in col.options"
                                            :key="option.value"
                                            :label="option.label"
                                            :value="option.value"
                                        >
                                        </el-option>
                                    </el-select>
                                    <el-input-number
                                        v-if="col.type == 'number'"
                                        v-model="item[col.field]"
                                        class="numberArrayModifierInput"
                                        controls-position="right"
                                        size="small"
                                        :min="
                                            col.min
                                                ? col.min
                                                : col.min === 0
                                                ? 0
                                                : -Infinity
                                        "
                                        :max="
                                            col.max
                                                ? col.max
                                                : col.max === 0
                                                ? 0
                                                : Infinity
                                        "
                                        :style="{
                                            width: col.allowEmpty
                                                ? 'calc(100% - 16px)'
                                                : '100%',
                                        }"
                                    ></el-input-number>
                                    <!-- 允许为空 -->
                                    <i
                                        v-if="col.allowEmpty"
                                        class="el-icon-error allowEmpty"
                                        title="不传此项"
                                        @click="
                                            setArrayItemEmpty(index, col.field)
                                        "
                                    ></i>
                                </template>
                                <i
                                    v-else
                                    class="el-icon-circle-plus allowEmpty"
                                    title="添加此项"
                                    @click="
                                        cancelArrayItemEmpty(index, col.field)
                                    "
                                ></i>
                            </td>
                            <td>
                                <el-button
                                    size="mini"
                                    type="danger"
                                    icon="el-icon-delete"
                                    style="padding: 3px 4px"
                                    @click="delComplexArray(index)"
                                ></el-button>
                            </td>
                        </tr>
                        <tr>
                            <td :colspan="formItemOption.cols.length + 1">
                                <el-button
                                    size="mini"
                                    type="primary"
                                    @click="addComplexArray"
                                    >+ 新增</el-button
                                >
                            </td>
                        </tr>
                    </tbody>
                </table>
            </template>

            <!-- 表单事件联动 -->
            <template v-if="formItemOption.compType == 'formEvent'">
                <el-select
                    v-model="formModelVal"
                    multiple
                    placeholder="请选择图层"
                >
                    <el-option
                        v-for="l in linkageLayers"
                        :key="l.id"
                        :label="l.name"
                        :value="l.id"
                    >
                    </el-option>
                </el-select>
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
                    <el-form-item label="自定义回调函数">
                        <el-switch
                            v-model="item.diyCallback"
                            active-color="#409EFF"
                            inactive-color="#33434f"
                        >
                        </el-switch>
                    </el-form-item>
                    <el-form-item v-if="!item.diyCallback" label="图层联动">
                        <el-select
                            v-model="item.linkageLayers"
                            multiple
                            placeholder="请选择图层"
                        >
                            <el-option
                                v-for="l in linkageLayers"
                                :key="l.id"
                                :label="l.name"
                                :value="l.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-tooltip
                        v-if="!item.diyCallback"
                        effect="light"
                        placement="left"
                    >
                        <div slot="content">
                            e为事件回调参数可直接调用<br />会与联动图层的请求参数合并
                        </div>
                        <el-form-item label="图层传参">
                            <el-input
                                class="inputBox"
                                v-model="item.transmit"
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
                                    @click="formItemCopy(index, item.transmit)"
                                ></el-button>
                                <el-button
                                    type="info"
                                    icon="el-icon-edit"
                                    size="mini"
                                    title="编辑"
                                    @click="
                                        eventCbEdit(index, item.transmit, true)
                                    "
                                ></el-button>
                            </el-button-group>
                        </el-form-item>
                    </el-tooltip>
                    <el-form-item v-if="item.diyCallback" label="回调函数">
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
                                @click="formItemCopy(index)"
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
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('layer')
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
        //图层
        ...mapState(['layers']),
        //图层选项，作为事件图层联动选项，排除当前图层
        linkageLayers() {
            return this.layers
                .map(({ id, name }) => {
                    return { id, name }
                })
                .filter(({ id }) => id != this.activeLayer.id)
        },
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
        formItemCopy(e) {
            const copyStr =
                typeof e == 'number'
                    ? this.formModelVal[e].callback
                    : this.formModelVal

            this.$copyText(copyStr).then(
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
                    if (!FormModelVal instanceof Array) {
                        Object.keys(FormModelVal).forEach((item) => {
                            if (
                                (jsonObj[item] != 0 && !jsonObj[item]) ||
                                FormModelVal[item].constructor.name !=
                                    jsonObj[item].constructor.name
                            ) {
                                flag = false
                            }
                        })
                    }

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
        //新增基本数组项
        addBaseArray() {
            this.formModelVal.push(this.formItemOption.default)
        },
        //删除基本数组项
        delBaseArray(index) {
            this.formModelVal.splice(index, 1)
        },
        //新增复合数组项
        addComplexArray() {
            let newArrItem = {}
            this.formItemOption.cols.forEach((col) => {
                if (!col.allowEmpty) {
                    newArrItem[col.field] = col.default
                }
            })
            this.formModelVal.push(newArrItem)
        },
        //删除复合数组项
        delComplexArray(index) {
            this.formModelVal.splice(index, 1)
        },
        //置空数组项某字段
        setArrayItemEmpty(index, key) {
            let curItem = this.formModelVal[index]
            delete curItem[key]
            //强制更新，解决无法实时监听问题
            this.$set(this.formModelVal, index, curItem)
        },
        //添加数组项某字段
        cancelArrayItemEmpty(index, key) {
            let curItem = this.formModelVal[index]
            curItem[key] = this.formItemOption.cols.find(
                (col) => col.field == key
            ).default
            //强制更新，解决无法实时监听问题
            this.$set(this.formModelVal, index, curItem)
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
                diyCallback: false,
                linkageLayers: [],
                transmit: `{ name: e.name }`,
                callback: `function(e){\n  //console.log(e)\n}`,
                transmitObj: {}, //这是事件点击后返回的真实参数
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
        eventCbEdit(index, eventCbVal, isParam) {
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
                        if (
                            !error.message.includes('Cannot read property') &&
                            !error.message.includes('is not defined')
                        ) {
                            instance.editorErrorMessage = error
                            return
                        }
                    }

                    done()
                    return
                },
            })
                .then(({ value }) => {
                    if (isParam) {
                        this.formModelVal[index].transmit = value
                    } else {
                        this.formModelVal[index].callback = value
                    }
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
        padding: 0 20px 0 5px !important;
        height: 26px !important;
        line-height: 26px !important;
        border: 1px solid #161f28;
    }
    span.el-input-number__decrease,
    span.el-input-number__increase {
        width: 20px !important;
        line-height: 12px !important;
    }
}
.textArrayModifierInput .el-input__inner {
    padding: 0 5px;
    border: 1px solid #161f28;
    height: 26px !important;
    line-height: 26px !important;
}
.selectArrayModifierInput {
    .el-input__inner {
        padding-left: 5px;
        padding-right: 18px !important;
        border: 1px solid #161f28;
        height: 26px !important;
        line-height: 26px !important;
    }
    .el-input--small .el-input__icon {
        line-height: 26px;
        font-size: 12px !important;
        width: 12px;
        height: 26px;
    }
}
i.allowEmpty {
    cursor: pointer;
    color: #85bff8;
    margin-left: 1px;
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
    }
    .eventItem {
        .el-divider {
            background-color: #666668;
        }
        label.el-form-item__label {
            width: 66px !important;
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
