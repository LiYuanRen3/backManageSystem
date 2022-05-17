<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
      <span class="no-redirect" v-if="index === breadcrumbList.length - 1">
        {{ item.meta.title }}
      </span>
      <span class="redirect" v-else>
        {{ role === 'admin' ? item.meta.admTitle : item.meta.superAdmTitle }}
      </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { storageLocal } from '@/utils/storage'

// 数据
const route = useRoute()
const breadcrumbList = ref<Array<any>>([])
const { role } = JSON.parse(storageLocal.getItem('information'))

// 方法
const initBreadcrumbList = () => {
  breadcrumbList.value = route.matched
}
watch(
  route,
  () => {
    initBreadcrumbList()
  },
  { deep: true, immediate: true }
)
</script>

<style scoped>
.no-redirect {
  color: #97a8be;
  cursor: text;
}
.redirect {
  color: #666;
  font-weight: 600;
  cursor: pointer;
}
</style>
