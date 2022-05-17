<template>
  <el-card>
    <el-row :gutter="20" class="tableNav">
      <!-- 搜索 -->
      <el-col :span="7">
        <el-input
          placeholder="请输入搜索角色名"
          clearable
          v-model="roleData.roleVal"
          @blur="reductionRoles"
          @clear="reductionRoles"
        />
      </el-col>
      <el-button type="primary" icon="Search" @click="seaRole">搜索</el-button>

      <!-- 添加 -->
      <el-button
        type="success"
        icon="CirclePlus"
        @click="addRoleFrom.roleDialogStatu = true"
        >添加角色</el-button
      >
    </el-row>

    <!-- 角色列表 -->
    <el-row :gutter="20" class="tableMain">
      <ul
        v-infinite-scroll="unlimitedLoad"
        class="infiniteList"
        style="overflow: auto"
      >
        <li
          v-for="item in roleData.infiniteList"
          :key="item.role_id"
          class="infinite-list-item"
        >
          <span>{{ item.role_name }}</span>
          <span class="describe">{{ item.role_describe }}</span>
          <el-button
            v-if="item.role_default != '1'"
            class="roleIcon"
            icon="Close"
            @click="delteRoles(item.role_id, item.role_name)"
          />
          <el-button v-else class="roleIcon" icon="UserFilled" />
        </li>
      </ul>
    </el-row>

    <!-- 添加角色对话框 -->
    <el-dialog
      v-model="addRoleFrom.roleDialogStatu"
      title="添加角色"
      width="30%"
    >
      <el-form
        label-width="80px"
        :rules="roleRules"
        ref="roleFromRef"
        :model="addRoleFrom"
      >
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="addRoleFrom.roleName" />
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDescribe">
          <el-input v-model="addRoleFrom.roleDescribe" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addRoleFrom.roleDialogStatu = false"
            >取消</el-button
          >
          <el-button type="primary" @click="addRoleinfo(roleFromRef)"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import {
  obtainRoleList,
  delRoles,
  addRoles,
  searchRole
} from '@/api/system/permissions'
import { roleRules } from './config/options'

// *数据* \\
let roleData = reactive<{
  roleList: any[]
  infiniteList: any[]
  roleNum: number
  roleVal: string
}>({
  roleList: [],
  infiniteList: [],
  roleNum: 10,
  roleVal: ''
})
let roleFromRef = ref()
let addRoleFrom = reactive({
  roleDialogStatu: false,
  roleName: '',
  roleDescribe: ''
})

// *方法* \\
// 获取角色列表
const initRoleList = async () => {
  let {
    data: { list }
  } = await obtainRoleList()
  roleData.roleList = list
  if (list.length <= roleData.roleNum) {
    roleData.infiniteList = roleData.roleList
  } else {
    roleData.infiniteList = roleData.roleList.slice(0, roleData.roleNum)
  }
}
initRoleList()

// 无线加载
const unlimitedLoad = () => {
  if (roleData.roleNum + 2 > roleData.roleList.length) {
    roleData.infiniteList = roleData.roleList
  } else {
    roleData.roleNum += 2
    roleData.infiniteList = roleData.roleList.slice(0, roleData.roleNum)
  }
}
// 删除角色
const delteRoles = (roleId: string, roleName: string) => {
  delRoles(roleId)
    .then(() => {
      ElMessage({
        showClose: true,
        message: `已删除${roleName}角色！`,
        type: 'success'
      })
      initRoleList()
    })
    .catch(() => {
      ElMessage({
        showClose: true,
        message: `删除${roleName}角色失败...`,
        type: 'error'
      })
    })
}
// 添加角色
const addRoleinfo = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      let roleInfo = addRoleFrom
      addRoles(roleInfo)
        .then(() => {
          ElMessage({
            showClose: true,
            message: `添加成功！`,
            type: 'success'
          })
          // 清空数据
          addRoleFrom.roleName = ''
          addRoleFrom.roleDescribe = ''
          addRoleFrom.roleDialogStatu = false
          // 重新获取
          initRoleList()
        })
        .catch(() => {
          ElMessage({
            showClose: true,
            message: `添加失败...`,
            type: 'error'
          })
        })
    } else {
      console.log('校验未通过!', fields)
    }
  })
}

// 搜索角色
const seaRole = () => {
  if (roleData.roleVal.trim() != '') {
    searchRole(roleData.roleVal)
      .then((value) => {
        let {
          data: { list }
        } = value
        roleData.infiniteList = list
      })
      .catch(() => {
        ElMessage({
          showClose: true,
          message: `搜索不到该角色。`,
          type: 'error'
        })
      })
  } else {
    ElMessage({
      showClose: true,
      message: `搜索内容不能为空！`,
      type: 'warning'
    })
  }
}
// 还原角色列表
const reductionRoles = () => {
  if (roleData.roleVal.trim() === '') {
    initRoleList()
  }
}
</script>

<style scoped>
.tableNav {
  padding-left: 25%;
}
.roleCard {
  margin: 20px 100px;
  line-height: 30px;
}
.roleCard /deep/ .el-card__body {
  padding: 0 5px;
}
.roleIcon {
  border: none;
  background: none;
}
.infiniteList {
  width: 100%;
  height: 590px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infiniteList li {
  height: 32px;
  border: 1px solid #868e96;
  line-height: 32px;
  border-radius: 5px;
  padding: 10px 10px 10px 20px;
  margin: 10px;
  display: flex;
  justify-content: space-between;
}
.describe {
  display: none;
  color: white;
}
.infiniteList li:hover {
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.15);
  background: #868e96;
}
.infiniteList li:hover .describe {
  display: block;
}
</style>
