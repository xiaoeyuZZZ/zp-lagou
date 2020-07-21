<template>
  <el-dialog class="dialog-form" :visible.sync="dialogFormVisible"
             width="32%">
    <div class="dialog-form-logo">
    </div>
    <el-form :model="loginForm" v-if="whichForm === 'login'" :rules="rules" ref="loginForm">
      <el-form-item prop="account">
        <el-input size="large" v-model="loginForm.account" placeholder="请输入账号/手机号/邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input size="large" v-model="loginForm.password" placeholder="请输入密码" show-password>
        </el-input>
      </el-form-item>
      <el-form-item>
        <div class="text-flex">
          <a class="forget-password">忘记密码?</a>
          <a class="forget-password" @click="whichForm = 'register'">还没有账号</a>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="large" :v-loading="loading" @click="submitLoginForm">登 录</el-button>
      </el-form-item>
    </el-form>
    <el-form :model="registerForm" :rules="rules" ref="registerForm" v-else-if="whichForm === 'register'">
      <el-form-item prop="account">
        <el-input size="large" v-model="registerForm.account" placeholder="请输入账号/手机号/邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="nickName">
        <el-input size="large" v-model="registerForm.nickName" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input size="large" v-model="registerForm.password" placeholder="请输入密码" show-password>
        </el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input size="large" v-model="registerForm.checkPass" placeholder="请再输入密码" show-password>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="large"  :v-loading="loading" @click="submitRegisterForm">提 交</el-button>
      </el-form-item>
      <el-form-item>
        <div>
          <p class="link-login" @click="whichForm = 'login'">直接登录</p>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  import {mhApi} from './api'
  import './index.scss'
  import {Msg} from '../../../tools/message'
  import db from '../../../store/user/db'
  import {mapMutations} from 'vuex'
  export default {
    name: 'loginDialog',
    data(){
      const checkPassword = (rule, value, callback) => {
        if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        dialogFormVisible:false,
        loading: false,
        loginForm: {
          account: '',
          password: '',
        },
        registerForm:{
          account: '',
          password: '',
        },
        rules: {
          account: [
            {required: true, message: '请输入登录账户', trigger: 'change'},
            {min: 6, max: 12, message: '长度在6-12位', trigger: 'change'}
          ],
          nickName: [
            {required: true, message: '请输入昵称', trigger: 'change'},
          ],
          password: [
            {required: true, message: '请输入登录密码', trigger: 'change'},
            {min: 6, max: 12, message: '长度在6-12位', trigger: 'change'}
          ],
          checkPass: [{ required: true, message: '请再输入密码', trigger: 'change'},
            { validator: checkPassword, trigger: 'change' }
          ],
        },
        whichForm: ''
      }
    },
    methods:{
      ...mapMutations([
        'isLoginMH',
      ]),
      openDialog(val){
        this.dialogFormVisible = true
        this.whichForm = val
      },
      submitLoginForm() {
        this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            this.loading = true
            const params = {
              ...this.loginForm
            }
            mhApi.loginMhUser(params).then(res => {
              if(res.data.code === 0){
                Msg.success(res.data.msg)
                db.set('m_user',res.data.data)
                Msg.success(res.data.msg)
                this.isLoginMH()
                this.loading = false
                this.dialogFormVisible = false
              } else {
                Msg.error(res.data.msg);
                this.loading = false
              }
            })
          }
        })
      },
      submitRegisterForm() {
        this.$refs['registerForm'].validate((valid) => {
          if (valid) {
            this.loading = true
            const params = {
              ...this.registerForm
            }
            delete params.checkPass
            mhApi.registerMhUser(params).then(res => {
              if(res.data.code === 1){
                Msg.error(res.data.msg);
                this.loading = false
              } else {
                db.set('m_user',res.data.data)
                Msg.success(res.data.msg)
                this.isLoginMH()
                this.loading = false
                this.dialogFormVisible = false
              }
            }).catch(err => {
              Msg.error('网络出错！')
            })
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .forget-password:hover{
    color: #606266;
  }
  .forget-password{
    color: #999999;
    cursor: pointer;
  }
  .link-login:hover{
    color: #00b38a;
  }
  .link-login{
    color: #999999;
    cursor: pointer;
    text-align: center;
    font-size: 16px
  }
  .text-flex{
    display: flex;
    justify-content:space-between;
  }
  .dialog-form {
    .el-form {
      width: 300px;
      margin: auto;
      .el-input__inner {
        height: 50px;
        line-height: 50px;
        border-radius: 0px;
      }
      .el-button--primary{
        height: 48px;
        width: 300px;
        font-size: 16px;
      }
    }
    &-logo{
      background-image: url(//www.lgstatic.com/lg-www-fed/common/widgets/passport/static/images/popup-sprite_e5ea04f.png);
      width: 86px;
      height: 42px;
      margin: 0px auto 40px;
      background-repeat: no-repeat;
      background-size: 256px 256px;
      background-position: -62.5px -78px;
    }
  }
</style>
