// 管理回调函数响应模块，负责触发相应的mutations方法
import {
  reqAddress,
  reqFoodList,
  reqShopList,
  reqSendcode,
  reqShopGoods,
  reqShopInfo,
  reqShopRatings,
  reqSearchShopList
} from '../api'
// 引入MessageBox弹窗
import { MessageBox } from 'mint-ui'
// import ajax from '../api/ajax'
export default {
  // 获取当前地址
  async getAddress ({commit, state}) {
    const geohash = state.latitude + ',' + state.longitude
    const res = await reqAddress(geohash)
    if (res.code === 0) {
      const address = res.data
      commit('getAddress', {address})
    }
  },
  // 获取食品分类
  async getFoodList ({commit}) {
    const res = await reqFoodList()
    if (res.code === 0) {
      const foodList = res.data
      commit('getFoodList', {foodList})
    }
  },
  // 获取商家列表
  async getShopList ({commit, state}) {
    const {latitude, longitude} = state
    const res = await reqShopList(latitude, longitude)
    if (res.code === 0) {
      const shopList = res.data
      commit('getShopList', {shopList})
    }
  },
  // 获取短信验证码
  async reqSendcode ({commit}, phone) {
    const res = await reqSendcode(phone)
    if (res.code === 0) {
      const sendcode = res.data
      commit('reqSendcode', {sendcode})
    } else {
      MessageBox('提示', res.msg)
    }
  },
  // 保存用户登录信息
  reqSaveUserinfo ({commit}, param) {
    commit('reqSaveUserinfo', {param})
  },
  // 获取商家商品
  async reqShopGoods ({commit}, callback) {
    const res = await reqShopGoods()
    if (res.code === 0) {
      const goods = res.data
      commit('reqShopGoods', {goods})
      callback && callback()
    }
  },
  // 获取商家信息
  async reqShopInfo ({commit}, callback) {
    const res = await reqShopInfo()
    if (res.code === 0) {
      const info = res.data
      commit('reqShopInfo', {info})
      callback && callback()
    }
  },
  // 获取商家评价
  async reqShopRatings ({commit}, callback) {
    const res = await reqShopRatings()
    if (res.code === 0) {
      const ratings = res.data
      commit('reqShopRatings', {ratings})
      callback && callback()
    }
  },
  // 更新购买商品数量
  updateFoodCount ({commit, state}, {isAdd, food}) {
    commit('updateFoodCount', {isAdd, food})
  },
  // 清空购物车
  clearShopCart ({commit}) {
    commit('clearShopCart')
  },
  // 保存当前商品列表位置
  saveScrollY ({commit}, y) {
    console.log('act-saveScrollY:', y)
    commit('saveScrollY', {y})
  },
  // 搜索商家
  async reqSearchShopList ({commit, state}, keyword) {
    const geohash = state.latitude + ',' + state.longitude
    const res = await reqSearchShopList(keyword, geohash)
    if (res.code === 0) {
      const searchShops = res.data
      commit('reqSearchShopList', {searchShops})
    }
  },
  // 清空搜索记录
  clearSearchShops ({commit}) {
    commit('clearSearchShops')
  },
  // 保存订单
  saveOrder ({commit}, orders) {
    console.log(orders)
    commit('saveOrder', {orders})
  },
  // 删除订单
  delOrder ({commit}, order) {
    commit('delOrder', {order})
  }
}
