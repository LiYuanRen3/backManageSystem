const express = require('express');
const router = express.Router();
//导入mysql模块
const mysql = require('mysql')
//建立mysql连接
const config = require('../../myModules/sqlConfigApi')
const pool = mysql.createPool(config)
const insertApi = require('../../myModules/mysqlmode/insertApi')

// 注册
router.post('/', function (req, res) {
  let { userName, userPassword, userPhone } = req.body;
  insertApi.insertCust(userName, userPassword, userPhone).then(value => {
    console.log(value);
    res.send({
      meta: {
        statu: true,
        msg: '注册成功！',
      }
    })
  }).catch(error => {
    console.log(error);
    res.send({
      meta: {
        statu: false,
        msg: '注册失败...',
      }
    })
  })
})

module.exports = router;
