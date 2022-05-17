<template>
  <template v-if="roleType === TableType.customer">
    <el-table :data="userList" stripe border style="width: 100%">
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-for="(item, index) in tableDataCust"
        :key="index"
      >
        <template #default="{ row }" v-if="item.prop === 'action'">
          <el-button type="warning" icon="Edit" @click="updateUser(row)" />
          <el-button type="danger" icon="Delete" @click="deleteUser(row)" />
        </template>
      </el-table-column>
    </el-table>
  </template>
  <template v-else-if="roleType === TableType.seller">
    <el-table :data="userList" stripe border style="width: 100%">
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-for="(item, index) in tableDataSeller"
        :key="index"
      >
        <template #default="{ row }" v-if="item.prop === 'action'">
          <el-button type="warning" icon="Edit" @click="updateUser(row)" />
          <el-button type="danger" icon="Delete" @click="deleteUser(row)" />
        </template>
      </el-table-column>
    </el-table>
  </template>
  <template v-else-if="roleType === TableType.admin">
    <el-table :data="userList" stripe border style="width: 100%">
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-for="(item, index) in tableDataAdmin"
        :key="index"
      >
        <template #default="{ row }" v-if="item.prop === 'action'">
          <el-button type="warning" icon="Edit" @click="updateUser(row)" />
          <el-button type="danger" icon="Delete" @click="deleteUser(row)" />
        </template>
      </el-table-column>
    </el-table>
  </template>
</template>

<script setup lang="ts">
import {
  tableDataCust,
  tableDataSeller,
  tableDataAdmin,
  TableType
} from '../config/options'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import { delUsers } from '@/api/system/users'

//* 数据 *\\
interface ListItem {
  userList: Array<any>
  roleType: String
}
defineProps<ListItem>()

//* 方法 *\\
interface EmitType {
  (e: 'DelAccount', userId: string): void
  (e: 'spreadAccount', userId: string): void
}
const emit = defineEmits<EmitType>()

const deleteUser = (row: any) => {
  let { id } = row
  ElMessageBox.confirm('是否删除用户？', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      emit('DelAccount', id)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除。'
      })
    })
}

const updateUser = (row: any) => {
  let { id } = row
  emit('spreadAccount', id)
}
</script>

<style scoped></style>
