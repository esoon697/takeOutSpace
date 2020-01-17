import axios from 'axios'
export default function ajax (url, data = {}, type = 'GET') {
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
    promise = axios(url)
  } else {
    promise = axios(url, data)
  }
  promise.then(response => {
    return response.data
  }).catch(error => {
    return error
  })
}
