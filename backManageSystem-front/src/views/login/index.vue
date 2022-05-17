<template>
  <div class="login">
    <div class="loginBox">
      <h2>管理员登录</h2>
      <el-form
        ref="ruleFormRef"
        :model="AccountInfo"
        :rules="rules"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="admName">
          <el-input
            v-model="AccountInfo.admName"
            placeholder="请输入用户名"
            clearable
          />
        </el-form-item>
        <el-form-item label="密码" prop="admPassword">
          <el-input
            v-model="AccountInfo.admPassword"
            type="password"
            placeholder="请输入密码"
            show-password
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button
            class="submitBtn"
            type="primary"
            @click="submitForm(ruleFormRef, AccountInfo)"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { InitData } from '@/types/login/index'

export default defineComponent({
  setup() {
    let data = reactive(new InitData())

    return {
      ...toRefs(data)
    }
  }
})
</script>

<style scoped>
.login {
  width: 100%;
  height: calc(100vh);
  background: url(@/assets/systemBgImage.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
}

/* 登录框容器 */
.loginBox {
  width: 360px;
  height: 222px;
  padding: 20px;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  box-shadow: 0 0px 12px 5px rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.5);
}
/* 标题 */
.loginBox h2 {
  color: white;
  text-align: center;
}
/* 输入框 */
.loginBox /deep/ .el-input {
  width: 250px;
}

.submitBtn {
  width: 100px;
  /* height: 50px; */
  margin-left: 60px;
}
</style>
