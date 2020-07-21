<template>
  <!-- 职位管理界面-->
  <div class="property-page">
    <!-- 职位表格 -->
    <div>
    <el-input style="width: 30%;margin-bottom: 30px" @keyup.enter.native="getPersonnelList(1)"
              @blur="getPersonnelList(1)" placeholder="请输名字" clearable="" v-model="account" size="large"></el-input>
    <el-input style="width: 30%;margin-bottom: 30px" @keyup.enter.native="getPersonnelList(1)"
              @blur="getPersonnelList(1)" placeholder="请输入工号" clearable="" v-model="name" size="large"></el-input>
    <el-button style="float: right" type="primary" @click="openDialog('添加员工')" icon="el-icon-circle-plus-outline" size="large">添 加</el-button>
    </div>
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
      <el-table-column prop="account" label="工号" width="170" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名"  width="100" align="center"></el-table-column>
      <el-table-column label="性别" width="50" align="center">
        <template slot-scope="scope">
        <span v-if="scope.row.sex === '1'">男</span>
        <span v-if="scope.row.sex === '2'">女</span>
        </template>
      </el-table-column>
      <el-table-column label="职位" prop="position" align="center" width="140"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="150" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机号" align="center" width="150"></el-table-column>
      <el-table-column prop="password" label="密码" width="160" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
            <el-button type="text" @click="openDialog('修改',tableData[scope.$index])" icon="el-icon-edit">修改</el-button>
          <el-button type="text" style="color: #FD5F39" icon="el-icon-delete" @click="deletePersonnel(scope.row._id,scope.$index)">删除</el-button>
        </template>
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
    <Dialog ref="dialog" @getPersonnelList="getPersonnelList"></Dialog>
  </div>
</template>

<script>
  import CompPagination from '../../../packages/components/pagination'
  import Dialog from './dialog'
  import {adminApi} from './api'
  import {Msg} from '../../../tools/message'

  export default {
    data() {
      return {
        ruleFrom:{
          page: 1,
          pageSize: 10,
          totalCount: 0
        },
        account:'',
        name:'',
        tableData:[],
      };
    },
    components: {
      Dialog,
      'comp-pagination': CompPagination,
    },
    mounted(){
      this.getPersonnelList()
    },
    methods: {
      openDialog(title,val){
        this.$refs.dialog.openDialog(title,val)
      },
      handleSizeChange(val){
        this.ruleFrom.pageSize = val
        this.getPersonnelList()
      },
      handleCurrentChange(val){
        this.ruleFrom.page = val
        this.getPersonnelList()
      },
      getPersonnelList(val){
        if(val === 1){
          this.ruleFrom.page = 1
        }
        const params = {
          account: this.account,
          name: this.name,
          pageSize: this.ruleFrom.pageSize,
          page: this.ruleFrom.page
        }
        adminApi.getPersonnelList(params).then(res => {
          if(res.data.code === 0){
            this.ruleFrom.totalCount = res.data.totalCount
            this.tableData = res.data.data
            Msg.success(res.data.msg)
          } else {
            Msg.error(res.data.msg)
          }
        })
      },
      deletePersonnel(val,index){
        const params = {
          _id: val
        }
        this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          adminApi.deletePersonnel(params).then(res => {
            if(res.data.code === 0){
              Msg.success('删除成功')
              this.ruleFrom.totalCount--
              this.tableData.splice(index, 1)
            } else {
              Msg.error('删除失败')
            }
          }).catch(err => {
            Msg.error('删除失败')
          })
        }).catch(() => {
          Msg.info('删除取消')
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
