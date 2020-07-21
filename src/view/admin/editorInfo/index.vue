<template>
  <div class="property-page">
    <div class="register-body">
      <div class="container-first">
        <el-form class="register-form" ref="personInfo" :model="personInfo" :rules="rules" label-width="110px">
          <el-form-item size="large" label="账号"  prop="account">
            <el-input v-model="personInfo.account" size="larger" disabled></el-input>
          </el-form-item>
          <el-form-item  size="large" label="职位" prop="position">
            <el-input v-model="personInfo.position" size="larger" disabled></el-input>
          </el-form-item>
          <el-form-item size="large" label="姓名"  prop="name">
            <el-input v-model="personInfo.name" size="larger" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别" size="large" prop="sex">
            <el-radio-group v-model="personInfo.sex">
              <el-radio :label="'1'">男</el-radio>
              <el-radio :label="'2'">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item  size="large" label="手机" prop="phone">
            <el-input v-model="personInfo.phone" size="larger" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item  size="large" label="邮箱" prop="email">
            <el-input v-model="personInfo.email" size="larger" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item  size="large" label="密码" prop="password">
            <el-input v-model="personInfo.password" size="larger" placeholder="请输入密码" show-password></el-input>

          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model="personInfo.checkPass" size="larger" placeholder="请再次输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="large"  @click="sumbit">提 交</el-button>
          </el-form-item>
        </el-form>
        <el-card class="card">
          <p class="top">
            <!--<img src="https://s0.lgstatic.com/i/image2/M01/0E/AC/CgotOVyhgcmAaD2nAABq7l7a11A980.png" alt="用户头像" >-->
            <el-upload class="avatar-uploader"
                       action="http://localhost:3000/updateFile"
                       :on-success="handleAvatarSuccess"
                       :show-file-list="false">
              <img v-if="personInfo.headImg" :src="personInfo.headImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span class="userName">{{personInfo.name}}</span>
            <span class="positionName">{{personInfo.position}}</span>
          </p>
          <p class="bottom">
            <span>{{personInfo.phone}}</span>
            <span>{{personInfo.email}}</span>
          </p>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
  import {Msg} from '@/tools/message';
  import {adminApi} from './api'
  import db from '../../../store/user/db'
  import {mapMutations, mapState} from 'vuex'
  export default {
    name: 'index',
    data () {
      const checkPhone = (rule, value, callback) => {
        let reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
        if (!reg.test(value)) {
          return callback(new Error('请输入有效手机号'));
        }
        callback();
      }
      const checkPassword = (rule, value, callback) => {
        if (value !== this.personInfo.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        personInfo: {
          ...db.get('a_user'),
          password: '',
          checkPass: '',
        },
        rules: {
          email:[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
          position: [{ required: true, message: '职位不能为空', trigger: 'blur'}],
          sex: [{ required: true, message: '性别不能为空', trigger: 'blur'}],
          name: [{ required: true, message: '姓名不能为空', trigger: 'blur'}],
          account:[{ required: true, message: '账号不能为空', trigger: 'blur'}],
          password:[{ required: true, message: '请输入密码', trigger: 'blur'},
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'change' }],
          checkPass: [{ required: true, message: '请再输入密码', trigger: 'blur'},
            { validator: checkPassword, trigger: 'change' },
          ],
          phone: [{ required: true, message: '请再输入密码', trigger: 'blur'},
            { validator: checkPhone, trigger: 'change' }]
        },
      }
    },
    // computed: {
    //   ...mapState({
    //     isC_Login: state => state.user.isC_Login,
    //   }),
    // },
    methods:{
      ...mapMutations([
        'isLoginA'
      ]),
      handleAvatarSuccess(res) {
        this.personInfo.headImg = res.url
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
          // this.loading = false
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          // this.loading = false
        }
        return isJPG && isLt2M;
      },
      sumbit(){
        this.$refs['personInfo'].validate(valid => {
          if (valid) {
            const params = {
              ...this.personInfo
            }
            delete params.checkPass
            adminApi.editorInfo(params).then(res => {
              if(res.data.code === 0){
                Msg.success(res.data.msg)
                db.set('a_user',res.data.data)
                this.isLoginA()
                Msg.success(res.data.msg)
                // this.isLoginMH()
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
  .property-page {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 5px;
    min-height: 100%;
  }
  .register-body {
    .step-top{
      width: 510px;
      height: 54px;
      margin: auto;
      padding-top: 62px ;
    }
    .container-first{
      width: 934px;
      margin: 56px auto 62px;
      display: flex;
      justify-content: space-between;
      .register-form{
        width: 584px;
        .el-form-item {
          margin-bottom: 30px;
        }
      }
      .card{
        width: 260px;
        height: 260px;
        .top{
          border-bottom: 1px solid #F1F1F1;
          text-align: center;
          img{
            width: 80px;
            height: 80px;
            border-radius: 40px;
          }
          .userName{
            margin-top: 13px;
            font-size: 16px;
            color: #333;
          }
          .positionName{
            margin-top: 3px;
            margin-bottom: 12px;
            color: #555;
          }
        }
        .bottom{
          margin-top: 16px;
          font-size: 14px;
          color: #777;
          text-align: center;
        }
        span{
          display: block;
          line-height: 22px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
        }
      }
    }
  }
  .avatar-uploader{
    border: 1px dashed #d9d9d9;
    height: 80px;
    width: 80px;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: inline-block;
  }
  .avatar-uploader:hover {
    border-color: #00b38a;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    height: 80px;
    width: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: inline-block;
  }
</style>
