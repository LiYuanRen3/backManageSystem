const express = require('express');
const router = express.Router();

const selectApi = require('../../myModules/mysqlmode/selectApi')
const insertApi = require('../../myModules/mysqlmode/insertApi')
const updateApi = require('../../myModules/mysqlmode/updateApi')

// 导入类型模块
const roleType = require('../../myModules/myType/roleType')
const addSubType = require('../../myModules/myType/addSubType')
const cashLogType = require('../../myModules/myType/cashLogType')

// 充钱接口（打钱打钱！！！）
// jwtAPI.verifyPower,
router.post('/topUp', function (req, res) {
  let { userId, money } = req.body;
  // 查询用户信息
  selectApi.selectIdCust(userId, roleType.customer).then(custValue => {
    let { uinfo } = custValue.data
    // 添加用户金额
    let userBalance = uinfo.cust_balance;
    let IncreaseReduce = addSubType.Increase;
    updateApi.upBalance(
      userBalance,
      money,
      userId,
      IncreaseReduce,
      roleType.customer
    ).then(() => {
      // 充值成功记录日志
      insertApi.cashLog(cashLogType.topUp, money, userId)
      // 返回状态
      res.send({
        dmeta: {
          statu: true,
          msg: '充值成功！'
        }
      })
    })
  }).catch((error) => {
    console.log(error);
    res.send({
      meta: {
        statu: false,
        msg: '充值失败！'
      }
    })
  })
})

// 结算
router.post('/purchase', function (req, res) {
  let { userId, totalPrices, addrId, cartInfo } = req.body;
  // 查询用户信息
  selectApi.selectIdCust(userId, roleType.customer).then(custValue => {
    let custBalance = custValue.data.uinfo.cust_balance
    // 判断金额是否足够
    if (parseFloat(custBalance) >= parseFloat(totalPrices)) {
      for (let i = 0; i < cartInfo.length; i++) {
        let { selId, goodId, goodPrice, goodCount } = cartInfo[i];
        // 扣除用户余额
        updateApi.upBalance(custBalance, goodPrice, userId, addSubType.Reduce, roleType.customer).then(() => {
          // 记录日志
          insertApi.cashLog(cashLogType.shop, goodPrice, userId);
        })
        // 充值商家余额
        selectApi.selectIdCust(selId, roleType.seller).then(selValue => {
          let selCustId = selValue.data.uinfo.cust_id
          let selBalance = selValue.data.uinfo.cust_balance;
          updateApi.upBalance(selBalance, goodPrice, selId, addSubType.Increase, roleType.seller).then(() => {
            // 记录日志
            insertApi.cashLog(cashLogType.topUp, goodPrice, selCustId);
          })
        })
        // 提交订单
        insertApi.addDrders(userId, selId, addrId, goodPrice, goodId, goodCount);
      }
      res.send({
        meta: {
          statu: true,
          msg: '结算成功！'
        }
      })
    } else {
      res.send({
        meta: {
          statu: false,
          msg: '余额不足请充值...'
        }
      })
    }
  }).catch((error) => {
    console.log(error);
    res.send({
      meta: {
        statu: false,
        msg: '结算失败...'
      }
    })
  })
})

module.exports = router;
