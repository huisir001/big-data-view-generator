<!--
 * @Description: 注册弹窗
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-02-26 16:27:28
 * @LastEditTime: 2021-02-27 14:43:27
-->
<template>
    <el-dialog width="350px"
               title="注册"
               :visible.sync="$store.state.showSignupBox"
               :show-close="true"
               :close-on-click-modal="true">
        <el-form ref="form"
                 :model="form"
                 size="small"
                 label-width="70px"
                 class="signupForm">
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
                <el-form-item label="确认密码">
                    <el-input type="password"
                              class="search-input"
                              v-model="form.surePass"
                              clearable />
                </el-form-item>
            </el-row>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
            <div class="links">
                <span class="login"
                      @click="showLoginBox">已有账号，直接登陆</span>
            </div>
            <el-button type="primary"
                       @click="login('form')">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'SignupBox',
    data() {
        return {
            //表单数据
            form: {
                username: '',
                password: '',
                surePass: '',
            },
        }
    },
    methods: {
        //登录
        login() {
            const { username, password, surePass } = this.form

            if (password !== surePass) {
                this.$message.error('两次密码输入不一致!')
                //置空密码
                this.form = { username, password: '', surePass: '' }
                return
            }

            //置空
            this.form = { username: '', password: '', surePass: '' }

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
        },
        showLoginBox() {
            this.$store.commit('setSignupBox', false)
            this.$store.commit('setLoginBox', true)
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
.dialog-footer .links {
    color: #999;
    font-size: 13px;
    float: left;
    padding: 10px 0;
    span {
        cursor: pointer;
        &:hover {
            text-decoration: underline;
            color: #409eff;
        }
    }
}
</style>
