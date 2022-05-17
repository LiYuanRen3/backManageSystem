import axios from 'axios'
import { storageLocal } from '@/utils/storage'
import { diffTokenTime } from '@/utils/auth'
import { useStoreLogin } from '@/stores/login'

// 创建HTTP实例
const $http = axios.create({
  // 初始url
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 超时时间返回
  timeout: 3000,
  // 请求头
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// 请求拦截
$http.interceptors.request.use(
  (config) => {
    // headers可能没有如果没有则变为空对象，有则不变
    config.headers = config.headers || {}
    // token只支持string和none类型，若取不到可以赋值为空字符串
    let token = storageLocal.getItem('token')

    if (token) {
      // 判读token是否过期
      if (diffTokenTime()) {
        const loginStore = useStoreLogin()
        loginStore.AccountLogout()
        return Promise.reject(new Error('toKen 已过期。请重新登录！'))
      }
      config.headers.Authorization = 'Bearer ' + token || ''
    }
    // 返回config
    return config
  },
  (error) => {
    return Promise.reject(new Error(error))
  }
)

// 响应拦截
$http.interceptors.response.use(
  (res) => {
    let meta = res.data.meta || ''
    if (meta.statu) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res.data)
    }
  },
  (error) => {
    return Promise.reject(new Error(error))
  }
)

export default $http
