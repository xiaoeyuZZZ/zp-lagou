// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store'
import ElementUI from 'element-ui'
import './assets/style/index.scss'
import $ from 'jquery'
import './assets/icon/iconfont.css'
import echarts from 'echarts' // 引入Echarts图表组件库
import VCharts from 'v-charts' // 引入v-charts图表库
import axios from 'axios'
import htmlToPdf from './tools/htmlToPdf'
import Cookies from 'js-cookie'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
// import './permission'
window.jQuery = window.$ = $;
Vue.use(ElementUI, {size: 'small'})
Vue.use(Cookies);
/** 注册组件，将指定div中的内容导出为pdf文件 */
Vue.use(htmlToPdf);
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.use(VCharts)

Date.prototype.Format = function (fmt) { // author: meizz
  var o = {
    "M+": this.getMonth() + 1, // 月份
    "d+": this.getDate(), // 日
    "h+": this.getHours(), // 小时
    "m+": this.getMinutes(), // 分
    "s+": this.getSeconds(), // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    "S": this.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
