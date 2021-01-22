<!--
 * @Description: 表单
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-01-20 09:59:15
 * @LastEditTime: 2021-01-22 18:21:10
-->
<template>
    <div style="width: 100%; height: 100%">
        <template v-if="options.type == 'text'">
            <input
                type="text"
                v-model="options.value"
                class="formInput"
                :placeholder="options.placeholder"
                :style="{
                    width: options.formWidth + 'px',
                    height: options.formHeight + 'px',
                    lineHeight: options.formHeight + 'px',
                    border: `${options.borderWidth}px ${options.borderStyle} ${options.borderColor}`,
                }"
            />
        </template>
        <template v-if="options.type == 'select'">
            <select
                v-model="options.value"
                class="formInput"
                :style="{
                    width: options.formWidth + 'px',
                    height: options.formHeight + 'px',
                    lineHeight: options.formHeight + 'px',
                    border: `${options.borderWidth}px ${options.borderStyle} ${options.borderColor}`,
                }"
            >
                <option value="">{{ options.placeholder }}</option>
                <option
                    v-for="o in options.selectOptions"
                    :key="o.value"
                    :value="o.value"
                >
                    {{ o.name }}
                </option>
            </select>
        </template>
        <template v-if="options.type == 'date'">
            <!-- date-type:1-5 -->
            <DateSelect
                :date-type="parseInt(options.dateType)"
                :sel-val="options.value"
                :width="options.formWidth"
                :height="options.formHeight"
                :placeholder="options.placeholder"
                :border="`${options.borderWidth}px ${options.borderStyle} ${options.borderColor}`"
            ></DateSelect>
        </template>
    </div>
</template>
<script>
import Config from './inc/Config'
import others from '../../mixins/others'
import DateSelect from './components/DateSelect'
export default {
    name: 'Form',
    mixins: [others],
    components: {
        DateSelect, //日期组件
    },
    data() {
        return { Config }
    },
}
</script>
<style lang="scss" scoped>
.formInput {
    padding: 2px 5px;
    &:focus,
    &:active,
    &:hover {
        outline: none;
    }
}
</style>
