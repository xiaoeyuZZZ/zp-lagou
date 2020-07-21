<template>
  <!-- 职位管理界面-->
  <div class="property-page">
    <div class="content">
      <div class="resume-left" style="float: left;">
        <div class="myresume" id="resume">
          <div class="myresume-basic">
              <img :src="imageUrl" class="avatar">
            <div class="myresume-basic-info">
              <div class="info-name">
                <div>
                  <span style="font-size: 26px;font-weight: 600;">{{resumeInfo.basicInfo.name}}</span>
                  <i v-if="resumeInfo.basicInfo.sex === '1'" class="el-icon-male" style="color: #4aabea; font-weight: 700;"></i>
                  <i v-if="resumeInfo.basicInfo.sex === '2'" class="el-icon-female" style="color: #f57c7c;font-weight: 700;"></i>
                </div>
              </div>
              <p class="basic-text">
                {{resumeInfo.basicInfo.school}} / {{resumeInfo.basicInfo.education}} / {{resumeInfo.basicInfo.isGraduates}} / {{resumeInfo.basicInfo.birthday}}
              </p>
              <p class="basic-text">
                <span><i class="el-icon-mobile-phone"/>{{resumeInfo.basicInfo.phone}}</span>
                <span><i class="el-icon-message"/>{{resumeInfo.basicInfo.email}}</span>
              </p>
            </div>
          </div>
          <div class="myresume-education">
            <div class="info-name" style="margin-bottom: 10px;">
              <div>
                <span class="myresume-icon"></span>
                <span class="myresume-title">教育经历</span>
              </div>
            </div>
            <div style="margin-bottom: 20px" v-for="(item,index) in resumeInfo.education" :key="item._id">
              <div class="info-name">
                <span class="text-style">{{item.school}}</span>
                <span class="time-style">{{item.time.join('-')}}</span>
              </div>
              <p style="color: #848484">{{item.level}} / {{item.major}}</p>
            </div>
          </div>
          <div class="myresume-skill">
            <div style="margin-bottom: 10px;">
              <span class="myresume-icon"></span>
              <span class="myresume-title">个人技能</span>
            </div>
            <el-tag
              :key="index" size="large"
              v-for="(tag,index) in resumeInfo.skill">
              {{tag}}
            </el-tag>
          </div>
          <div class="myresume-project">
            <div class="info-name" style="margin-bottom: 10px;">
              <div>
                <span class="myresume-icon"></span>
                <span class="myresume-title">项目经历</span>
              </div>
            </div>
            <div style="margin-bottom: 20px" v-for="(item,index) in resumeInfo.project" :key="item._id">
              <div class="info-name">
                <span class="text-style">{{item.name}}</span>
                <span class="time-style">{{item.time.join('-')}}</span>
              </div>
              <p style="color: #848484">项目描述：{{item.describe}}</p>
              <p style="color: #848484">我的成就：{{item.achievement}}</p>
              <p style="color: #848484" v-if="item.link">项目链接：{{item.link}}</p>
            </div>
          </div>
          <div class="myresume-works">
            <div class="info-name" style="margin-bottom: 10px;">
              <div>
                <span class="myresume-icon"></span>
                <span class="myresume-title">工作经历</span>
              </div>
            </div>
            <div style="margin-bottom: 20px" v-for="(item,index) in resumeInfo.works" :key="item._id">
              <div class="info-name">
                <span class="text-style">{{item.name}} / {{item.department}}</span>
                <span class="time-style">{{item.time.join('-')}}</span>
              </div>
              <p style="color: #848484">职位名称：{{item.position}}</p>
              <p style="color: #848484">工作内容：{{item.content}}</p>
            </div>
          </div>
          <div class="myresume-introduce">
            <div class="info-name" style="margin-bottom: 10px;">
              <div>
                <span class="myresume-icon"></span>
                <span class="myresume-title">自我评价</span>
              </div>
            </div>
            <div style="margin-bottom: 20px">
              <p style="color: #848484">{{resumeInfo.introduce}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="resume-right">
        <div class="job-objective">
          <div class="info-name" style="margin-bottom: 10px;">
            <div>
              <span class="myresume-title" style="font-size: 16px">求职意向</span>
            </div>
          </div>
          <div>
            <i class="el-icon-suitcase" style="font-size: 20px;color: #999;margin-right: 20px;"></i>
            <span style="color: #848484">{{resumeInfo.intention.job || ''}}</span>
            <span style="color: #848484">/ {{resumeInfo.intention.city || ''}}</span>
            <span style="color: #848484">/ {{resumeInfo.intention.salary || ''}}</span>
          </div>
          <el-divider></el-divider>
          <div class="info-name" style="margin-bottom: 10px;">
            <div>
              <span class="myresume-title" style="font-size: 16px">求职状态</span>
            </div>
          </div>
          <div>
            <i class="el-icon-bank-card" style="font-size: 20px;color: #999;margin-right: 20px;"></i>
            <span style="color: #848484">{{resumeInfo.status.idea || ''}}</span>
            <span style="color: #848484">/ {{resumeInfo.status.time || ''}}</span>
          </div>
        </div>
        <div class="resume-file" v-if="JSON.stringify(fileList) !== '{}'">
          <div class="info-name" style="margin-bottom: 10px;">
            <div>
              <span class="myresume-title" style="font-size: 16px">附件简历</span>
            </div>
          </div>
          <div>
            <i class="el-icon-connection" style="font-size: 20px;color: #999;margin-right: 20px;"></i>
            <a class="download-file"
               :href="`http://localhost:3000/updateFile/download?file=${fileList.name}`" download>{{fileList.name}}</a>
          </div>
        </div>
        <div class="resume-file" style="margin-top: 20px">
          <div class="info-name" style="margin-bottom: 10px;">
            <div>
              <span class="myresume-title" style="font-size: 16px">更改状态</span>
            </div>
          </div>
          <div style="margin-bottom: 10px;">
            <el-select v-model="status" size="large" placeholder="请选择状态">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div >
            <el-button type="primary" @click="deitorSeekerStatus">更 改</el-button>
            <el-button type="primary" plain @click="$router.back()">返 回</el-button>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {companyApi} from './api'
  import {Msg} from '../../../tools/message'

  export default {
    name: 'index',
    data() {
      return {
        status: this.$route.query.status,
        isShow: true,
        inputVisible: false,
        inputValue: '',
        imageUrl: '',
        resumeInfo: {
          basicInfo: {},
          education: [],
          project: [],
          works: [],
          skill: [],
          introduce: '', //自我测评
          intention: {}, //求职意向
          status: {},
        },
        fileList:{}, //附件简历
        options: [
          {
            value: '0',
            label: '未查看'
          },
          {
            value: '1',
            label: '已查看'
          },
          {
            value: '2',
            label: '待面试'
          },
          {
            value: '3',
            label: '面试中'
          },
          {
            value: '4',
            label: '通过'
          },
          {
            value: '5',
            label: '不合适'
          },
        ]
      };
    },
    components:{
    },
    mounted(){
      this.getResume()
    },
    methods: {
      getResume(){
        const params = {
          _id: this.$route.params.id
        }
        companyApi.getResume(params).then(res => {
          if(res.data.code === 0){
            this.resumeInfo = res.data.data
            this.imageUrl = res.data.data.imageUrl
            this.fileList = res.data.data.fileList
          }
        })
      },
      deitorSeekerStatus(){
        const params = {
          id: this.$route.query._id,
          status: this.status
        }
        companyApi.editorSeekerStatus(params).then(res => {
          if (res.data.code === 0){
            Msg.success(res.data.msg)
          } else {
            Msg.error(res.data.msg)
          }
        }).catch(err => {
          Msg.error('网络错误！')
        })
      }
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

  .resume-file{
    border: 1px solid #f2f2f2;
    background-color: #fafafa;
    border-radius: 3px;
    padding: 10px 20px;
  }
  .job-objective {
    padding: 20px 20px 15px;
    border: 1px solid #F2F2F2;
    border-radius: 1px;
    margin-bottom: 20px;
  }
  .content{
    width: 1024px;
    margin: 35px auto 0;
    padding-bottom: 80px;
    display: flex;
    justify-content: space-between;
  }
  .resume-right{
    width: 282px;
  }
  .info-name {
    display: flex;
    justify-content: space-between;
  }
  .myresume{
    border: 1px solid #E3EBE9;
    border-radius: 5px;
    width: 700px;
    .text-style{
      font-weight: 600;
      color: #333;
    }
    .time-style{
      font-size: 14px;color: #666;
    }

    &-icon{
      display: inline-block;
      border-left: 3px solid rgb(0, 179, 138);
      height: 16px;
      position: relative;
      bottom: -2px;
    }
    &-title{
      font-size: 18px;
      color: #333;
      font-weight: 600;
    }
    &-education,&-project,&-works,&-skill,&-introduce{
      padding: 35px 50px 10px;
    }
    &-basic{
      padding: 50px;
      background: #FAFAFA;
      border-radius: 5px 5px 0 0;
      border-bottom: 1px solid #E3EBE9;
      display: flex;
      &-info{
        position: relative;
        width: 100%;
        margin-left: 20px;
        flex: 1;
        .basic-text{
          color: #848484;
          margin-top: 10px;
          font-size: 14px;
        }
      }
    }
  }
  .avatar-uploader{
    border: 1px dashed #d9d9d9;
    height: 88px;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader:hover {
    border-color: #00b38a;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    height: 88px;
    width: 88px;
    line-height: 88px;
    text-align: center;
  }
  .avatar {
    height: 88px;
    width: 88px;
    border-radius: 50%;
    display: block;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .download-file{
    cursor: pointer;
    color: #848484
  }
  .download-file:hover{
    color: #00b38a;
  }
</style>
