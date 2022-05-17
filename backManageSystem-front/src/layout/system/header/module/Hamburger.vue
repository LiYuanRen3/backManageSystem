<template>
  <div class="hamburger-container" @click="toggleClick">
    <el-icon>
      <component :is="siderType ? 'Expand' : 'Fold'"></component>
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStore } from '@/stores/index'
const mainStore = useStore()
const { siderType } = storeToRefs(useStore())
// 修改侧边栏状态
const toggleClick = () => {
  mainStore.changeSiderType()
}
</script>

<style scoped>
.hamburger-container {
  margin: 0 15px 0 0;
  box-sizing: border-box;
  cursor: pointer;
}
</style>
