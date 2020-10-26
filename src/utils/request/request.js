import axios from 'axios'
import Cookie from 'js-cookie'
import { message as Message } from 'ant-design-vue'
// 跨域认证信息 header 名
const xsrfHeaderName = 'Authorization'
// 获取token
export function getToken() {
  return Cookie.get(xsrfHeaderName)
}
export function getRealToken() {
  const token = getToken() || ''
  return token.replace('Bearer ', '')
}
/**
 * 设置认证信息
 * @param auth {Object}
 */
// 解析location中的参数
export function formatSearch(search) {
  var obj = {}
  var str = search.substr(1)
  var arr = str.split('&')
  for (var i = 0; i < arr.length; i++) {
    var newArr = arr[i].split('=')
    obj[newArr[0]] = newArr[1]
  }
  // console.log(obj);
  return obj
}
export function setToken(auth) {
  Cookie.set(xsrfHeaderName, auth.token)
  // 不设置cookie的过期时间
  // Cookie.set(xsrfHeaderName, 'Bearer ' + auth.token, {expires: auth.expireAt})
}
export function removeToken() {
  Cookie.remove(xsrfHeaderName)
}
export function checkToken() {
  if (Cookie.get(xsrfHeaderName)) {
    return true
  } else {
    return false
  }
}
/**
 * 解析 url 中的参数
 * @param url
 * @returns {Object}
 */
export function parseUrlParams(url) {
  const params = {}
  if (!url || url === '' || typeof url !== 'string') {
    return params
  }
  const paramsStr = url.split('?')[1]
  if (!paramsStr) {
    return params
  }
  const paramsArr = paramsStr.replace(/&|=/g, ' ').split(' ')
  for (let i = 0; i < paramsArr.length / 2; i++) {
    const value = paramsArr[i * 2 + 1]
    params[paramsArr[i * 2]] =
      value === 'true' ? true : value === 'false' ? false : value
  }
  return params
}
// const addErrorLog = (errorInfo) => {
//   const {
//     statusText,
//     status,
//     request: { responseURL },
//   } = errorInfo;
//   const info = {
//     type: 'ajax',
//     code: status,
//     mes: statusText,
//     url: responseURL,
//   };
//   if (!responseURL.includes('save_error_logger'))
//     store.dispatch('addErrorLog', info);
// };

class HttpRequest {
  constructor(baseUrl = process.env.VUE_APP_API_BASE_URL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        Authorization: getToken()
      }
    }
    return config
  }

  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }

  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        // 添加全局的loading...
        if (!Object.keys(this.queue).length) {
          // Spin.show() // 不建议开启，因为界面不友好
        }
        this.queue[url] = true
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
    // 响应拦截
    instance.interceptors.response.use(
      res => {
        this.destroy()
        const { status, data } = res
        const dataCode = data.code
        let redirectUrl = ''
        let url = ''
        // const origin = window.location.origin
        const loginOrigin = window.location.origin // TODO:代替换为登录框架的域名
        const page404 = loginOrigin + '/404'
        console.log('dataCode==', dataCode)
        switch (dataCode) {
          case 401:
            Message.error(res.data.message)
            return { code: data.code, message: data.message, stack: data.stack }
          case 403:
            redirectUrl = '/login'
            url =
              loginOrigin +
              '/login?model_url=' +
              window.location.origin +
              '/login&model_redirect=' +
              redirectUrl
            window.location.href = url
            break
          case 40001:
          case 404:
            window.location.href = page404
            break
          case 20000:
            return {
              data: res.data.data,
              code: res.data.code,
              message: res.data.message,
              status
            }
          default:
            console.log(res)
            return {
              data: res.data.data,
              code: res.data.code,
              status
            }
        }
      },
      error => {
        if (error.response && error.response.data)
          Message.error(error.response.data.message)
        this.destroy(url)
        // addErrorLog(error.response);
        return Promise.reject(error)
      }
    )
  }

  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
