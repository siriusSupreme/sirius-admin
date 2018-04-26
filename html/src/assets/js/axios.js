
import axios from 'axios'
// import axios from 'axios-jsonp-pro'

import config from './config'
import Token from './Token'
import toastr from './toastr'

const token = new Token(config.tokenKey)
const source = axios.CancelToken.source()

const axiosInstance = axios.create({
  baseURL: config.baseURL,
  // timeout: 10000,
  withCredentials: true,
  responseType: 'json'
})

if (process.env === 'developments') {
  axiosInstance.defaults.baseURL = 'http://rap2api.taobao.org/app/mock/10074/'
}

axiosInstance.interceptors.request.use((options) => {
  const _token = token.getToken()

  // token 不存在 且 不是登录页发出的请求
  if (!_token && !/\/login.html$/.test(window.location.href)) {
    window.location.href = '/login.html'
    source.cancel('尚未登录')
  } else if (_token) {
    options.headers[config.tokenName] = _token
  }

  return options
}, (reason) => {
  toastr.error('Request Error')
  return Promise.reject(reason)
})

axiosInstance.interceptors.response.use((response) => {
  const data = response.data || JSON.parse(response.request.responseText)

  // TODO 登录失效处理
  if (data.code !== 0) {
    toastr.error(data.msg || '非法请求，响应异常')
    Promise.reject(data)
  }

  return data
}, (reason) => {
  toastr.error('Response Error')
  return Promise.reject(reason)
})

export default {...axiosInstance}
