// 管理直接更新states的方法
import Vue from 'vue'
export default {
  // 获取当前地址
  getAddress (state, {address}) {
    state.address = address
  },
  // 保存食品分类
  getFoodList (state, {foodList}) {
    state.foodList = foodList
  },
  // 保存商家列表
  getShopList (state, {shopList}) {
    state.shopList = shopList
  },
  // 保存验证码
  reqSendcode (state, {sendcode}) {
    state.sendcode = sendcode
  },
  // 保存用户登录信息
  reqSaveUserinfo (state, {param}) {
    state.userinfo = param
  },
  // 保存商家商品
  reqShopGoods (state, {goods}) {
    state.goods = goods
  },
  // 保存商家信息
  reqShopInfo (state, {info}) {
    state.info = info
  },
  // 保存商家评价
  reqShopRatings (state, {ratings}) {
    state.ratings = ratings
  },
  // 保存购买商品数量
  updateFoodCount (state, {isAdd, food}) {
    if (food.count) {
      if (isAdd) {
        food.count++
      } else {
        food.count--
        if (food.count === 0) {
          // 将food从shopCart中移除
          state.shopCart.splice(state.shopCart.indexOf(food), 1)
        }
      }
    } else {
      // 向food添加一个属性,并绑定该数据,使更新该数据后能够更新dom
      Vue.set(food, 'count', 1)
      state.shopCart.push(food)
    }
  },
  // 清空购物车
  clearShopCart (state) {
    // 清除food中的count
    state.shopCart.forEach((food) => { food.count = 0 })
    // 移除购物车中所有购物项
    state.shopCart = []
  },
  // 保存当前商品滚动位置
  saveScrollY (state, {y}) {
    console.log('muta-saveScrollY:', y)
    state.currentScrollY = y
  },
  // 获取搜索商家
  reqSearchShopList (state, {searchShops}) {
    state.searchShops = searchShops
  },
  // 清空搜索记录
  clearSearchShops (state) {
    state.searchShops = []
  },
  // 保存订单
  saveOrder (state, {orders}) {
    state.orders = orders
    console.log(orders)
  },
  // 删除订单
  delOrder (state, {order}) {
    state.orders.splice(state.orders.indexOf(order), 1)
  }
}
