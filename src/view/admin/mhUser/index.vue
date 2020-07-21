<template>
  <!-- 职位管理界面-->
  <div class="property-page">
    <!-- 职位表格 -->
    <el-input style="width: 30%;margin-bottom: 30px" @keyup.enter.native="getPositionList(1)"
              @blur="getPositionList(1)" placeholder="请输入昵称" clearable="" v-model="nickName" size="large"></el-input>
    <el-button type="primary" icon="icon iconfont icon-daochu2" @click="exportExcel" style="float: right">导出表格</el-button>
    <el-table
      :data="tableData" :header-cell-style="{backgroundColor: '#f2f2f2',color: '#333'}"
      style="width: 100%; margin-bottom: 20px;" :row-style="{fontSize: '14px', color: '#333333'}"
      stripe border
      align="center"
    >
      <el-table-column label="编号" align="center" width="50">
        <template slot-scope="scope">
          <span >{{(scope.$index + 1) + (ruleFrom.page - 1) * ruleFrom.pageSize}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="昵称" width="100" align="center"></el-table-column>
      <el-table-column prop="basicInfo.name" label="姓名"  width="100" align="center"></el-table-column>
      <el-table-column label="学校" prop="basicInfo.school" align="center" width="170"></el-table-column>
      <el-table-column prop="basicInfo.education" label="学历" width="130" align="center"></el-table-column>
      <el-table-column prop="basicInfo.phone" label="手机" width="130" align="center"></el-table-column>
      <el-table-column label="邮箱" align="center" width="180" prop="basicInfo.email"></el-table-column>
      <el-table-column label="所在城市" align="center" width="120" prop="basicInfo.city"></el-table-column>
      <el-table-column label="工作经验" align="center" prop="basicInfo.isGraduates">
      </el-table-column>
    </el-table>
    <comp-pagination style="margin: 30px 0"
                     @handleSizeChange="handleSizeChange"
                     @handleCurrentChange="handleCurrentChange"
                     :page='ruleFrom.page'
                     :pageSize='ruleFrom.pageSize'
                     :totalCount='ruleFrom.totalCount'
    >
    </comp-pagination>
    <el-dialog class="dialog-form" :visible.sync="dialogFormVisible"
               width="60%" title="公司简介">
      <div v-html="introduce">
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import CompPagination from '../../../packages/components/pagination'
  import {adminApi} from './api'
  import {Msg} from '../../../tools/message'

  export default {
    data() {
      return {
        dialogFormVisible: false,
        ruleFrom:{
          page: 1,
          pageSize: 10,
          totalCount: 0
        },
        nickName:'',
        tableData:[],
        introduce: ''
      };
    },
    components: {
      'comp-pagination': CompPagination,
    },
    mounted(){
      this.getPositionList()
    },
    methods: {
      exportExcel(){
        let url=`http://localhost:3000/data/exportMhUser`
        window.open(url)
      },
      handleSizeChange(val){
        this.ruleFrom.pageSize = val
        this.getPositionList()
      },
      handleCurrentChange(val){
        this.ruleFrom.page = val
        this.getPositionList()
      },
      getPositionList(val){
        if(val === 1){
          this.ruleFrom.page = 1
        }
        const params = {
          nickName: this.nickName,
          pageSize: this.ruleFrom.pageSize,
          page: this.ruleFrom.page
        }
        adminApi.getmhUserList(params).then(res => {
          if(res.data.code === 0){
            this.ruleFrom.totalCount = res.data.totalCount
            this.tableData = res.data.data
            Msg.success(res.data.msg)
          } else {
            Msg.error(res.data.msg)
          }
        })
      },
      checkIntroduce(val){
        this.introduce = val
        this.dialogFormVisible = true
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

  /*.iconwulumuqishigongandashujuguanlipingtai-ico- {*/
  /*cursor: pointer;*/
  /*color: #3246a7;*/
  /*}*/
</style>
