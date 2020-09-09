<!--
 * @Description: 工作台
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月9日 17:08:29
 * @LastEditTime: 2020-09-09 18:32:36
-->
<template>
    <div class="platform">
        <!-- 网格 -->
        <div class="grid"></div>
        <!-- 预览层 -->
        <div class="view">
            <el-button @click="drawer = true"
                       type="primary"
                       style="margin-left: 16px;">
                点我打开
            </el-button>
        </div>
        <el-drawer title="样式配置栏"
                   direction="rtl"
                   :close-on-press-escape="false"
                   :wrapperClosable="false"
                   :modal="false"
                   :visible.sync="drawer">
            <span>我来啦!</span>
        </el-drawer>
    </div>
</template>

<script>
export default {
    name: 'platform',
    data() {
        return {
            drawer: false,
        }
    },
}
</script>
<style lang="scss" scoped>
.platform {
    height: 100%;
    background-color: #2a2e33;
    position: relative;
    .grid {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-image: linear-gradient(to top, transparent 19px, #444 20px),
            linear-gradient(to left, transparent 19px, #444 20px);
        background-size: 20px 20px;
    }
    .view {
        position: absolute;
        width: calc(100% - 15px);
        height: calc(100% - 15px);
        top: 0;
        left: 0;
        // border: 1px dashed #409eff;
        // background-image: url(../../assets/img/bg.jpg);
    }
}
</style>