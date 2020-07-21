<template>
  <el-container>
    <el-aside class="slider">
      <Slider :menuList="menuList"/>
    </el-aside>

    <el-container>
      <el-header class="header">
        <div class="header-content">
          <HeaderUser :menuList="menuList"></HeaderUser>
        </div>
      </el-header>

      <el-main>
        <!--路由-->
        <transition name="fade-transform" mode="out-in">
          <!--<div class="main-body">-->
          <router-view/>
          <!--</div>-->
        </transition>

      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import {mapState} from 'vuex'
  import Slider from './slider'
  import HeaderUser from './header-user'
  import moduleRoute from '../../router/zp-company'

  export default {
    components: {
      Slider,
      HeaderUser
    },
    data () {
      return {
        menuList: moduleRoute,
        menu: this.$route.path.split('/')[1],
      }
    },
    // created () {
    //   this.getMenu(this.menu)
    // },
    // mounted(){
    //   console.log(moduleRoute)
    // },
    computed: {
      ...mapState({
        routers: state => state.permission.addRouters,
        isCollapse: state => state.permission.isCollapse, //判断是否展开菜单
      }),
    },
    methods: {
      getMenu (menu) {
        const acMenu = this.menuList.find(v => v.meta.modules === menu)
        this.menuList = acMenu ? acMenu.children : []
      },
    }
  }
</script>
<style lang="scss">

  .slider .el-submenu__title {
    color: #3246a7;
    line-height: unset !important;
    white-space: unset !important;
  }

  .el-container {
    width: 100%;
    height: 100%;
    background-color: #ecf1f5;
  }

  .slider {
    width: unset !important;
    background-color: #ffffff;
  }

  .header {
    background-color: #ffffff;
    height: 75px !important;
    text-align: right;
    border-bottom: 1px solid #e6e6e6;

    .header-content {
      padding: 28px 12px 28px 0;;
    }
  }

  .main-body {
    background-color: #ffffff;
    width: 100%;
    height: 100%;
    padding: 20px;
  }

  .el-main {
    padding: 20px;
    color: #333;
    flex: inherit !important;
  }
</style>
