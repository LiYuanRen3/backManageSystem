<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar
        shape="square"
        :size="40"
        src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
      />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useStoreLogin } from '@/stores/login/index'
let loginStore = useStoreLogin()

// 退出登录
const logout = () => {
  loginStore.AccountLogout()
}
</script>

<style scoped></style>
