<template>
  <div>
    <div class="top-info">
      <div class="top-info-wrap">
        <img :src="company.trademark" alt="萌想科技Logo">
        <div class="company-info">
          <div style="padding: 20px 20px 0 20px;">
          <div style="display: flex;align-items: center;">
            <h1>{{company.shortName}}</h1>
            <a :href="company.link" target="view_window"><i class="el-icon-link" style="font-size: 16px;color: #00b38a"/></a>
            <a class="identification" original-title="已完成资质认证，并完善了更优质的公司主页信息（以上信息由天眼查提供技术支持）">
              <i></i>
              <span>拉勾认证</span>
            </a>
          </div>
          <h2 class="company-word">{{company.slogan}}</h2>
          </div>
          <div class="company-data">
            <ul>
              <li>
                <strong>{{count}} 个</strong>
                <br>
                <span>在招职位</span>
              </li>
              <li>
                <strong>100%</strong>
                <br>
                <span>简历处理率</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="company-navs">
      <el-tabs v-model="activeName">
        <el-tab-pane label="公司主页" name="first">
          <detailsInfo :company="company"></detailsInfo>
        </el-tab-pane>
        <el-tab-pane label="招聘职位" name="second">
          <jobInfo :company="company" :citys="citys" :options="options"></jobInfo>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import  detailsInfo from './detailsInfo'
  import jobInfo from './jobInfo'
  import {mhApi} from './api'
  import {Msg} from '../../../tools/message';

  export default {
    name: 'companyDetails',
    data(){
      return {
        activeName: this.$route.query.activeName || 'first',
        company: {},
        count: 0,
        citys: [],
        options: []
      }
    },
    components:{
      detailsInfo,
      jobInfo
    },
    mounted(){
      this.getCompany()
    },
    methods: {
      getCompany(){
        const params = {
          id: this.$route.params.id
        }
        mhApi.getCompany(params).then(res => {
          if(res.data.code === 0){
            this.company = res.data.data
            this.count = res.data.count
            this.citys = res.data.citys
            this.options = res.data.kinds
          } else {
            Msg.error(res.data.msg)
          }
        })
      },
    },
  }
</script>

<style scoped lang="scss">
  .top-info{
    padding: 34px 0 44px;
    background: #f2f5f4;
    &-wrap{
      display: flex;
      width: 1024px;
      height: 164px;
      margin: 0 auto;
      border: 1px solid #eaeaea;
      background: #fff;
      img{
        width: 164px;
        height: 164px;
        border-right: 1px solid #eaeaea;
      }
      .company-info{
        width: 859px;
        h1{
          padding-right: 2px;
          margin: 0;
          line-height: 33px;
          font-size: 24px;
          color: #555;
        }
        .identification{
          padding: 2px 10px;
          margin-left: 10px;
          color: #fff;
          background: #00b38a;
          cursor: pointer;
          border: 1px solid #00b38a;
          border-radius: 20px;
          i {
            background-image: url(//www.lgstatic.com/lg-www-fed/company-c/modules/top-info/img/approve@2x_cf64f4b.png);
            background-size: 16px 18px;
            width: 16px;
            height: 18px;
            display: inline-block;
            vertical-align: middle;
            position: relative;
            top: -1px;
          }
        }
        .company-word{
          margin: 10px 0;
          font-size: 16px;
          color: #555;
        }
      }
      .company-data{
        height: 69px;
        background: #fafafa;
        overflow: hidden;
        ul{
          margin-left: -1px;
          padding: 8px 0;
          font-size: 0;
          list-style: none;
        }
        li{
          display: inline-block;
          width: 120px;
          border-left: 1px solid #ededed;
          text-align: center;
          strong {
            font-size: 18px;
            font-weight: 400;
            color: #555;
          }
          span{
            vertical-align: middle;
            line-height: 18px;
            display: inline-block;
            font-size: 12px;
            color: #b7b7b7;
            margin-top: 8px;
          }
        }
      }
    }
  }
  .company-navs{
    width: 1024px;
    margin: 0 auto;
    position: relative;
    top: -40px;
  }
</style>
