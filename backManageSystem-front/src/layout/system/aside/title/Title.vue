<template>
  <template v-if="!siderType">
    <h3 class="asideTitle">
      <img src="@/assets/logo.png" alt="logo" /><br />
      <span>后台管理</span>
    </h3>
  </template>
  <template v-else="siderType">
    <img class="favicon" src="@/assets/favicon.jpg" alt="logo" /><br />
  </template>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStore } from '@/stores/index'
let { siderType } = storeToRefs(useStore())
</script>

<style scoped>
.asideTitle {
  text-align: center;
  color: white;
}
.asideTitle img {
  width: 100px;
}
.favicon {
  width: 50px;
  margin: 8px;
}
</style>
