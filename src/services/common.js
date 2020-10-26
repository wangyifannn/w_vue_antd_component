import axios from '@/utils/request/index'
// 加载项目菜单
export function projectDataApi() {
  return axios.request({ url: '/orderss', method: 'get' })
}
// 错误上报
export function saveErrorLogger(data) {
  return axios.request({ url: '/error/logs', method: 'post', data })
}