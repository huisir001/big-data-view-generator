<!--
 * @Description: 图层面板(图层列表)
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月21日 16:21:50
 * @LastEditTime: 2020-09-23 09:37:41
-->
<template>
    <div class="layerList">
        
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('system')
const { mapState: mapStateLayer, mapMutations } = createNamespacedHelpers(
    'layer'
)
export default {
    name: 'LayerList',
    data() {
        return {}
    },
    computed: {
        ...mapStateLayer(['layers']),
    },
    methods: {},
}
</script>
<style lang="scss" scoped>
</style>