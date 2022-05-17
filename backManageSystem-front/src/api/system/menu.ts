import $http from '@/api/requst'

const menuList = () => $http({ url: '/backg/menus' })

export { menuList }
