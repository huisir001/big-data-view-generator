<!--
 * @Description: 图层配置
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月21日 16:27:27
 * @LastEditTime: 2020-10-19 17:30:09
-->
<template>
    <div class="layerOptionsBox">
        <template v-if="activeLayers.length==1">
            <FormItems v-for="(item,index) in activeLayers[0].formControlOptions"
                       :key="index"
                       :formItemOption="item"
                       :optionKey="item.key"
                       :activeLayer="activeLayers[0]"></FormItems>
        </template>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import FormItems from '@/components/FormItems' //图层配置栏-表单项组件
const { mapGetters } = createNamespacedHelpers('layer')
export default {
    name: 'LayerOptions',
    components: {
        FormItems,
    },
    computed: {
        ...mapGetters(['activeLayers']), //选定图层
    },
}
</script>
<style lang="scss" scoped>
.layerOptionsBox {
    padding: 15px;
}
</style>