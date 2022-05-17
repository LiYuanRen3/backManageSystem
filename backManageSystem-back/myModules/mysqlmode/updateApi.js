const mysql = require('mysql');
const config = require('../sqlConfigApi');
const pool = mysql.createPool(config);

const roleType = require('../myType/roleType')
const addSubType = require('../myType/addSubType')


// 修改用户金额
function upBalance(userBalance, money, userId, IncreaseReduce, userType) {
  return new Promise((resolve, reject) => {
    let balance = null;
    // 判断修改类型
    if (IncreaseReduce === addSubType.Increase) {
      balance = parseFloat(userBalance) + parseFloat(money);
    } else if (IncreaseReduce === addSubType.Reduce) {
      balance = parseFloat(userBalance) - parseFloat(money);
    }
    // 执行修改操作
    let sql = null;
    if (userType === roleType.customer) {
      sql = 'UPDATE customer SET cust_balance = ? WHERE cust_id = ?;';
    } else if (userType === roleType.seller) {
      sql = 'UPDATE customer SET cust_balance = ? WHERE sel_link = ?;';
    }
    pool.query(sql, [balance, userId], function (err) {
      if (err) {
        reject({
          meta: { statu: false, error: err }
        })
      } else {
        resolve({
          meta: { statu: true }
        });
      }
    })
  })
}

// 修改购物车
function updataCartCount(cartId, goodCount) {
  return new Promise((resolve, reject) => {
    let sql = 'UPDATE tab_cart SET cart_count = ? WHERE cart_id = ?;';
    pool.query(sql, [goodCount, cartId], function (err) {
      if (err) {
        reject({
          meta: { statu: false, error: err }
        })
      } else {
        resolve({
          meta: { statu: true }
        });
      }
    })
  })
}


function upUsersInfo(sql) {
  console.log(sql);
  return new Promise((resolve, reject) => {
    pool.query(sql, function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, error: err }
        })
      } else {
        resolve({
          meta: { statu: true }
        });
      }
    })
  })
}

module.exports = {
  upBalance,
  updataCartCount,
  upUsersInfo
}
