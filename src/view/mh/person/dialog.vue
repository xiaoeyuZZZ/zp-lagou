<template>
  <el-dialog class="dialog-form" :visible.sync="dialogFormVisible"
             width="40%" :title="dialogTitle">
    <div class="dialog-form-logo">
    </div>
    <el-form :model="resumeFrom.basicInfo" v-if="whichForm === 'basic'" label-width="80px">
      <el-form-item label="姓名">
        <el-input size="large" v-model="resumeFrom.basicInfo.name" placeholder="请输入姓名" clearable></el-input>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker
          size="large"
          v-model="resumeFrom.basicInfo.birthday"
          type="date" value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="resumeFrom.basicInfo.sex">
          <el-radio :label="'1'">男</el-radio>
          <el-radio :label="'2'">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="学校名称">
        <div style="display: flex">
        <el-input style="flex: 5.5" size="large" v-model="resumeFrom.basicInfo.school" placeholder="请输入学校名称" clearable></el-input>
          <div style="flex: 0.5"></div>
        <el-select style="flex: 4" v-model="resumeFrom.basicInfo.education" placeholder="请选择" size="large">
          <el-option
            v-for="item in education"
            :key="item.value"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
        </div>
      </el-form-item>
      <el-form-item label="所在城市">
        <el-input size="large" v-model="resumeFrom.basicInfo.city" placeholder="请输入省份/直辖市" clearable></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input size="large" v-model="resumeFrom.basicInfo.phone" placeholder="请输入手机号" clearable></el-input>
      </el-form-item>
      <el-form-item label="联系邮箱">
        <el-input size="large" v-model="resumeFrom.basicInfo.email" placeholder="请输入邮箱号" clearable></el-input>
      </el-form-item>
      <el-form-item label="当前身份">
        <el-input size="large" v-model="resumeFrom.basicInfo.isGraduates" placeholder="请输入'应届毕业生'/'xxx工作经验'" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="large" @click="editorResume">保存</el-button>
      </el-form-item>
    </el-form>
    <el-form :model="educationEpx" v-else-if="whichForm === 'education'" label-width="80px">
      <el-form-item label="学校名称">
        <el-input size="large" v-model="educationEpx.school" placeholder="请输入学校名称"></el-input>
      </el-form-item>
      <el-form-item label="在校时间">
        <el-date-picker
          v-model="educationEpx.time" type="monthrange" value-format="yyyy.MM" size="large"
          range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="学历">
        <el-select v-model="educationEpx.level" placeholder="请选择" size="large">
          <el-option
            v-for="item in education"
            :key="item.value"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专业名称">
        <el-input size="large" v-model="educationEpx.major" placeholder="请输入专业名称">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="large" @click="editorResume('education')">保 存</el-button>
      </el-form-item>
    </el-form>
    <el-form :model="projectEpx" v-else-if="whichForm === 'project'" label-width="80px">
      <el-form-item label="项目名称">
        <el-input size="large" v-model="projectEpx.name" placeholder="请输入项目名称"></el-input>
      </el-form-item>
      <el-form-item label="项目周期">
        <el-date-picker
          v-model="projectEpx.time" type="monthrange" value-format="yyyy.MM" size="large"
          range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="项目描述">
        <el-input v-model="projectEpx.describe" placeholder="请简要描述" type="textarea"
                  :rows="5" size="large">
        </el-input>
      </el-form-item>
      <el-form-item label="我的成就">
        <el-input v-model="projectEpx.achievement" placeholder="请简要描述" type="textarea"
                  :rows="5" size="large">
        </el-input>
      </el-form-item>
      <el-form-item label="项目链接">
        <el-input size="large" v-model="projectEpx.link" placeholder="请输入项目链接(选填)">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="large" @click="editorResume('project')">保 存</el-button>
      </el-form-item>
    </el-form>
    <el-form :model="worksEpx" v-else-if="whichForm === 'works'" label-width="80px">
      <el-form-item label="公司名称">
        <el-input size="large" v-model="worksEpx.name" placeholder="请输入公司名称"></el-input>
      </el-form-item>
      <el-form-item label="在职时间">
        <el-date-picker
          v-model="worksEpx.time" type="monthrange" value-format="yyyy.MM" size="large"
          range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="所在部门">
        <el-input v-model="worksEpx.department" placeholder="请部门名称" size="large">
        </el-input>
      </el-form-item>
      <el-form-item label="职位名称">
        <el-input v-model="worksEpx.position" placeholder="请输入职位名称"  size="large">
        </el-input>
      </el-form-item>
      <el-form-item label="工作内容">
        <el-input size="large" v-model="worksEpx.content" type="textarea"
                  :rows="5" placeholder="请输入工作内容">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="large" @click="editorResume('works')">保 存</el-button>
      </el-form-item>
    </el-form>
    <el-form :model="resumeFrom" v-else-if="whichForm === 'introduce'" label-width="80px">
      <el-form-item label="自我评价">
        <el-input size="large" v-model="resumeFrom.introduce" type="textarea"
                  :rows="6" placeholder="请描述一下自己的优势吧">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="large" @click="editorResume">保 存</el-button>
      </el-form-item>
    </el-form>
    <el-form :model="resumeFrom.intention" v-else-if="whichForm === 'intention'" label-width="80px">
      <el-form-item label="期望职位">
        <el-input size="large" v-model="resumeFrom.intention.job" placeholder="请输入期望职位">
        </el-input>
      </el-form-item>
      <el-form-item label="期望城市">
      <el-input size="large" v-model="resumeFrom.intention.city" placeholder="请输入期望城市">
      </el-input>
      </el-form-item>
      <el-form-item label="期望薪资">
        <el-input size="large" v-model="resumeFrom.intention.salary" placeholder="请输入期望薪资">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="large" @click="editorResume">保 存</el-button>
      </el-form-item>
    </el-form>
    <el-form :model="resumeFrom.status" v-else-if="whichForm === 'status'" label-width="80px">
      <el-form-item label="目前状态">
        <el-select v-model="resumeFrom.status.idea" placeholder="请选择" size="large">
          <el-option
            v-for="item in status"
            :key="item.value"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="到岗时间">
        <el-select v-model="resumeFrom.status.time" placeholder="请选择" size="large">
          <el-option
            v-for="item in times"
            :key="item.value"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="large" @click="editorResume">保 存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  // import './index.scss'
  import {mhApi} from './api'
  import {Msg} from '../../../tools/message'

  export default {
    name: 'loginDialog',
    data(){
      return {
        dialogFormVisible:false,
        whichForm: '',
        dialogTitle: '',
        resumeFrom:{},
        educationEpx:{},
        projectEpx: {},
        worksEpx: {},
        educationEpxId: -1,
        projectEpxId: -1,
        worksEpxId: -1,
        education: [
          {
            value: 1,
            label: '大专',
          },
          {
            value: 2,
            label: '全日制本科',
          },
          {
            value: 3,
            label: '研究生',
          },
          {
            value: 4,
            label: '博士生',
          },
          {
            value: 5,
            label: '其他',
          },
        ],
        status: [
          {
            value: 1,
            label: '积极寻找工作',
          },
          {
            value: 2,
            label: '随便看看',
          },
          {
            value: 3,
            label: '暂时不换工作',
          },
        ],
        times: [
          {
            value: 1,
            label: '随时',
          },
          {
            value: 2,
            label: '2周以内',
          },
          {
            value: 3,
            label: '2周-1个月',
          },
          {
            value: 4,
            label: '1个月以上',
          },
        ]
      }
    },
    props: {
      resumeInfo: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    mounted(){
      this.resumeFrom = JSON.parse(JSON.stringify(this.resumeInfo))
    },
    methods:{
      editorResume(val){
        if(val){
          this.changeEpx(val)
        }
        const params = {
          ...this.resumeFrom
        }
        mhApi.editorResume(params).then(res => {
          if(res.data.code !== 0){
            Msg.error('编辑失败')
          } else {
            this.changeResumeInfo()
            this.dialogFormVisible = false
            Msg.success('编辑成功！')
          }
        })
      },
      openDialog(val,title,index,resumeInfo){
        this.resumeFrom = JSON.parse(JSON.stringify(resumeInfo))
        this.dialogFormVisible = true
        this.whichForm = val
        this.dialogTitle = title
        switch (val) {
          case 'education':
            this.educationEpxId = index
            if(index >= 0){
              this.educationEpx = JSON.parse(JSON.stringify(this.resumeFrom.education[index]))
            } else {
              this.educationEpx = {}
            }
            break;
          case 'project':
            this.projectEpxId = index
            if(index >= 0){
              this.projectEpx = JSON.parse(JSON.stringify(this.resumeFrom.project[index]))
            } else {
              this.projectEpx = {}
            }
            break;
          case 'works':
            this.worksEpxId = index
            if(index >= 0){
              this.worksEpx = JSON.parse(JSON.stringify(this.resumeFrom.works[index]))
            } else {
              this.worksEpx = {}
            }
            break;
        }

      },
      changeEpx(val){
        switch (val) {
          case 'education':
            if(this.educationEpxId >= 0){
              this.resumeFrom.education[this.educationEpxId] = this.educationEpx
            } else {
              this.resumeFrom.education.push(this.educationEpx)
            }
            break;
          case 'project':
            if(this.projectEpxId >= 0){
              this.resumeFrom.project[this.projectEpxId] = this.projectEpx
            } else {
              this.resumeFrom.project.push(this.projectEpx)
            }
            break;
          case 'works':
            if(this.worksEpxId >= 0){
              this.resumeFrom.works[this.worksEpxId] = this.worksEpx
            } else {
              this.resumeFrom.works.push(this.worksEpx)
            }
            break;
        }
        this.changeResumeInfo()
      },
      deleteSomeInfo(i,val){
        switch (val) {
          case 1: this.resumeFrom.education.splice(i,1);
            break;
          case 2: this.resumeFrom.project.splice(i,1);
            break;
          case 3: this.resumeFrom.works.splice(i,1);
            break;
        }
      },
      changeResumeInfo(){
        this.$emit('changeResumeInfo',this.resumeFrom)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
