<template>
  <div class="login">
    <div class="login-image">
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="login-form">
      <el-form-item class="login-title">
        <h2 v-if="$route.name === 'login'">拉钩招聘管理系统</h2>
        <h2 v-else>拉钩招聘后台管理系统</h2>
        <h3>- 登录 -</h3>
      </el-form-item>
      <el-form-item prop="account">
        <p>用户名</p>
        <el-input v-model="ruleForm.account"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <p>密码</p>
        <el-input v-model="ruleForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox>记住密码</el-checkbox>
        <router-link to="/register" class="link-register">还没有账号</router-link>
      </el-form-item>
      <el-form-item>
        <el-button v-if="$route.name === 'login'" :loading="loading" type="primary" @click="submitForm">登 录</el-button>
        <el-button v-else :loading="loading" type="primary" @click="submitAdmin">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import './index.scss'
  import {Msg} from '../../../tools/message'
  import {loginCompany,loginAdmin} from './api'
  import db from '../../../store/user/db'
  import {mapMutations} from 'vuex'

  export default {
    data() {
      return {
        // isAdmin: this.$route.name,
        loading: false,
        ruleForm: {},
        rules: {
          account: [
            {required: true, message: '请输入登录账户', trigger: 'change'},
            {min: 6, max: 12, message: '长度在6-12位', trigger: 'change'}
          ],
          password: [
            {required: true, message: '请输入登录密码', trigger: 'change'},
            {min: 6, max: 12, message: '长度在6-12位', trigger: 'change'}
          ],
        },
      }
    },
    // watch:{
    //   $route(){
    //     this.getPosition()
    //   }
    // },
    mounted(){
    },
    methods:{
      ...mapMutations([
        'SET_ROUTERS',
        'isLoginC',
        'isLoginA'
      ]),
      submitForm() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.loading = true;
            loginCompany(this.ruleForm).then(res => {
              if(res.data.code === 0){
                Msg.success(res.data.msg);
                // this.$cookies.set("c_id",res.data.data._id,'1d')
                db.set('c_user',res.data.data)
                this.loading = false;
                this.isLoginC()
                this.$router.push({path: '/company'})
              } else {
                Msg.error(res.data.msg);
                this.loading = false;
              }
            }).catch(err => {
              Msg.error('网络出错！')
              this.loading = false;
            })
          }
        })
      },
      submitAdmin() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.loading = true;
            loginAdmin(this.ruleForm).then(res => {
              if(res.data.code === 0){
                Msg.success(res.data.msg);
                // this.$cookies.set("c_id",res.data.data._id,'1d')
                db.set('a_user',res.data.data)
                this.loading = false;
                this.SET_ROUTERS()
                this.isLoginA()
                this.$router.push({path: '/admin'})
              } else {
                Msg.error(res.data.msg);
                this.loading = false;
              }
            }).catch(err => {
              Msg.error('网络出错！')
              this.loading = false;
            })
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .link-register{
    text-decoration: none;
    float: right;
    color: #606266
  }
  .link-register:hover{
    color: #00b38a;
  }
</style>
