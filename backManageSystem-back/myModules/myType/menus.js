const admin = [
  {
    id: '1',
    authName: '商品管理',
    icon: 'Shop',
    children: [
      { id: '1_1', authName: '商品列表', path: '/goods', icon: 'Menu' },
      { id: '1_2', authName: '分类参数', path: '/params', icon: 'Menu' },
      { id: '1_3', authName: '商品分类', path: '/categories', icon: 'Menu' }
    ]
  },
  {
    id: '2',
    authName: '订单管理',
    icon: 'Tickets',
    children: [
      { id: '2_1', authName: '订单列表', path: '/orders', icon: 'Menu' }
    ]
  },
  {
    id: '3',
    authName: '公告管理',
    icon: 'Notification',
    children: [
      { id: '3_1', authName: '公告列表', path: '/bulletin', icon: 'Menu' }
    ]
  },
  {
    id: '4',
    authName: '数据统计',
    icon: 'PieChart',
    children: [
      { id: '4_1', authName: '数据报表', path: '/reports', icon: 'Menu' }
    ]
  }
]

const superAdmin = [
  {
    id: 1,
    authName: '用户管理',
    icon: 'UserFilled',
    children: [
      { id: 1, authName: '用户列表', path: '/users', icon: 'Menu' }
    ]
  },
  {
    id: 2,
    authName: '权限管理',
    icon: 'Setting',
    children: [
      { id: 1, authName: '角色列表', path: '/roles', icon: 'Menu' },
      { id: 2, authName: '权限列表', path: '/rights', icon: 'Menu' }
    ]
  }
]

module.exports = {
  admin,
  superAdmin
}
