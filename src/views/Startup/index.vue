<!--
 * @Description: 启动页
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月24日 18:08:41
 * @LastEditTime: 2021-02-28 19:27:47
-->
<template>
    <div class="startup"
         @contextmenu.prevent>
        <h1>大数据视图生成器</h1>
        <div class="btns">
            <!-- 进入EditPanel页使用replace以避免浏览器回退历史页面而未保存作品 -->
            <el-button type="primary"
                       @click="$router.replace('EditPanel')"
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
                <i class="el-icon-user-solid"></i> {{$store.state.userInfo.username}}
            </div>
            <div class="userBtns">
                <!-- 判断登录状态，显示不同按钮 -->
                <div v-if="!$store.state.isLogin"
                     @click="$store.commit('setStates', {showLoginBox:true})">
                    登录
                </div>
                <div v-if="!$store.state.isLogin"
                     @click="$store.commit('setStates', {showSignupBox:true})">
                    注册
                </div>
                <div v-if="$store.state.isLogin"
                     @click="doExit">退出</div>
            </div>
        </div>
        <footer>Copyright © 2020 by HuiSir</footer>
    </div>
</template>

<script>
export default {
    name: 'Startup',
    data() {
        return {}
    },
    methods: {
        /* 退出登陆 */
        doExit() {
            this.$store.dispatch('logout', this)
        },
        workEdit() {
            this.$confirm(
                '请选择已保存到本地的作品（文件后缀为.work）',
                '选择作品',
                {
                    confirmButtonText: '选择文件',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            )
                .then(() => {
                    //读取文件操作
                    //...
                    //loading
                    this.$loading({
                        text: '读取中',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)',
                    })
                    //跳转传参
                    // this.$router.replace('EditPanel')
                })
                .catch(() => {})
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
        font-size: 3vw;
        color: #fff;
        padding: 2vh 5vw;
        margin-top: -2vh;
    }
    .btns {
        display: flex;
        justify-content: center;
        align-items: center;
        & > * {
            margin: 2vh 1vw;
            padding: 1vh 1.5vw !important;
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
        left: 50%;
        transform: translateX(-50%);
        color: #ccc;
        font-size: 15px;
        line-height: 2;
    }
}
</style>
