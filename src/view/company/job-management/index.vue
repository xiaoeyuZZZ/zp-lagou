<template>
    <!-- 职位管理界面-->
    <div class="property-page">
        <!-- 职位表格 -->
      <el-input style="width: 30%;margin-bottom: 30px" @keyup.enter.native="getPositionList(1)"
                @blur="getPositionList" placeholder="请输入职位名称" clearable="" v-model="position_name" size="large"></el-input>
      <el-select v-model="isPush" size="large" @change="getPositionList(1)" placeholder="请选择状态" clearable>
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
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
        <el-table-column prop="position_name" label="职位名称" width="200" align="center"></el-table-column>
        <el-table-column prop="totalCount" label="招聘数量"  width="140" align="center"></el-table-column>
        <el-table-column label="工资待遇" align="center" width="140">
          <template slot-scope="scope">
            <span style="color: #FD5F39">{{ scope.row.salary }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pushAtTime" label="发布时间" width="170" align="center"></el-table-column>
        <el-table-column prop="type" label="工作类型" width="130" align="center"></el-table-column>
        <el-table-column label="状态" align="center" width="120">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.isPush === '0'">未发布</el-tag>
            <el-tag v-if="scope.row.isPush === '1'">已发布</el-tag>
            <el-tag type="info" v-if="scope.row.isPush === '2'">已过期</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <router-link style="text-decoration: none"
                         :to="'editorPosition/'+scope.row._id">
              <el-button type="text" icon="el-icon-edit">修改</el-button></router-link>
            <router-link style="text-decoration: none" :to="`seeker-management/${scope.row._id}?position=${scope.row.position_name}`">
              <el-button type="text" icon="el-icon-zoom-in">查看</el-button></router-link>
            <el-button type="text" style="color: #FD5F39" icon="el-icon-delete" @click="deletePosition(scope.row._id,scope.$index)">删除</el-button>
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
    </div>
</template>

<script>
    import CompPagination from '../../../packages/components/pagination'
    import {companyApi} from './api'
    import {Msg} from '../../../tools/message'

    export default {
        data() {
            return {
              ruleFrom:{
                page: 1,
                pageSize: 10,
                totalCount: 0
              },
              position_name:'',
              isPush:'',
              tableData:[],
              options: [
                {
                  value: '0',
                  label: '未发布'
                },
                {
                  value: '1',
                  label: '已发布'
                },
                {
                  value: '2',
                  label: '已过期'
                }
              ]
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
            let url=`http://localhost:3000/data/exportPosition`
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
              position_name: this.position_name,
              isPush: this.isPush,
              pageSize: this.ruleFrom.pageSize,
              page: this.ruleFrom.page
            }
            companyApi.getPositionList(params).then(res => {
              if(res.data.code === 0){
                this.ruleFrom.totalCount = res.data.totalCount
                this.tableData = res.data.data
                Msg.success(res.data.msg)
              } else {
                Msg.error(res.data.msg)
              }
            })
          },
          deletePosition(val,index){
            const params = {
              id: val
            }
            this.$confirm('此操作将永久删除该职位, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              companyApi.deleteCompanyPosition(params).then(res => {
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
