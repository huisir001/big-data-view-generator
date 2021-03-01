<!--
 * @Description: 注册弹窗
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-02-26 16:27:28
 * @LastEditTime: 2021-03-01 13:32:29
-->
<template>
    <el-dialog
        width="350px"
        title="注册"
        :visible.sync="showSignupBox"
        :show-close="true"
        :close-on-click-modal="true"
    >
        <el-form
            ref="signupForm"
            :model="form"
            :rules="rules"
            size="small"
            label-width="80px"
            class="signupForm"
        >
            <el-row>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" clearable />
                </el-form-item>
                <el-form-item label="密　码" prop="password" required>
                    <el-input
                        type="password"
                        v-model="form.password"
                        clearable
                    />
                </el-form-item>
                <el-form-item label="确认密码" prop="surePass" required>
                    <el-input
                        type="password"
                        v-model="form.surePass"
                        clearable
                    />
                </el-form-item>
                <el-form-item
                    ><span style="font-size: 12px; color: #409eff"
                        >注：请牢记密码，忘记暂不可找回！</span
                    ></el-form-item
                >
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <div class="links">
                <span class="login" @click="showLoginBox"
                    >已有账号，直接登陆</span
                >
            </div>
            <!-- 确定按钮点击防抖 延时1500ms -->
            <el-button
                type="primary"
                @click="doSignup('signupForm')"
                v-preventshake="1500"
                >确 定</el-button
            >
        </div>
    </el-dialog>
</template>

<script>
import { Signup } from '@/api/user'
export default {
    name: 'SignupBox',
    computed: {
        showSignupBox: {
            //设置get和set方法便于弹窗组件关闭时能够改变state
            get() {
                return this.$store.state.showSignupBox
            },
            set(val) {
                if (!val) {
                    // 关闭弹窗时要重置表单
                    this.$refs.signupForm.resetFields()
                }
                this.$store.commit('setStates', { showSignupBox: val })
            },
        },
    },
    data() {
        return {
            //表单数据
            form: {
                username: '',
                password: '',
                surePass: '',
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: '用户名不能为空',
                        trigger: 'blur',
                    },
                    {
                        min: 3,
                        max: 5,
                        message: '长度在 3 到 5 个字符',
                        trigger: 'blur',
                    },
                ],
                password: [
                    {
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请输入密码'))
                            } else {
                                if (this.form.surePass !== '') {
                                    // 唤起`确认密码`验证
                                    this.$refs.signupForm.validateField(
                                        'surePass'
                                    )
                                }
                                callback()
                            }
                        },
                        trigger: 'blur',
                    },
                ],
                surePass: [
                    {
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请再次输入密码'))
                            } else if (value !== this.form.password) {
                                callback(new Error('两次输入密码不一致!'))
                            } else {
                                callback()
                            }
                        },
                        trigger: 'blur',
                    },
                ],
            },
        }
    },
    methods: {
        //注册按钮
        doSignup(ref) {
            // 表单验证
            this.$refs[ref].validate(async (valid) => {
                if (valid) {
                    const { form, $store, $message } = this
                    const { username, password } = form

                    // 请求
                    const { ok, msg, data } = await Signup({
                        username,
                        password,
                    })

                    if (ok) {
                        // 关闭弹窗
                        $store.commit('setStates', {
                            showSignupBox: false,
                        })

                        // 提示
                        $message({
                            message: msg,
                            type: 'success',
                        })
                    }
                }
            })
        },
        showLoginBox() {
            this.$store.commit('setStates', {
                showSignupBox: false,
                showLoginBox: true,
            })
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
