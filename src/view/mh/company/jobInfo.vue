<template>
  <div style="margin-top: 25px" class="details">
    <div class="container-left">
      <div style="margin-bottom: 20px">
        <el-select clearable v-model="workCity" @change="getCompanyPosition(1)" placeholder="城市">
          <el-option
            v-for="item in citys"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-select clearable v-model="kinds" @change="getCompanyPosition(1)" placeholder="技术" style="margin-left: 20px">
          <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="job-item" v-for="item in positions" :key="item._id">
        <span class="top_icon direct_recruitment" style="display: inline;"></span>
        <div class="job-item-title">
          <router-link class="link" :to="`/mh-job/${item._id}`" style="textDecoration:none">{{item.position_name}}</router-link>
          <span>{{item.salary}}</span>
        </div>
        <p class="job-item-desc">
          <span>{{item.workExp}} / {{item.academic}} / {{item.type}}</span>
          <span style="float: right">{{item.pushAtTime.split(' ')[1]}} 发布</span>
        </p>
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
    <div class="container-right">
      <div class="item_container">
        <div class="item-title">{{company.shortName}}基本信息</div>
        <div class="item_content">
          <ul>
            <li>
              <i class="el-icon-menu"></i>
              <span>{{company.industry}}</span>
            </li>
            <li style="margin-top: 30px;">
              <i class="el-icon-user-solid"></i>
              <span>{{company.scale}}</span>
            </li>
            <li style="margin-top: 30px;">
              <i class="el-icon-location"></i>
              <span>{{company.city}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CompPagination from '../../../packages/components/pagination'
  import {mhApi} from './api'
  import './index.scss'
  export default {
    name: 'jobInfo',
    data(){
      return {
        // options: [{value:'技术'},{value:'产品'},{value:'设计'},{value:'运营'},{value:'市场'},{value:'销售'},{value:'职能'},{value:'其他'}],
        workCity: '',
        kinds: '',
        positions: [],
        ruleFrom:{
          page: 1,
          pageSize: 10,
          totalCount: 0
        },
      }
    },
    components: {
      'comp-pagination': CompPagination,
    },
    props: {
      company: {
        type: Object,
        default: () => {
          return {}
        }
      },
      citys: {
        type: Array,
        default: () => {
          return []
        }
      },
      options: {
        type: Array,
        default: () => {
          return []
        }
      },
    },
    mounted(){
      this.getCompanyPosition()
    },
    methods: {
      handleSizeChange(val){
        this.ruleFrom.pageSize = val
        this.getCompanyPosition()
      },
      handleCurrentChange(val){
        this.ruleFrom.page = val
        this.getCompanyPosition()
      },
      getCompanyPosition(val){
        if(val === 1){
          this.ruleFrom.page = 1
        }
        const params = {
          c_id: this.$route.params.id,
          workCity: this.workCity,
          kinds: this.kinds,
          pageSize: this.ruleFrom.pageSize,
          page: this.ruleFrom.page
        }
        mhApi.getCompanyPosition(params).then(res => {
          if(res.data.code === 0){
            this.positions = res.data.data
            this.ruleFrom.totalCount = res.data.totalCount
          }
        })
      }
    },
  }
</script>

<style scoped lang="scss">
  .job-item:hover{
    background-color: #fafafa;
  }
  .job-item{
    position: relative;
    height: 50px;
    padding: 15px 16px;
    margin-bottom: 20px;
    border: 1px solid #ededed;
    font-size: 14px;
    .top_icon {
      position: absolute;
      top: 0;
      left: 0;
      width: 40px;
      height: 40px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 40px 40px;
    }
    .direct_recruitment {
      background-image: url(//www.lgstatic.com/lg-www-fed/company-c/modules/positions/img/direct-recruitment@2x_3004c8d.png);
    }
    &-title{
      margin-bottom: 7px;
      display: flex;
      justify-content: space-between;
      span{
        font-size: 16px;
        color: #FD5F39;
        font-weight: 700;
      }
      .link{
        font-size: 16px;
        color: #333;
        font-weight: 700;
      }
    }
    &-desc{
      color: #999;
      font-size: 14px;
    }
  }
</style>
