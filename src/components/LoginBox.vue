<!--
 * @Description: 登录面板
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-02-26 15:27:39
 * @LastEditTime: 2021-02-27 14:39:54
-->
<template>
    <el-dialog width="350px"
               title="登录"
               :visible.sync="$store.state.showLoginBox"
               :show-close="true"
               :close-on-click-modal="true">
        <el-form ref="form"
                 :model="form"
                 size="small"
                 label-width="60px"
                 class="loginForm">
            <el-row>
                <el-form-item label="用户名">
                    <el-input class="search-input"
                              v-model="form.username"
                              clearable />
                </el-form-item>
                <el-form-item label="密　码">
                    <el-input type="password"
                              class="search-input"
                              v-model="form.password"
                              clearable />
                </el-form-item>
            </el-row>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
            <div class="links">
                <span class="forgetPass"
                      @click="forgetPass">忘记密码</span>
                <span class="sx">|</span>
                <span class="signup"
                      @click="signup">注册</span>
            </div>
            <el-button type="primary"
                       @click="login('form')">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'LoginBox',
    data() {
        return {
            //表单数据
            form: {
                username: '',
                password: '',
            },
        }
    },
    methods: {
        //登录
        login() {
            console.log(this.form.username)

            //置空
            this.form = { username: '', password: '' }

            //校验密码
            // if (this.form.password !== '111111') {
            //     this.$message({
            //         type: 'danger',
            //         message: '用户名或密码错误!',
            //     })
            //     return
            // }
            // //校验用户
            // if (this.form.username === 'admin') {
            //     this.modelShow = false
            //     //把登录数据写入到session
            //     if (window.sessionStorage) {
            //         sessionStorage.setItem('is_login', 'true')
            //     }
            // } else {
            //     this.$message({
            //         type: 'danger',
            //         message: '用户名或密码错误!',
            //     })
            // }

            //登录成功，用户信息存到store，token存到sessionStorage(浏览器关闭丢失)
        },
        /* 注册 */
        signup() {
            this.$store.commit('setSignupBox', true)
        },
        /* 忘记密码 */
        forgetPass() {
            this.$message({
                type: 'warning',
                message: '暂不支持密码重设，忘记密码请联系管理员!',
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.links {
    color: #999;
    font-size: 13px;
    float: left;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    width: 100px;
    align-items: center;
    span.sx {
        font-family: cursive;
    }
    span:not(.sx) {
        cursor: pointer;
        &:hover {
            text-decoration: underline;
            color: #409eff;
        }
    }
}
</style>
