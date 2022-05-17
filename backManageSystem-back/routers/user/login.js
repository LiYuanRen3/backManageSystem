const express = require('express');
const router = express.Router();

// 导入自定义角色模块
const roleType = require('../../myModules/myType/roleType')
const selectApi = require('../../myModules/mysqlmode/selectApi')
const verifyType = require('../../myModules/myType/verifyType')

// 顾客用户名登录
router.post('/custNameLogin', function (req, res) {
  // 拿取body数据
  let { userName, userPassword } = req.body;
  // 判断是否有该用户
  selectApi.custVerify(userName, userPassword, verifyType.uname).then(custValue => {
    res.send({
      data: {
        info: custValue.data.custInfo,
        role: roleType.customer,
        token: custValue.data.custToken
      },
      meta: { statu: true }
    })
  }).catch(error => {
    console.log(error);
    res.send({
      meta: {
        statu: false,
        msg: '登录失败：用户名不存在，或密码错误！'
      }
    })
  })
})
// 手机号登陆
router.post('/custPhoneLogin', function (req, res) {
  // 拿取body数据
  let { userPhone, userPassword } = req.body;
  // 判断是否有该用户
  selectApi.custVerify(userPhone, userPassword, verifyType.uphone).then(custValue => {
    res.send({
      data: {
        info: custValue.data.custInfo,
        role: roleType.customer,
        token: custValue.data.custToken
      },
      meta: { statu: true }
    })
  }).catch(error => {
    console.log(error);
    res.send({
      meta: {
        statu: false,
        msg: '登录失败：手机号不存在，或密码错误！'
      }
    })
  })
})

// 用户名登录
router.post('/selNameLogin', function (req, res) {
  // 拿取body数据
  let { userName, userPassword } = req.body;
  // 判断是否有该用户
  selectApi.selVerify(userName, userPassword, verifyType.uname).then(selValue => {
    res.send({
      data: {
        info: selValue.data.selInfo,
        role: roleType.seller,
        token: selValue.data.selToken
      },
      meta: { statu: true }
    })
  }).catch(error => {
    console.log(error);
    res.send({
      meta: {
        statu: false,
        msg: '登录失败：用户名不存在，或密码错误！'
      }
    })
  })
})
// 手机号登陆
router.post('/selPhoneLogin', function (req, res) {
  // 拿取body数据
  let { userPhone, userPassword } = req.body;
  // 判断是否有该用户
  selectApi.selVerify(userPhone, userPassword, verifyType.uphone).then(selValue => {
    res.send({
      data: {
        info: selValue.data.selInfo,
        role: roleType.seller,
        token: selValue.data.selToken
      },
      meta: { statu: true }
    })
  }).catch(error => {
    console.log(error);
    res.send({
      meta: {
        statu: false,
        msg: '登录失败：用户名不存在，或密码错误！'
      }
    })
  })
})

// 管理员登录
router.post('/admLogin', function (req, res) {
  // 拿取body数据
  let { admName, admPassword } = req.body;
  // 调用cust函数,判断是否登录成为普通用户
  selectApi.admVerify(admName, admPassword).then(value => {
    let adminType = null;
    if (parseInt(value.data.admInfo.level) === 1) {
      adminType = roleType.superAdmin
    } else {
      adminType = roleType.admin
    }
    console.log(value.data.admInfo.level);
    res.send({
      data: {
        info: value.data.admInfo,
        role: adminType,
        token: value.data.admToken,
      },
      meta: {
        statu: true,
        msg: '登录成功：欢迎管理员！',
      }
    })
  }).catch(error => {
    console.log(error);
    res.send({
      meta: {
        statu: false,
        msg: '登录失败：用户名不存在，或密码错误！'
      }
    })
  })
})

module.exports = router;
