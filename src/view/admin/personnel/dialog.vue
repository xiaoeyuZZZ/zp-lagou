<template>
  <el-dialog class="dialog-form" :visible.sync="dialogFormVisible"
             width="40%" :title="dialogTitle">
    <div class="dialog-form-logo">
    </div>
    <el-form ref="resumeFrom" :model="resumeFrom" label-width="80px" :rules="rules">
      <el-form-item label="工号" prop="account">
        <el-input v-if="dialogTitle !== '修改'" size="large" v-model="resumeFrom.account" placeholder="请输入工号" clearable></el-input>
        <p v-else>{{resumeFrom.account}}</p>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input size="large" v-model="resumeFrom.name" placeholder="请输入姓名" clearable></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="resumeFrom.sex">
          <el-radio :label="'1'">男</el-radio>
          <el-radio :label="'2'">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="权限">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="resumeFrom.permission" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="item in options" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input size="large" v-model="resumeFrom.phone" placeholder="请输入手机号" clearable></el-input>
      </el-form-item>
      <el-form-item label="联系邮箱">
        <el-input size="large" v-model="resumeFrom.email" placeholder="请输入邮箱号" clearable></el-input>
      </el-form-item>
      <el-form-item label="职位">
        <el-input size="large" v-model="resumeFrom.position" placeholder="请输入职位" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="large" @click="submitAdd">提 交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  // import './index.scss'
  import db from '../../../store/user/db'
  import {adminApi} from './api'
  import {Msg} from '../../../tools/message'
  import {mapMutations} from 'vuex'
  const options = ['personnel','menu','resources','carousel','editorInfo','company','mhUser']
  export default {
    name: 'loginDialog',
    data(){
      return {
        checkAll: false,
        dialogFormVisible:false,
        options: [{
          value: 'personnel',
          label: '员工管理'
        },
          {
            value: 'menu',
            label: '导航栏管理'
          },
          {
            value: 'resources',
            label: '资源管理'
          },
          {
            value: 'carousel',
            label: '轮播图管理'
          },
          {
            value: 'editorInfo',
            label: '账号信息'
          },
          {
            value: 'company',
            label: '公司用户信息'
          },
          {
            value: 'mhUser',
            label: '门户用户信息'
          }],
        isIndeterminate: true,
        whichForm: '',
        dialogTitle: '',
        resumeFrom:{
          permission: ['menu','resources','carousel','editorInfo','company','mhUser'],
        },
        rules: {
          account: [
            {required: true, message: '请输入工号', trigger: 'change'},
            {min: 6, max: 12, message: '长度在6-12位', trigger: 'change'}
          ],
        },
      }
    },
    mounted(){
    },
    methods:{
      ...mapMutations([
        'SET_ROUTERS'
      ]),
      handleCheckAllChange(val) {
        this.resumeFrom.permission = val ? options : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.options.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
      },
      submitAdd(){
        this.$refs['resumeFrom'].validate((valid) => {
          if (valid) {
            adminApi.optionPersonnel(this.resumeFrom).then(res => {
              if(res.data.code === 0){
                this.$emit('getPersonnelList')
                if(this.resumeFrom._id === db.get('a_user')._id) {
                  this.dialogFormVisible = false
                  let a_user = db.get('a_user')
                  a_user.permission = this.resumeFrom.permission
                  db.set('a_user',a_user)
                  Msg.success(res.data.msg);
                  this.SET_ROUTERS
                } else {
                  this.dialogFormVisible = false
                  Msg.success(res.data.msg);
                }
              } else {
                Msg.error(res.data.msg);
                this.loading = false;
              }
            }).catch(err => {
              Msg.error('网络出错！')
              this.loading = false;
            })
          }
        })
      },
      openDialog(title,val){
        this.dialogTitle = title
        this.resumeFrom =val ? JSON.parse(JSON.stringify(val)) : {
          permission: ['menu','resources','carousel','editorInfo','company','mhUser'],
        }
        this.checkAll = this.resumeFrom.permission.length === this.options.length;
        this.isIndeterminate = this.resumeFrom.permission.length > 0 && this.resumeFrom.permission.length < this.options.length;
        this.whichForm = val || {}
        this.dialogFormVisible = true
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
