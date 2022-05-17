//建立mysql连接
const mysql = require('mysql');
const config = require('../sqlConfigApi');
const pool = mysql.createPool(config);
let roleType = require('../myType/roleType')

function delSingleCart(cartId) {
  return new Promise((resolve, reject) => {
    let sql = 'DELETE tab_cart FROM tab_cart WHERE cart_id = ?;';
    pool.query(sql, [cartId], function (err) {
      if (err) {
        reject({
          meta: { statu: false, msg: '删除失败...', error: err }
        })
      } else {
        resolve({
          meta: { statu: true, msg: '删除成功！' }
        });
      }
    })
  })
}

function delAllCart(custId) {
  return new Promise((resolve, reject) => {
    let sql = 'DELETE tab_cart FROM tab_cart WHERE cust_id = ?;';
    pool.query(sql, [custId], function (err) {
      if (err) {
        reject({
          meta: { statu: false, msg: '清空失败...', error: err }
        })
      } else {
        resolve({
          meta: { statu: true, msg: '清空成功！' }
        });
      }
    })
  })
}

function delUsers(delType, userId) {
  return new Promise((resolve, reject) => {
    let sql = '';
    if (delType === roleType.customer) {
      sql = 'DELETE FROM customer WHERE cust_id = ?;';
    } else if (delType === roleType.admin) {
      sql = 'DELETE FROM tab_adm WHERE adm_id = ?;';
    } else if (delType === roleType.seller) {
      sql = 'DELETE FROM tab_seller WHERE sel_id = ?;';
    }
    pool.query(sql, [userId], function (err) {
      if (err) {
        reject({
          meta: { statu: false, msg: '删除失败...', error: err }
        })
      } else {
        resolve({
          meta: { statu: true, msg: '删除成功！' }
        });
      }
    })
  })
}


module.exports = {
  delSingleCart,
  delAllCart,
  delUsers
}
