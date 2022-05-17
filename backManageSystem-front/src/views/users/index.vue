<template>
  <el-card>
    <el-row :gutter="20" class="tableNav">
      <!-- 搜索 -->
      <el-col :span="7">
        <el-input
          v-model="queryFrom.queryValue"
          placeholder="请输入搜索用户名"
          clearable
          @clear="restoreTable"
          @blur="restoreTable"
        />
      </el-col>
      <el-button type="primary" icon="Search" @click="searchUser()"
        >搜索</el-button
      >

      <!-- 添加 -->
      <el-dropdown class="tableOptions">
        <span class="el-dropdown-link">
          <el-button type="success" icon="CirclePlus">添加</el-button>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="openAddUser(true, TableType.customer)"
              >顾客</el-dropdown-item
            >
            <el-dropdown-item @click="openAddUser(true, TableType.seller)"
              >售货商</el-dropdown-item
            >
            <el-dropdown-item @click="openAddUser(true, TableType.admin)"
              >管理员</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- 表类型 -->
      <el-dropdown class="tableOptions">
        <span class="el-dropdown-link">
          <el-button type="info" class="el-dropdown-link" icon="Grid"
            >类型</el-button
          >
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="changeTableType(TableType.customer)"
              >顾客</el-dropdown-item
            >
            <el-dropdown-item @click="changeTableType(TableType.seller)"
              >售货商</el-dropdown-item
            >
            <el-dropdown-item @click="changeTableType(TableType.admin)"
              >管理员</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-row>

    <!-- 表格 -->
    <div class="tableBox">
      <Table
        :userList="tableFrom.userList"
        :roleType="tableFrom.roleType || ''"
        @DelAccount="DelAccount"
        @spreadAccount="spreadAccount"
      ></Table>
    </div>

    <!-- 分页 -->
    <div class="paging">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="queryFrom.showItems"
        :total="queryFrom.totaLength"
        @current-change="changePage"
      />
    </div>

    <!-- 添加用户对话框 -->
    <AddUser
      :addDialogStatu="addFrom.addDialogStatu"
      :roleType="addFrom.roleType || ''"
      @upAddDialogStatu="upAddDialogStatu"
      @dialogRefreshTab="dialogRefreshTab"
    ></AddUser>

    <!-- 编辑用户对话框 -->
    <UpUser
      :EditorDialogStatu="EditorFrom.EditorDialogStatu"
      :roleType="tableFrom.roleType || ''"
      :originalInfo="EditorFrom.originalInfo"
      @upEditorDialogStatu="upEditorDialogStatu"
      @dialogRefreshTab="dialogRefreshTab"
    ></UpUser>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/select/style/css'
import 'element-plus/es/components/option/style/css'

import {
  obtainUserList,
  searchUserList,
  delUsers,
  obtainIdUsers
} from '@/api/system/users'
import { TableType } from './config/options'
import Table from './module/table.vue'
import AddUser from './module/AddUser.vue'
import UpUser from './module/UpUser.vue'

// *数据* \\
let tableFrom = reactive<{
  roleType: string
  userList: any[]
}>({
  roleType: '',
  userList: []
})

let queryFrom = reactive<{
  queryValue: string
  pageNum: number
  showItems: number
  totaLength: number
}>({
  queryValue: '',
  pageNum: 1,
  showItems: 10,
  totaLength: 0
})

let addFrom = reactive<{
  addDialogStatu: boolean
  roleType: string
}>({ addDialogStatu: false, roleType: '' })

let EditorFrom = reactive<{
  EditorDialogStatu: boolean
  originalInfo: any
}>({
  EditorDialogStatu: false,
  originalInfo: ''
})

// *方法* \\
// 表格数据展示
// 初始化函数
const GetNumUserList = (roleType: string, pageNumItem: number): void => {
  obtainUserList(roleType, pageNumItem)
    .then((value) => {
      let {
        data: { list, pageNum }
      } = value
      tableFrom.userList = list
      tableFrom.roleType = roleType
      queryFrom.totaLength = pageNum
    })
    .catch((error) => {
      console.log(error)
    })
}
GetNumUserList(TableType.admin, queryFrom.pageNum)
// 改变表
const changeTableType = async (tabType: string) => {
  obtainUserList(tabType, 1)
    .then((value) => {
      let {
        data: { list, pageNum }
      } = value
      tableFrom.userList = list
      tableFrom.roleType = tabType
      queryFrom.totaLength = pageNum
    })
    .catch((error) => {
      console.log(error)
    })
}

// 搜索用户
// 搜索后还原表
const restoreTable = () => {
  if (queryFrom.queryValue.trim() === '') {
    GetNumUserList(tableFrom.roleType, queryFrom.pageNum)
  }
}
// 搜索
const searchUser = async () => {
  if (queryFrom.queryValue.trim() === '') return
  searchUserList(tableFrom.roleType, queryFrom.queryValue, queryFrom.pageNum)
    .then((value) => {
      let {
        data: { list, pageNum }
      } = value
      tableFrom.userList = list
      queryFrom.totaLength = pageNum
    })
    .catch(() => {
      ElMessage({
        message: '搜索不到该用户！',
        type: 'warning'
      })
      queryFrom.queryValue = ''
    })
}
// 换页操作
const changePage = (pageSize: number) => {
  queryFrom.pageNum = pageSize
  if (queryFrom.queryValue.trim() === '') {
    GetNumUserList(tableFrom.roleType, queryFrom.pageNum)
  } else {
    searchUser()
  }
}

// 添加用户
const upAddDialogStatu = (addStatu: boolean) => {
  addFrom.addDialogStatu = addStatu
}
const openAddUser = (addStatu: boolean, AddType: string) => {
  addFrom.roleType = AddType
  upAddDialogStatu(addStatu)
}

const dialogRefreshTab = () => {
  GetNumUserList(tableFrom.roleType, queryFrom.pageNum)
}
// 删除用户
const DelAccount = (userId: string) => {
  delUsers(tableFrom.roleType, userId)
    .then(() => {
      ElMessage({
        showClose: true,
        message: `删除成功!`,
        type: 'success'
      })
      GetNumUserList(tableFrom.roleType, queryFrom.pageNum)
    })
    .catch(() => {
      ElMessage({
        showClose: true,
        message: `删除失败!`,
        type: 'error'
      })
    })
}
// 编辑用户
const upEditorDialogStatu = (upStatu: boolean) => {
  EditorFrom.EditorDialogStatu = upStatu
}

// 显示修改信息
const spreadAccount = (userId: string) => {
  obtainIdUsers(tableFrom.roleType, userId)
    .then((value) => {
      console.log(value)
      let { info } = value.data
      // 用户信息
      EditorFrom.originalInfo = info
      // 用户标识
      EditorFrom.originalInfo.uid = userId
      upEditorDialogStatu(true)
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<style scoped>
.tableOptions {
  margin-left: 15px;
}

.tableNav {
  padding-left: 25%;
}

.tableBox {
  height: 530px;
  margin: 10px 0 10px 0;
}
</style>
