//建立mysql连接
const mysql = require('mysql');
const config = require('../sqlConfigApi');
const pool = mysql.createPool(config);

const jwtAPI = require('../jwtAPI')

// 导入类型模块
let roleType = require('../myType/roleType')
let shotType = require('../myType/shotType')
const verifyType = require('../myType/verifyType')

// 顾客验证
function custVerify(userNaPh, userPassword, verifytype) {
  return new Promise(function (resolve, reject) {
    let sql = '';
    if (verifytype === verifyType.uname) {
      sql = 'SELECT * FROM customer WHERE cust_account = ? AND cust_pwd = ?;'
    } else if (verifytype === verifyType.uphone) {
      sql = 'SELECT * FROM customer WHERE cust_phone = ? AND cust_pwd = ?;'
    }
    pool.query(sql, [userNaPh, userPassword], function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, error: err }
        })
      } else {
        if (result.length > 0) {
          // 普通用户信息
          let { cust_id, cust_account, cust_phone, cust_balance, cust_img, cust_integral, cust_vip } = result[0];
          let custInfo = {
            id: cust_id,// 用户id
            name: cust_account,// 用户名
            phone: cust_phone,// 用户手机号
            balance: cust_balance,// 用户余额
            avatars: cust_img,// 用户头像
            integral: cust_integral,// 用户积分
            level: cust_vip,// 用户级别
          }
          // 普通用户Token
          let custToken = jwtAPI.createToken({
            name: cust_account,
            role: roleType.customer
          })
          resolve({
            meta: { statu: true },
            data: {
              custInfo,
              custToken
            }
          })
        } else {
          reject({
            meta: { statu: false },
          })
        }
      }
    })
  })
}
// 售货商验证
function selVerify(userNaPh, userPassword, verifytype) {
  return new Promise(function (resolve, reject) {
    let sql = '';
    if (verifytype === verifyType.uname) {
      sql = 'SELECT * FROM tab_seller WHERE sel_account = ? AND sel_pwd = ?;'
    } else if (verifytype === verifyType.uphone) {
      sql = 'SELECT * FROM tab_seller WHERE sel_phone = ? AND sel_pwd = ?;'
    }
    pool.query(sql, [userNaPh, userPassword], function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, error: err }
        })
      } else {
        if (result.length > 0) {
          // 售货商信息
          let { sel_id, sel_account, sel_phone, sel_store, sel_info, sel_img, sel_local } = result[0];
          let selInfo = {
            id: sel_id,// 售货商id
            name: sel_account,// 售货商名字
            phone: sel_phone,// 售货商手机号
            shopStore: sel_store,// 店铺名
            shopInfo: sel_info,// 店铺简介
            shopLogo: sel_img,// 店铺logo
            shopLocal: sel_local,// 店铺详情
          }
          // 售货商Token
          let selToken = jwtAPI.createToken({
            name: sel_account,
            role: roleType.seller
          })
          resolve({
            meta: { statu: true },
            data: {
              selInfo,
              selToken
            }
          })
        } else {
          reject({
            meta: { statu: false },
          })
        }
      }
    })
  })
}
// 管理员验证
function admVerify(admName, admPassword) {
  return new Promise(function (resolve, reject) {
    let sql = 'select * from tab_adm where adm_account = ? and adm_pwd = ?;';
    pool.query(sql, [admName, admPassword], function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, error: err }
        })
      } else {
        if (result.length > 0) {
          // 管理员信息
          let { adm_id, adm_account, adm_super } = result[0];
          let admInfo = {
            id: adm_id,// 管理员id
            name: adm_account,// 管理员名字
            level: adm_super,// 管理员手机号
          }
          let adminType = null;
          if (parseInt(adm_super) === 1) {
            adminType = roleType.superAdmin
          } else {
            adminType = roleType.admin
          }
          // 管理员Token
          let admToken = jwtAPI.createToken({
            name: adm_account,
            level: adm_super,
            role: adminType
          })
          resolve({
            meta: { statu: true },
            data: {
              admInfo,
              admToken
            }
          })
        } else {
          reject({
            meta: { statu: false }
          })
        }
      }
    })
  })
}

// 根据用户名精准查询顾客
function selectNamePreciseUser(userName, userType) {
  return new Promise(function (resolve, reject) {
    let sql = ''
    if (userType === roleType.seller) {
      sql = 'SELECT * FROM tab_seller WHERE sel_account = ?;'
    } else if (userType === roleType.customer) {
      sql = 'SELECT * FROM customer WHERE cust_account = ?;';
    }
    pool.query(sql, [userName], function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, msg: '查询出错！', error: err }
        })
      } else {
        if (result.length > 0) {
          resolve({
            data: { info: result[0] },
            meta: { statu: true }
          })
        } else {
          reject({
            meta: { statu: false, msg: '未查询到数据。' }
          })
        }
      }
    })
  })
}
// 根据手机号精准查询顾客
function selectPhonePreciseUser(userPhone, userType) {
  return new Promise(function (resolve, reject) {
    let sql = ''
    if (userType === roleType.seller) {
      sql = 'SELECT * FROM tab_seller WHERE sel_phone = ?;'
    } else if (userType === roleType.customer) {
      sql = 'SELECT * FROM customer WHERE cust_phone = ?;';
    }
    pool.query(sql, [userPhone], function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, msg: '查询出错！', error: err }
        })
      } else {
        if (result.length > 0) {
          resolve({
            data: { info: result[0] },
            meta: { statu: true }
          })
        } else {
          reject({
            meta: { statu: false, msg: '未查询到数据。' }
          })
        }
      }
    })
  })
}

// 根据name精准查询管理员
function selectPhonePreciseAdmin(adminName) {
  return new Promise(function (resolve, reject) {
    let sql = 'SELECT * FROM tab_adm WHERE adm_account = ?;';
    pool.query(sql, [adminName], function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, msg: '查询出错！', error: err }
        })
      } else {
        if (result.length > 0) {
          resolve({
            data: { info: result[0] },
            meta: { statu: true }
          })
        } else {
          reject({
            meta: { statu: false, msg: '未查询到数据。' }
          })
        }
      }
    })
  })
}

// 查询顾客信息
function selectIdCust(userId, userType) {
  return new Promise((resolve, reject) => {
    let sql = null;
    if (userType === roleType.customer) {
      sql = 'SELECT * FROM customer WHERE cust_id = ?;';
    } else if (userType === roleType.seller) {
      sql = 'SELECT * FROM customer WHERE sel_link = ?;';
    }
    pool.query(sql, [userId], function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, error: err }
        })
      } else {
        resolve({
          data: { uinfo: result[0] },
          meta: { statu: true }
        });
      }
    })
  })
}
// 查询售货商信息
function selectIdSel(userId) {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM tab_seller WHERE sel_id = ?;'
    pool.query(sql, [userId], function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, error: err }
        })
      } else {
        resolve({
          data: { uinfo: result[0] },
          meta: { statu: true }
        });
      }
    })
  })
}

function selectIdUsers(selType, userId) {
  return new Promise((resolve, reject) => {
    let sql = '';
    if (selType === roleType.customer) {
      sql = "SELECT * FROM customer WHERE cust_id = ?;";
    } else if (selType === roleType.seller) {
      sql = "SELECT * FROM tab_seller WHERE sel_id != 1 AND sel_id = ?;";
    } else if (selType === roleType.admin) {
      sql = "SELECT * FROM tab_adm WHERE adm_id = ?;";
    }
    pool.query(sql, [userId], function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, error: err }
        })
      } else {
        resolve({
          data: { uinfo: result },
          meta: { statu: true }
        });
      }
    })
  })
}

// 返回顾客/售货商/管理员列表
function queryUserInfo(obtainType) {
  return new Promise(function (resolve, reject) {
    let sql = '';
    if (obtainType === roleType.customer) {
      sql = "SELECT * FROM customer;";
    } else if (obtainType === roleType.seller) {
      sql = "SELECT * FROM tab_seller WHERE sel_id != 1;";
    } else if (obtainType === roleType.admin) {
      sql = "SELECT * FROM tab_adm;";
    }
    pool.query(sql, [obtainType], function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, msg: '查询出错！', error: err }
        })
      } else {
        if (result.length > 0) {
          resolve({
            data: { info: result },
            meta: { statu: true }
          })
        } else {
          reject({
            meta: { statu: false, msg: '未查询到数据。' }
          })
        }
      }
    })
  })
}

function searchNameUsers(obtainType, userName) {
  return new Promise(function (resolve, reject) {
    let sql = '';
    if (obtainType === roleType.customer) {
      sql = `SELECT * FROM customer WHERE cust_account LIKE '%${userName}%' ;`;
    } else if (obtainType === roleType.seller) {
      sql = `SELECT * FROM tab_seller WHERE sel_account LIKE '%${userName}%' ;`;
    } else if (obtainType === roleType.admin) {
      sql = `SELECT * FROM tab_adm WHERE adm_account LIKE '%${userName}%' ;`;
    }
    pool.query(sql, [obtainType], function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, msg: '查询出错！', error: err }
        })
      } else {
        if (result.length > 0) {
          resolve({
            data: { info: result },
            meta: { statu: true }
          })
        } else {
          reject({
            meta: { statu: false, msg: '未查询到数据。' }
          })
        }
      }
    })
  })
}

// 加工用户数据
function processData(processType, userInfo) {
  let userData = {}
  if (processType === roleType.customer) {
    let vipStatus = '';
    if (parseInt(userInfo.cust_vip)) { vipStatus = '超级会员' } else { vipStatus = '普通顾客' }
    userData = {
      id: userInfo.cust_id,
      name: userInfo.cust_account,
      phone: userInfo.cust_phone,
      balance: userInfo.cust_balance,
      integral: userInfo.cust_integral,
      VIP: vipStatus,
    }
  } else if (processType === roleType.seller) {
    userData = {
      id: userInfo.sel_id,
      name: userInfo.sel_account,
      phone: userInfo.sel_phone,
      store: userInfo.sel_store,
      info: userInfo.sel_info,
    }
  } else if (processType === roleType.admin) {
    let vipStatus = '';
    if (parseInt(userInfo.adm_super)) { vipStatus = '系统管理员' } else { vipStatus = '普通管理员' }
    userData = {
      id: userInfo.adm_id,
      name: userInfo.adm_account,
      super: vipStatus,
    }

  }
  return userData;
}























































// 根据在销状态查询分类
function selectCategoryState(categoryState) {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM tab_category WHERE category_state = ?;';
    pool.query(sql, [categoryState], function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, error: err }
        })
      } else {
        resolve({
          data: { info: result },
          meta: { statu: true }
        });
      }
    })
  })
}
// 根据分类名称查询分类
function selectCategoryName(categoryName) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM tab_category where category_name = ?;`;
    pool.query(sql, [categoryName], function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, error: err }
        })
      } else {
        resolve({
          data: { info: result },
          meta: { statu: true }
        });
      }
    })
  })
}
// 根据分类id查询分类详情
function selectCateIdDatl(categoryId) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM tab_categorydetails WHERE category_id = ?;`;
    pool.query(sql, [categoryId], function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, error: err }
        })
      } else {
        resolve({
          data: { info: result },
          meta: { statu: true }
        });
      }
    })
  })
}
// 根据分类详情name查询分类(id)下的分类详情信息
function selectCateIdNameDatl(categoryId, cateDetailName) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM tab_categorydetails where category_id = ? AND cateDetail_name = ?;`;
    pool.query(sql, [categoryId, cateDetailName], function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, error: err }
        })
      } else {
        resolve({
          data: { info: result },
          meta: { statu: true }
        });
      }
    })
  })
}
// 根据分类详情id查询商品
function selectCateDatlIdGood(cateDetailId) {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM tab_goods WHERE cateDetail_id = ?;';
    pool.query(sql, [cateDetailId], function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, error: err }
        })
      } else {
        resolve({
          data: { info: result },
          meta: { statu: true }
        });
      }
    })
  })
}

// 根据商品id查询商品
function selectGoodId(goodId) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM tab_goods WHERE goods_id = ?;`;
    pool.query(sql, [goodId], function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, error: err }
        })
      } else {
        resolve({
          data: { info: result },
          meta: { statu: true }
        });
      }
    })
  })
}

// 根据商品id查询商品详情
function selectGoodDatlId(goodId) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM tab_goodsdetail where goods_id = ?`;
    pool.query(sql, [goodId], function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, error: err }
        })
      } else {
        resolve({
          data: { info: result },
          meta: { statu: true }
        });
      }
    })
  })
}

// 根据商品id查询商品详情图片
function selectGoodDatlImgId(goodId) {
  return new Promise((resolve, reject) => {
    let goodimg_sql = `SELECT * FROM tab_goodsdetailimage where goods_id = ?;`;
    pool.query(goodimg_sql, [goodId], function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, error: err }
        })
      } else {
        resolve({
          data: { info: result },
          meta: { statu: true }
        });
      }
    })
  })
}

// 根据用户id和商品id查询购物车
function selectCartCustGood(custId, goodId) {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM tab_cart WHERE cust_id = ? AND goods_id = ?;';
    pool.query(sql, [custId, goodId], function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, msg: '查询出错！', error: err }
        })
      } else {
        if (result.length > 0) {
          resolve({
            data: { info: result[0] },
            meta: { statu: true }
          });
        } else {
          resolve({
            meta: { statu: false }
          });
        }
      }
    })
  })
}

// 根据购物车id查找购物车
function selectCartId(cartId) {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM tab_cart WHERE cart_id = ?;';
    pool.query(sql, [cartId], function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, error: err }
        })
      } else {
        resolve({
          data: { info: result[0] },
          meta: { statu: true }
        });
      }
    })
  })
}
// 根据用户id查找购物车
function selectCartCustId(custId) {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM tab_cart WHERE cust_id = ?;';
    pool.query(sql, [custId], function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, error: err }
        })
      } else {
        resolve({
          data: { info: result },
          meta: { statu: true }
        });
      }
    })
  })
}








// 根据商品名称模糊搜索数据
function selectGoodNameLink(searchName) {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM tab_goods where goods_name LIKE ? ;';
    pool.query(sql, [`%${searchName}%`], function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, msg: '搜索出错！', error: err }
        })
      } else {
        if (result != '') {
          resolve({
            data: { list: result },
            meta: { statu: true }
          });
        } else {
          reject({
            meta: { statu: false, msg: '暂无该商品！' }
          })
        }
      }
    })
  })
}

// 根据商品名称模糊搜索数据并根据价格排序
function selectGoodNameLinkSort(searchName, showType) {
  return new Promise((resolve, reject) => {
    let sql = null;
    if (showType === shotType.down) {
      sql = 'SELECT * FROM tab_goods where goods_name LIKE ? ORDER BY goods_price DESC;';
    } else if (showType === shotType.up) {
      sql = 'SELECT * FROM tab_goods where goods_name LIKE ? ORDER BY goods_price ASC;';
    }
    pool.query(sql, [`%${searchName}%`], function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, msg: '搜索出错！', error: err }
        })
      } else {
        if (result != '') {
          resolve({
            data: { list: result },
            meta: { statu: true }
          });
        } else {
          reject({
            meta: { statu: false, msg: '暂无该商品！' }
          })
        }
      }
    })
  })
}



















// 查询该用户收货地址
function selecUserAddrAll(pool, userId) {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM tab_addr WHERE cust_id = ?;';
    pool.query(sql, [userId], function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, error: err }
        })
      } else {
        resolve({
          data: { address: result },
          meta: { statu: true }
        });
      }
    })
  })
}

// 查询收货地址
function selectIdAddr(addrId) {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM tab_addr WHERE addr_id = ?;';
    pool.query(sql, [addrId], function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, error: err }
        })
      } else {
        resolve({
          data: { address: result[0] },
          meta: { statu: true }
        });
      }
    })
  })
}

// 根据用户id返回订单信息
function selUidOrderAll(userId) {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM tab_order WHERE cust_id = ?;'
    pool.query(sql, [userId], function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, error: err }
        })
      } else {
        resolve({
          data: { info: result },
          meta: { statu: true }
        });
      }
    })
  })
}

// 根据订单id返回订单详情
function selOrderIdDatl(orderId) {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM tab_orderdetails WHERE detail_id = ?'
    pool.query(sql, [orderId], function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, error: err }
        })
      } else {
        resolve({
          data: { info: result[0] },
          meta: { statu: true }
        });
      }
    })
  })
}

module.exports = {
  custVerify,
  selVerify,
  admVerify,

  selectNamePreciseUser,
  selectPhonePreciseUser,
  selectPhonePreciseAdmin,

  selectIdCust,
  selectIdSel,

  selectCartCustGood,
  selectCartId,
  selectCartCustId,

  selectCategoryState,
  selectCateIdDatl,
  selectCateDatlIdGood,
  selectCategoryName,
  selectCateIdNameDatl,
  searchNameUsers,
  processData,

  selectGoodNameLink,
  selectGoodNameLinkSort,

  selectGoodId,
  selectGoodDatlId,
  selectGoodDatlId,
  selectGoodDatlImgId,

  selUidOrderAll,
  selOrderIdDatl,

  selecUserAddrAll,
  selectIdAddr,
  queryUserInfo,
  selectIdUsers
}
