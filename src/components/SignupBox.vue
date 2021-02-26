<!--
 * @Description: 注册弹窗
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-02-26 16:27:28
 * @LastEditTime: 2021-02-26 16:49:52
-->
<template>
    <el-dialog
        width="350px"
        title="注册"
        :visible.sync="modelShow"
        :show-close="true"
        :close-on-click-modal="true"
    >
        <el-form
            ref="form"
            :model="form"
            size="small"
            label-width="70px"
            class="signupForm"
        >
            <el-row>
                <el-form-item label="用户名">
                    <el-input
                        class="search-input"
                        v-model="form.username"
                        clearable
                    />
                </el-form-item>
                <el-form-item label="密　码">
                    <el-input
                        type="password"
                        class="search-input"
                        v-model="form.password"
                        clearable
                    />
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input
                        type="password"
                        class="search-input"
                        v-model="form.surePass"
                        clearable
                    />
                </el-form-item>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="login('form')">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'SignupBox',
    props: {
        show: {
            //是否显示本面板
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            modelShow: false,
            //表单数据
            form: {
                username: '',
                password: '',
                surePass: '',
            },
        }
    },
    watch: {
        show(val) {
            this.modelShow = val
        },
        modelShow(val) {
            this.$emit('modelShow', val)
        },
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

<style lang="scss">
.signupForm {
    .el-form-item__label {
        color: #333;
    }
}
</style>
