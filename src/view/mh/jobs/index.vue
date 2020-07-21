<template>
  <div>
    <div class="search-wrapper">
      <div class="contain-header">
        <el-input class="search-input" size="large" v-model="search" placeholder="搜索职位、公司或地点">
        </el-input>
        <el-button type="primary" size="large" @click="getPositionList(1)" style="height: 50px;border-radius: unset;width: 125px">搜 索</el-button>
      </div>
    </div>
    <div class="contain-content">
      <div class="content-left">
        <div class="company-search">
          <div class="workCity">
            <span class="title">公司地点：</span>
            <el-radio-group v-model="searchForm.workCity" @change="getPositionList(1)">
              <el-radio-button v-for="item in data.workCity" :key="item" :label="item"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="workCity">
            <span class="title">公司规模：</span>
            <el-radio-group v-model="searchForm.scale" @change="getPositionList(1)">
              <el-radio-button v-for="item in data.scale" :key="item" :label="item"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="workCity">
            <span class="title">行业领域：</span>
            <el-radio-group v-model="searchForm.industry" @change="getPositionList(1)">
              <el-radio-button v-for="item in data.industry" :key="item" :label="item"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="workCity">
            <span class="title">工作经验：</span>
            <el-radio-group v-model="searchForm.workExp" @change="getPositionList(1)">
              <el-radio-button v-for="item in data.workExp" :key="item" :label="item"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="workCity">
            <span class="title">学历要求：</span>
            <el-radio-group v-model="searchForm.academic" @change="getPositionList(1)">
              <el-radio-button v-for="item in data.academic" :key="item" :label="item"></el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <ul class="job-list">
          <li v-for="item in positions" :key="item._id">
            <div class="item-top">
              <div class="position">
                <div class="p-top">
                  <router-link style="text-decoration: none" :to="`mh-job/${item._id}`">
                    <h3>{{item.position_name}} [{{item.address.split('-')[0].trim()}}]</h3></router-link>
                  <span class="format-time">{{item.pushAtTime.split(' ')[1]}}发布</span>
                </div>
                <div class="p-bottom">
                  <div class="exp">
                    <span class="money">{{item.salary}}</span>
                    <!--<i></i>-->{{item.workExp}} / {{item.academic}}
                  </div>
                </div>
              </div>
              <div class="company">
                <div class="company-name">
                  <router-link style="text-decoration: none" :to="`mh-company/${item.c_id}`"><a>{{item.shortName || item.company}}</a></router-link>
                  <i></i>
                </div>
                <div class="industry">{{item.industry}} / {{item.scale || '2000以上'}}</div>
              </div>
              <div class="com-logo">
                <router-link style="text-decoration: none" :to="`mh-company/${item.c_id}`">
                  <img :src="item.trademark" alt="公司logo" width="60" height="60"></router-link>
              </div>
            </div>
            <div class="item-bottom">
              <div class="b-tag">
                <el-tag effect="plain" style="margin-right: 8px" type="info" v-for="tag in item.tag" :key="tag">
                  {{tag}}
                </el-tag>
              </div>
              <div class="b-word">{{item.slogan || '15薪 职业发展 领导nice'}}</div>
            </div>
          </li>
        </ul>
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
        search: this.$route.query.search || '',
        ruleFrom:{
          page: 1,
          pageSize: 10,
          totalCount: 0
        },
        searchForm: {
          workCity: '全国',
          scale: '不限',
          industry: '不限',
          workExp: '不限',
          academic: '不限'
        },
        positions: [],
      }
    },
    components: {
      'comp-pagination': CompPagination,
    },
    mounted(){
      this.getPositionList()
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
      getPositionList(val){
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
          ...searchForm,
          kinds: this.$route.query.kinds || '',
          position_name: this.search,
          pageSize: this.ruleFrom.pageSize,
          page: this.ruleFrom.page
        }
        mhApi.getPositionList(params).then(res => {
          if(res.data.code === 0){
            this.positions = res.data.data
            this.ruleFrom.totalCount = res.data.totalCount
            Msg.success(`为你找 ${this.ruleFrom.totalCount} 职位`)
          } else {
            Msg.error(res.data.msg)
          }
        }).catch(err => {
          Msg.error('网络错误！')
        })
      },
      handleSizeChange(val){
        this.ruleFrom.pageSize = val
        this.getPositionList()
      },
      handleCurrentChange(val){
        this.ruleFrom.page = val
        this.getPositionList()
      },
    },
  }
</script>

<style scoped lang="scss">
  .contain-content{
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    padding-bottom: 100px;
    .content-left{
      width: 1200px;
      .company-search{
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
      .job-list{
        width: 960px;
        list-style: none;
        li{
          color: #555;
          border: 1px solid #ededed;
          margin-top: 18px;
          .item-top{
            display: flex;
            width: 928px;
            height: 68px;
            padding: 14px 15px 0;
            .position{
              width: 528px;
              margin-right: 20px;
              display: inline-block;
              .p-top{
                height: 34px;
                line-height: 34px;
                display: flex;
                h3{
                  margin-right: 5px;
                  font-size: 16px;
                  color: #00b38a;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  word-wrap: normal;
                }
                .format-time{
                  margin: 0 3px;
                  color: #999;
                }
              }
              .p-bottom{
                height: 24px;
                line-height: 24px;
                .exp{
                  font-size: 14px;
                  color: #555;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  word-wrap: normal;
                }
                .money{
                  margin-right: 1em;
                  font-size: 16px;
                  color: #fd5f39;
                }
              }
            }
            .company{
              width: 303px;
              margin-right: 15px;
              &-name{
                height: 34px;
                line-height: 34px;
                a {
                  display: inline-block;
                  max-width: 180px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  word-wrap: normal;
                  color: #00b38a;
                  font-size: 16px;
                  vertical-align: middle;
                }
                i {
                  display: inline-block;
                  width: 16px;
                  height: 18px;
                  background-image: url(//www.lgstatic.com/lg-www-fed/search-result/modules/positions/img/approve@2x_16f87e8.png);
                  background-size: 16px 18px;
                  vertical-align: middle;
                  cursor: pointer;
                }
              }
              .industry{
                height: 24px;
                line-height: 24px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-wrap: normal;
              }
            }
            .com-logo{
              width: 62px;
              img{
                border: 1px solid #f5f5f5;
              }
            }
          }
          .item-bottom{
            display: flex;
            height: 40px;
            padding: 0 15px;
            background-color: #fafafa;
            .b-tag{
              width: 528px;
              height: 40px;
              margin-right: 20px;
              line-height: 40px;
              overflow: hidden;
            }
            .b-word{
              width: 380px;
              height: 40px;
              line-height: 40px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              word-wrap: normal;
            }
          }
        }
      }
    }
  }
</style>
