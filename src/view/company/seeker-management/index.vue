<template>
    <!-- 职位管理界面-->
    <div class="property-page">
        <!-- 职位表格 -->
      <el-input style="width: 30%;margin-bottom: 20px" @keyup.enter.native="getSeekerList(1)"
                @blur="getSeekerList" placeholder="请输入求职者姓名" clearable="" v-model="name" size="large"></el-input>
      <el-select v-model="status" size="large" @change="getSeekerList(1)" placeholder="请选择状态" clearable>
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" icon="icon iconfont icon-daochu2" @click="exportExcel" style="float: right">导出表格</el-button>
      <p style="margin-bottom: 5px;font-size: 16px">招聘职位：{{position}}</p>
      <el-table
        :data="tableData" :header-cell-style="{backgroundColor: '#f2f2f2',color: '#333'}"
        style="width: 100%; margin-bottom: 20px;" :row-style="{fontSize: '14px', color: '#333333'}"
        stripe border
        align="center"
      >
        <!--<el-table-column-->
          <!--type="selection"-->
          <!--width="39">-->
        <!--</el-table-column>-->
        <el-table-column label="编号" align="center" width="50">
          <template slot-scope="scope">
            <span >{{(scope.$index + 1) + (ruleFrom.page - 1) * ruleFrom.pageSize}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="90" align="center"></el-table-column>
        <el-table-column prop="phone" label="联系方式"  width="120" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱"  width="180" align="center"></el-table-column>
        <el-table-column prop="school" label="学校" align="center" width="150"></el-table-column>
        <el-table-column prop="academic" label="学历" align="center" width="120"></el-table-column>
        <el-table-column prop="deliveryTime" label="投递时间" width="150" align="center"></el-table-column>
        <el-table-column label="状态" align="center" width="100">
          <template slot-scope="scope">
            <el-tag type="warning" v-if="scope.row.status === 0">未查看</el-tag>
            <el-tag v-if="scope.row.status === 1">已查看</el-tag>
            <el-tag v-if="scope.row.status === 2">待面试</el-tag>
            <el-tag v-if="scope.row.status === 3">面试中</el-tag>
            <el-tag v-if="scope.row.status === 4">通过</el-tag>
            <el-tag type="danger" v-if="scope.row.status === 5">不合适</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-popover
              placement="top"
              width="160"
              v-model="scope.row.visible">
              <div style="text-align: right; margin: 0">
                <el-select v-model="scope.row.status" size="large"
                           @change="deitorSeekerStatus(scope.row._id,scope.row.status,scope.$index)"placeholder="请选择状态">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <el-button type="text" slot="reference" icon="el-icon-edit">修改</el-button>
            </el-popover>
            <router-link style="text-decoration: none" :to="`/company/seeker/${scope.row.m_id}?status=${scope.row.status}&_id=${scope.row._id}`">
              <el-button type="text" icon="el-icon-zoom-in">查看</el-button></router-link>
            <el-button type="text" style="color: #FD5F39" icon="el-icon-delete" @click="deleteSeeker(scope.row._id,scope.$index)">删除</el-button>
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
              visible: false,
              ruleFrom:{
                page: 1,
                pageSize: 10,
                totalCount: 0
              },
              position: this.$route.query.position,
              name:'',
              status:'',
              tableData:[],
              options: [
                {
                  value: 0,
                  label: '未查看'
                },
                {
                  value: 1,
                  label: '已查看'
                },
                {
                  value: 2,
                  label: '待面试'
                },
                {
                  value: 3,
                  label: '面试中'
                },
                {
                  value: 4,
                  label: '通过'
                },
                {
                  value: 5,
                  label: '不合适'
                },
              ]
            };
        },
        components: {
          'comp-pagination': CompPagination,
        },
        mounted(){
          this.getSeekerList()
        },
        methods: {
          deitorSeekerStatus(id,val,index){
            const params = {
              id: id,
              status: val
            }
            companyApi.editorSeekerStatus(params).then(res => {
              if (res.data.code === 0){
                this.tableData[index].status = val
                this.tableData[index].visible = false
                Msg.success(res.data.msg)
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
          getSeekerList(val){
            if(val === 1){
              this.ruleFrom.page = 1
            }
            const params = {
              p_id: this.$route.params.id,
              status: this.status,
              name: this.name,
              pageSize: this.ruleFrom.pageSize,
              page: this.ruleFrom.page
            }
            companyApi.getSeekerList(params).then(res => {
              if(res.data.code === 0){
                this.ruleFrom.totalCount = res.data.totalCount
                this.tableData = res.data.data
               this.tableData.map(e => {
                  e.visible = false
                })
                Msg.success(res.data.msg)
              } else {
                Msg.error(res.data.msg)
              }
            })
          },
          exportExcel(){
            const params = {
              p_id: this.$route.params.id,
              p_name: this.position
            }
            let url=`http://localhost:3000/data/exportSeeker?p_id=${params.p_id}&p_name=${params.p_name}`
            window.open(url)
          },
          deleteSeeker(val,index){
            const params = {
              id: val
            }
            this.$confirm('此操作将永久删除该求职者, 是否继续?', '提示', {
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
