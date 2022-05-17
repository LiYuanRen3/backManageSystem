import router from './index'
import { storageLocal } from '@/utils/storage'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'

// 前置路由守卫
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  let token = storageLocal.getItem('token') || ''
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 提示
      ElMessage({
        showClose: true,
        message: '请先登录！',
        type: 'warning'
      })
      next('/login')
    }
  }
})

// 后置路由守卫
router.afterEach((to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title as string //修改网页的title
  } else {
    document.title = '淘宝贝'
  }
})
