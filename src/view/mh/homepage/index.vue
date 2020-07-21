<template>
  <div class="el-scrollbar-wrapu">
    <div class="top-login">
      <div class="top-login-picture">
        <img src="../../../assets/images/loginLife.png" style="height: 120px;width: 228px;">
        <img src="//www.lgstatic.com/lg-www-fed/common/widgets/un_login_banner/img/text_4434674.png"
             style="position: relative;bottom: 40px;" width="334" height="30">
        <div class="login-button" v-if="!isLogin">
          <div class="button" @click="handleLogin('login')">登录</div>
          <div class="button" @click="handleLogin('register')">注册</div>
          <Dialog ref="dialog"></Dialog>
        </div>
      </div>
    </div>
    <div class="top-contain">
      <div class="contain-header">
        <el-input class="search-input" size="large" v-model="search" placeholder="搜索职位、公司或地点"></el-input>
          <router-link style="text-decoration: none" :to="`mh-job?search=${search}`">
            <el-button type="primary" size="large" style="height: 50px;border-radius: unset;width: 125px">搜 索</el-button></router-link>
        <!--</el-input>-->
      </div>
    </div>
    <div class="body-contain">
      <div class="flex">
      <div class="body-left">
        <router-link style="text-decoration: none" :to="`mh-job?kinds=${item}`"
                     v-for="(item,index) in data.kinds" :key="item"><el-link>{{item}}</el-link></router-link>
      </div>
      <div class="body-right">
        <el-carousel height="346px">
          <el-carousel-item v-for="item in data.homeImg" :key="item">
            <img :src="item" style="width: 840px;height: 346px">
          </el-carousel-item>
        </el-carousel>
      </div>
      </div>
      <ul class="module-tabs">
        <li>热门推荐</li>
      </ul>
      <div class="job-list">
        <div style="width: 1216px;display: flex;flex-wrap: wrap;">
        <div class="job-item" v-for="item in hotPositionList" :key="item._id">
          <div class="flex">
            <div class="position-name">
              <router-link :to="`mh-job/${item._id}`"><h2 class="dib">{{item.position_name}}</h2></router-link>
              <span class="dib create-time"> [{{item.pushAtTime.split(' ')[1]}}] </span>
            </div>
            <span class="salary">{{item.salary}}</span>
          </div>
          <div class="position-info">{{item.workExp}} / {{item.academic}}</div>
          <div class="labels">
            <el-tag effect="plain" style="margin-right: 10px" size="medium" v-for="tag in item.tag" :key="tag">
              {{tag}}
            </el-tag>
          </div>
          <div class="item-bottom">
            <router-link :to="`mh-company/${item.c_id}`"><img :src="item.trademark"
                              alt="公司logo" width="40" height="40"></router-link>
            <div style="margin-left: 15px">
              <router-link style="text-decoration: none" :to="`mh-company/${item.c_id}`"><h3>{{item.company}}</h3></router-link>
              <h3 style="color: #999999">{{item.industry}} / {{item.workCity}}·{{item.address.split('-')[0]}}</h3>
            </div>
          </div>
        </div>
        </div>
      </div>
      <router-link class="list-more" style="text-decoration: none" :to="`mh-job`">查看更多</router-link>
    </div>
  </div>
</template>


<script>
  import Dialog from './dialog';
  import {mhApi} from './api'
  import './index.scss'
  import db from '../../../store/user/db'
  import {mapState} from 'vuex'
  import {Msg} from '../../../tools/message'
  export default {
    name: 'index',
    data(){
      return {
        // isLogin: false,
        data:{},
        search: '',
        hotPositionList: [],
      }
    },
    components:{
      Dialog
    },
    computed: {
      ...mapState({
        isLogin: state => state.user.isLogin,
      })
    },
    mounted(){
      // this.isLogin = db.get('m_user') ? true : false
      this.getHotPosition()
      this.getData()
    },
    methods:{
      handleLogin(val){
        this.$refs.dialog.openDialog(val)
      },
      getHotPosition(){
        mhApi.getHotPosition({}).then(res => {
          this.hotPositionList = res.data.data
        })
      },
      getData () {
        mhApi.getData({}).then(res => {
          if (res.data.code === 0) {
            this.data = res.data.data
          } else {
            Msg.error(res.data.msg)
          }
        }).catch(err => {
          Msg.error('网络错误！')
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .flex{
    display: flex;
    justify-content: space-between;
  }
  .body-contain{
    margin: 50px auto 0;
    width: 1200px;
    .body-left{
      width: 321px;
      .el-link{
        margin: 0 15px 10px 0;
        font-size: 20px;
      }
    }
    .body-right{
      width: 840px;
    }
    .module-tabs {
      margin-top: 52px;
      margin-bottom: 14px;
      border-bottom: 1px solid #E8E8E8;
      li {
        border-bottom: 2px solid #333;
        background: #fff;
        color: #333;
        display: inline-block;
        padding: 14px 0;
        margin-right: 58px;
        font-size: 16px;
      }
    }
    .job-list{
      .job-item:hover{
        box-shadow: 0 0 10px 0 rgba(56,81,76,.12);
      }
      .job-item{
        box-sizing: border-box;
        width: 389px;
        height: 200px;
        margin: 16px 16px 0 0;
        padding: 20px 18px 0;
        border: 1px solid #EAEEED;
        background-color: #fff;
        .position-name{
          height: 22px;
          font-size: 0;
          .dib{
            display: inline-block;
            vertical-align: middle;
          }
          h2{
            font-size: 16px;
            padding: 0;
            margin: 0;
            color: #333;
            max-width: 190px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            word-wrap: normal;
          }
          .create-time{
            color: #999;
            font-size: 14px;
          }
        }
        .salary{
          font-size: 16px;
          color: #fa6041;
        }
        .position-info{
          height: 30px;
          line-height: 30px;
          color: #777;
        }
        .labels{
          margin-top: 5px;
        }
        .item-bottom{
          display: flex;
          margin-top: 18px;
          padding-top: 18px;
          border-top: 1px dashed #E0E0E0;
          h3 {
            font-size: 14px;
            color: #333;
            display: flex;
            align-items: center;
            max-width: 230px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            word-wrap: normal;
          }
        }
      }
    }
    .list-more:hover{
      color: #fff;
      background: #00B38A;
    }
    .list-more{
      display: block;
      width: 387px;
      height: 42px;
      line-height: 42px;
      margin: 16px auto 0;
      background: #FFF;
      border: 1px solid #00B38A;
      font-size: 16px;
      color: #00b38a;
      text-align: center;
      -webkit-transition: background .3s,color .1s;
    }
  }
</style>
