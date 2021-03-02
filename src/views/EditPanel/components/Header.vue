<!--
 * @Description: 头部
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月22日 11:58:59
 * @LastEditTime: 2021-03-02 10:23:54
-->
<template>
    <div class="header">
        <!-- 左侧菜单 -->
        <div class="left">
            <!-- 抽屉按钮 -->
            <i
                :class="[
                    asideShow ? 'el-icon-s-fold' : 'el-icon-s-unfold',
                    'aside-take-btn',
                ]"
                @click="setAsideShow"
            ></i>
        </div>
        <!-- 右侧菜单 -->
        <div class="right">
            <div class="btns">
                <span @click="openPreview">预览</span>
                <span @click="saveCurWork">保存</span>
                <span @click="saveToLocal">保存到本地</span>
                <span @click="buildHtml">生成HTML</span>
                <span @click="$router.replace('/WorkList/Works')">
                    作品中心
                </span>
            </div>
            <div class="pzl">
                <span>配置栏</span>
                <el-switch
                    v-model="$store.state.system.optionPanelShow"
                ></el-switch>
            </div>
        </div>
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('system')
import { UpdateWork } from '@/api/work'
import html2canvas from 'html2canvas'
export default {
    name: 'Header',
    data() {
        return {}
    },
    computed: {
        ...mapState(['pageOptions', 'asideShow']),
    },
    methods: {
        ...mapMutations(['setAsideShow']),
        saveCurWork() {
            // loading
            this.$loading({
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.4)',
            })

            //取消图层选定
            const activeLayers = this.$store.getters['layer/activeLayers']
            activeLayers.forEach((item) => {
                item.active = false //取消选定
                this.$store.commit('layer/setLayer', item)
            })

            // 等待取消图层选定视图更新之后再执行
            this.$nextTick(async () => {
                // 截图
                const dom = document.querySelector('.blueprint')
                const screenshotCancas = await html2canvas(dom, {
                    useCORS: true,
                    scale: 300 / dom.clientWidth,
                })

                const screenshot = screenshotCancas
                    ? screenshotCancas.toDataURL('image/png', 1)
                    : ''

                //保存
                const { $route, pageOptions, $store, $message } = this
                const { ok, msg } = await UpdateWork({
                    id: $route.params.id,
                    title: pageOptions.title,
                    page_options: $store.getters['system/pageOptionsStr'],
                    layers: $store.getters['layer/layerString'],
                    screenshot,
                })

                if (ok) {
                    // 提示
                    $message({ message: msg, type: 'success' })
                }
            })
        },
        // 保存到本地.work文件
        saveToLocal() {},
        // 生成html
        buildHtml() {},
        openPreview() {
            //缓存图层信息
            sessionStorage.setItem(
                `layers`,
                this.$store.getters['layer/layerString']
            )
            //缓存页面信息
            sessionStorage.setItem(
                `pageOptions`,
                this.$store.getters['system/pageOptionsStr']
            )
            let routeData = this.$router.resolve({ path: '/Preview' })
            window.open(routeData.href, '_blank') //打开新窗口
        },
    },
}
</script>
<style lang="scss" scoped>
.header {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    a {
        color: #fff !important;
        text-decoration: none;
    }
    .left {
        .aside-take-btn {
            padding: 0 15px;
            font-size: 18px;
            line-height: 50px;
            cursor: pointer;
        }
    }
    .right {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
        .btns {
            display: inline-block;
            margin-right: 10px;
            span {
                cursor: pointer;
                margin: 0 5px;
                background: #4a6583;
                padding: 3px 8px;
                border-radius: 3px;
                &:hover {
                    background: #409eff;
                }
            }
        }
        .pzl {
            display: inline-block;
            span {
                margin-right: 5px;
            }
        }
    }
}
</style>
