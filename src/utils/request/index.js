import HttpRequest, {
  setToken,
  formatSearch,
  checkToken,
  getRealToken,
  removeToken
} from '@/utils/request/request'

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? process.env.VUE_APP_API_BASE_URL
    : process.env.VUE_APP_API_BASE_URL

const axios = new HttpRequest(baseUrl)
export default axios

export {
  setToken,
  formatSearch,
  checkToken,
  getRealToken,
  removeToken,
}
