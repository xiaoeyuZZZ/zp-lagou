<template>
  <div class="error-body">
    <div class="error-message">
      <h2 id="error-h2">发生错误 404！</h2>
      <div id="error-div">
        <p>抱歉给您带来不便，请联系管理员...</p>
        <p>请检查您输入的网址是否正确</p>
        <p>请点击以下按钮返回主页</p>
      </div>
      <button id="error-button">
        <a href="/">返回首页</a>
      </button>
    </div>
  </div>
</template>

<script>
import './index.scss'
import animate from 'animate.css'
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
</style>
