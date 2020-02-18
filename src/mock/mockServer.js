import Mock from 'mockjs'
import data from './data.json'

Mock.mock('/goods', {code: 0, data: data.goods})
Mock.mock('/info', {code: 0, data: data.info})
Mock.mock('/ratings', {code: 0, data: data.ratings})
Mock.mock('/Address', {code: 0, data: data.Address})
Mock.mock('/FoodList', {code: 0, data: data.FoodList})
Mock.mock('/ShopList', {code: 0, data: data.ShopList})
Mock.mock('/SearchShopList', {code: 0, data: data.SearchShopList})
Mock.mock('/Sendcode', {code: 1, data: data.msg})
Mock.mock('/LoginSms', {code: 0, data: data.phone})
