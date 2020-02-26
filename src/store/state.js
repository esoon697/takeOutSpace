// 状态对象
export default {
  latitude: 40.10038, // 纬度
  longitude: 116.36867, // 经度
  address: {}, // 地址相关信息对象
  foodList: [], // 食品分类
  shopList: [], // 商铺列表
  captcha: {}, // 一次性验证码
  loginPwd: {}, // 用户密码登录信息
  sendcode: {}, // 用户短信验证码
  loginSms: {}, // 用户短信登录信息
  userinfo: {}, // 用户信息
  logout: {}, // 用户登出
  goods: [], // 商家商品
  info: {}, // 商家信息
  ratings: [], // 商家评价
  shopCart: [], // 购物车
  currentScrollY: 0, // 当前商品列表滚动的位置
  searchShops: [], // 商家搜索结果
  orders: [], // 订单
  isFocus: false,
  routerLoading: false
}
