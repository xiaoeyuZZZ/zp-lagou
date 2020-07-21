<template>
  <div  class="el-scrollbar-wrap" style="height: 100vh;overflow-x: hidden;">
    <el-backtop :visibility-height="1" target=".el-scrollbar-wrap"></el-backtop>
    <div class="top-background">
    </div>
    <div class="top-tbar">
      <div class="top-tbar-tabs">
        <a class="logo"></a>
        <el-menu
          style="margin: auto;width: 1000px;"
          :default-active="activeKey"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#32373e"
          text-color="#AFB5C0"
          active-text-color="#fff">
          <router-link v-for="(item,index) in menuList" :to="`/${item.name}`" :key="index" style="textDecoration:none">
            <el-menu-item :index="item.path">{{item.meta.label}}</el-menu-item>
          </router-link>
          <a href="http://127.0.0.1:8080/#/login" style="textDecoration:none">
            <el-menu-item index="11">进入企业版</el-menu-item>
          </a>
          <el-dropdown v-if="isLogin" style="float: right;margin-top: 10px;" trigger="click" @menu-item-click="click"
                       placement="bottom">
            <span>{{isLogin.nickName}}</span><i class="el-icon-caret-bottom"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="out">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu>
      </div>

    </div>
    <el-main>
      <router-view/>
    </el-main>
    <el-footer>Copyright © 2020 小鳄鱼 All Rights Reserved</el-footer>
  </div>
</template>


<script>
  import './index.scss'
  import mhRoute from '../../router/zp-mh'
  import {Msg} from '../../tools/message'
  import db from '../../store/user/db'
  import {mhApi} from './api'
  import {delCookie} from '../../store/user/cookie'
  import {mapMutations, mapState} from 'vuex'
  export default {
    name: 'index',
    data(){
      return {
        data: {},
        menuList: [],
        activeKey:'',
        // nickName: ''
      }
    },
    watch:{
      $route(){
        this.defaultActivatedMenu()
      }
    },
    mounted(){
      // this.nickName = db.get('m_user').nickName || ''
      this.defaultActivatedMenu()
    },
    created(){
      this.getData()
    },
    computed: {
      ...mapState({
        isLogin: state => state.user.isLogin,
      })
    },
    methods: {
      ...mapMutations([
        'isLoginMH',
      ]),
      getData () {
        mhApi.getData({}).then(res => {
          if (res.data.code === 0) {
            this.data = res.data.data
            mhRoute.forEach(v => {
              v.children = v.children.filter(e => this.data.menuLink.indexOf(e.name) > -1 && !e.meta.childrenHidden)
              // v.children = v.children.forEach(e => console.log(e.meta.childrenHidden))
            })
            this.menuList = mhRoute[0].children
          } else {
            Msg.error(res.data.msg)
          }
        }).catch(err => {
          Msg.error('网络错误！')
        })
      },
      defaultActivatedMenu(){
        this.activeKey = this.$route.path.replace('/','') === '' ? '/' : this.$route.path.replace('/','')
        this.activeKey = this.activeKey.includes('mh-company') ? 'mh-company' : this.activeKey
      },
      async click (type) {
        if (type === 'out') {
          try {
            await this.$confirm('', '您确定要退出吗?', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            })
            db.remove('m_user')
            // this.$cookies.remove('c_id','1','127.0.0.1')   // return this
            delCookie('m_id')
            this.isLoginMH()
            // window.location.reload()//刷新页面
            // this.$router.push({path: '/login'})
            // window.location.href = '/#/login'
          } catch (e) {
            Msg.info('取消退出')
          }
        } else {

        }
      },
    },
    components:{
    },
  }
</script>

<style lang="scss" scoped>
  .el-dropdown{
    color: #AFB5C0;
    cursor: pointer;
  }
  .el-dropdown:hover{
    color: #00B38A;
  }
</style>
