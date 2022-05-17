import { defineStore } from 'pinia'
import { loginReq } from '@/api/login/login'
import { storageLocal } from '@/utils/storage'
import type { AccountType } from '@/types/login/type'
import router from '@/router/index'
import { setTokenTime } from '@/utils/auth'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'

export const useStoreLogin = defineStore('login', {
  state: () => {
    return {
      AccountInfo: {
        admName: 'lyrAdm',
        admPassword: '123456'
      }
    }
  },
  getters: {},
  actions: {
    AccountLogin(AccountInfo: AccountType): void {
      loginReq(AccountInfo).then(
        (value) => {
          let { data, meta } = value
          // 登录成功将token存入到本地存储
          storageLocal.setItem('token', data.token)
          // 保存用户信息
          let information = {
            id: data.info.id,
            name: data.info.name,
            level: data.info.level,
            role: data.role
          }
          storageLocal.setItem('information', JSON.stringify(information))
          // 保存token有效记录时间
          setTokenTime()
          // 提示
          ElMessage({
            showClose: true,
            message: meta.msg,
            type: 'success'
          })
          // 判断基本路由跳转
          if (data.role == 'admin') {
            storageLocal.setItem('basePathUrl', '/goods')
          } else if (data.role == 'superAdmin') {
            storageLocal.setItem('basePathUrl', '/users')
          }

          // 路由跳转
          let basePathUrl = storageLocal.getItem('basePathUrl') + '' || '/'
          router.replace(basePathUrl)
        },
        (reason) => {
          let { meta } = reason
          // 登录失败重置数据
          this.AccountInfo.admName = ''
          this.AccountInfo.admPassword = ''
          // 提示
          ElMessage({
            showClose: true,
            message: meta.msg,
            type: 'error'
          })
        }
      )
    },
    AccountLogout(): void {
      storageLocal.clear()
      // 提示
      ElMessage({
        showClose: true,
        message: '已退出系统...',
        type: 'warning'
      })
      router.replace('/login')
    }
  }
})
