<!--
 * @Description: 作品列表
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-01-13 14:49:51
 * @LastEditTime: 2021-03-02 09:43:32
-->
<template>
    <div class="works">
        <el-row :gutter="20">
            <el-col :span="36" :xs="12" :sm="9" :md="6" :lg="4" class="workCol">
                <el-card
                    :body-style="{ padding: '0px' }"
                    style="border: 1px solid #7385eb"
                >
                    <div class="addNewWork" @click="addNewWork">
                        <i class="el-icon-plus"></i>
                        <span>新增可视化</span>
                    </div>
                </el-card>
            </el-col>
            <el-col
                :span="36"
                :xs="12"
                :sm="9"
                :md="6"
                :lg="4"
                v-for="(item, index) in works"
                :key="index"
                class="workCol"
            >
                <el-card
                    :body-style="{ padding: '0px' }"
                    style="border: 1px solid #7385eb"
                >
                    <div class="workItem">
                        <img
                            :src="
                                item.screenshot
                                    ? `/file/visit/${item.screenshot}`
                                    : kongWorkPic
                            "
                            class="screenshot"
                        />
                        <div class="foot">
                            <h2>{{ item.title }}</h2>
                            <p>
                                最后编辑
                                {{
                                    formatDate(
                                        new Date(item.update_time),
                                        'yyyy-MM-dd hh:mm:ss'
                                    )
                                }}
                            </p>
                        </div>
                        <div class="floatBox">
                            <el-button
                                type="primary"
                                class="editBtn"
                                size="small"
                                @click="editWorkBtn(item.id)"
                                >编辑</el-button
                            >
                            <div class="iconBtns">
                                <span
                                    class="el-icon-monitor"
                                    title="共享"
                                    @click="copyShareLink(item.id)"
                                ></span>
                                <span
                                    class="el-icon-document-copy"
                                    title="复制"
                                    @click="copyWorkBtn(item.id)"
                                ></span>
                                <span
                                    class="el-icon-delete"
                                    title="删除"
                                    @click="delWorkBtn(item.id, index)"
                                ></span>
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <!-- 新增弹窗 -->
        <el-dialog
            title="新增可视化"
            width="400px"
            class="addNewWorkDialog"
            :modal-append-to-body="true"
            :visible.sync="dialogNewWorkVisible"
        >
            <el-form :model="newWorkFormVal">
                <el-form-item label="页面名称" label-width="70px">
                    <el-input
                        v-model="newWorkFormVal.title"
                        placeholder="请输入页面名称"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="页面尺寸" label-width="70px">
                    <el-input-number
                        v-model="newWorkFormVal.screenSize[0]"
                        controls-position="right"
                        style="width: 49%"
                    ></el-input-number>
                    <el-input-number
                        v-model="newWorkFormVal.screenSize[1]"
                        controls-position="right"
                        style="width: 49%; margin-left: 2%"
                    ></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogNewWorkVisible = false"
                    >取 消</el-button
                >
                <el-button type="primary" @click="addNewWorkBtn"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getRanId, formatDate } from '@/utils/myUtils'
import {
    CreateWork,
    FindByUserid,
    FindById,
    RemoveById,
    CopyById,
} from '@/api/work'
import kongWorkPic from '@/assets/img/kong_work.png'
export default {
    name: 'Works',
    data() {
        return {
            dialogNewWorkVisible: false,
            newWorkFormVal: {
                screenSize: [1920, 1080],
            },
            formatDate,
            kongWorkPic,
            works: [],
        }
    },
    async created() {
        // 请求用户作品列表
        const { ok, data } = await FindByUserid()
        if (ok) {
            this.works = data
        }
    },
    methods: {
        addNewWork() {
            const ranId = getRanId(4)
            this.newWorkFormVal = {
                pid: `P-${ranId}`,
                title: `可视化页面_${ranId}`,
                screenSize: [1920, 1080],
            }
            this.dialogNewWorkVisible = true
        },
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
        /* 编辑按钮 */
        async editWorkBtn(workId) {
            const { $store, $router } = this

            //查询作品信息
            const { ok, data } = await FindById(workId)

            if (ok) {
                $store.commit('system/clearPageOptions') //清空page信息
                $store.commit('layer/clearLayers') //清空图层，避免残影
                $router.replace({ path: `/EditPanel/${workId}` })
            }
        },
        /* 共享按钮 */
        copyShareLink(id) {
            prompt('Ctrl+C复制地址：', location.origin + '#/View/' + id)
        },
        /* 复制 */
        copyWorkBtn(workId) {
            // 询问
            this.$confirm('确认复制？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(async () => {
                    const { ok, msg, data } = await CopyById(workId)

                    if (ok) {
                        this.works.unshift(data) //新增
                        this.$message({ message: msg, type: 'success' })
                    }
                })
                .catch(() => null)
        },
        /* 删除 */
        delWorkBtn(workId, index) {
            // 询问
            this.$confirm('您确认删除吗？删除不可恢复。', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(async () => {
                    const { ok, msg } = await RemoveById(workId)

                    if (ok) {
                        this.works.splice(index, 1) //删除视图
                        this.$message({ message: msg, type: 'success' })
                    }
                })
                .catch(() => null)
        },
    },
}
</script>

<style lang="scss" scoped>
.works {
    padding: 15px 25px;
    overflow-y: auto;
    height: calc(100vh - 180px);
    /* 设置滚动条的样式 */
    &::-webkit-scrollbar {
        width: 8px;
    }
    /*滚动槽*/
    &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 8px;
    }
    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background: rgba(0, 0, 0, 0.1);
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    }
    &::-webkit-scrollbar-thumb:window-inactive {
        background: #202a32;
    }
    .workCol {
        margin-bottom: 20px;
    }
    .addNewWork {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 220px;
        background: linear-gradient(to right, #3416a0, #b3283b);
        color: #00bcd4;
        cursor: pointer;
        i {
            font-size: 28px;
            margin-bottom: 10px;
        }
    }
    .workItem {
        position: relative;
        height: 220px;
        overflow: hidden;
        img.screenshot {
            width: 100%;
            height: calc(100% - 43px);
        }
        .foot {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 43px;
            background: #7385eb;
            font-family: sans-serif;
            padding: 5px 6px;
            line-height: 1;
            color: #fff;
            z-index: 1;
            h2 {
                margin: 0;
                padding: 0;
                font-size: 16px;
                margin-bottom: 5px;
                overflow: hidden;
                -o-text-overflow: ellipsis;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
            }
            p {
                padding: 0;
                margin: 0;
                font-size: 12px;
            }
        }
        &:hover {
            .floatBox {
                top: 0;
                opacity: 1;
            }
        }
        .floatBox {
            position: absolute;
            transition: 0.3s all;
            width: 100%;
            height: calc(100% - 43px);
            top: calc(100% - 43px);
            left: 0;
            opacity: 0;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .editBtn {
                margin-bottom: 18px;
                width: 120px;
            }
            .iconBtns {
                display: flex;
                align-items: center;
                span {
                    color: #fff;
                    font-size: 22px;
                    cursor: pointer;
                    margin: 0 10px;
                    padding: 5px;
                }
            }
        }
    }
}
</style>
