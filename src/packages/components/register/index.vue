<template>
  <div>
  <div class="register-body">
    <el-steps :active="active" finish-status="success" class="step-top" align-center>
      <el-step title="完善个人信息"></el-step>
      <el-step title="确定公司信息"></el-step>
      <el-step title="完善账号"></el-step>
    </el-steps>
    <div class="container-first" v-if="active === 0">
      <el-form class="register-form" ref="personInfo" :model="personInfo" label-width="110px">
        <el-form-item size="large" label="姓名"  prop="name" :rules="{ required: true, message: '姓名不能为空', trigger: 'blur'}">
          <el-input v-model="personInfo.name" size="larger" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item  size="large" label="职位" prop="position" :rules="{ required: true, message: '职位不能为空', trigger: 'blur'}">
          <el-input v-model="personInfo.position" size="larger" placeholder="请输入职位名称"></el-input>
        </el-form-item>
        <el-form-item  size="large" :key="0"
                       label="接收简历邮箱" prop="email" :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
          <el-input v-model="personInfo.email" size="larger" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item  size="large" label="公司全称" prop="company" :rules="{ required: true, message: '公司名称不能为空', trigger: 'blur'}">
          <el-input v-model="personInfo.company" size="larger" placeholder="请输入公司全称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large"  @click="firstStep">下一步</el-button>
        </el-form-item>
      </el-form>
      <el-card class="card">
        <p class="top">
          <!--<img src="https://s0.lgstatic.com/i/image2/M01/0E/AC/CgotOVyhgcmAaD2nAABq7l7a11A980.png" alt="用户头像" >-->
          <el-upload class="avatar-uploader"
                     action="http://localhost:3000/updateFile"
                     :on-success="handleAvatarSuccess"
                     :show-file-list="false">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span class="userName">{{personInfo.name}}</span>
          <span class="positionName">{{personInfo.position}}</span>
        </p>
        <p class="bottom">
          <span>{{personInfo.email}}</span>
          <span>{{personInfo.company}}</span>
        </p>
      </el-card>
    </div>
    <div class="container-second" v-else-if="active === 1">
      <div class="comp-wrap">
        <div class="left">
          <img :src="imageUrl" alt="用户头像" class="img1">
          <p>{{personInfo.name}} · {{personInfo.position}}</p>
        </div>
        <div class="line"></div>
        <div class="right">
          <el-upload class="avatar-uploader" style="border-radius: 3px;"
                     action="http://localhost:3000/updateFile"
                     :on-success="handleTrademarkSuccess"
                     :show-file-list="false">
            <img v-if="trademark" :src="trademark" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p>{{personInfo.company}}</p>
        </div>
      </div>
      <el-form class="register-form" ref="company" :model="company" label-width="110px">
        <el-form-item size="large" label="公司全称">
          <p>{{personInfo.company}}</p>
        </el-form-item>
        <el-form-item size="large" label="公司简称"  prop="shortName" :rules="{ required: true, message: '公司简称不能为空', trigger: 'blur'}">
          <el-input v-model="company.shortName" size="larger" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item  size="large" label="行业领域" :key="1"
                       prop="industry" :rules="{ required: true, message: '请选择行业领域', trigger: 'blur'}">
          <el-select v-model="company.industry" placeholder="请选择行业领域">
            <el-option v-for="item in industry" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item  size="large" label="公司规模" :key="2"
                       prop="scale" :rules="{ required: true, message: '请选择公司规模', trigger: 'blur' }">
          <el-select v-model="company.scale" placeholder="请选择公司规模">
            <el-option v-for="item in scale" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item  size="large" label="所在城市" prop="city" :rules="{ required: true, message: '所在城市不能为空', trigger: 'blur'}">
          <el-autocomplete class="inline-input" v-model="company.city"
                           :fetch-suggestions="querySearch" placeholder="请输入内容" :trigger-on-focus="false"></el-autocomplete>
        </el-form-item>
        <el-form-item  size="large" label="公司官网" prop="link"
                       :rules="[{ required: true, message: '公司官网不能为空',trigger: 'blur'},{validator: checkLink, trigger: 'change'}]">
          <el-input v-model="company.link" size="larger" placeholder="请输入公司官网"></el-input>
        </el-form-item>
        <el-form-item  size="large" label="公司口号" prop="slogan" :rules="{ required: true, message: '公司工号不能为空', trigger: 'blur'}">
          <el-input v-model="company.slogan" size="larger" placeholder="请输入公司口号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large"  @click="secondStep">下一步</el-button>
          <el-button type="info" size="large"  @click="resetForm('company')">返回上一步</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="container-second" v-else-if="active === 2">
      <div class="comp-wrap">
        <div class="left">
          <img :src="trademark" alt="公司商标" class="img1" style="border-radius: 3px">
          <p>{{personInfo.company}}</p>
        </div>
        <div class="line"></div>
        <div class="right">
          <img :src="imageUrl" alt="用户头像" class="img1" style="border-radius: 40px">
          <p>{{personInfo.name}} · {{personInfo.position}}</p>
        </div>
      </div>
      <el-form class="register-form" ref="account" :model="account" label-width="110px" :rules="rules">
        <el-form-item size="large" label="账号"  prop="account">
          <el-input v-model="account.account" size="larger" placeholder="请输入手机号/邮箱/一串你喜欢的数字，字符"></el-input>
        </el-form-item>
        <el-form-item  size="large" label="密码" prop="password">
          <el-input v-model="account.password" size="larger" placeholder="请输入密码" show-password></el-input>

        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="account.checkPass" size="larger" placeholder="请再次输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large"  @click="sumbit">提交注册表</el-button>
          <el-button type="info" size="large"  @click="resetForm('account')">返回上一步</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
    <el-footer>Copyright © 2020 小鳄鱼 All Rights Reserved</el-footer>
  </div>
</template>

<script>
  import {Msg} from '@/tools/message';
  import {registerCompany} from './api'
  import db from '../../../store/user/db'
  export default {
    name: 'index',
    data () {
      const checkPassword = (rule, value, callback) => {
        if (value !== this.account.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        trademark: '',
        imageUrl: '',
        active: 0,
        personInfo: {},
        company: {},
        account: {
          password: '',
          checkPass: ''
        },
        rules: {
          account:[{ required: true, message: '账号不能为空', trigger: 'blur'}],
          password:[{ required: true, message: '请输入密码', trigger: 'blur'},
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'change' }],
          checkPass: [{ required: true, message: '请再输入密码', trigger: 'blur'},
            { validator: checkPassword, trigger: 'change' }
          ],
        },
        industry: ['互联网', '电商', '金融', '企业服务', '教育', '文娱｜内容', '游戏', '硬件', '汽车', '旅游｜出行', '物流｜运输', '广告营销', '电子通讯'],
        scale: ['少于15人', '15-50人', '50-150人', '150-500人', '500-2000人', '2000人以上'],
        restaurants: [
          {value: '北京'}, {value: '上海'}, {value: '广州'}, {value: '深圳'}, {value: '杭州'}, {value: '重庆'},
          {value: '成都'}, {value: '天津'}, {value: '南京'}, {value: '武汉'}, {value: '西安'}, {value: '厦门'},
          {value: '长沙'}, {value: '昆明'}, {value: '苏州'}, {value: '合肥'}, {value: '贵阳'}, {value: '郑州'}
        ],
      }
    },
    methods:{
      handleAvatarSuccess(res) {
        this.imageUrl = res.url
      },
      handleTrademarkSuccess(res){
        this.trademark = res.url
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
      // change(file) {
      //   const formData = new FormData();
      //   console.log(file.raw)
      //   formData.append('files', file.raw);  // 这里与antd 不同的是，文件真正数据为 file.raw
      //   // Ge.GE0001A03([file.raw]).then(res => {
      //   //   const data = res.data || {};
      //   //   const params = {
      //   //     name: (data.data || {}).name,
      //   //     url: (data.data || {}).url
      //   //   };
      //   //   // let file = JSON.stringify(params);
      //   //   this.file.push(params);
      //   // })
      //   updateAvatar(formData).then(res => {
      //     console.log(res)
      //   })
      // },
      // remove(file) {
      //   const fileList = []
      //   for (let i = 0; i < this.file.length; i++) {
      //     if (this.file[i].uid !== file.uid) {
      //       fileList.push(this.file[i])
      //     }
      //   }
      //   this.file = fileList
      // },
      checkLink: (rule, value, callback) => {
        if (value) { value = value.trim(' '); }
        const reg = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
        const reg1 = /^\/[a-zA-Z0-9\.\/]*/;

        if (reg.test(value) || reg1.test(value)) {
          callback();
        }
        return callback(new Error('请输入正确链接'));
      },
      firstStep(){
        this.$refs['personInfo'].validate(valid => {
          if (valid) {
            this.active = 1
          }
        })
      },
      secondStep(){
        this.$refs['company'].validate(valid => {
          if (valid) {
            this.active = 2
          }
        })
        // this.$refs['company'].clearValidate();
      },
      sumbit(){
        this.$refs['account'].validate(valid => {
          if (valid) {
            const {account,password} = this.account
            const params = {
              account,
              password,
              ...this.personInfo,
              ...this.company,
              headImg:this.imageUrl,
              trademark: this.trademark
            }
            registerCompany(params).then(res => {
              if(res.data.code === 0){
                // this.$cookies.set("c_id",res.data.data._id,'1d')
                db.set('c_user',res.data.data)
                this.$router.push({path: '/company'})
                Msg.success(res.data.msg);
              } else {
                Msg.error(res.data.msg);
              }
            }).catch(err => {
              Msg.error('网络出错！')
            })
          }
        })
      },
      querySearch(queryString, callback) {
        let restaurants = this.restaurants;
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        callback(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
        };
      },
      resetForm(formName) {
        this.active--
        this.$refs[formName].resetFields();
      },
    },
  // watch: {
  //   active(val) {
  //     if(val == 2) {
  //       this.$refs['company'].resetFields();
  //     }
  //   }
  // }
  }
</script>

<style scoped lang="scss">
  .register-body {
    /*background-color: #f0f4ff;*/
    width: 100vw;
    min-height: 87vh;
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
    .container-second{
      width: 567px;
      margin: 0 auto;
      .comp-wrap{
        box-sizing: border-box;
        padding: 27px 40px;
        margin: 46px 0;
        border: 1px solid #F0F0F0;
        position: relative;
        img{
          height: 80px;
          width: 80px;
        }
        p{
          margin-top: 20px;
          font-size: 14px;
          color: #555;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
        }
        .left{
          text-align: center;
          width: 33.3%;
          display: inline-block;
          img{
            border-radius: 40px;
          }
        }
        .line{
          position: absolute;
          height: 1px;
          width: 180px;
          left: 50%;
          top: 69px;
          -webkit-transform: translate(-50%,0);
          -moz-transform: translate(-50%,0);
          -ms-transform: translate(-50%,0);
          -o-transform: translate(-50%,0);
          background: #E8E8E8;
        }
        .right{
          text-align: center;
          width: 33.3%;
          float: right;
        }
      }
    }
  }
  .el-footer{
    margin-top: 50px;
    line-height: 60px;
    text-align: center;
    background: #F2F5F4;
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
