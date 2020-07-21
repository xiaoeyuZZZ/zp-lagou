<template>
  <div class="page-index-main">
    <div class="page-index">
      <div class="page-index-name">
        欢迎登录<h2>{{userInfo.userName}}</h2>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data () {
      return {
        visible: false,
        data: []
      }
    },
    mounted(){
    },
    computed: mapState({
      userInfo: state => state.user.userInfo
    }),
    methods: {
      open () {
        this.visible = true;
      },
      handleClose () {
        this.visible = false;
      },
    },
    watch: {
      data (val) {
        console.log(val);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page-index-main {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .page-index {
    width: 50%;
    height: 40%;
    background-image: url("../assets/images/picture.png");
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -60%);
  }

  .page-index-name {
    font-size: 20px;
    color: #313131;
    text-align: center;
    margin-top: 284px;
  }
</style>
