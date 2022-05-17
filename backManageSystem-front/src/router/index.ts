import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { storageLocal } from '@/utils/storage'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'system',
    component: () => import('@/layout/system/index.vue'),
    redirect: storageLocal.getItem('basePathUrl') + '',
    meta: {
      title: '后台管理系统',
      admTitle: '管理员面板',
      superAdmTitle: '超级管理员面板'
    },
    children: [
      {
        path: 'users',
        name: 'users',
        component: () => import('@/views/users/index.vue'),
        meta: {
          title: '用户列表'
        }
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('@/views/permissions/roles/index.vue'),
        meta: {
          title: '角色列表'
        }
      },
      {
        path: 'rights',
        name: 'rights',
        component: () => import('@/views/permissions/rights/index.vue'),
        meta: {
          title: '权限列表'
        }
      },
      {
        path: 'goods',
        name: 'goods',
        component: () => import('@/views/good/goods/index.vue'),
        meta: {
          title: '商品列表'
        }
      },
      {
        path: 'params',
        name: 'params',
        component: () => import('@/views/good/params/index.vue'),
        meta: {
          title: '分类参数'
        }
      },
      {
        path: 'categories',
        name: 'categories',
        component: () => import('@/views/good/categories/index.vue'),
        meta: {
          title: '商品分类'
        }
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('@/views/orders/index.vue'),
        meta: {
          title: '订单管理'
        }
      },
      {
        path: 'bulletin',
        name: 'bulletin',
        component: () => import('@/views/bulletin/index.vue'),
        meta: {
          title: '公告管理'
        }
      },
      {
        path: 'reports',
        name: 'reports',
        component: () => import('@/views/reports/index.vue'),
        meta: {
          title: '数据统计'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '管理员登录'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router
