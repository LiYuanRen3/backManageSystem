<template>
  <el-dialog
    v-model="addDialogStatu"
    :title="`添加${addTitle}`"
    width="30%"
    @close="handleClose"
  >
    <template v-if="roleType === TableType.customer">
      <el-form
        label-width="70px"
        :rules="custRules"
        ref="custFromRef"
        :model="custFrom"
      >
        <el-form-item label="用户名" prop="custName">
          <el-input v-model="custFrom.custName" />
        </el-form-item>
        <el-form-item label="手机号" prop="custPhone">
          <el-input v-model="custFrom.custPhone" />
        </el-form-item>
        <el-form-item label="密码" prop="custPassword">
          <el-input v-model="custFrom.custPassword" />
        </el-form-item>
        <el-form-item label="级别" prop="custLevel">
          <el-select
            v-model="custFrom.custLevel"
            placeholder="请选择顾客级别！"
          >
            <el-option label="普通顾客" value="0" />
            <el-option label="超级会员" value="1" />
          </el-select>
        </el-form-item>
        <div class="dialogFooter">
          <el-button
            class="dialogFooterBtn"
            type="primary"
            @click="handleConfirm(custFromRef)"
            >确认</el-button
          >
          <el-button class="dialogFooterBtn" @click="handleClose"
            >取消</el-button
          >
        </div>
      </el-form>
    </template>
    <template v-else-if="roleType === TableType.seller">
      <el-form
        label-width="80px"
        ref="selFromRef"
        :rules="selRules"
        :model="selFrom"
      >
        <el-form-item label="用户名" prop="selName">
          <el-input v-model="selFrom.selName" />
        </el-form-item>
        <el-form-item label="手机号" prop="selPhone">
          <el-input v-model="selFrom.selPhone" />
        </el-form-item>
        <el-form-item label="密码" prop="selPassword">
          <el-input v-model="selFrom.selPassword" />
        </el-form-item>
        <el-form-item label="店铺名" prop="selstore">
          <el-input v-model="selFrom.selstore" />
        </el-form-item>
        <el-form-item label="店铺简介" prop="selinfo">
          <el-input v-model="selFrom.selinfo" />
        </el-form-item>
      </el-form>
      <div class="dialogFooter">
        <el-button
          class="dialogFooterBtn"
          type="primary"
          @click="handleConfirm(selFromRef)"
          >确认</el-button
        >
        <el-button class="dialogFooterBtn" @click="handleClose">取消</el-button>
      </div>
    </template>
    <template v-else-if="roleType === TableType.admin">
      <el-form
        label-width="70px"
        :rules="admRules"
        ref="admFromRef"
        :model="admFrom"
      >
        <el-form-item label="用户名" prop="admName">
          <el-input v-model="admFrom.admName" />
        </el-form-item>
        <el-form-item label="密码" prop="admPassword">
          <el-input v-model="admFrom.admPassword" />
        </el-form-item>
        <el-form-item label="级别" prop="admLevel">
          <el-select
            v-model="admFrom.admLevel"
            placeholder="请选择管理员级别！"
          >
            <el-option label="普通管理员" :value="0" />
            <el-option label="系统管理员" :value="1" />
          </el-select>
        </el-form-item>
      </el-form>
      <div class="dialogFooter">
        <el-button
          class="dialogFooterBtn"
          type="primary"
          @click="handleConfirm(admFromRef)"
          >确认</el-button
        >
        <el-button class="dialogFooterBtn" @click="handleClose">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, reactive, computed } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import { TableType, custRules, selRules, admRules } from '../config/options'
import { AddUsers } from '@/api/system/users'
//* 数据 *\\
interface ListItem {
  addDialogStatu: boolean
  roleType: string
}
const props = defineProps<ListItem>()

let custFromRef = ref<FormInstance>()
let custFrom = reactive({
  custName: '',
  custPassword: '',
  custPhone: '',
  custLevel: ''
})
let selFromRef = ref<FormInstance>()
let selFrom = reactive({
  selName: '',
  selPassword: '',
  selPhone: '',
  selstore: '',
  selinfo: ''
})
let admFromRef = ref<FormInstance>()
let admFrom = reactive({
  admName: '',
  admPassword: '',
  admLevel: ''
})
let addTitle = computed(() => {
  if (props.roleType === TableType.customer) {
    return '顾客'
  } else if (props.roleType === TableType.seller) {
    return '售货商'
  } else if (props.roleType === TableType.admin) {
    return '管理员'
  }
})

//* 方法 *\\
interface EmitType {
  (e: 'upAddDialogStatu', addStatu: boolean): void
  (e: 'dialogRefreshTab'): void
}
const emit = defineEmits<EmitType>()

// 重置数据
const resetInfo = () => {
  // 顾客信息
  custFrom.custName = ''
  custFrom.custPassword = ''
  custFrom.custPhone = ''
  custFrom.custLevel = ''
  // 售货商信息
  selFrom.selName = ''
  selFrom.selPassword = ''
  selFrom.selPhone = ''
  selFrom.selstore = ''
  selFrom.selinfo = ''
  // 管理员信息
  admFrom.admName = ''
  admFrom.admPassword = ''
  admFrom.admLevel = ''
}

// 关闭
const handleClose = () => {
  resetInfo()
  emit('upAddDialogStatu', false)
}
// 确认添加
const handleConfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      let userInfo: any = null
      if (props.roleType === TableType.customer) {
        userInfo = custFrom
      } else if (props.roleType === TableType.seller) {
        userInfo = selFrom
      } else if (props.roleType === TableType.admin) {
        userInfo = admFrom
      }
      // 校验成功调用添加方法
      AddUsers(props.roleType, userInfo)
        .then(() => {
          ElMessage({
            showClose: true,
            message: `添加${addTitle.value}成功!`,
            type: 'success'
          })
          emit('dialogRefreshTab')
          handleClose()
        })
        .catch(() => {
          ElMessage({
            showClose: true,
            message: `添加${addTitle.value}失败!`,
            type: 'error'
          })
        })
    } else {
      console.log('校验未通过...', fields)
    }
  })
}
</script>

<style scoped>
.dialogFooter {
  display: flex;
  flex-direction: row-reverse;
}
.dialogFooterBtn {
  margin-left: 10px;
}
</style>
