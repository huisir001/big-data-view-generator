<!--
 * @Description: 图库
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-01-12 16:21:53
 * @LastEditTime: 2021-03-02 18:18:07
-->
<template>
    <div class="gallery">
        <el-upload action="#" list-type="picture-card" :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div
                slot="file"
                slot-scope="{ file }"
                style="height: 100%; background: #000; border: 1px solid #000"
            >
                <img
                    class="el-upload-list__item-thumbnail"
                    style="object-fit: contain"
                    :src="file.url"
                />
                <span class="el-upload-list__item-actions">
                    <span
                        class="el-upload-list__item-preview"
                        title="预览"
                        @click="handlePictureCardPreview(file)"
                    >
                        <i class="el-icon-zoom-in"></i>
                    </span>
                    <span @click="handleSelect(file)" title="选择">
                        <i class="el-icon-check"></i>
                    </span>
                </span>
            </div>
        </el-upload>
        <el-dialog
            :visible.sync="dialogVisible"
            :append-to-body="true"
            top="5vh"
            custom-class="imgReviewBox"
        >
            <img width="100%" :src="dialogImageUrl" />
        </el-dialog>
    </div>
</template>

<script>
import { blob2Base64 } from '@/utils/myUtils'
export default {
    name: 'Gallery',
    props: ['type'],
    data() {
        return {
            picTypes: {
                page: '大屏背景',
                border: '边框背景',
                normal: '普通图片',
            },
            dialogImageUrl: '',
            dialogVisible: false,
        }
    },
    methods: {
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url
            this.dialogVisible = true
        },
        async handleSelect(file) {
            // console.log(file)
            const { raw, url } = file
            // this.$emit('handleSelect', url)  //blob路径

            const base64Url = await blob2Base64(raw)

            this.$emit('handleSelect', base64Url)
        },
    },
}
</script>

<style lang="scss" scoped>
.gallery {
    width: 100%;
    height: 100%;
}
</style>
<style lang="scss">
.el-dialog.imgReviewBox {
    .el-dialog__header {
        padding: 0;
        padding-bottom: 7px;
    }
    .el-dialog__body {
        padding: 8px 15px;
    }
    .el-dialog__headerbtn {
        top: -8px;
        right: -39px;
        font-size: 30px;
    }
    .el-dialog__headerbtn .el-dialog__close {
        color: #fff;
    }
}
</style>
