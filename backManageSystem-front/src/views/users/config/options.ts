const tableDataCust = [
  {
    label: '顾客id',
    prop: 'id'
  },
  {
    label: '顾客账号',
    prop: 'name'
  },
  {
    label: '顾客号码',
    prop: 'phone'
  },
  {
    label: '顾客余额',
    prop: 'balance'
  },
  {
    label: '顾客积分',
    prop: 'integral'
  },
  {
    label: 'VIP',
    prop: 'VIP'
  },
  {
    label: '操作',
    prop: 'action'
  }
]

const tableDataSeller = [
  {
    label: '店铺id',
    prop: 'id'
  },
  {
    label: '卖家账号',
    prop: 'name'
  },
  {
    label: '店铺号码',
    prop: 'phone'
  },
  {
    label: '店铺名字',
    prop: 'store'
  },
  {
    label: '店铺简介',
    prop: 'info'
  },
  {
    label: '操作',
    prop: 'action'
  }
]

const tableDataAdmin = [
  {
    label: '管理员id',
    prop: 'id'
  },
  {
    label: '管理员账号',
    prop: 'name'
  },
  {
    label: '级别',
    prop: 'super'
  },
  {
    label: '操作',
    prop: 'action'
  }
]

const TableType = {
  customer: 'customer',
  seller: 'seller',
  admin: 'admin'
}

const custRules = {
  custName: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    {
      min: 3,
      max: 7,
      message: '用户名长度必须在3到7之间',
      trigger: 'blur'
    }
  ],
  custPhone: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    },
    {
      len: 11,
      message: '手机号必须为11位',
      trigger: 'blur'
    },
    {
      pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
      message: '请输入正确的手机号',
      trigger: 'blur'
    }
  ],
  custPassword: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      min: 6,
      max: 18,
      message: '密码长度必须在6到18之间',
      trigger: 'blur'
    }
  ],
  admLevel: [
    {
      required: true,
      message: '请选择顾客级别！',
      trigger: 'blur'
    }
  ]
}

const selRules = {
  selName: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur'
    },
    {
      min: 3,
      max: 7,
      message: '用户名长度必须在3到7之间',
      trigger: 'blur'
    }
  ],
  selPassword: [
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
  ],
  selPhone: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    },
    {
      len: 11,
      message: '手机号必须为11位',
      trigger: 'blur'
    },
    {
      pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
      message: '请输入正确的手机号',
      trigger: 'blur'
    }
  ],
  selstore: [
    {
      required: true,
      message: '请输入店铺名',
      trigger: 'blur'
    },
    {
      min: 3,
      message: '店铺名必须大于三个字',
      trigger: 'blur'
    }
  ],
  selinfo: [
    {
      required: true,
      message: '请输入店铺简介',
      trigger: 'blur'
    },
    {
      min: 18,
      message: '店铺名必须大于18个字',
      trigger: 'blur'
    }
  ]
}

const admRules = {
  admName: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur'
    },
    {
      min: 3,
      max: 7,
      message: '用户名长度必须在3到7之间',
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
  ],
  admLevel: [
    {
      required: true,
      message: '请选择管理员级别！',
      trigger: 'blur'
    }
  ]
}

export {
  tableDataCust,
  tableDataSeller,
  tableDataAdmin,
  TableType,
  custRules,
  selRules,
  admRules
}
