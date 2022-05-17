//建立mysql连接
const mysql = require('mysql');
const config = require('../sqlConfigApi');
const pool = mysql.createPool(config);

function queryRole() {
  return new Promise(function (resolve, reject) {
    let sql = 'SELECT * FROM tab_role;';
    pool.query(sql, function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, msg: '查询出错！', error: err }
        })
      } else {
        resolve({
          data: result,
          meta: { statu: true }
        })
      }
    })
  })
}

function delRole(roleId) {
  return new Promise((resolve, reject) => {
    let sql = 'DELETE FROM tab_role WHERE role_id = ?;';
    pool.query(sql, [roleId], function (err) {
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

function addRole(roleName, roleDescribe) {
  console.log(roleName, roleDescribe);
  return new Promise((resolve, reject) => {
    let sql = 'INSERT INTO tab_role(role_id,role_name,role_default,role_describe) VALUES(?,?,?,?);';
    pool.query(sql, [
      null,
      roleName,
      0,
      roleDescribe
    ], function (err) {
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

function selRoles(roleName) {
  return new Promise(function (resolve, reject) {
    let sql = `SELECT * FROM tab_role WHERE role_name LIKE '%${roleName}%';`;
    pool.query(sql, function (err, result) {
      if (err) {
        reject({
          meta: { statu: false, msg: '查询出错！', error: err }
        })
      } else {
        if (result.length > 0) {
          resolve({
            data: result,
            meta: { statu: true }
          })
        } else {
          reject({
            meta: { statu: false, }
          })
        }
      }
    })
  })
}

module.exports = {
  queryRole,
  delRole,
  addRole,
  selRoles
}
