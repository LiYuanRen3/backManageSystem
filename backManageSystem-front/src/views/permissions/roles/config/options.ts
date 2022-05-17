const roleRules = {
  roleName: [
    {
      required: true,
      message: '请输入角色名！',
      trigger: 'blur'
    }
  ],
  roleDescribe: [
    {
      required: true,
      message: '请输入角色描述',
      trigger: 'blur'
    }
  ]
}

export { roleRules }
