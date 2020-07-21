<template>
  <div class="delivery">
    <div class="deliveryBox-title">
      <h1 style="font-size: 24px;color: #555;">已经投递简历状态</h1>
      <div class="logo"></div>
    </div>
    <div class="deliveryBox-table">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="投递成功" :name="'0'"></el-tab-pane>
        <el-tab-pane label="已被查看" :name="'1'"></el-tab-pane>
        <el-tab-pane label="暂待面试" :name="'2'"></el-tab-pane>
        <el-tab-pane label="已面试完" :name="'3'"></el-tab-pane>
        <el-tab-pane label="已发offer" :name="'4'"></el-tab-pane>
        <el-tab-pane label="不合适" :name="'5'"></el-tab-pane>
      </el-tabs>
      <div class="table-item" v-for="item in seekerList" :key="item._id">
        <div class="table-item-job">
          <router-link style="text-decoration: none;color: #0d9572;"
                       :to="`mh-job/${item.p_id}`"><span>{{item.position_name}}</span></router-link>
          <i v-if="item.status === 5" class="el-icon-error" style="font-size: 20px;color: #FD5F39"></i>
          <i v-else class="el-icon-success" style="font-size: 20px"></i>
        </div>
        <div class="table-item-company">
          <router-link style="text-decoration: none;color: #555;"
                       :to="`mh-company/${item.c_id}`"><span>{{item.company}}</span></router-link>
          <span style="color: #999;margin-left: 10px"> [{{item.workCity}}]</span></div>
        <div class="table-item-resume">
          <span>使用简历：<span style="color: #555">在线简历<span v-if="item.isFile === '1'">+附件简历</span></span></span>
          <span>{{item.deliveryTime}}
            <span style="color: #0d9572;" v-if="item.status === 0"> 投递成功</span>
            <span style="color: #0d9572;" v-if="item.status === 1"> 已被查看</span>
            <span style="color: #0d9572;" v-if="item.status === 2"> 暂待面试</span>
            <span style="color: #0d9572;" v-if="item.status === 3"> 已面试完</span>
            <span style="color: #0d9572;" v-if="item.status === 4"> 已发offer</span>
            <span style="color: #FD5F39" v-if="item.status === 5"> 不合适</span>
          </span>
        </div>
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
  import {mhApi} from './api'
  import CompPagination from '../../../packages/components/pagination'
  import {Msg} from '../../../tools/message'
  export default {
    name: 'index',
    data(){
      return {
        activeName: 0,
        ruleFrom:{
          page: 1,
          pageSize: 10,
          totalCount: 0
        },
        seekerList: []
      }
    },
    components: {
      'comp-pagination': CompPagination,
    },
    mounted(){
      this.getSeekerList()
    },
    methods:{
      handleClick(){
        this.ruleFrom.page = 1
        this.getSeekerList()
      },
      getSeekerList(){
        const params = {
          pageSize: this.ruleFrom.pageSize,
          page: this.ruleFrom.page,
          status: parseInt(this.activeName)
        }
        mhApi.getSeekerList(params).then(res => {
          if(res.data.code === 0){
            this.seekerList = res.data.data
            this.ruleFrom.totalCount = res.data.totalCount
            // Msg.success(`为你找 ${this.ruleFrom.totalCount} 职位`)
          } else {
            Msg.error(res.data.msg)
          }
        }).catch(err => {
          Msg.error('网络错误！')
        })
      },
      handleSizeChange(val){
        this.ruleFrom.pageSize = val
        this.getSeekerList()
      },
      handleCurrentChange(val){
        this.ruleFrom.page = val
        this.getSeekerList()
      },
    },
  }
</script>

<style scoped lang="scss">
  .delivery{
    width: 1024px;
    margin: 35px auto 0;
  }
  .deliveryBox{
    &-title{
      display: flex;
      justify-content: space-between;
      background: #f3f3f3;
      height: 50px;
      border-bottom: 1px solid #d4d3d3;
      padding: 10px 20px 0 20px;
      .logo {
        float: left;
        width: 43px;
        height: 40px;
        background-image: url(//www.lgstatic.com/lg-www-fed/common/widgets/header_c/modules/topbar/img/sprite_361857f.png);
        background-repeat: no-repeat;
        background-position: -10px -1px;
        background-size: 64px 128px;
      }
    }
    &-table{
      background: #fafafa;
      padding: 20px;
      .table-item{
        background-color: #ffffff;
        margin: 20px 0px;
        border-left: 3px solid #91cebe;
        padding: 3px 12px;
        &-job{
          padding: 5px 0;
          font-size: 18px;
          color: #0d9572;
          display: flex;
          justify-content: space-between;
        }
        &-company{
          margin: 6px 0;
          font-size: 16px;
          color: #555;
        }
        &-resume{
          margin: 6px 0;
          font-size: 14px;
          color: #999;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }

</style>
