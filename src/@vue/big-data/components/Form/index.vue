<!--
 * @Description: 表单
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-01-20 09:59:15
 * @LastEditTime: 2021-02-02 10:02:09
-->
<template>
    <div style="width: 100%; height: 100%">
        <template v-if="myOptions.type == 'text'">
            <input
                type="text"
                v-model="myOptions.value"
                class="formInput"
                :placeholder="myOptions.placeholder"
                :style="{
                    width: myOptions.formWidth + 'px',
                    height: myOptions.formHeight + 'px',
                    lineHeight: myOptions.formHeight + 'px',
                    border: `${myOptions.borderWidth}px ${myOptions.borderStyle} ${myOptions.borderColor}`,
                    color: myOptions.color,
                    background: myOptions.background,
                    fontSize: myOptions.formHeight / 2 + 'px',
                }"
            />
        </template>
        <template v-if="myOptions.type == 'select'">
            <select
                v-model="myOptions.value"
                class="formInput"
                :style="{
                    width: myOptions.formWidth + 'px',
                    height: myOptions.formHeight + 'px',
                    lineHeight: myOptions.formHeight + 'px',
                    border: `${myOptions.borderWidth}px ${myOptions.borderStyle} ${myOptions.borderColor}`,
                    color: myOptions.value == '' ? '#757575' : myOptions.color,
                    background: myOptions.background,
                    fontSize: myOptions.formHeight / 2 + 'px',
                }"
            >
                <option value="">{{ myOptions.placeholder }}</option>
                <option
                    v-for="o in myOptions.selectOptions"
                    :key="o.value"
                    :value="o.value"
                >
                    {{ o.name }}
                </option>
            </select>
        </template>
        <template v-if="myOptions.type == 'date'">
            <!-- date-type:1-5 -->
            <!-- :sel-val="myOptions.value" -->
            <DateSelect
                :date-type="parseInt(myOptions.dateType)"
                :sel-val="myOptions.value"
                :width="myOptions.formWidth"
                :height="myOptions.formHeight"
                :placeholder="myOptions.placeholder"
                :border="`${myOptions.borderWidth}px ${myOptions.borderStyle} ${myOptions.borderColor}`"
                :color="myOptions.color"
                :background="myOptions.background"
                @change="dateSelectChange"
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
    methods: {
        dateSelectChange(e) {
            this.myOptions.value = e
        },
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
select.formInput {
    padding: 2px 1px;
}
</style>
