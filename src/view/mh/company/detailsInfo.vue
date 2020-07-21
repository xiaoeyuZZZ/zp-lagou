<template>
  <div style="margin-top: 25px" class="details">
    <div class="container-left">
      <div class="container-info">
        <div class="item-title">{{company.shortName}}介绍</div>
        <div class="item-content" v-html="company.introduce"></div>
      </div>
    </div>
    <div class="container-right">
      <div class="item_container">
        <div class="item-title">{{company.shortName}}基本信息</div>
        <div class="item_content">
          <ul>
            <li>
              <i class="el-icon-menu"></i>
              <span>{{company.industry}}</span>
            </li>
            <li style="margin-top: 30px;">
              <i class="el-icon-user-solid"></i>
              <span>{{company.scale}}</span>
            </li>
            <li style="margin-top: 30px;">
              <i class="el-icon-location"></i>
              <span>{{company.city}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import './index.scss'
  export default {
    name: 'detailsInfo',
    data(){
      return {}
    },
    props: {
      company: {
        type: Object,
        default: () => {
          return {}
        }
      },
    }
  }
</script>

<style scoped lang="scss">

</style>
