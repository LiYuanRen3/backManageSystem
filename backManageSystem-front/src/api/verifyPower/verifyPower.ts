import $http from '../requst'

const verifyAdm = (token: string) =>
  $http({
    url: '/user/verifyLogin',
    method: 'POST',
    data: token
  })

export { verifyAdm }
