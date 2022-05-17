const express = require('express');
const router = express.Router();
const selectApi = require('../../../myModules/mysqlmode/selectApi')
const insertApi = require('../../../myModules/mysqlmode/insertApi')
const deleteApi = require('../../../myModules/mysqlmode/deleteApi')
const updateApi = require('../../../myModules/mysqlmode/updateApi')
const roleType = require('../../../myModules/myType/roleType')

router.post('/obtainUserList', function (req, res) {
  let { obtainType, pageNum } = req.body;
  //得到页码数
  selectApi.queryUserInfo(obtainType).then((value) => {
    let { info } = value.data;
    let userList = [];
    let showName = 10;
    let start = (pageNum - 1) * showName;
    // 判断获取那个表
    if (obtainType === roleType.customer) {
      for (let i = 0; i < info.length; i++) {
        userList.push(selectApi.processData(obtainType, info[i]))
      }
    } else if (obtainType === roleType.seller) {
      for (let i = 0; i < info.length; i++) {
        userList.push(selectApi.processData(obtainType, info[i]))
      }
    } else if (obtainType === roleType.admin) {
      for (let i = 0; i < info.length; i++) {
        userList.push(selectApi.processData(obtainType, info[i]))
      }
    }
    // 返回数据
    let list = userList.slice(start, start + showName)
    res.send({
      data: {
        list,
        pageNum: userList.length
      },
      meta: { statu: true }
    })
  }).catch(err => {
    console.log(err);
    res.send({
      ...err
    })
  })
})

router.post('/obtainIdUser', function (req, res) {
  let { obtainType, userId } = req.body;
  console.log(req.body);
  selectApi.selectIdUsers(obtainType, userId).then(value => {
    let uinfo = value.data.uinfo[0]
    let userinfo = null;
    if (obtainType === roleType.customer) {
      userinfo = {
        custName: uinfo.cust_account,
        custPhone: uinfo.cust_phone,
        custLevel: uinfo.cust_vip,
      }
    } else if (obtainType === roleType.seller) {
      userinfo = {
        selName: uinfo.sel_account,
        selPhone: uinfo.sel_phone,
        selstore: uinfo.sel_store,
      }
    } else if (obtainType === roleType.admin) {
      userinfo = {
        admName: uinfo.adm_account,
        admLevel: uinfo.adm_super,
      }
    }
    res.send({
      data: {
        info: userinfo
      },
      meta: { statu: true }
    })
  }).catch(error => {
    console.log(error);
    res.send({
      meta: {
        statu: false
      }
    })
  })
})


router.post('/searchUsers', function (req, res) {
  let { obtainType, searchName, pageNum } = req.body;
  selectApi.searchNameUsers(obtainType, searchName).then(value => {
    let { info } = value.data;
    let userList = [];
    let showName = 10;
    let start = (pageNum - 1) * showName;
    // 判断获取那个表
    if (obtainType === roleType.customer) {
      for (let i = 0; i < info.length; i++) {
        userList.push(selectApi.processData(obtainType, info[i]))
      }
    } else if (obtainType === roleType.seller) {
      for (let i = 0; i < info.length; i++) {
        userList.push(selectApi.processData(obtainType, info[i]))
      }
    } else if (obtainType === roleType.admin) {
      for (let i = 0; i < info.length; i++) {
        userList.push(selectApi.processData(obtainType, info[i]))
      }
    }
    let list = userList.slice(start, start + showName)
    console.log(list);
    res.send({
      data: {
        list,
        pageNum: userList.length
      },
      meta: { statu: true }
    })
  }).catch(err => {
    console.log(err);
    res.send({
      ...err
    })
  })
})

router.post('/addUserInfo', function (req, res) {
  let { addType, userInfo } = req.body;
  console.log(addType, userInfo);
  if (addType === roleType.customer) {
    let { custName, custPassword, custPhone, custLevel } = userInfo
    insertApi.insertCust(custName, custPassword, custPhone, custLevel).then(value => {
      console.log(value);
      res.send({
        meta: {
          statu: true,
          msg: '添加成功！',
        }
      })
    }).catch(error => {
      console.log(error);
      res.send({
        meta: {
          statu: false,
          msg: '添加失败。',
        }
      })
    })
  } else if (addType === roleType.seller) {
    let { selName, selPassword, selPhone, selstore, selinfo } = userInfo
    insertApi.insertSel(selName, selPassword, selPhone, selstore, selinfo).then(value => {
      console.log(value);
      res.send({
        meta: {
          statu: true,
          msg: '添加成功！',
        }
      })
    }).catch(error => {
      console.log(error);
      res.send({
        meta: {
          statu: false,
          msg: '添加失败。',
        }
      })
    })
  } else if (addType === roleType.admin) {
    let { admName, admPassword, admLevel } = userInfo
    insertApi.insertAdm(admName, admPassword, admLevel).then(value => {
      console.log(value);
      res.send({
        meta: {
          statu: true,
          msg: '添加成功！',
        }
      })
    }).catch(error => {
      console.log(error);
      res.send({
        meta: {
          statu: false,
          msg: '添加失败。',
        }
      })
    })
  }
})

router.post('/deleteUsers', function (req, res) {
  let { delType, userId } = req.body;
  deleteApi.delUsers(delType, userId).then(value => {
    console.log(value);
    res.send({
      meta: {
        statu: true,
        msg: '删除成功！',
      }
    })
  }).catch(error => {
    console.log(error);
    res.send({
      meta: {
        statu: false,
        msg: '删除失败。',
      }
    })
  })
})

router.post('/upUsers', function (req, res) {
  let { upType, upUserinfo } = req.body;
  console.log(req.body);
  let sqlStr = ''
  // 判断更改那个表
  if (upType === roleType.customer) {
    let { uid, userInfo: { custName, custPhone, custLevel } } = upUserinfo
    sqlStr = `UPDATE customer SET cust_account = '${custName}',cust_phone = '${custPhone}',cust_vip = '${custLevel}' WHERE cust_id = '${uid}';`
  } else if (upType === roleType.seller) {
    let { uid, userInfo: { selName, selPhone, selstore } } = upUserinfo
    sqlStr = `UPDATE tab_seller SET sel_account = '${selName}',sel_phone = '${selPhone}',sel_store = '${selstore}' WHERE sel_id = '${uid}';`
  } else if (upType === roleType.admin) {
    let { uid, userInfo: { admName, admLevel } } = upUserinfo
    sqlStr = `UPDATE tab_adm SET adm_account = '${admName}',adm_super = '${admLevel}' WHERE adm_id = '${uid}';`
  }
  updateApi.upUsersInfo(sqlStr).then(value => {
    console.log(value);
    res.send({
      meta: {
        statu: true,
        msg: '编辑成功！',
      }
    })
  }).catch(error => {
    console.log(error);
    res.send({
      meta: {
        statu: false,
        msg: '编辑失败。',
      }
    })
  })
})


module.exports = router;
