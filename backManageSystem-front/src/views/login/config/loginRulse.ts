export default {
  admName: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur'
    },
    {
      min: 3,
      max: 7,
      message: '用户名长度必去在3到7之间',
      trigger: 'blur'
    }
  ],
  admPassword: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      min: 6,
      max: 18,
      message: '密码长度必去在6到18之间',
      trigger: 'blur'
    }
  ]
}

