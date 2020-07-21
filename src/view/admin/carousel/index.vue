<template>
  <!-- 职位管理界面-->
  <div class="property-page">
    <!-- 职位表格 -->
    <div>
      <p>首页轮播图</p>
    <el-carousel height="280px" style="width: 522px;display: inline-block">
      <el-carousel-item v-for="item in data.homeImg" :key="item">
        <img :src="item" style="width: 522px;height: 280px">
      </el-carousel-item>
    </el-carousel>
    <div style="width:550px">
      <el-card :body-style="{ padding: '0px' }" v-for="(item,index) in data.homeImg" style="width: 250px;display: inline-block;margin-right: 19px;">
        <img :src="item" class="image" width="250" height="130">
          <div class="bottom clearfix" style="text-align: right; padding-right:10px ">
            <el-button type="text" style="color: #FD5F39" icon="el-icon-delete" @click="deleteHomeImg(index)">删除</el-button>
          </div>
      </el-card>
      <el-upload
        class="avatar-uploader"
        action="http://localhost:3000/updateFile"
        :on-success="handleTrademarkSuccess"
        :show-file-list="false">
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    </div>
    <div>
      <p>公司轮播图</p>
      <el-carousel height="280px" style="width: 522px;display: inline-block">
        <el-carousel-item v-for="item in data.companyImg" :key="item">
          <img :src="item" style="width: 522px;height: 280px">
        </el-carousel-item>
      </el-carousel>
      <div style="width: 550px;">
        <el-card :body-style="{ padding: '0px' }" v-for="(item,index) in data.companyImg" style="width: 250px;display: inline-block;margin-right: 19px;">
          <img :src="item" class="image" width="250" height="130">
          <div class="bottom clearfix" style="text-align: right; padding-right:10px ">
            <el-button type="text" style="color: #FD5F39" icon="el-icon-delete" @click="deleteCompanyImg(index)">删除</el-button>
          </div>
        </el-card>
        <el-upload
          class="avatar-uploader"
          action="http://localhost:3000/updateFile"
          :on-success="handleSuCompanySuccess"
          :show-file-list="false">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
  // import CompPagination from '../../../packages/components/pagination'
  // import Dialog from './dialog'
  import {adminApi} from './api'
  import {Msg} from '../../../tools/message'

  export default {
    data() {
      return {
        data:{},
        disabled: false,
        dialogImageUrl: '',
        dialogVisible: false,
      }
    },
    components: {
      // 'comp-pagination': CompPagination,
    },
    mounted(){
      this.getData()
    },
    methods: {
      handleTrademarkSuccess(res){
        let imgList = [...this.data.homeImg]
        imgList.push(res.url)
        const params = {
          homeImg: imgList
        }
        adminApi.updateData(params).then(res => {
          if(res.data.code === 0){
            this.data = res.data.data
            Msg.success('图片上传成功！')
          } else {
            Msg.error('图片上传失败！')
          }
        }).catch(err => {
          Msg.error('网络错误！')
        })
      },
      handleSuCompanySuccess(res){
        let imgList = [...this.data.companyImg]
        imgList.push(res.url)
        const params = {
          companyImg: imgList
        }
        adminApi.updateData(params).then(res => {
          if(res.data.code === 0){
            this.data = res.data.data
            Msg.success('图片上传成功！')
          } else {
            Msg.error('图片上传失败！')
          }
        }).catch(err => {
          Msg.error('网络错误！')
        })
      },
      deleteHomeImg(index){
        let imgList = [...this.data.homeImg]
        imgList.splice(index,1)
        const params = {
          homeImg: imgList
        }
        this.$confirm('此操作将永久删除该轮播图, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          adminApi.updateData(params).then(res => {
            if(res.data.code === 0){
              Msg.success('删除成功')
              this.data = res.data.data
            } else {
              Msg.error('删除失败')
            }
          }).catch(err => {
            Msg.error('删除失败')
          })
        }).catch(() => {
          Msg.info('删除取消')
        })
      },
      deleteCompanyImg(index){
        let imgList = [...this.data.companyImg]
        imgList.splice(index,1)
        const params = {
          companyImg: imgList
        }
        this.$confirm('此操作将永久删除该轮播图, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          adminApi.updateData(params).then(res => {
            if(res.data.code === 0){
              Msg.success('删除成功')
              this.data = res.data.data
            } else {
              Msg.error('删除失败')
            }
          }).catch(err => {
            Msg.error('删除失败')
          })
        }).catch(() => {
          Msg.info('删除取消')
        })
      },
      getData () {
        adminApi.getData({}).then(res => {
          if (res.data.code === 0) {
            this.data = res.data.data
            Msg.success('获取数据成功！')
          } else {
            Msg.error(res.data.msg)
          }
        }).catch(err => {
          Msg.success('网络错误！')
        })
      },
    }
  };
</script>

<style scoped lang="scss">
  .csac-page {
    max-width: 100%;
    min-width: 1024px;
  }

  .avatar-uploader{
    display: inline-block;
    width: 250px;
    border: 1px dashed #d9d9d9;
    height: 167px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border-radius: 6px;
    right: 4px;
  }
  .avatar-uploader-icon {
    font-size: 38px;
    color: #8c939d;
    height: 167px;
    width: 250px;
    line-height: 167px;
    text-align: center;
  }
  .avatar-uploader:hover {
    border-color: #00b38a;
  }
  .property-page {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 5px;
    min-height: 100%;
    display: flex;
    justify-content: space-between;

  }
  .input-new-tag {
    width: 90px;
    vertical-align: bottom;
  }

  /*.iconwulumuqishigongandashujuguanlipingtai-ico- {*/
  /*cursor: pointer;*/
  /*color: #3246a7;*/
  /*}*/
</style>
