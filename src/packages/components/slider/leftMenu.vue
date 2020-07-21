<template>
  <div class="sc-menu">
  <li v-for="(item,index) in menu" :key="item.path">
    <router-link v-if="!item.children && !item.meta.hidden" :to="item.path" style="textDecoration:none">
      <el-menu-item>
        <i :class="item.meta.icon"/>
        <p slot="title">{{item.meta.label}}</p>
      </el-menu-item>
    </router-link>
    <el-submenu v-if="item.children && !item.meta.hidden">
      <template slot="title">
        <i :class="item.meta.icon"/>
        <p slot="title">{{item.meta.label}}</p>
      </template>
      <LeftMenu :menu="item.children"></LeftMenu>
    </el-submenu>
  </li>
  </div>
</template>

<script>
  export default {
    name: 'LeftMenu',
    props: ['menu'],
    data () {
      return {}
    },
    methods:{}
  }
</script>

<style scoped>

</style>
