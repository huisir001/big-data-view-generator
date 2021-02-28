<!--
 * @Description: 登录面板
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-02-26 15:27:39
 * @LastEditTime: 2021-02-28 19:19:11
-->
<template>
    <el-dialog width="350px"
               title="登录"
               :visible.sync="showLoginBox"
               :show-close="true"
               :close-on-click-modal="true">
        <el-form ref="loginForm"
                 :model="form"
                 :rules="rules"
                 size="small"
                 label-width="70px"
                 class="loginForm">
            <el-row>
                <el-form-item label="用户名"
                              prop="username">
                    <el-input v-model="form.username"
                              clearable />
                </el-form-item>
                <el-form-item label="密　码"
                              prop="password">
                    <el-input type="password"
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
                      @click="$store.commit('setStates', {showSignupBox:true})">注册</span>
            </div>
            <el-button type="primary"
                       @click="doLogin('loginForm')"
                       v-preventshake="1500">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { Login } from '@/api/user'
export default {
    name: 'LoginBox',
    computed: {
        showLoginBox: {
            //设置get和set方法便于弹窗组件关闭时能够改变state
            get() {
                return this.$store.state.showLoginBox
            },
            set(val) {
                if (!val) {
                    // 关闭弹窗时要重置表单
                    this.$refs.loginForm.resetFields()
                }
                this.$store.commit('setStates', {
                    showLoginBox: val,
                })
            },
        },
    },
    data() {
        return {
            //表单数据
            form: {
                username: '',
                password: '',
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur',
                    },
                ],
                password: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur',
                    },
                ],
            },
        }
    },
    methods: {
        //登录
        doLogin(ref) {
            // 表单验证
            this.$refs[ref].validate(async (valid) => {
                if (valid) {
                    const { form, $store, $message } = this

                    // 请求
                    const { ok, msg, data, token } = await Login(form)

                    if (ok) {
                        // 状态设置
                        $store.commit('setStates', {
                            isLogin: 1, // 登陆状态
                            userInfo: data, // 用户信息缓存
                            showLoginBox: false, // 关闭弹窗
                        })

                        // token缓存(浏览器关闭丢失)
                        sessionStorage.setItem('_token', token)

                        // 重置表单
                        this.$refs.loginForm.resetFields()

                        // 提示
                        $message({
                            message: msg,
                            type: 'success',
                        })
                    }
                }
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
