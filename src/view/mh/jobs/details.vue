<template>
  <div>
    <div class="position-head">
      <div class="head-content">
        <div class="head-content-l">
          <div class="job-name">
            <h4 class="company">{{position.shortName || position.company}}招聘</h4>
            <h1 class="name">{{position.position_name}}</h1>
          </div>
          <div class="job-request">
            <h3>
              <span class="salary">{{position.salary}} </span>
              / {{position.workCity}} / {{position.workExp}} / {{position.academic === '不限'? '学历不限' : position.academic}} / {{position.type}}
            </h3>
            <div class="b-tag">
              <el-tag style="margin-right: 8px" effect="plain" v-for="item in position.tag" :key="item" type="info">
                {{item}}
              </el-tag>
            </div>
            <p class="publish-time">{{position.pushAtTime}}&nbsp; 发布</p>
          </div>
        </div>
        <div class="head-content-r">
          <el-button v-if="showButton === 0" type="primary" size="large" @click="deliveryResume">投个简历</el-button>
          <el-button v-if="showButton === 1" type="info" size="large" disabled>投个简历</el-button>
        </div>
      </div>
    </div>
    <div class="container" style="margin-top:40px">
      <p style="font-size: 16px; color: #333; font-weight: 700;">职位描述：</p>
      <div v-html="position.describe"></div>
      <p style="font-size: 16px; color: #333; font-weight: 700;">工作地址：</p>
      <p>{{position.workCity}} - {{position.address}}</p>
    </div>
  </div>
</template>

<script>
  import {mhApi} from './api'
  import {Msg} from '../../../tools/message'
  import db from '../../../store/user/db'

  export default {
    name: 'details',
    data(){
      return{
        position: {},
        showButton: 0,
        resumeInfo: {
          basicInfo: {}
        }
      }
    },
    mounted(){
      this.getResume()
      this.getPositionDetails()
    },
    methods:{
      getPositionDetails(){
        const params = {
          id: this.$route.params.id
        }
        mhApi.getPositionDetails(params).then(res => {
          if(res.data.code === 0) {
            this.position = res.data.data
            this.showButton = res.data.show
          } else {
            Msg.error(res.data.msg)
          }
        }).catch(err => {
          Msg.error('网络错误！')
        })
      },
      getResume(){
        mhApi.getResume({}).then(res => {
          if(res.data.code === 0){
            this.resumeInfo = res.data.data
            // this.imageUrl = res.data.data.imageUrl
            // this.fileList = res.data.data.fileList
          }
        })
      },
      deliveryResume(){
        const m_user = db.get('m_user')
        if(!m_user) {
          Msg.error('请先登录！')
        } else if(Object.keys(this.resumeInfo.basicInfo).length < 5) {
          Msg.error('请先完善简历基本信息！')
        }else {
         let val = JSON.stringify(m_user.fileList) === '{}' ? 0 : 1
          const params = {
            p_id: this.position._id,
            c_id: this.position.c_id,
            name: m_user.basicInfo.name,
            position_name: this.position.position_name,
            salary: this.position.salary,
            school: m_user.basicInfo.school,
            academic: m_user.basicInfo.education,
            deliveryTime:  new Date().Format("yyyy-MM-dd hh:mm"),
            phone:  m_user.basicInfo.phone,
            email: m_user.basicInfo.email,
            company: this.position.company,
            workCity: this.position.workCity,
            isFile: val, // 是否使用附件简历
          }
          mhApi.deliveryResume(params).then(res => {
            if(res.data.code === 0) {
              Msg.success(res.data.msg)
              this.showButton = res.data.data
            }
          })
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  .position-head{
    background-color: #f2f5f4;
    padding: 30px 0 11px;
    .head-content{
      width: 1024px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .job-name{
        margin: 0 0 13px;
        h4{
          margin: -2px 0 8px 0;
          font-size: 14px;
          color: #555;
        }
        h1{
          height: 36px;
          font-size: 30px;
          color: #333;
          line-height: 36px;
        }
      }
      .job-request{
        margin-top: 2px;
        color: #555;
        h3{
          margin: 0 auto 8px;
          font-size: 17px;
        }
        .salary{
          color: #fd5f39;
        }
        .publish-time{
          padding-top: 10px;
          font-size: 14px;
          color: #999;
        }
      }
    }
  }
  .container{
    width: 1024px;
    margin: 0 auto;
  }
</style>
