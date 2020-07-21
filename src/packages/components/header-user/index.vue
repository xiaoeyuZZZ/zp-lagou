<template>
  <div class="header-icon">
    <div class="header-location">
      <div :class="menuToger" style="display: inline-block">
        <i class="icon iconfont icon-shouqi" @click="COLLAPSE"></i>
      </div>
      <span>当前位置：</span>
      <el-breadcrumb separator="/" class="header-location-link">
        <!--<el-breadcrumb-item :to="{ path: `${routeList[0].path}` }">{{routeList[0].meta.label}}</el-breadcrumb-item>-->
        <el-breadcrumb-item v-for="(item,index) in routeList" :to="item.path"
                            :key="index">{{item.meta.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header-out">
      <el-dropdown trigger="click" @menu-item-click="click"
                   placement="bottom">
        <img v-if="$route.meta.modules !== 'zp-admin'" :src="isC_Login.headImg" width="50" class="headImg" height="50">
        <img v-else :src="isA_Login.headImg" width="50" class="headImg" height="50">
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="outC" v-if="$route.meta.modules !== 'zp-admin'">退出登录</el-dropdown-item>
          <el-dropdown-item command="outA" v-else>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import {Msg} from '../../../tools/message'
  import db from '../../../store/user/db'
  import {delCookie} from '../../../store/user/cookie'
  import {mapMutations,mapState} from 'vuex'

  export default {
    name: 'index',
    data () {
      return {
        // headImg: '',
        routeList: Array
      }
    },
    props: {
      menuList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    watch:{
      $route(){
        this.getRouters()
      }
    },
    mounted(){
      this.getRouters()
    },
    created () {
      // this.getRouters()
    },
    computed: {
      ...mapState({
        isCollapse: state => state.permission.isCollapse,
        isC_Login: state => state.user.isC_Login,
        isA_Login: state => state.user.isA_Login,
      }),
      menuToger: function () {
        return !this.isCollapse ? '' : 'icon-zhankaicaidan'
      },
    },
    methods: {
      ...mapMutations([
        'COLLAPSE',
        'SLIDER_OPEN',
        'SLIDER_CLOSE'
      ]),
      async click (type) {
        if (type === 'outC') {
          try {
            await this.$confirm('', '您确定要退出吗?', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            })
            db.remove('c_user')
            // this.$cookies.remove('c_id','1','127.0.0.1')   // return this
            delCookie('c_id')
            // window.location.reload()//刷新页面
            this.$router.push({path: '/login'})
            // window.location.href = '/#/login'
          } catch (e) {
            Msg.info('取消退出')
          }
        } else if(type === 'outA') {
          try {
            await this.$confirm('', '您确定要退出吗?', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            })
            db.remove('a_user')
            // this.$cookies.remove('c_id','1','127.0.0.1')   // return this
            delCookie('a_id')
            // window.location.reload()//刷新页面
            this.$router.push({path: '/adminLogin'})
            // window.location.href = '/#/login'
          } catch (e) {
            Msg.info('取消退出')
          }
        }
      },
      async getRouters () {
        let routeList = []
        let modules = this.$route.meta.modules
        let path = this.$route.path.split('/')
        path.splice(0, 1) //取出路由，组成数组
        for(let i = 0; i < path.length; i++){
          if (new RegExp("[0-9]").test(path[i])) {
            path.splice(i, 1)
          }
        }
        const routers = this.menuList.find(e => e.meta.modules === modules) //判断路由是那个模块的
        if(routers) {
          path.forEach(e => {
            routeList = this.isLast(e,routers.children)
          })
          // routeList = this.isLast(path,routers.children)
          const route = [{
            path: this.menuList[0].path,
            meta: routers.meta
          }]
          this.routeList = route.concat(routeList)
        } else
          this.routeList = []
      },
      isLast(val,list){
        const routers = list.filter(e => e.name === val)
        // console.log(val)
        if(routers)
          return routers
        else this.isLast(val,list.children)
      },

    }
  }
</script>

<style scoped lang="scss">
  .icon-shouqi {
    /*font-size: 25px;*/
    cursor: pointer;
  }
  .iconkaifangtiaoshi {
    font-weight: 600;
    color: #606266;
    cursor: pointer;
  }
  .iconai240:hover {
    color: #00b38a;
  }
  .iconkaifangtiaoshi:hover {
    color: #00b38a;
  }

  .el-icon-location-outlin {
    font-size: 25px;
  }

  .header-icon {
    display: flex;
    justify-content: space-between;
  }
  .header-location-link{
    display: inline-block;
    line-height: 10px
  }
  .headImg{
    border-radius: 25px;
    position: relative;
    bottom: 15px;
    cursor: pointer;
    border: 1px solid #fff;
  }
  .headImg:hover{
    border: 1px solid #00b38a;
  }
  .header-location .icon-zhankaicaidan{
    transform: rotate(90deg);
    transition: .58s;
    /*-webkit-transform-origin: 50% 50%;*/
    transform-origin: 50% 50%;
    /*ms-transform: rotate(90deg); !* IE 9 *!*/
    /*moz-transform: rotate(90deg); !* Firefox *!*/
    /*webkit-transform: rotatey(90deg); !* Safari and Chrome *!*/
    /*o-transform: rotate(90deg); !* Opera *!*/
  }
</style>
