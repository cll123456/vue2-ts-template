import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Message, MessageBox } from 'element-ui'
import { UserModule } from '@/store/modules/user';

const request = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api/' : './ncdmz/iamp', // url = base url + request url
  // timeout: 5000
  // withCredentials: true // send cookies when cross-domain requests
})


/**
 * 请求拦截
 */
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (UserModule.token.length > 0 && UserModule.token) {
    config.headers['Authorization'] = UserModule.token
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


interface responseConfig {
  // 响应结果包含status,0 是成功
  status: number
}
/**
 * 响应拦截
 */
// Add a request interceptor
request.interceptors.response.use(function (response: AxiosResponse<responseConfig>) {
  // Do something before request is sent
  if (response.data.status === 0) {
    return response;
  }
  Message.error('后台接口异常，请联系管理员')
  return Promise.reject(response);
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});



// Response interceptors
// service.interceptors.response.use(
//   response => {
//     return Promise.resolve(response)
//   },
//   error => {
//     if (error.response.status === 401 || error.response.status === 403) {
//       UserModule.ResetToken()
//       location.reload()
//     }
//     /* eslint-disable */
//     if (error.response.data.code == '2000009') {
//       return Promise.reject(error)
//     }
//     var message =
//       (error.response && error.response.data.message) ||
//       (error.message.indexOf('timeout') > -1 ? '请求超时' : error.message)
//     if (
//       navigator.userAgent.match(
//         /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
//       )
//     ) {
//       Message({ message: message, type: 'error' })
//     } else {
//       console.log(error)
//       MessageBox.alert(message, '错误提示', { type: 'error' })
//     }
//     return Promise.reject(error)
//   }
// )

export default request



