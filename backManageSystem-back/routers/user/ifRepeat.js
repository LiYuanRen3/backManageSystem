const express = require('express');
const router = express.Router();
let selectApi = require('../../myModules/mysqlmode/selectApi')
let roleType = require('../../myModules/myType/roleType')

// 判断用户名是否重复
router.post('/ifCustNameRepeat', function (req, res) {
  let { userName } = req.body
  selectApi.selectNamePreciseUser(userName, roleType.customer).then(() => {
    res.send({
      meta: { statu: true, msg: '用户名重复...' }
    })
  }).catch(error => {
    console.log(error);
    res.send({
      meta: { statu: false }
    })
  })
})

// 判断手机号是否重复
router.post('/ifCustPhoneRepeat', function (req, res) {
  let { userPhone } = req.body;
  selectApi.selectPhonePreciseUser(userPhone, roleType.customer).then(value => {
    res.send({
      meta: { statu: true, msg: '手机号重复...' }
    })
  }).catch(error => {
    console.log(error);
    res.send({
      meta: { statu: false }
    })
  })
})



router.post('/ifSelNameRepeat', function (req, res) {
  let { userName } = req.body
  selectApi.selectNamePreciseUser(userName, roleType.seller).then(() => {
    res.send({
      meta: { statu: true, msg: '用户名重复...' }
    })
  }).catch(error => {
    console.log(error);
    res.send({
      meta: { statu: false }
    })
  })
})

// 判断手机号是否重复
router.post('/ifSelPhoneRepeat', function (req, res) {
  let { userPhone } = req.body;
  selectApi.selectPhonePreciseUser(userPhone, roleType.seller).then(value => {
    res.send({
      meta: { statu: true, msg: '手机号重复...' }
    })
  }).catch(error => {
    console.log(error);
    res.send({
      meta: { statu: false }
    })
  })
})



module.exports = router;
