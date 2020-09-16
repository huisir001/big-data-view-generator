<!--
 * @Description: 首页
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月9日 17:08:29
 * @LastEditTime: 2020-09-16 11:51:26
-->
<template>
    <div>
        <Layout>
            <!-- 侧边栏 -->
            <template v-slot:aside>
                <AsideCont></AsideCont>
            </template>
            <!-- 工作台/可视区 -->
            <template v-slot:main>
                <VisualArea></VisualArea>
            </template>
        </Layout>
    </div>
</template>

<script>
import Layout from '@/components/layout'
import AsideCont from '@/components/asideCont'
import VisualArea from '@/components/visualArea'
export default {
    name: 'home',
    components: {
        Layout,
        AsideCont,
        VisualArea,
    },
}
</script>
<style lang="scss" scoped>
</style>