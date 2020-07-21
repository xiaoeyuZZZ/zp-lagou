<template>
  <el-aside class="slider">
    <div style="background-color: rgb(238, 241, 246); height: 100%;">
      <el-menu
        class="el-menu-vertical-silder" @select="defaultActivatedMenu"
        background-color="rgb(255, 255, 255)"
        text-color="#a4a5a6"
        :default-active="activeKey"
        width="200"
        ref="asideMenu"
        :collapse="isCollapse"
        :collapse-transition="true"
        :unique-opened="true"
      >
        <div class="zw-admin-title">
          <div class="title-logo">
            <!--<div class="logo-picture"></div>-->
            <img src="../../../assets/images/favicon.png" height="40" width="40" style="display: inline-block"/>
            <h3 class="slider-orgName">拉钩</h3>
          </div>
        </div>
        <MenuItem :menu="menuList"></MenuItem>
      </el-menu>
    </div>
  </el-aside>
</template>

<script>
  import MenuItem from './renderMenu'
  import {mapState} from 'vuex'

  export default {
    name: 'index',
    components: {
      MenuItem
    },
    data () {
      return {
        activeKey: '',
        // isCollapse: false,
      }
    },
    computed: {
      ...mapState({
        isCollapse: state => state.permission.isCollapse,
      })
    },
    watch:{
      $route(){
        this.defaultActivatedMenu()
      }
    },
    created(){
      this.defaultActivatedMenu()
    },
    props: {
      menuList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      defaultActivatedMenu(){
        if(this.$route.meta.modules === 'zp-admin'){
          this.activeKey = this.$route.path.replace('/admin/','')
        } else this.activeKey = this.$route.path.replace('/company/','')
      }
    },
  }
</script>

<style scoped lang="scss">
  .slider::-webkit-scrollbar { /*滚动条整体样式*/
    display: none;
    margin: 0;
  }
  .slider-orgName{
    display: inline-block;
    position: relative;
    bottom: 14px;
  }

  .el-submenu__title p {
    width: 135px;
    display: inline-block;
    padding:18px 8px;
  }

  .slider .el-menu{
    border: unset;
  }

  .el-submenu .el-menu-item {
    height: 40px;
    line-height: 40px;
    background-color: #eaecf5 !important;
    p{
      display: inline-block;
    }
  }

  .sc-menu {
    width: 200px;
  }

  .el-menu-item.is-active {
    background-color: #00b38a !important;
    color: rgb(164, 165, 166);
    color: #ffffff !important;
  }
  .el-menu-item:hover{
    background-color: #00b38a!important;
    color: #ffffff !important;
  }
  .zw-admin-title {
    height: 75px;
    width: 100%;
    background-color: #0da982;
    color: #ffffff;
  }

  .title-logo {
    text-align: center;
    padding: 17px 0;
  }
  .el-menu-item i {
    margin-right: 6px;
  }
  /*.logo-picture{*/
    /*background-image: url("../../../assets/images/favicon.png");*/
    /*background-size: cover;*/
    /*background-position: center;*/
    /*width: 30px;*/
    /*height: 30px;*/
  /*}*/
</style>
