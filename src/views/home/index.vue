<!--
 * @Description: 首页
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月9日 17:08:29
 * @LastEditTime: 2020-09-09 18:10:30
-->
<template>
    <div>
        <Layout>
            <!-- 侧边栏 -->
            <template v-slot:aside>
                <AsideCont></AsideCont>
            </template>
            <!-- 工作台 -->
            <template v-slot:main>
                <Platform></Platform>
            </template>
        </Layout>
    </div>
</template>

<script>
import Layout from '@/components/layout'
import AsideCont from '@/components/asideCont'
import Platform from '@/components/platform'
export default {
    name: 'home',
    components: {
        Layout,
        AsideCont,
        Platform,
    },
}
</script>
<style lang="scss" scoped>
</style>