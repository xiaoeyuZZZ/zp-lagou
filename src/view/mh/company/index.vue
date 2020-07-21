<template>
  <div class="company-style">
    <div class="popular">
      <h3>热门企业</h3>
      <div class="popular-company">
        <el-carousel :interval="4000" type="card" height="300px">
          <el-carousel-item v-for="(item,index) in data.companyImg" :key="item">
            <a :href="carousel[index].link" target="view_window">
            <img :src="item" :title="carousel[index].name">
            </a>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="contain-header">
      <el-input class="search-input" size="large" v-model="search" placeholder="搜索公司">
      </el-input>
      <el-button type="primary" size="large" @click="getCompanyList(1)" style="height: 50px;border-radius: unset;width: 125px">搜 索</el-button>
    </div>
    <div class="company">
      <div class="company-search">
        <div class="workCity">
          <span class="title">公司地点：</span>
          <el-radio-group v-model="searchForm.city" @change="getCompanyList(1)">
            <el-radio-button v-for="item in data.workCity" :key="item" :label="item"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="workCity">
          <span class="title">公司规模：</span>
          <el-radio-group v-model="searchForm.scale"  @change="getCompanyList(1)">
            <el-radio-button v-for="item in data.scale" :key="item" :label="item"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="workCity">
          <span class="title">行业领域：</span>
          <el-radio-group v-model="searchForm.industry"  @change="getCompanyList(1)">
            <el-radio-button v-for="item in data.industry" :key="item" :label="item"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="company-list">
        <el-card shadow="hover" v-for="item in companyList" :key="item._id" :body-style="{ padding: '15px' }" class="company-item">
          <div class="top">
            <router-link :to="`mh-company/${item._id}`"><img :src="item.trademark" alt="公司logo" width="80" height="80"></router-link>
            <router-link :to="`mh-company/${item._id}`" style="text-decoration: none">
              <h3 style="margin-top: 13px;font-size: 16px;color: #555555;">{{item.shortName}}</h3></router-link>
            <h4 style="margin: 3px auto 0;color: #999;">{{item.industry}}/{{item.scale}}</h4>
            <h4 style="margin: 5px auto 0;color: #555;">{{item.slogan}}</h4>
          </div>
          <div class="bottom">
            <h4 style="margin: 3px auto 0;color: #999;">{{item.position_count || 20}}</h4>
            <router-link :to="`mh-company/${item._id}?activeName=second`" style="text-decoration: none">
              <el-button type="text">在招职位</el-button></router-link>
          </div>
        </el-card>
      </div>
      <comp-pagination style="margin: 30px 0"
                       @handleSizeChange="handleSizeChange"
                       @handleCurrentChange="handleCurrentChange"
                       :page='ruleFrom.page'
                       :pageSize='ruleFrom.pageSize'
                       :totalCount='ruleFrom.totalCount'
      >
      </comp-pagination>
    </div>
  </div>
</template>

<script>
  import './index.scss'
  import CompPagination from '../../../packages/components/pagination'
  import {mhApi} from './api'
  import {Msg} from '../../../tools/message'

  export default {
    name: 'index',
    data(){
      return {
        data: {},
        ruleFrom:{
          page: 1,
          pageSize: 20,
          totalCount: 0
        },
        searchForm: {
          city: '全国',
          scale: '不限',
          industry: '不限'
        },
        companyList: [],
        search: '',
        carousel: [
          {
            img:'https://docs.alibabagroup.com/assets2/images/cn/home/home_banner_1.png',
            link: 'https://www.alibabagroup.com/cn/global/home',
            name: '阿里巴巴'
          },
          {
            img:'https://uploadfiles.nowcoder.com/images/20200322/3985294_1584877267286_76699E75174C71FC910EF7A205E60838',
            link: 'https://join.qq.com/',
            name: '腾讯'
          },
          {
            img:'https://uploadfiles.nowcoder.com/images/20200317/339694163_1584419353703_BA73913F056F96F906F9898417A09533',
            link: 'https://app.mokahr.com/campus_apply/tusenweilai/3232#/?_k=hwxbf9/',
            name: '图森未来'
          },
          {
            img:'https://uploadfiles.nowcoder.com/images/20200313/90999146_1584072461794_43A13C5ABD00C626F14AA3662197FC67',
            link: 'https://app.mokahr.com/campus_apply/duxiaoman/1482?sourceToken=94740460403eb13b93f179a0e69a8587#/?_k=fxejx4',
            name: '度小满'
          },
          {
            img:'https://uploadfiles.nowcoder.com/images/20200220/339694163_1582170734902_C121B060FA057FB9EA1571F44930080C',
            link: 'https://campus.163.com/app/hy/lh/',
            name: '网易游戏雷火'
          },
        ],
      }
    },
    components: {
      'comp-pagination': CompPagination,
    },
    mounted(){
      this.getCompanyList()
      this.getData()
    },
    methods:{
      getData () {
        mhApi.getData({}).then(res => {
          if (res.data.code === 0) {
            this.data = res.data.data
          } else {
            Msg.error(res.data.msg)
          }
        }).catch(err => {
          Msg.error('网络错误！')
        })
      },
      handleSizeChange(val){
        this.ruleFrom.pageSize = val
        this.getCompanyList()
      },
      handleCurrentChange(val){
        this.ruleFrom.page = val
        this.getCompanyList()
      },
      getCompanyList(val){
        if(val === 1){
          this.ruleFrom.page = 1
        }
        let searchForm = JSON.parse(JSON.stringify(this.searchForm))
        for(let i in searchForm){
          if(this.searchForm[i] === '不限' || this.searchForm[i] === '全国'){
            searchForm[i] = ''
          }
        }
        const params = {
          company: this.search,
          ...searchForm,
          pageSize: this.ruleFrom.pageSize,
          page: this.ruleFrom.page
        }
        mhApi.getCompanyList(params).then(res => {
          if(res.data.code === 0){
            this.companyList = res.data.data
            this.ruleFrom.totalCount = res.data.totalCount
            Msg.success(`为你找 ${this.ruleFrom.totalCount} 家公司`)
          }
        }).catch(err => {
          Msg.error('网络错误！')
        })
      }
    },
  }
</script>

<style scoped lang="scss">
  .contain-header{
    width: 1120px;
    margin: auto;
    display: flex;
    padding: 50px 0 0px;
  }
  .popular{
    background-color: #00b38a;
    h3{
      font-size: 30px;
      color: #fff;
      text-shadow: 0 3px 9px rgba(0,0,0,.25);
      height: 42px;
      padding: 25px 0 20px;
      text-align: center;
    }
    &-company{
      width: 1120px;
      padding: 0 30px;
      margin: 0 auto;
      img{
        height: 300px;
        width: 560px;
      }
      .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
      }

      .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
      }

      .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
      }
    }
  }
  .company{
    width: 1120px;
    margin: auto;
    &-search{
      margin-top: 35px;
      padding: 8px 15px;
      background-color: #fafafa;
      border: 1px solid #ededed;
      .workCity{
        padding: 4px 0;
        color: #555;
        border-bottom: 1px dashed transparent;
      }
      .title{
        font-weight: 600;
        padding: 4px 0px 4px 8px;
      }
    }
    &-list{
      display: flex;
      width: 1136px;
      flex-wrap: wrap;
      .el-card {
        border-radius: unset;
      }
    }
    &-item{
      width: 266px;
      height: 266px;
      margin-top: 16px;
      margin-right: 16px;
        .top {
          margin: 0 13px;
          padding: 20px 0 14px;
          text-align: center;
          border-bottom: 1px dashed #E0E0E0;
          h4{
            max-width: 210px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            word-wrap: normal;
          }
      }
      .bottom{
        width: 90px;
        margin: auto;
        text-align: center;
        .el-button--small {
          padding: 0px 15px;
        }
      }
    }
  }

</style>
