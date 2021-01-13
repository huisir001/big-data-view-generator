<!--
 * @Description: 作品列表
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-01-13 14:49:51
 * @LastEditTime: 2021-01-13 17:04:03
-->
<template>
    <div class="works">
        <el-row :gutter="20">
            <el-col :span="36" :xs="12" :sm="9" :md="6" :lg="4" class="workCol">
                <el-card
                    :body-style="{ padding: '0px' }"
                    style="border: 1px solid #03a9f4"
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
                v-for="(o, index) in 20"
                :key="o"
                class="workCol"
            >
                <el-card
                    :body-style="{ padding: '0px' }"
                    style="border: 1px solid #03a9f4"
                >
                    <div class="workItem">
                        <img
                            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                            class="image"
                        />
                        <span>好吃的汉堡</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
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
                <el-button type="primary" @click="dialogNewWorkVisible = false"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getRanId } from '@/utils/myUtils'
export default {
    name: 'Works',
    data() {
        return {
            dialogNewWorkVisible: false,
            newWorkFormVal: {
                screenSize: [1920, 1080],
            },
        }
    },
    methods: {
        addNewWork() {
            const ranId = getRanId()
            this.newWorkFormVal = {
                pid: `P-${ranId}`,
                title: `可视化页面_${ranId}`,
                screenSize: [1920, 1080],
            }
            this.dialogNewWorkVisible = true
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
        height: 220px;
    }
}
</style>
<style lang="scss">
.addNewWorkDialog {
    background: rgba(255, 255, 255, 0.5);
    .el-dialog {
        background: #212528;
        box-shadow: 7px 7px 8px rgba(0, 0, 0, 0.49);
        .el-dialog__title {
            color: #fff;
        }
    }
}
</style>
