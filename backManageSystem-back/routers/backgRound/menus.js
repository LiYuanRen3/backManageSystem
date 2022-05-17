const express = require('express');
const router = express.Router();
const roleType = require('../../myModules/myType/roleType')
const jwtAPI = require('../../myModules/jwtAPI')
const menuList = require('../../myModules/myType/menus')

router.get('/', function (req, res) {
  let token = req.headers.authorization.split(' ')[1] || '';
  jwtAPI.verifyPowerStay(token).then(value => {
    let { role } = value.data.info;
    if (role === roleType.superAdmin) {
      res.send({
        data: {
          list: menuList.superAdmin
        },
        meta: { statu: true },
      })
    } else if (role === roleType.admin) {
      res.send({
        data: {
          list: menuList.admin
        },
        meta: { statu: true },
      })
    }
  }).catch(err => {
    res.send({
      meta: { statu: false, msg: '获取失败!' },
    })
  })
})

module.exports = router;
