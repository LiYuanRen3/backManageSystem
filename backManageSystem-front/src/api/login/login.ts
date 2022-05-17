import $http from '../requst'
import type { AccountType } from '@/types/login/type'

const loginReq = (data: AccountType) =>
  $http({
    url: '/user/login/admLogin',
    method: 'POST',
    data: data
  })
export { loginReq }
