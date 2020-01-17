import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home/Home'
import Search from '../pages/Search/Search'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new VueRouter({
  routes: [
    { path: '/home',
      component: Home,
      children: [
        { path: 'shop', name: 'shop', component: Shop, props: true }
      ]
    },
    { path: '/search',
      component: Search },
    { path: '/order',
      component: Order },
    { path: '/profile',
      component: Profile },
    { path: '/login',
      component: Login },
    {path: '/',
      redirect: '/home' }
  ]
})
