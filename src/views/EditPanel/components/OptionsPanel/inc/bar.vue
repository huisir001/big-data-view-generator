<!--
 * @Description: 柱图表单项预渲染
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月30日 10:36:54
 * @LastEditTime: 2020-12-03 17:56:44
-->
<template>
    <div>
        <FormItems
            v-for="(item, index) in fcoBarChart"
            :key="index"
            :formItemOption="item"
            :optionKey="item.key"
            :activeLayer="activeLayers[0]"
        ></FormItems>
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import { fcoBarChart } from '@/config/formControlOptions/charts'
import FormItems from './FormItems' //图层配置栏-表单项组件
const { mapGetters } = createNamespacedHelpers('layer')
export default {
    name: 'barChartOptions',
    components: {
        FormItems,
    },
    computed: {
        ...mapGetters(['activeLayers']), //选定图层
    },
    data() {
        return {
            fcoBarChart,
        }
    },
}
</script>
