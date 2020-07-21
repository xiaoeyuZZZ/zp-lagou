<template>
  <div>
    <div class="editor-form" v-if="form">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="登录账号：">
          <p>{{form.account}}</p>
        </el-form-item>
        <el-form-item label="昵称：" prop="nickName">
          <el-input v-model="form.nickName" size="large"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="password">
          <el-input v-model="form.password" size="large" show-password=""></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="checkPass">
          <el-input v-model="form.checkPass" size="large" show-password=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :v-loading="loading" @click="submitLoginForm">保 存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-else>
      <el-alert
        title="你登录了吗？"
        type="error" center
        show-icon
        :closable="false">
      </el-alert>
    </div>
  </div>
</template>

<script>
  import db from '../../../store/user/db'
  import {mapMutations} from 'vuex'
  import {Msg} from '../../../tools/message'
  import {mhApi} from './api'

  export default {
    name: 'index',
    data(){
      const checkPassword = (rule, value, callback) => {
        if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        form: {
          account: db.get('m_user').account,
          nickName: db.get('m_user').nickName,
          password: '',
          checkPass: ''
        },
        loading: false,
        rules: {
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
      }
    },
    methods: {
      ...mapMutations([
        'isLoginMH',
      ]),
      submitLoginForm() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true
            const params = {
              nickName: this.form.nickName,
              password: this.form.password
            }
            console.log(params.nickName)
            mhApi.editorMhUser(params).then(res => {
              if(res.data.code === 0){
                Msg.success(res.data.msg)
                db.set('m_user',res.data.data)
                Msg.success(res.data.msg)
                this.isLoginMH()
                this.loading = false
              } else {
                Msg.error(res.data.msg);
                this.loading = false
              }
            }).catch(err => {
              Msg.error('网络错误！')
            })
          }
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .editor-form{
    width: 500px;
    margin: 80px auto 0;
  }
</style>
