<template>
  <!-- 职位管理界面-->
  <div class="property-page">
    <!-- 职位表格 -->
    <el-table
      :data="data.menu" :header-cell-style="{backgroundColor: '#f2f2f2',color: '#333'}"
      style="width: 40%; margin-bottom: 20px;display: inline-block" :row-style="{fontSize: '14px', color: '#333333'}"
      stripe border
      align="center"
    >
      <el-table-column label="导航栏" align="center" width="150">
        <template slot-scope="scope">
          <span >{{scope.row}}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" width="170" align="center">
        <template slot-scope="scope">
          <span>{{data.menuLink[scope.$index]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="editorDialog(scope.$index)" icon="el-icon-edit">修改</el-button>
          <el-button type="text" style="color: #FD5F39" icon="el-icon-delete" @click="deleteData(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-card class="box-card">
      <div slot="header" class="clearfix" v-if="!isEditor">
        <span>添加导航栏</span>
        <el-button icon="el-icon-plus" style="float: right; padding: 3px 0" @click="addData" type="text">添加</el-button>
      </div>
      <div slot="header" class="clearfix" v-else>
        <span>修改导航栏</span>
        <el-button icon="el-icon-edit" style="float: right; padding: 3px 0" @click="editorData" type="text">修改</el-button>
      </div>
      <el-form :model="ruleForm" ref="ruleForm" label-width="70px">
        <el-form-item prop="menu" label="导航栏">
          <el-input v-model="ruleForm.menu" size="large"></el-input>
        </el-form-item>
        <el-form-item prop="menuLink" label="地址">
          <el-input v-model="ruleForm.menuLink" size="large"></el-input>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script>
  // import CompPagination from '../../../packages/components/pagination'
  // import Dialog from './dialog'
  import {adminApi} from './api'
  import {Msg} from '../../../tools/message'

  export default {
    data() {
      return {
        ruleForm: {
          menu: '',
          menuLink: ''
        },
        isEditor: false,
        index: -1,
        data:{},
      }
    },
    components: {
      // 'comp-pagination': CompPagination,
    },
    mounted(){
      this.getData()
    },
    methods: {
      getData () {
        adminApi.getData({}).then(res => {
          if (res.data.code === 0) {
            this.data = res.data.data
            Msg.success('获取数据成功！')
          } else {
            Msg.error(res.data.msg)
          }
        }).catch(err => {
          Msg.success('网络错误！')
        })
      },
      addData () {
        let menu = [...this.data.menu]
        menu.push(this.ruleForm.menu)
        let menuLink = [...this.data.menuLink]
        menuLink.push(this.ruleForm.menuLink)
        const params = {
          menu: menu,
          menuLink: menuLink
        }
        adminApi.updateData(params).then(res => {
          if (res.data.code === 0) {
            this.data = res.data.data
            this.ruleForm =  {
              menu: '',
              menuLink: ''
            },
            Msg.success('添加成功！')
          } else {
            Msg.error('添加失败！')
          }
        }).catch(err => {
          Msg.success('网络错误！')
        })
      },
      editorDialog(index){
        this.ruleForm.menu = this.data.menu[index]
        this.ruleForm.menuLink = this.data.menuLink[index]
        this.isEditor = true
        this.index = index
      },
      editorData () {
        let menu = [...this.data.menu]
        menu[this.index] = this.ruleForm.menu
        let menuLink = [...this.data.menuLink]
        menuLink[this.index] = this.ruleForm.menuLink
        const params = {
          menu: menu,
          menuLink: menuLink
        }
        adminApi.updateData(params).then(res => {
          if (res.data.code === 0) {
            this.data = res.data.data
            this.isEditor = false
            this.ruleForm =  {
              menu: '',
              menuLink: ''
            },
              Msg.success('添加成功！')
          } else {
            Msg.error('添加失败！')
          }
        }).catch(err => {
          Msg.success('网络错误！')
        })
      },
      deleteData(index){
        let menu = [...this.data.menu]
        menu.splice(index,1)
        let menuLink = [...this.data.menuLink]
        menuLink.splice(index,1)
        const params = {
          menu: menu,
          menuLink: menuLink
        }
        this.$confirm('此操作将永久删除该导航栏, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          adminApi.updateData(params).then(res => {
            if(res.data.code === 0){
              Msg.success('删除成功')
              this.data = res.data.data
            } else {
              Msg.error('删除失败')
            }
          }).catch(err => {
            Msg.error('删除失败')
          })
        }).catch(() => {
          Msg.info('删除取消')
        })
      },
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
  .box-card{
    display: inline-block;
    width: 40%;
    vertical-align: top;
    margin-left: 30px
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
