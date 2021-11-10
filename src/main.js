import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入并使用Element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 导入iconfont字体图标
import './assets/fonts/iconfont.css'
// 全局样式
import './static/css/global.css'

// 导入并使用axios
import axios from 'axios'
axios.defaults.baseURL = 'https://lianghj.top:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$axios = axios

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
