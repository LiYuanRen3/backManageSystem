import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { AccountType } from './type'
import loginRulse from '@/views/login/config/loginRulse'
import { storeToRefs } from 'pinia'
import { useStoreLogin } from '@/stores/login'

export class InitData {
  // from表单ref
  ruleFormRef = ref<FormInstance>()

  // 数据
  store = useStoreLogin()
  loginStore = storeToRefs(this.store)
  AccountInfo = reactive<AccountType>(this.loginStore.AccountInfo.value)

  // 校验规则配置
  rules = reactive<FormRules>(loginRulse)

  // 方法
  submitForm = async (
    formEl: FormInstance | undefined,
    AccountInfo: AccountType
  ) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        // 校验成功调用登录方法
        this.store.AccountLogin(AccountInfo)
      } else {
        console.log('校验未通过...', fields)
      }
    })
  }
}
