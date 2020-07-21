<template>
  <div class="property-page">
    <div class="register-body">
      <div class="container-second">
        <div class="comp-wrap">
          <div class="left">
            <img :src="company.headImg" alt="用户头像" class="img1">
            <p>{{company.name}} · {{company.position}}</p>
          </div>
          <div class="line"></div>
          <div class="right">
            <el-upload class="avatar-uploader" style="border-radius: 3px;"
                       action="http://localhost:3000/updateFile"
                       :on-success="handleTrademarkSuccess"
                       :show-file-list="false">
              <img v-if="company.trademark" :src="company.trademark" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p>{{company.company}}</p>
          </div>
        </div>
        <el-form class="register-form" ref="company" :model="company" label-width="110px">
          <el-form-item size="large" label="公司全称"  prop="company" :rules="{ required: true, message: '公司全称不能为空', trigger: 'blur'}">
            <el-input v-model="company.company" size="larger" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item size="large" label="公司简称"  prop="shortName" :rules="{ required: true, message: '公司简称不能为空', trigger: 'blur'}">
            <el-input v-model="company.shortName" size="larger" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item  size="large" label="行业领域" prop="industry" :rules="{ required: true, message: '请选择行业领域', trigger: 'blur'}">
            <el-select v-model="company.industry" placeholder="请选择行业领域">
              <el-option v-for="item in industry" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item  size="large" label="公司规模" prop="scale" :rules="{ required: true, message: '请选择公司规模', trigger: 'blur' }">
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
            <el-button type="primary" size="large"  @click="sumbit" :loading="loading">提 交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {Msg} from '@/tools/message';
  import {companyApi} from './api'
  import db from '../../../store/user/db'
  export default {
    name: 'index',
    data () {
      return {
        loading: false,
        company: db.get('c_user'),
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
      handleTrademarkSuccess(res){
        this.company.trademark = res.url
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
      checkLink: (rule, value, callback) => {
        if (value) { value = value.trim(' '); }
        const reg = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
        const reg1 = /^\/[a-zA-Z0-9\.\/]*/;

        if (reg.test(value) || reg1.test(value)) {
          callback();
        }
        return callback(new Error('请输入正确链接'));
      },
      sumbit(){
        this.$refs['company'].validate(valid => {
          if (valid) {
            const params = {
              ...this.company
            }
            companyApi.editorCompany(params).then(res => {
              if(res.data.code === 0){
                Msg.success(res.data.msg)
                db.set('c_user',res.data.data)
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
    .container-second{
      width: 567px;
      margin: 0 auto;
      .comp-wrap{
        box-sizing: border-box;
        padding: 27px 40px;
        margin: 10px 0 30px 0;
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
