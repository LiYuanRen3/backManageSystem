import $http from '@/api/requst'

// 获取用户数据
const obtainUserList = (obtainType: string, pageNum: number) =>
  $http({
    url: '/backg/system/account/obtainUserList',
    method: 'POST',
    data: { obtainType, pageNum }
  })

// 根据id获取用户
// 删除用户
const obtainIdUsers = (obtainType: string, userId: string) =>
  $http({
    url: '/backg/system/account/obtainIdUser',
    method: 'POST',
    data: { obtainType, userId }
  })

// 搜索用户
const searchUserList = (
  obtainType: string,
  searchName: string,
  pageNum: number
) =>
  $http({
    url: '/backg/system/account/searchUsers',
    method: 'POST',
    data: { obtainType, searchName, pageNum }
  })

// 添加用户
const AddUsers = (addType: string, userInfo: any) =>
  $http({
    url: '/backg/system/account/addUserInfo',
    method: 'POST',
    data: { addType, userInfo }
  })

// 删除用户
const delUsers = (delType: string, userId: string) =>
  $http({
    url: '/backg/system/account/deleteUsers',
    method: 'POST',
    data: { delType, userId }
  })

// 修改用户
const updateUsers = (upType: string, upUserinfo: any) =>
  $http({
    url: '/backg/system/account/upUsers',
    method: 'POST',
    data: { upType, upUserinfo }
  })



export { obtainUserList, searchUserList, AddUsers, delUsers, obtainIdUsers,updateUsers }
