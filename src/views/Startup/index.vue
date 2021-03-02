<!--
 * @Description: 启动页
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月24日 18:08:41
 * @LastEditTime: 2021-03-02 22:12:29
-->
<template>
    <div class="startup"
         @contextmenu.prevent>
        <h1>大数据视图生成器</h1>
        <div class="btns">
            <!-- 进入EditPanel页使用replace以避免浏览器回退历史页面而未保存作品 -->
            <el-button type="primary"
                       @click="addNewWork"
                       round>创 建 大 屏</el-button>
            <el-button type="primary"
                       @click="$router.replace('WorkList/Works')"
                       round>作 品 中 心</el-button>
            <el-button type="primary"
                       @click="workEdit"
                       round>作 品 编 辑</el-button>
        </div>
        <div class="header">
            <div class="userInfo"
                 v-if="$store.state.isLogin"
                 @click="$router.replace('/WorkList/User')">
                <i class="el-icon-user-solid"></i>
                {{ $store.state.userInfo.username }}
            </div>
            <div class="userBtns">
                <!-- 判断登录状态，显示不同按钮 -->
                <div v-if="!$store.state.isLogin"
                     @click="$store.commit('setStates', { showLoginBox: true })">
                    登录
                </div>
                <div v-if="!$store.state.isLogin"
                     @click="$store.commit('setStates', { showSignupBox: true })">
                    注册
                </div>
                <div v-if="$store.state.isLogin"
                     @click="doExit">退出</div>
            </div>
        </div>
        <footer>Copyright © 2020 by HuiSir</footer>

        <!-- 新增弹窗 -->
        <el-dialog title="新增可视化"
                   width="400px"
                   class="addNewWorkDialog"
                   :modal-append-to-body="true"
                   :visible.sync="dialogNewWorkVisible">
            <el-form :model="newWorkFormVal">
                <el-form-item label="页面名称"
                              label-width="70px">
                    <el-input v-model="newWorkFormVal.title"
                              placeholder="请输入页面名称"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="页面尺寸"
                              label-width="70px">
                    <el-input-number v-model="newWorkFormVal.screenSize[0]"
                                     controls-position="right"
                                     style="width: 49%"></el-input-number>
                    <el-input-number v-model="newWorkFormVal.screenSize[1]"
                                     controls-position="right"
                                     style="width: 49%; margin-left: 2%"></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
                <el-button @click="dialogNewWorkVisible = false">取 消</el-button>
                <el-button type="primary"
                           @click="addNewWorkBtn">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getRanId } from '@/utils/myUtils'
import { CreateWork } from '@/api/work'
export default {
    name: 'Startup',
    data() {
        return {
            dialogNewWorkVisible: false,
            newWorkFormVal: {
                screenSize: [1920, 1080],
            },
        }
    },
    methods: {
        /* 退出登陆 */
        doExit() {
            this.$store.dispatch('logout', this)
        },
        /* 创建大屏弹窗 */
        addNewWork() {
            const ranId = getRanId(4)
            this.newWorkFormVal = {
                pid: `P-${ranId}`,
                title: `可视化页面_${ranId}`,
                screenSize: [1920, 1080],
            }
            this.dialogNewWorkVisible = true
        },
        /* 确认添加 */
        async addNewWorkBtn() {
            const { newWorkFormVal, $router, $message, $store } = this

            // 数据库中创建新作品
            const { ok, data, msg } = await CreateWork({
                title: newWorkFormVal.title,
                page_options: JSON.stringify(newWorkFormVal),
                layers: '[]',
            })

            if (ok) {
                // 提示
                $message({ message: msg, type: 'success' })
                this.dialogNewWorkVisible = false
                $store.commit('system/clearPageOptions') //清空page信息
                $store.commit('layer/clearLayers') //清空图层，避免残影
                // 进入EditPanel页使用replace以避免浏览器回退历史页面而未保存作品
                $router.replace({ path: `/EditPanel/${data.id}` })
            }
        },
        /* 作品.work文件编辑（仅离线版本使用） */
        workEdit() {
            const { $confirm, $loading, $message, $store, $router } = this
            $confirm(
                '请选择已保存到本地的作品（文件后缀为.work）',
                '选择作品',
                {
                    confirmButtonText: '选择文件',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            )
                .then(() => {
                    // 模拟文件上传
                    var fileDom = document.createElementNS(
                        'http://www.w3.org/1999/xhtml',
                        'input'
                    )
                    fileDom.type = 'file'
                    var ev = document.createEvent('MouseEvents')
                    ev.initMouseEvent('click')
                    fileDom.dispatchEvent(ev)
                    // 获取文件信息
                    fileDom.onchange = (e) => {
                        //loading
                        let loading = $loading({
                            text: '读取中...',
                            background: 'rgba(0, 0, 0, 0.7)',
                        })
                        const file = e.path[0].files[0]

                        // 后缀校验
                        if (file.name.split('.').pop() !== 'work') {
                            $message.error('文件后缀不正确！')
                            loading.close()
                            return
                        }

                        // 读取文件信息
                        if (window.FileReader) {
                            var fr = new FileReader()
                            fr.onloadend = (e) => {
                                try {
                                    //读取完成回调
                                    const { page_options, layers } = JSON.parse(
                                        e.target.result
                                    )
                                    // 存到store
                                    $store.commit(
                                        'system/setPageOptions',
                                        page_options
                                    ) //页面信息
                                    $store.commit('layer/saveLayers', layers) //缓存图层
                                    // 关闭loading
                                    loading.close()
                                    //跳转编辑页
                                    $router.replace({
                                        path: `/EditPanel`,
                                    })
                                } catch (error) {
                                    $message.error('配置文件有误！')
                                    loading.close()
                                    return
                                }
                            }
                            //执行读取
                            fr.readAsText(file)
                        } else {
                            loading.close()
                            $message.error('当前浏览器不支持读取文件！')
                        }
                    }

                    //跳转传参
                    // this.$router.replace('EditPanel')
                })
                .catch(() => null)
        },
    },
}
</script>
<style lang="scss" scoped>
.startup {
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/startup.jpg);
    background-position: center top;
    background-size: cover;
    background-repeat: no-repeat;
    // filter: sepia(1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 0.5s all;
    h1 {
        font-size: 50px;
        color: #fff;
        padding: 10px;
        margin-top: -2vh;
    }
    .btns {
        display: flex;
        justify-content: center;
        align-items: center;
        & > * {
            margin: 10px 20px;
            padding: 10px 20px !important;
            border-radius: 60px !important;
            font-size: 15px !important;
        }
    }
    .header {
        position: fixed;
        right: 20px;
        top: 20px;
        color: #fff;
        .userInfo {
            font-size: 16px;
            display: inline-block;
            text-shadow: 1px 2px 6px black;
            font-weight: 700;
            padding: 3px 6px;
            line-height: 1;
            cursor: pointer;
        }
        .userBtns {
            font-size: 13px;
            margin-left: 10px;
            display: inline-block;
            & > div {
                transition: 0.5s all;
                display: inline-block;
                padding: 2px 10px;
                margin: 0 5px;
                background: #cf6552;
                cursor: pointer;
                &:hover {
                    background: #df2808;
                }
            }
        }
    }
    footer {
        position: fixed;
        bottom: 0;
        color: #ccc;
        font-size: 15px;
        line-height: 2;
        width: 100%;
        text-align: center;
    }
}
</style>
