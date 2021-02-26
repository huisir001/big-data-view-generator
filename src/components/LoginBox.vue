<!--
 * @Description: 登录面板
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-02-26 15:27:39
 * @LastEditTime: 2021-02-26 16:52:49
-->
<template>
    <el-dialog
        width="350px"
        title="登录"
        :visible.sync="modelShow"
        :show-close="true"
        :close-on-click-modal="true"
    >
        <el-form
            ref="form"
            :model="form"
            size="small"
            label-width="60px"
            class="loginForm"
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
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <span class="forgetPass" @click="forgetPass">忘记密码</span>
            <el-button type="primary" @click="login('form')">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'LoginBox',
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
.loginForm {
    .el-form-item__label {
        color: #333;
    }
}
span.forgetPass {
    color: #999;
    font-size: 13px;
    float: left;
    cursor: pointer;
    padding: 10px 0;
    &:hover {
        text-decoration: underline;
        color: #409eff;
    }
}
</style>
