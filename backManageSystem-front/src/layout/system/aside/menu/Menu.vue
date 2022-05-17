<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#2f4158"
    class="menu"
    :default-active="baseRouterUrl"
    text-color="#fff"
    :collapse="siderType"
    router
    unique-opened
  >
    <el-sub-menu :index="`${item.id}`" v-for="item in menus" :key="item.id">
      <template #title>
        <el-icon>
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item
        :index="`${items.path}`"
        v-for="items in item.children"
        :key="items.id"
        @click="savePath(items.path)"
      >
        <el-icon>
          <component :is="items.icon"></component>
        </el-icon>
        {{ items.authName }}
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
// 引入
import { reactive, ref } from 'vue'
import { menuList } from '@/api/system/menu'
import { storageLocal } from '@/utils/storage'

import { storeToRefs } from 'pinia'
import { useStore } from '@/stores/index'
let { siderType } = storeToRefs(useStore())

// 数据
let baseRouterUrl = storageLocal.getItem('basePathUrl') + '' || '/'

let menus = ref<Array<any>>([])

// 方法
const initMenuList = async () => {
  menuList()
    .then((value) => {
      let {
        data: { list }
      } = value
      menus.value = list
    })
    .catch((error) => {
      console.log(error)
    })
}
initMenuList()

let savePath = (menuPath: string) => {
  storageLocal.setItem('basePathUrl', menuPath)
}
</script>

<style scoped>
.menu {
  border: none;
}
</style>
