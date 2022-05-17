<template>
  <el-container class="system-wrapper">
    <!-- 侧边栏 -->
    <el-aside class="systemAside">
      <!-- 标题 -->
      <Title />
      <!-- 菜单 -->
      <Menu />
    </el-aside>

    <el-container class="system-container">
      <!-- 头部 -->
      <el-header class="systemHead"><Nav /></el-header>
      <!-- 主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Menu from './aside/menu/Menu.vue'
import Title from './aside/title/Title.vue'
import Nav from './header/nav/Nav.vue'
</script>

<style scoped>
/* 主容器 */
.system-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
/* 侧边栏 */
.systemAside {
  width: auto !important;
  background: #2f4158;
}
/* 分容器 */
.system-container {
  height: calc(100vh);
}
/* 头部 */
.systemHead {
  padding: 0;
}
</style>
