const express = require('express');
const router = express.Router();
const permissionsSql = require('../../../myModules/mysqlmode/permissionsSql')

router.get('/obtainRoles', function (req, res) {
  permissionsSql.queryRole().then(value => {
    res.send({
      data: {
        list: value.data
      },
      meta: { statu: true }
    })
  }).catch(error => {
    console.log(error);
    res.send({
      meta: { statu: false }
    })
  })
})

router.post('/deleteRoles', function (req, res) {
  let { delId } = req.body;
  console.log(delId);
  permissionsSql.delRole(delId).then(() => {
    res.send({
      meta: { statu: true }
    })
  }).catch(() => {
    res.send({
      meta: { statu: false }
    })
  })
})

router.post('/addRoles', function (req, res) {
  let { roleInfo: { roleName, roleDescribe } } = req.body;
  permissionsSql.addRole(roleName, roleDescribe).then(() => {
    res.send({
      meta: { statu: true }
    })
  }).catch(() => {
    res.send({
      meta: { statu: false }
    })
  })
})

router.post('/searchRoles', function (req, res) {
  let { roleName } = req.body;
  permissionsSql.selRoles(roleName).then(value => {
    res.send({
      data: {
        list: value.data
      },
      meta: { statu: true }
    })
  }).catch(error => {
    console.log(error);
    res.send({
      meta: { statu: false }
    })
  })
})

module.exports = router;
