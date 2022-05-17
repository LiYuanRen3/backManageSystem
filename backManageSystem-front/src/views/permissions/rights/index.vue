<template>
  <el-card>
    <el-row :gutter="20" class="tableNav">
      <!-- 搜索 -->
      <el-col :span="7">
        <el-input placeholder="请输入搜索管理员名" clearable />
      </el-col>
      <el-button type="primary" icon="Search">搜索</el-button>

      <!-- 添加 -->
      <el-button type="success" icon="Operation">添加权限</el-button>
    </el-row>

    <!-- 角色列表 -->
    <el-row :gutter="20" class="tableMain">
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="id" label="管理员id" width="180" />
        <el-table-column prop="name" label="管理员账号" width="180" />
        <el-table-column prop="address" label="管理分类权限" />
        <el-table-column label="操作" width="180">
          <template #default>
            <el-button type="warning" icon="Edit" />
            <el-button type="danger" icon="Delete" />
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
const tableData = [
  {
    id: '1',
    name: 'lyr',
    address: '服装，护肤彩妆'
  },
  {
    id: '2',
    name: 'zsan',
    address: '无'
  },
  {
    id: '3',
    name: 'lisi',
    address: '家电'
  },
  {
    id: '4',
    name: 'wangwu',
    address: '数码，家电'
  }
]
</script>

<style scoped>
.tableNav {
  padding-left: 25%;
}
.tableMain {
  margin: 20px 0;
}
</style>
