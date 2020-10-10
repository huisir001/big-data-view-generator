<!--
 * @Description: 图层配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月21日 16:27:27
 * @LastEditTime: 2020-10-10 18:07:48
-->

<template>
    <div>
        <template v-if="activeLayers.length==1">
            <FormOptions :param="activeLayers[0].defaultOptions"></FormOptions>
        </template>
    </div>
</template>

<script>
/* 想法：选项给一套配置， 默认值给一套配置，默认值直接放到vuex中，选项渲染时获取默认值显示  双向绑定默认值 */

import { createNamespacedHelpers } from 'vuex'
import FormOptions from '@/components/FormOptions' //图层配置栏-表单项组件
const { mapState, mapGetters } = createNamespacedHelpers('layer')
export default {
    name: 'LayerOptions',
    components: {
        FormOptions,
    },
    computed: {
        ...mapState(['layers']), //图层信息
        ...mapGetters(['activeLayers']), //选定图层
    },
    methods: {},
}
</script>
<style lang="scss" scoped>
</style>