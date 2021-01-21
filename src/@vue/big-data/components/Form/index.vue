<!--
 * @Description: 表单
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-01-20 09:59:15
 * @LastEditTime: 2021-01-21 18:12:09
-->
<template>
    <div style="width: 100%; height: 100%">
        <div
            class="form-item"
            v-for="(item, index) in options.formItems"
            :key="index"
        >
            <template v-if="item.type == 'text'">
                <input
                    type="text"
                    v-model="item.value"
                    class="formInput"
                    :placeholder="item.placeholder"
                    :style="{
                        width: item.width,
                        height: item.height,
                        lineHeight: item.height,
                        border: `${item.borderWidth}px ${item.borderStyle} ${item.borderColor}`,
                    }"
                />
            </template>
            <template v-if="item.type == 'select'">
                <select
                    v-model="item.value"
                    class="formInput"
                    :style="{
                        width: item.width,
                        height: item.height,
                        lineHeight: item.height,
                        border: `${item.borderWidth}px ${item.borderStyle} ${item.borderColor}`,
                    }"
                >
                    <option value="">{{ item.placeholder }}</option>
                    <option
                        v-for="o in item.options"
                        :key="o.value"
                        :value="o.value"
                    >
                        {{ o.name }}
                    </option>
                </select>
            </template>
            <template v-if="item.type == 'date'">
                <!-- date-type:1-5 -->
                <DateSelect
                    :date-type="item.dateType"
                    :sel-val="item.value"
                    :width="item.width"
                    :height="item.height"
                    :border="`${item.borderWidth}px ${item.borderStyle} ${item.borderColor}`"
                ></DateSelect>
            </template>
        </div>
    </div>
</template>
<script>
import others from '../../mixins/others'
import DateSelect from './components/DateSelect'
export default {
    name: 'Form',
    mixins: [others],
    components: {
        DateSelect, //日期组件
    },
    data() {
        return {}
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
