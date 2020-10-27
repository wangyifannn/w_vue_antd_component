import axios from '@/utils/request/index'
// 错误上报
export function saveErrorLogger(data) {
  return axios.request({ url: '/error/logs', method: 'post', data })
}