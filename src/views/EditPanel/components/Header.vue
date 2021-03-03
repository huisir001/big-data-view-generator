<!--
 * @Description: 头部
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月22日 11:58:59
 * @LastEditTime: 2021-03-03 10:54:02
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
                <span @click="saveToLocal">保存到本地</span>
                <span @click="buildHtml">生成HTML</span>
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

        /* 
            # 保存当前作品到本地.work文件
            > response,reject回调参数在封装promise时可用
            > 仅用于离线版本保存到本地
            > 图片将作为base64字符串保存，故保存文件可能略大
        */
        saveToLocal(resolve, reject) {
            // loading
            const loading = this.$loading({
                text: '生成文件...',
                background: 'rgba(0, 0, 0, 0.4)',
            })
            try {
                const { pageOptions, $store, $message } = this
                const workInfo = {
                    page_options: pageOptions,
                    layers: $store.state.layer.layers,
                }
                exportStr2File(
                    pageOptions.title + '.work',
                    JSON.stringify(workInfo)
                )
                if (resolve && typeof resolve == 'function') {
                    resolve(true)
                }
                loading.close()
            } catch (e) {
                console.error(e)
                if (reject && typeof reject == 'function') {
                    reject(e)
                }
            }
        },
        // 生成html
        async buildHtml() {
            const { pageOptions, $store, $message } = this
            const htmlStr = await GetViewhtml()
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
            const { $confirm, $router, saveToLocal } = this
            //如若未保存则弹出提示
            $confirm('是否保存当前作品?', '提示', {
                distinguishCancelAndClose: true, //区分取消和关闭按钮
                confirmButtonText: '保存后返回',
                cancelButtonText: '直接返回',
                type: 'warning',
            })
                .then(async () => {
                    const res = await new Promise((resolve, reject) => {
                        saveToLocal(resolve, reject) //保存到本地文件（离线版本）
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