<template>
  <!-- 职位管理界面-->
  <div class="property-page">
    <!-- 职位表格 -->
    <el-form :model="data" ref="ruleForm" label-width="100px">
      <el-form-item prop="menu" label="城市：">
        <el-tag style="margin-right: 5px;margin-top: 5px" size="large" v-for="(item,index) in data.workCity"
                closable @close="handleCloseCity(1,index)"
                :key="item">{{item}}</el-tag>
        <el-input
          class="input-new-tag"
          v-model="workCity"
          @keyup.enter.native="handleInputConfirm(1,workCity)"
          @blur="handleInputConfirm(1,workCity)"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="menu" label="公司规模：">
        <el-tag style="margin-right: 5px;margin-top: 5px" size="large" v-for="(item,index) in data.scale"
                closable @close="handleCloseCity(2,index)"
                :key="item">{{item}}</el-tag>
        <el-input
          class="input-new-tag"
          v-model="scale"
          @keyup.enter.native="handleInputConfirm(2,scale)"
          @blur="handleInputConfirm(2,scale)"
        ></el-input>
      </el-form-item>
      <el-form-item prop="menu" label="行业领域：">
        <el-tag style="margin-right: 5px;margin-top: 5px" size="large" v-for="(item,index) in data.industry"
                closable @close="handleCloseCity(3,index)"
                :key="item">{{item}}</el-tag>
        <el-input
          class="input-new-tag"
          v-model="industry"
          @keyup.enter.native="handleInputConfirm(3,industry)"
          @blur="handleInputConfirm(3,industry)"
        ></el-input>
      </el-form-item>
      <el-form-item prop="menu" label="工作经验：">
        <el-tag style="margin-right: 5px;margin-top: 5px" size="large" v-for="(item,index) in data.workExp"
                closable @close="handleCloseCity(4,index)"
                :key="item">{{item}}</el-tag>
        <el-input
          class="input-new-tag"
          v-model="workExp"
          @keyup.enter.native="handleInputConfirm(4,workExp)"
          @blur="handleInputConfirm(4,workExp)"
        ></el-input>
      </el-form-item>
      <el-form-item prop="menu" label="学历：">
        <el-tag style="margin-right: 5px;margin-top: 5px" size="large" v-for="(item,index) in data.academic"
                closable @close="handleCloseCity(5,index)"
                :key="item">{{item}}</el-tag>
        <el-input
          class="input-new-tag"
          v-model="academic"
          @keyup.enter.native="handleInputConfirm(5,academic)"
          @blur="handleInputConfirm(5,academic)"
        ></el-input>
      </el-form-item>
      <el-form-item prop="menu" label="工作类型：">
        <el-tag style="margin-right: 5px;margin-top: 5px" size="large" v-for="(item,index) in data.kinds"
                closable @close="handleCloseCity(6,index)"
                :key="item">{{item}}</el-tag>
        <el-input
          class="input-new-tag"
          v-model="kinds"
          @keyup.enter.native="handleInputConfirm(6,kinds)"
          @blur="handleInputConfirm(6,kinds)"
        ></el-input>
      </el-form-item>
    </el-form>
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
        data:{},
        workCity: '',
        scale: '',
        industry: '',
        workExp: '',
        academic: '',
        kinds: ''
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
      handleInputConfirm(type, val){
        let params = {}
        if (type === 1) {
          let city = [...this.data.workCity]
          city.push(val)
          params = {
            workCity: city
          }
        } else if (type === 2) {
          let scale = [...this.data.scale]
          scale.push(val)
          params = {
            scale: scale
          }
        } else if (type === 3) {
          let industry = [...this.data.industry]
          industry.push(val)
          params = {
            industry: industry
          }
        } else if (type === 4) {
          let workExp = [...this.data.workExp]
          workExp.push(val)
          params = {
            workExp: workExp
          }
        } else if (type === 5) {
          let academic = [...this.data.academic]
          academic.push(val)
          params = {
            academic: academic
          }
        } else if (type === 6) {
          let kinds = [...this.data.kinds]
          kinds.push(val)
          params = {
            kinds: kinds
          }
        }
        adminApi.updateData(params).then(res => {
          if (res.data.code === 0) {
            this.workCity = ''
            this.scale = ''
            this.industry = ''
            this.workExp = ''
            this.academic = ''
            this.kinds = ''
            this.data = res.data.data
            Msg.success('添加成功！')
          } else {
            Msg.error('添加失败！')
          }
        }).catch(err => {
          Msg.success('网络错误！')
        })
      },
      handleCloseCity (type, index) {
        let params = {}
        if (type === 1) {
          let city = [...this.data.workCity]
          city.splice(index, 1)
          params = {
            workCity: city
          }
        } else if (type === 2) {
          let scale = [...this.data.scale]
          scale.splice(index, 1)
          params = {
            scale: scale
          }
        } else if (type === 3) {
          let industry = [...this.data.industry]
          industry.splice(index, 1)
          params = {
            industry: industry
          }
        } else if (type === 4) {
          let workExp = [...this.data.workExp]
          workExp.splice(index, 1)
          params = {
            workExp: workExp
          }
        } else if (type === 5) {
          let academic = [...this.data.academic]
          academic.splice(index, 1)
          params = {
            academic: academic
          }
        } else if (type === 6) {
          let kinds = [...this.data.kinds]
          kinds.splice(index, 1)
          params = {
            kinds: kinds
          }
        }
        adminApi.updateData(params).then(res => {
          if (res.data.code === 0) {
            this.data = res.data.data
            Msg.success('删除成功！')
          } else {
            Msg.error('删除失败！')
          }
        }).catch(err => {
          Msg.success('网络错误！')
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
  .input-new-tag {
    width: 90px;
    vertical-align: bottom;
  }

  /*.iconwulumuqishigongandashujuguanlipingtai-ico- {*/
  /*cursor: pointer;*/
  /*color: #3246a7;*/
  /*}*/
</style>
