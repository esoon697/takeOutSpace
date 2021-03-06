import ajax from './ajax'
// const BASE_URL = '/api'
// const BASE_URL = 'http://192.168.0.105:4000'
// console.log(process.env.API_HOST)
// const BASE_URL = process.env.API_HOST

// 1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)
// export const reqAddress = (geohash) => ajax(BASE_URL + '/position/' + geohash)
// export const reqAddress = (geohash) => ajax('/position/' + geohash)
// 2、获取食品分类列表](#2获取食品分类列表)
// export const reqFoodList = () => ajax(BASE_URL + '/index_category')
// export const reqFoodList = () => ajax('/index_category')
// 3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)
// export const reqShopList = (latitude, longitude) => ajax(BASE_URL + '/shops', {latitude, longitude})
// export const reqShopList = (latitude, longitude) => ajax('/shops', {latitude, longitude})
// 4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)
// export const reqSearchShopList = (keyword, geohash) => ajax(BASE_URL + '/search_shops', {keyword, geohash})
// export const reqSearchShopList = (keyword, geohash) => ajax('/search_shops', {keyword, geohash})
// 5、获取一次性验证码](#5获取一次性验证码)
// export const reqCaptcha = () => ajax(BASE_URL + '/captcha')
// export const reqCaptcha = () => ajax('/captcha')
// 6、用户名密码登陆](#6用户名密码登陆)
// export const reqLoginPwd = ({name, pwd, captcha}) => ajax(BASE_URL + '/login_pwd', {name, pwd, captcha}, 'POST')
// export const reqLoginPwd = ({name, pwd, captcha}) => ajax('/login_pwd', {name, pwd, captcha}, 'POST')
// 7、发送短信验证码](#7发送短信验证码)
// export const reqSendcode = (phone) => ajax(BASE_URL + '/sendcode', {phone})
// export const reqSendcode = (phone) => ajax('/sendcode', {phone})
// 8、手机号验证码登陆](#8手机号验证码登陆)
// export const reqLoginSms = (phone, code) => ajax(BASE_URL + '/login_sms', {phone, code}, 'POST')
// export const reqLoginSms = (phone, code) => ajax('/login_sms', {phone, code}, 'POST')
// 9、根据会话获取用户信息](#9根据会话获取用户信息)
// export const reqUserinfo = () => ajax(BASE_URL + '/userinfo')
// export const reqUserinfo = () => ajax('/userinfo')
// 10、用户登出](#10用户登出)
// export const reqLogout = () => ajax(BASE_URL + '/logout')
// export const reqLogout = () => ajax('/logout')

export const reqAddress = () => ajax('/Address')
export const reqFoodList = () => ajax('/FoodList')
export const reqShopList = () => ajax('/ShopList')
export const reqSearchShopList = () => ajax('/SearchShopList')
export const reqSendcode = () => ajax('/Sendcode')
export const reqLoginSms = () => ajax('/LoginSms')
// 商家信息请求,mock返回数据
export const reqShopInfo = () => ajax('/info')
// 商家商品请求,mock返回数据
export const reqShopGoods = () => ajax('/goods')
// 商家评价请求,mock返回数据
export const reqShopRatings = () => ajax('/ratings')
