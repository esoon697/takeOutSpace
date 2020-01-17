import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login/Login'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/login',
      component: Login },
    {path: '/',
      redirect: '/login' }
  ]
})
