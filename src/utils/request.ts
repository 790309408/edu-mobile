import axios from 'axios'
import { Toast } from 'vant'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 15000,
})

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const message = error.response?.data?.msg || error.message || '网络请求失败'
    Toast(message)
    return Promise.reject(error)
  },
)

export default request
