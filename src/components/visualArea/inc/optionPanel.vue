<!--
 * @Description: 配置项面板
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月10日 10:55:08
 * @LastEditTime: 2020-09-10 11:39:38
-->
<template>
    <el-drawer title="样式配置栏"
               direction="rtl"
               :close-on-press-escape="false"
               :wrapperClosable="false"
               :modal="false"
               :show-close="false"
               :visible.sync="$store.state.system.optionPanelShow">
    </el-drawer>
</template>

<script>
export default {
    name: 'optionPanel',
    data() {
        return {}
    },
    computed: {},
}
</script>
