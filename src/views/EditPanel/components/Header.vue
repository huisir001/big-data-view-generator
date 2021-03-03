<!--
 * @Description: 头部
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月22日 11:58:59
 * @LastEditTime: 2021-03-03 13:47:07
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
                <span @click="buildHtml">生成HTML</span>
                <span @click="open('#/WorkList/Works')">作品中心</span>
                <span @click="goHome">回到首页</span>
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
import { exportStr2File } from '@/utils/myUtils'
import { GetViewhtml } from '@/api/other'
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
        // 预览
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
            //打开新窗口
            let routeData = this.$router.resolve({ path: '/Preview' })
            window.open(routeData.href, '_blank') //打开新窗口
        },
        // 新标题打开页面
        open(e) {
            window.open(e)
        },

        /* 
            # 保存数据到数据库
            > response,reject回调参数在封装promise时可用
        */
        saveCurWork(resolve, reject) {
            // loading
            const loading = this.$loading({
                text: '保存中...',
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

                //关闭loading
                loading.close()

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
                    if (resolve && typeof resolve == 'function') {
                        resolve(true)
                    }
                    // 提示
                    $message({ message: msg, type: 'success' })
                } else {
                    if (reject && typeof reject == 'function') reject()
                }
            })
        },

        // 生成html
        async buildHtml() {
            const { pageOptions, $store, $message } = this
            const htmlStr = await GetViewhtml()
            if (!htmlStr) {
                return
            }
            // loading
            const loading = this.$loading({
                text: '生成中...',
                background: 'rgba(0, 0, 0, 0.4)',
            })
            exportStr2File(
                pageOptions.title + '.html',
                htmlStr
                    .replace('$title', pageOptions.title)
                    .replace('$layers', $store.getters['layer/layerString'])
                    .replace(
                        '$pageOptions',
                        $store.getters['system/pageOptionsStr']
                    )
            )
            loading.close()
        },
        goHome() {
            const { $confirm, $message, $router, saveCurWork } = this
            //如若未保存则弹出提示
            $confirm('是否保存当前作品?', '提示', {
                distinguishCancelAndClose: true, //区分取消和关闭按钮
                confirmButtonText: '保存后返回',
                cancelButtonText: '直接返回',
                type: 'warning',
            })
                .then(async () => {
                    const res = await new Promise((resolve, reject) => {
                        saveCurWork(resolve, reject) //保存到数据库（在线版本）
                    })
                    if (res) {
                        setTimeout(() => {
                            $router.replace('/Startup')
                        }, 200)
                    }
                })
                .catch((e) => {
                    if (e == 'cancel') {
                        //取消时直接返回
                        $router.replace('/Startup')
                    }
                })
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
