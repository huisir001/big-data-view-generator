<!--
 * @Description: 表单
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-01-20 09:59:15
 * @LastEditTime: 2021-01-20 18:05:39
-->
<template>
    <div style="width: 100%; height: 100%">
        <div
            class="form-item"
            v-for="(item, index) in options.formItems"
            :key="index"
        >
            <template v-if="item.type == 'input'">
                <input
                    type="text"
                    :placeholder="item.placeholder"
                    :style="{
                        width: item.width,
                        height: '100%',
                        border: `${item.borderWidth}px ${item.borderStyle} ${item.borderColor}`,
                        padding: '2px 5px',
                    }"
                />
            </template>
        </div>
    </div>
</template>
<script>
import others from '../../mixins/others'
export default {
    name: 'Form',
    mixins: [others],
    data() {
        return {}
    },
}
</script>
<style lang="scss" scoped></style>
