import $http from '@/api/requst'

// 获取角色
const obtainRoleList = () =>
  $http({
    url: '/backg/system/permissions/obtainRoles',
    method: 'GET'
  })

// 删除角色
const delRoles = (delId: string) =>
  $http({
    url: '/backg/system/permissions/deleteRoles',
    method: 'POST',
    data: { delId }
  })

// 添加
const addRoles = (roleInfo: any) =>
  $http({
    url: '/backg/system/permissions/addRoles',
    method: 'POST',
    data: { roleInfo }
  })

const searchRole = (roleName: string) =>
  $http({
    url: '/backg/system/permissions/searchRoles',
    method: 'POST',
    data: { roleName }
  })

export { obtainRoleList, delRoles, addRoles, searchRole }
