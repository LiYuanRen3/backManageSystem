//建立mysql连接
const mysql = require('mysql');
const config = require('../sqlConfigApi');
const pool = mysql.createPool(config);
const formatDate = require('../formatDateApi')

let defaultAvatar = 'https://s3.bmp.ovh/imgs/2022/04/27/587dd850c198ff25.jpg'

function insertCust(userName, userPassword, userPhone, vip) {
  return new Promise(function (resolve, reject) {
    let level = 0;
    if (vip) { level = vip; }
    let sql = 'INSERT INTO customer(cust_id,cust_account,cust_pwd,cust_phone,cust_balance,cust_img,cust_integral,cust_vip) VALUES(?,?,?,?,?,?,?,?);';
    pool.query(sql, [
      null, // 顾客id
      userName, // 顾客账号
      userPassword,  // 顾客密码
      userPhone,  // 顾客号码
      0,  // 顾客余额
      defaultAvatar,  // 顾客头像
      0, // 顾客积分
      level, // vip,普通为0,vip为1
    ], function (err) {
      // 判断是否注册成功
      if (err) {
        reject({
          meta: { statu: false, error: err }
        })
      } else {
        resolve({
          meta: { statu: true, }
        })
      }
    })
  })
}

function insertSel(userName, userPassword, userPhone, selStore, selInfo) {
  return new Promise(function (resolve, reject) {
    let sql = 'INSERT INTO tab_seller(sel_id,sel_account,sel_pwd,sel_store,sel_info,sel_img,sel_local,sel_phone) VALUES(?,?,?,?,?,?,?,?);';
    pool.query(sql, [
      null,
      userName,
      userPassword,
      selStore,
      selInfo,
      'https://s3.bmp.ovh/imgs/2022/04/27/046b3521205c0e8d.png',
      `这是${userName}的小店。`,
      userPhone
    ], function (err) {
      // 判断是否注册成功
      if (err) {
        reject({
          meta: { statu: false, error: err }
        })
      } else {
        resolve({
          meta: { statu: true, }
        })
      }
    })
  })
}


function insertAdm(userName, userPassword, admSuper) {
  return new Promise(function (resolve, reject) {
    let level = 0;
    if (admSuper) { level = admSuper; }
    let sql = 'INSERT INTO tab_adm(adm_id,adm_account,adm_pwd,adm_super) VALUES(?,?,?,?);';
    pool.query(sql, [
      null,
      userName,
      userPassword,
      admSuper,
    ], function (err) {
      // 判断是否注册成功
      if (err) {
        reject({
          meta: { statu: false, error: err }
        })
      } else {
        resolve({
          meta: { statu: true, }
        })
      }
    })
  })
}

// 添加订单和订单详情
function addDrders(custId, selId, addrId, money, goodId, goodCount) {
  // 生成订单时间
  let timeStr = formatDate.format("YYYY-MM-DD hh:mm:ss");
  let sql = 'INSERT INTO tab_order(order_id,order_time,order_sum,order_done,cust_id,sel_id,addr_id) VALUES(?,?,?,?,?,?,?);';
  pool.query(sql, [null, timeStr, money, null, custId, selId, addrId], function (err, result) {
    if (err) { console.log(err); return; }
    let sql = 'INSERT INTO tab_orderdetails(detail_id,goods_id,detail_count,detail_sum) VALUES(?,?,?,?);';
    pool.query(sql, [result.insertId, goodId, goodCount, money], function (err, result) {
      if (err) { console.log(err); return; }
      console.log('订单提交成功！');
    })
  })
}

// 添加订单
function cashLog(dealType, dealMoney, userId) {
  let sql = 'INSERT INTO tab_cashlog(cashlog_id,cashlog_type,cashlog_money,cust_id) VALUES(?,?,?,?);';
  pool.query(sql, [null, dealType, parseFloat(dealMoney), userId], function (err, result) {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log(`用户id:${userId},${dealType}日志记录成功,本次交易金额为${dealMoney}。`);
    }
  })
}

function addCart(goodId, goodCount, custId, selId) {
  return new Promise((resolve, reject) => {
    let sql = 'INSERT INTO tab_cart(cart_id,goods_id,cart_count,cust_id,sel_id) VALUES(?,?,?,?,?);';
    pool.query(sql, [null, goodId, goodCount, custId, selId], function (err) {
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
  insertCust,
  addDrders,
  cashLog,
  addCart,
  insertSel,
  insertAdm
}
