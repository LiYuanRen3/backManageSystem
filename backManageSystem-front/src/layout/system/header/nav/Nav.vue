<template>
  <div class="navbar">
    <Hamburger />
    <Breadcrumb />
    <div class="navbar-right">
      <h3 class="admName">{{ name }}</h3>
      <Avatars />
    </div>
  </div>
</template>

<script setup lang="ts">
import Hamburger from '../module/Hamburger.vue'
import Breadcrumb from '../module/Breadcrumb.vue'
import Avatars from '../module/Avatars.vue'
import { storageLocal } from '@/utils/storage'

const { name } = JSON.parse(storageLocal.getItem('information'))
</script>

<style scoped>
.navbar {
  width: 100%;
  height: 60px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0 16px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;
}
.navbar-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.admName {
  margin-right: 10px;
}
::v-deep .navbar-item {
  display: inline-block;
  margin-left: 18px;
  font-size: 22px;
  color: #5a5e66;
  box-sizing: border-box;
  cursor: pointer;
}
</style>
