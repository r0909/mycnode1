import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from '../node_modules/axios'

Vue.prototype.axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


Vue.filter('formatDate', function (str) {
  if (!str) return ''
  var date = new Date(str)
  // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  var time = new Date().getTime() - date.getTime() 
  if (time < 0) {
    return ''
  } else if ((time / 1000 < 30)) {
    return '刚刚'
  } else if (time / 1000 < 60) {
    return parseInt((time / 1000)) + '秒前'
    // 1000*60
  } else if ((time / 60000) < 60) {
    return parseInt((time / 60000)) + '分钟前'
    // 1000*60*60
  } else if ((time / 3600000) < 24) {
    return parseInt(time / 3600000) + '小时前'
    // 1000*60*60*24
  } else if ((time / 86400000) < 31) {
    return parseInt(time / 86400000) + '天前'
    // 1000*60*60*24*30
  } else if ((time / 2592000000) < 12) {
    return parseInt(time / 2592000000) + '月前'
  } else {
    return parseInt(time / 31536000000) + '年前'
  }
}
)
//处理显示板块的文字
Vue.filter('tabFormatter',function (post) {
if(post.good == true){
  return '精华'
}else if(post.top == true){
  return '置顶'
}else if(post.tab == 'ask'){
  return '问答'
}else if(post.tab == 'share'){
  return '分享'
}else{
  return '招聘'
}
})
