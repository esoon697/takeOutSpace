import axios from 'axios'
// import apiConfig from '../../config/api.config'
import {Toast} from 'mint-ui'

// axios.defaults.baseURL = apiConfig.baseURL

export default function ajax (url, data = {}, type = 'GET') {
  return new Promise((resolve, reject) => {
    let promise
    if (type === 'GET') {
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring('', dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      promise = axios({
        method: 'get',
        url,
        timeout: 5000
      })
    } else {
      promise = axios({
        method: 'post',
        url,
        data,
        timeout: 5000
      })
    }
    promise.then(response => {
      // console.log('response.data', response.data)
      resolve(response.data)
    }).catch(function (error) {
      // 失败了调用reject()
      if (error.stack.indexOf('timeout') > -1) {
        Toast('请求超时')
      }
      if (error.stack.indexOf('504') > -1) {
        Toast('服务器错误,请稍后重试')
      }
      reject(error)
    })
  })
}
