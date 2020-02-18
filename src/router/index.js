import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home/Home'
import Search from '../pages/Search/Search'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'

import ShopGoods from '../pages/Shop/shopGoods/shopGoods'
import ShopRatings from '../pages/Shop/shopRatings/shopRatings'
import ShopInfo from '../pages/Shop/shopInfo/shopInfo'
// 路由懒加载
// const Home = () => import('../pages/Home/Home')
// const Search = () => import('../pages/Search/Search')
// const Order = () => import('../pages/Order/Order')
// const Profile = () => import('../pages/Profile/Profile')

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new VueRouter({
  routes: [
    { path: '/home',
      component: Home },
    { path: '/search',
      component: Search },
    { path: '/order',
      component: Order },
    { path: '/profile',
      component: Profile,
      name: 'profile',
      props: true },
    { path: '/login',
      component: Login },
    { path: '/shop',
      name: 'shop',
      component: Shop,
      props: true,
      children: [
        {
          path: 'shopGoods',
          name: 'shopGoods',
          component: ShopGoods,
          props: true
        },
        {
          path: 'shopRatings',
          name: 'shopRatings',
          component: ShopRatings,
          props: true
        },
        {
          path: 'shopInfo',
          name: 'shopInfo',
          component: ShopInfo,
          props: true
        },
        {
          path: '',
          redirect: 'shopGoods'
        }
      ] },
    { path: '/',
      redirect: '/home'}
  ]
})
