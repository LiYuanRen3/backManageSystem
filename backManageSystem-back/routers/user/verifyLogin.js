const express = require('express');
const router = express.Router();
//导入mysql模块
const mysql = require('mysql')
//建立mysql连接
const config = require('../../myModules/sqlConfigApi')
const pool = mysql.createPool(config)
// 导入jwt包
const jwt = require('jsonwebtoken');
// 导入secretKey秘钥
const secretKey = require('../../myModules/secretKeyApi')
const selectApi = require('../../myModules/mysqlmode/selectApi')
const roleType = require('../../myModules/myType/roleType')

// 接口路由
// 验证是否登录
router.post('/', function (req, res) {
  let token = req.body.token;
  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      res.send({
        verifyState: false,
        msg: 'token无效！'
      })
    } else {
      let { name, role } = decoded;
      if (role === roleType.customer || role === roleType.seller) {
        selectApi.selectNamePreciseUser(name).then((custValue) => {
          let selLinkId = custValue.data.info.sel_link || '';

          let { cust_id, cust_account, cust_phone, cust_balance, cust_img, cust_integral, cust_vip, sel_link } = custValue.data.info;
          let custInfo = {
            id: cust_id,// 用户id
            name: cust_account,// 用户名
            phone: cust_phone,// 用户手机号
            balance: cust_balance,// 用户余额
            avatars: cust_img,// 用户头像
            integral: cust_integral,// 用户积分
            level: cust_vip,// 用户级别
          }
          // 判断是否是售货商
          if (selLinkId) {
            selectApi.selectIdSel(selLinkId).then((selValue) => {
              console.log(selValue);
              // 售货商信息
              let { sel_id, sel_account, sel_phone, sel_store, sel_info, sel_img, sel_local } = selValue.data.uinfo;
              let selInfo = {
                id: sel_id,// 售货商id
                name: sel_account,// 售货商名字
                phone: sel_phone,// 售货商手机号
                shopStore: sel_store,// 店铺名
                shopInfo: sel_info,// 店铺简介
                shopLogo: sel_img,// 店铺logo
                shopLocal: sel_local,// 店铺详情
              }
              res.send({
                data: {
                  info: {
                    selInfo,
                    custInfo
                  },
                  role: roleType.seller,
                },
                meta: { statu: true }
              })
            })
          } else {
            res.send({
              data: {
                info: custInfo,
                role: roleType.customer,
              },
              meta: { statu: true }
            })
          }
        }).catch((error) => {
          console.log(error);
          res.send({
            meta: {
              statu: false
            }
          })
        })
      } else if (role === roleType.admin || role === roleType.superAdmin) {
        selectApi.selectPhonePreciseAdmin(name).then((value) => {
          let { level } = decoded;
          let roleAdm = '';
          if (parseInt(level) === 1) {
            roleAdm = roleType.superAdmin
          } else {
            roleAdm = roleType.admin
          }

          let { adm_id, adm_account, adm_super } = value.data.info;
          let admInfo = {
            id: adm_id,// 管理员id
            name: adm_account,// 管理员名字
            level: adm_super,// 管理员手机号
          }

          res.send({
            data: {
              info: admInfo,
              role: roleAdm,
            },
            meta: { statu: true }
          })
        }).catch((error) => {
          console.log(error);
          res.send({
            meta: {
              statu: false
            }
          })
        })
      }
    }
  })
})

module.exports = router;
