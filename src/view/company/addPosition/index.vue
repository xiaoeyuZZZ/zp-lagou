<template>
  <!-- 职位管理界面-->
  <div class="property-page">
    <!-- 职位表格 -->
    <div style="margin-bottom: 30px">
      <el-form v-loading="loading" class="register-form" ref="positionForm" :model="positionForm" label-width="110px">
        <el-form-item style="display: block" v-if="id">
          <el-button type="primary" size="large" @click="$router.back()">返 回</el-button>
        </el-form-item>
        <el-form-item style="width: 48%" size="large" label="职位名称"  prop="position_name" :rules="{ required: true, message: '职位名称不能为空', trigger: 'blur'}">
          <el-input v-model="positionForm.position_name" size="larger" placeholder="请输入职位名称"></el-input>
        </el-form-item>
        <el-form-item  size="large" label="所在城市" prop="workCity" :rules="{ required: true, message: '所在城市不能为空', trigger: 'blur'}">
          <el-autocomplete class="inline-input" v-model="positionForm.workCity"
                           :fetch-suggestions="querySearch" placeholder="请输入所在城市" :trigger-on-focus="false"></el-autocomplete>
        </el-form-item>
        <el-form-item style="width: 48%" size="large" label="具体地址" prop="address"
                      :rules="{ required: true, message: '具体地址不能为空',trigger: 'blur'}">
          <el-input v-model="positionForm.address" size="larger" placeholder="请输入具体地址"></el-input>
        </el-form-item>
        <el-form-item  size="large" label="工作经验" prop="workExp" :rules="{ required: true, message: '请选择工作经验', trigger: 'blur'}">
          <el-select v-model="positionForm.workExp" placeholder="请选择工作经验">
            <el-option v-for="item in workExp" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 48%" size="large" label="薪水"  prop="salary" :rules="{ required: true, message: '薪水不能为空', trigger: 'blur'}">
          <el-input v-model="positionForm.salary" size="larger" placeholder="请输入薪水范围"></el-input>
        </el-form-item>
        <el-form-item  size="large" label="学历要求" prop="academic" :rules="{ required: true, message: '请选择学历要求', trigger: 'blur' }">
          <el-select v-model="positionForm.academic" placeholder="请选择学历要求">
            <el-option v-for="item in academic" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 48%"  size="large" label="技术栈" prop="tag">
          <el-tag
            :key="tag" size="large"
            v-for="tag in positionForm.tag"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input style="width: 94px"
            class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button  v-else class="button-new-tag" size="small" @click="showInput">+ New 技术</el-button>
        </el-form-item>
        <el-form-item  size="large" label="工作类型" prop="type" :rules="{ required: true, message: '请选择工作类型', trigger: 'blur' }">
          <el-select v-model="positionForm.type" placeholder="请选择工作类型">
            <el-option v-for="item in type" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 48%" size="large" label="招聘人数"  prop="totalCount" :rules="{ required: true, message: '招聘人数不能为空', trigger: 'blur'}">
          <el-input v-model="positionForm.totalCount" size="larger" placeholder="请输入招聘人数"></el-input>
        </el-form-item>
        <el-form-item  size="large" label="职位种类" prop="kinds" :rules="{ required: true, message: '请选择职位种类', trigger: 'blur'}">
          <el-select v-model="positionForm.kinds" placeholder="请选择职位种类">
            <el-option v-for="item in kinds" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="!id" size="large" style="display: block" label="立即发布" prop="isPush">
          <el-switch v-model="isPush"></el-switch>
        </el-form-item>
        <el-form-item v-else size="large" style="display: block" label="职位状态" prop="isPush">
          <el-select v-model="positionForm.isPush" placeholder="请选择职位状态" :rules="{ required: true, message: '职位状态不能为空', trigger: 'blur'}">
            <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作描述" prop="describe" :rules="{ required: true, message: '职位描述不能为空', trigger: 'blur'}">
          <CompEditor ref="describe" v-model="positionForm.describe"></CompEditor>
        </el-form-item>
        <el-form-item style="margin-top: 30px">
          <el-button v-if="id" type="primary" icon="el-icon-edit" size="large" @click="updatePosition">提交修改</el-button>
          <el-button v-else type="primary" icon="el-icon-circle-plus-outline" size="large" @click="sumbitPosition">提交职位</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {quickTimeSelect} from '../../../tools/utils'
  import {Msg} from '../../../tools/message';
  import {companyApi} from './api'
  import CompEditor from '../../../packages/components/editor';

  export default {
    data() {
      return {
        loading: false,
        positionForm: {
          isPush: 0,
          tag: [],
          describe: '',
          pushAtTime: ''
        },
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
        ],
        id: '',
        isPush: false,
        inputVisible: false,
        inputValue: '',
        type: [{value:'全职'},{value:'实习(可转正)'},{value:'实习(不可转正)'}],
        workExp: [{value:'不限'},{value:'应届毕业生'},{value:'3年及以下'},{value:'3-5年'},{value:'5-10年'},{value:'10年以上'}],
        academic: [{value:'不限'},{value:'大专'},{value:'本科'},{value:'硕士'},{value:'博士'}],
        kinds: [{value:'技术'},{value:'产品'},{value:'设计'},{value:'运营'},{value:'市场'},{value:'销售'},{value:'职能'},{value:'其他'}],
        restaurants: [
          {value: '北京'}, {value: '上海'}, {value: '广州'}, {value: '深圳'}, {value: '杭州'}, {value: '重庆'},
          {value: '成都'}, {value: '天津'}, {value: '南京'}, {value: '武汉'}, {value: '西安'}, {value: '厦门'},
          {value: '长沙'}, {value: '昆明'}, {value: '苏州'}, {value: '合肥'}, {value: '贵阳'}, {value: '郑州'}
        ],
      };
    },
    mounted(){
      this.getPosition()
    },
    components: {
      CompEditor
    },
    watch:{
      $route(){
        this.getPosition()
      }
    },
    methods: {
      getPosition(){
        this.id = this.$route.params.id
        if(this.id){
          const params = {id: this.id}
          companyApi.getCompanyPosition(params).then(res => {
            if(res.data.code === 0){
              Msg.success(res.data.msg)
              this.positionForm = res.data.data
              this.$refs['describe'].setEditorContent(this.positionForm.describe);
            } else {
              Msg.error(res.data.msg)
            }
          }).catch(err => {
            Msg.error('网络错误！')
          })
        } else {
          this.positionForm = {
            isPush: 0,
              tag: [],
              describe: '',
              pushAtTime: ''
          }
          this.$refs['describe'].setEditorContent('')
        }
      },

      updatePosition(){
        this.positionForm.describe = this.$refs['describe'].getEditorContent();
        this.$refs['positionForm'].validate(valid => {
          if (valid) {
            this.loading = true
            if(this.positionForm.isPush === '1') {
              this.positionForm.pushAtTime = new Date().Format("yyyy-MM-dd hh:mm")
            } else if(this.isPush === '0') {
              this.positionForm.pushAtTime = ''
            }
            const params = {
              ...this.positionForm,
              id: this.id
            }
            companyApi.updateCompanyPosition(params).then(res => {
              if(res.data.code === 0){
                this.loading = false
                Msg.success(res.data.msg);
              } else {
                this.loading = false
                Msg.error(res.data.msg);
              }
            }).catch(err => {
              this.loading = false
              Msg.error('网络错误！')
            })
          }
        })
      },

      sumbitPosition(){
        this.positionForm.describe = this.$refs['describe'].getEditorContent();
        this.$refs['positionForm'].validate(valid => {
          if (valid) {
            this.loading = true
            if(this.isPush) {
              this.positionForm.pushAtTime = new Date().Format("yyyy-MM-dd hh:mm")
            }
            this.positionForm.isPush = this.isPush ? '1' : '0'
            companyApi.addCompanyPosition(this.positionForm).then(res => {
              if(res.data.code === 0){
                this.loading = false
                Msg.success(res.data.msg);
              } else {
                this.loading = false
                Msg.error(res.data.msg);
              }
            }).catch(err => {
              this.loading = false
              Msg.error('网络错误！')
            })
          }
        })
      },


      querySearch(queryString, callback) {
        let restaurants = this.restaurants;
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        callback(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
        };
      },
      handleClose(tag) {
        this.positionForm.tag.splice(this.positionForm.tag.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.positionForm.tag.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
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
    .edui-editor-body .edui-body-container {
      width: unset!important;
    }
  }
  .el-autocomplete{
    width: 250px;
  }
  .el-form-item {
    display: inline-block;
  }
  .el-select {
    width: 250px;
  }
</style>
