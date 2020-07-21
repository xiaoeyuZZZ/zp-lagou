<template>
  <!-- 职位管理界面-->
  <div class="property-page" v-loading="loading">
    <!-- 职位表格 -->
    <div style="text-align: right;margin-bottom: 30px">
      <el-button type="primary" size="large" icon="el-icon-edit"  v-show="!showButton" @click="isShowButton">编 辑</el-button>
      <el-button type="primary" size="large" plain v-show="showButton" @click="isShowButton">取 消</el-button>
      <el-button type="primary" size="large" v-show="showButton" @click="updateIntroduce">保 存</el-button>
    </div>
    <div v-show="showButton"><CompEditor ref="introduce"></CompEditor></div>
    <div v-show="!showButton" v-html="introduce"></div>
  </div>
</template>

<script>
  import {quickTimeSelect} from '../../../tools/utils'
  import {Msg} from '../../../tools/message';
  import {companyApi} from './api'
  import CompEditor from '../../../packages/components/editor';

  export default {
    data() {
      return {
        introduce: '',
        showButton: false,
        loading: false
      };
    },
    mounted(){
      this.getIntroduce()
    },
    components: {
      CompEditor
    },
    methods: {
      isShowButton(){
        setTimeout(()=>{
          this.$refs['introduce'].setEditorContent(this.introduce);
        },100)
        this.showButton = !this.showButton
      },
      getIntroduce(){
        this.loading = true
        companyApi.getCompanyIntroduce({}).then(res => {
          if(res.data.code === 0) {
            this.introduce = res.data.data.introduce
            this.loading = false
            Msg.success(res.data.msg);
          } else {
            this.loading = false
            Msg.error(res.data.msg);
          }
        }).catch(err => {
          Msg.error('网络错误！')
        })
      },
      updateIntroduce(){
        const introduce = this.$refs['introduce'].getEditorContent();
        const params = {introduce}
        companyApi.updateCompanyIntroduce(params).then(res => {
          if(res.data.code === 0) {
            Msg.success(res.data.msg);
            this.introduce = res.data.data.introduce
          } else {
            Msg.error(res.data.msg);
          }
        }).catch(err => {
          Msg.error('网络错误！')
        })
      }
    }
  };
</script>

<style scoped lang="scss">
  .csac-page {
    max-width: 100%;
    min-width: 1024px;
  }

  .property-page {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 5px;
    min-height: 100%;
    .edui-editor-body .edui-body-container {
      width: unset!important;
    }
  }

  .property-page-bottom {
    display: flex;
    justify-content: space-between;
  }

  .margin-top-30 {
    margin-top: 30px;
    padding-top: 20px;
  }

  img {
    width: 20px;
    height: 20px;
  }

  .iconwulumuqishigongandashujuguanlipingtai-ico- {
    cursor: pointer;
    color: #3246a7;
  }
</style>
