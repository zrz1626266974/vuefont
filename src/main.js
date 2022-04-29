// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import BaiduMap from 'vue-baidu-map'

// -- 设置高德地图密钥
window._AMapSecurityConfig = {
  securityJsCode: 'd57b9a822f2abc97e29bf33a9094a925'
}
Vue.use(BaiduMap, {
  // 百度地图密钥
  ak: '9Ga30tUi5oGRKlmpRoo29TRxvrKG6mWG'
})
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.filter('dateFormat', function (val) {
  let date = new Date(val)
  let year = date.getFullYear()
  var month = date.getMonth() + 1
  let day = date.getDate()
  if (month < 10) {
    month = '0' + String(month)
  } else {
    month = String(month)
  }
  var arr = [String(year), month, String(day)]
  // var arr = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
  // console.log(arr)
  return arr.join(' - ')
})
Vue.filter('isMan', function (val) {
  if (val === false) {
    return '女'
  } else {
    return '男'
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
