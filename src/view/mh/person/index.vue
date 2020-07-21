<template>
  <div class="content">
    <div class="resume-left" style="float: left;">
    <div class="myresume" id="resume">
      <div class="myresume-basic">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:3000/updateFile"
          :on-success="handleTrademarkSuccess"
          :show-file-list="false">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="myresume-basic-info">
          <div class="info-name">
            <div>
              <span style="font-size: 26px;font-weight: 600;">{{resumeInfo.basicInfo.name}}</span>
              <i v-if="resumeInfo.basicInfo.sex === '1'" class="el-icon-male" style="color: #4aabea; font-weight: 700;"></i>
              <i v-if="resumeInfo.basicInfo.sex === '2'" class="el-icon-female" style="color: #f57c7c;font-weight: 700;"></i>
            </div>
            <el-button type="text" v-show="isShow" size="medium" icon="el-icon-edit" @click="handleEditor('basic','基本信息',-1)">编辑</el-button>
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
          <el-button type="text" v-show="isShow" size="medium" icon="el-icon-circle-plus-outline" @click="handleEditor('education','添加教育经历',-1)">添加</el-button>
        </div>
        <div style="margin-bottom: 20px" v-for="(item,index) in resumeInfo.education" :key="item._id"  @mouseover="isEditorEducation=index" @mouseleave="isEditorEducation=-1">
          <div class="info-name">
            <span class="text-style">{{item.school}}</span>
            <span v-show="isEditorEducation === -1" class="time-style">{{item.time.join('-')}}</span>
            <div v-show="isEditorEducation === index">
              <el-button  type="text" icon="el-icon-edit" style="padding: 0" size="medium"
                         @click="handleEditor('education','编辑教育经历',index)">编辑</el-button>
              <el-button style="padding: 0;color: #FD5F39" v-show="resumeInfo.education.length > 1" type="text" icon="el-icon-delete"
                         @click="deleteEducation(index,'教育经历',1)" size="medium">删除</el-button>
            </div>
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
          v-for="(tag,index) in resumeInfo.skill"
          closable
          :disable-transitions="false"
          @close="handleClose(index)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else-if="isShow && !inputVisible" class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </div>
      <div class="myresume-project">
        <div class="info-name" style="margin-bottom: 10px;">
          <div>
            <span class="myresume-icon"></span>
            <span class="myresume-title">项目经历</span>
          </div>
          <el-button type="text" v-show="isShow"  size="medium" icon="el-icon-circle-plus-outline" @click="handleEditor('project','添加项目经历',-1)">添加</el-button>
        </div>
        <div style="margin-bottom: 20px" v-for="(item,index) in resumeInfo.project" :key="item._id"  @mouseover="isEditorProject=index" @mouseleave="isEditorProject=-1">
          <div class="info-name">
            <span class="text-style">{{item.name}}</span>
            <span v-show="isEditorProject === -1" class="time-style">{{item.time.join('-')}}</span>
            <div v-show="isEditorProject === index">
              <el-button  type="text" icon="el-icon-edit" style="padding: 0" size="medium"
                          @click="handleEditor('project','编辑项目经历',index)">编辑</el-button>
              <el-button style="padding: 0;color: #FD5F39" type="text" icon="el-icon-delete"
                         @click="deleteEducation(index,'项目经历',2)" size="medium">删除</el-button>
            </div>
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
          <el-button type="text" v-show="isShow" size="medium" icon="el-icon-circle-plus-outline" @click="handleEditor('works','添加工作经历',-1)">添加</el-button>
        </div>
        <div style="margin-bottom: 20px" v-for="(item,index) in resumeInfo.works" :key="item._id"  @mouseover="isEditorWorks=index" @mouseleave="isEditorWorks=-1">
          <div class="info-name">
            <span class="text-style">{{item.name}} / {{item.department}}</span>
            <span v-show="isEditorWorks === -1" class="time-style">{{item.time.join('-')}}</span>
            <div v-show="isEditorWorks === index">
              <el-button  type="text" icon="el-icon-edit" style="padding: 0" size="medium"
                          @click="handleEditor('works','编辑工作经历',index)">编辑</el-button>
              <el-button style="padding: 0;color: #FD5F39" type="text" icon="el-icon-delete"
                         @click="deleteEducation(index,'工作经历',3)" size="medium">删除</el-button>
            </div>
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
          <el-button type="text" v-show="isShow" size="medium" icon="el-icon-edit" @click="handleEditor('introduce','编辑自我评价',-1)">编辑</el-button>
        </div>
        <div style="margin-bottom: 20px">
          <p style="color: #848484">{{resumeInfo.introduce}}</p>
        </div>
      </div>
    </div>
    <el-button type="text"  size="medium" icon="el-icon-download" @click="downloadResume">把这份简历保存到本地</el-button>
    </div>
    <div class="resume-right">
      <div class="job-objective">
        <div class="info-name" style="margin-bottom: 10px;">
          <div>
            <span class="myresume-title" style="font-size: 16px">求职意向</span>
          </div>
          <el-button type="text" size="medium" icon="el-icon-edit" @click="handleEditor('intention','编辑求职意向',-1)">编辑</el-button>
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
          <el-button type="text" size="medium" icon="el-icon-edit" @click="handleEditor('status','编辑求职状态',-1)">编辑</el-button>
        </div>
        <div>
          <i class="el-icon-bank-card" style="font-size: 20px;color: #999;margin-right: 20px;"></i>
          <span style="color: #848484">{{resumeInfo.status.idea || ''}}</span>
          <span style="color: #848484">/ {{resumeInfo.status.time || ''}}</span>
        </div>
      </div>
      <div class="resume-file">
        <div class="info-name" style="margin-bottom: 10px;">
          <div>
            <span class="myresume-title" style="font-size: 16px">附件简历</span>
          </div>
          <el-tooltip content="只能上传jpg/png文件，且不超过2M" placement="bottom" effect="top">
          <el-upload
            class="upload-demo"
            action="http://localhost:3000/updateFile/file/uploading"
            :on-success="handleFileSuccess" :multiple="false" :show-file-list="false">
            <el-button size="medium" icon="el-icon-upload" type="text">上传</el-button>
          </el-upload>
          </el-tooltip>
        </div>
        <div v-if="JSON.stringify(fileList) !== '{}'" @mouseover="isDeleteFile=1" @mouseleave="isDeleteFile=-1">
          <i class="el-icon-connection" style="font-size: 20px;color: #999;margin-right: 20px;"></i>
          <a class="download-file"
             :href="`http://localhost:3000/updateFile/download?file=${fileList.name}`" download>{{fileList.name}}</a>
          <el-button style="color: #FD5F39" v-show="isDeleteFile===1"
                     @click="deleteFile" icon="el-icon-error" type="text"></el-button>
        </div>
      </div>
    </div>
    <Dialog ref="dialog" :resumeInfo="resumeInfo" @changeResumeInfo="changeResumeInfo"></Dialog>
  </div>
</template>

<script>
  import Dialog from './dialog'
  import {mhApi} from './api'
  import {Msg} from '../../../tools/message'

  export default {
    name: 'index',
    data() {
      return {
        isShow: true,
        inputVisible: false,
        inputValue: '',
        imageUrl: '',
        isEditorEducation: -1,
        isEditorProject: -1,
        isEditorWorks: -1,
        isDeleteFile: -1,
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
        fileList:{} //附件简历
      };
    },
    components:{
      Dialog
    },
    mounted(){
      this.getResume()
    },
    methods: {
      deleteFile(){
        this.$confirm(`此操作将删除该附件简历, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const params = {
            fileList: {}
          }
          mhApi.editorResume(params).then(res => {
            if(res.data.code !== 0){
              Msg.error('文件删除失败')
            } else {
              this.fileList = {};
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleFileSuccess(res) {
        const params = {
          fileList: res
        }
        mhApi.editorResume(params).then(res => {
          if(res.data.code !== 0){
            Msg.error('文件上传失败')
          } else {
            this.fileList = params.fileList;
          }
        })
      },
      handleTrademarkSuccess(res){
        const params = {
          imageUrl: res.url
        }
        mhApi.editorResume(params).then(res => {
          if(res.data.code !== 0){
            Msg.error('图片上传失败')
          } else {
            this.imageUrl = params.imageUrl
          }
        })
      },
      editorResume(){
        const params = {
          ...this.resumeInfo
        }
        mhApi.editorResume(params).then(res => {
          if(res.data.code !== 0){
            Msg.error('编辑失败')
          } else {
            Msg.success('编辑成功！')
          }
        })
      },
      getResume(){
        mhApi.getResume({}).then(res => {
          if(res.data.code === 0){
            this.resumeInfo = res.data.data
            this.imageUrl = res.data.data.imageUrl
            this.fileList = res.data.data.fileList
          }
        })
      },
      downloadResume(){
        this.isShow = false
        this.getPdf('resume', `${this.resumeInfo.basicInfo.name}的简历`)
        setTimeout(()=>{this.isShow = true},10)
      },
      handleClose(index) {
        this.resumeInfo.skill.splice(index, 1);
        this.editorResume()
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.resumeInfo.skill.push(inputValue);
          this.editorResume()
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      changeResumeInfo(val){
        this.resumeInfo = JSON.parse(JSON.stringify(val))
      },
      handleEditor(val,title,index){
        this.$refs.dialog.openDialog(val,title,index,this.resumeInfo)
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      deleteEducation(i,title,val){
        this.$confirm(`此操作将删除该${title}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          switch (val) {
            case 1: this.resumeInfo.education.splice(i,1);
              break;
            case 2: this.resumeInfo.project.splice(i,1);
              break;
            case 3: this.resumeInfo.works.splice(i,1);
              break;
          }
          this.$refs.dialog.deleteSomeInfo(i,val)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style lang="scss" scoped>
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
