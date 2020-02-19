// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import MintUI from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import 'mint-ui/lib/style.css'
import store from './store'
import App from './App'
import VueTouch from 'vue-touch'
// import axios from 'axios'
// import apiConfig from '../config/api.config.js'
import './fiters' // 加载过滤器
import './mock/mockServer' // 加载mockServer即可

// axios.defaults.baseURL = apiConfig.baseURL
Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '../static/loadFail.jpg',
  loading: '../static/loading1.gif',
  attempt: 2
})
Vue.use(VueTouch, {name: 'v-touch'})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
