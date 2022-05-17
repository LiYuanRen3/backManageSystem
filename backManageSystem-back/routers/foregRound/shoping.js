const express = require('express');
const router = express.Router();

// 引入自定义jwt模块
const jwtAPI = require('../../myModules/jwtAPI')

const selectApi = require('../../myModules/mysqlmode/selectApi')
const updateApi = require('../../myModules/mysqlmode/updateApi')
const insertApi = require('../../myModules/mysqlmode/insertApi')
const deleteApi = require('../../myModules/mysqlmode/deleteApi')

const roleType = require('../../myModules/myType/roleType');

// jwtAPI.verifyPower
// 添加商品购物车
router.post('/addShopCart', function (req, res) {
  let { goodId, goodCount, custId, selId } = req.body;
  // 查询当前用户中购物车中是否有该商品
  selectApi.selectCartCustGood(custId, goodId).then(value => {
    let { statu } = value.meta;
    if (statu) {
      // 有则修改商品数量
      let { cart_id } = value.data.info
      updateApi.updataCartCount(cart_id, goodCount).then(() => {
        res.send({
          meta: { statu: true, msg: '添加成功！' },
        })
      })
    } else {
      // 没有添加到购物车
      insertApi.addCart(goodId, goodCount, custId, selId).then(() => {
        res.send({
          meta: { statu: true, msg: '添加成功！' },
        })
      })
    }
  }).catch((error) => {
    console.log(error);
    res.send({
      meta: { statu: false, msg: '添加失败！' }
    })
  })
})
// 修改购物车商品数量
router.post('/upShopCart', jwtAPI.verifyPower, function (req, res) {
  let { cartiId, goodCount } = value.data.info
  updateApi.updataCartCount(cartiId, goodCount).then(() => {
    res.send({
      meta: { statu: true, msg: '修改成功！' },
    })
  }).catch((error) => {
    console.log(error);
    res.send({
      meta: { statu: false, msg: '修改失败！' }
    })
  })
})

// 删除购物车商品
// jwtAPI.verifyPower,
router.post('/deleteShopCart', function (req, res) {
  let { cartIds } = req.body;
  console.log(req.body);
  let cartIdList = cartIds.split(',');
  console.log(cartIdList);
  let DeleteStatus = true;
  f: for (let i = 0; i < cartIdList.length; i++) {
    if (DeleteStatus == false) {
      break f;
    }
    deleteApi.delSingleCart(cartIdList[i]).then(value => {
      console.log(value);
      DeleteStatus = true;
    }).catch(err => {
      console.log(err);
      DeleteStatus = false;
    })
  }
  setTimeout(() => {
    if (DeleteStatus) {
      res.send({
        meta: { statu: true, msg: '删除成功！' }
      })
    } else {
      res.send({
        meta: { statu: false, msg: '删除失败...' }
      })
    }
  }, 100)
})

// 清空购物车
// jwtAPI.verifyPower,
router.post('/emptyShopCart', function (req, res) {
  let { custId } = req.body;
  console.log(req.body);
  // 查询当前用户中购物车中是否有该商品
  deleteApi.delAllCart(custId).then(value => {
    res.send({
      ...value
    })
  }).catch(err => {
    res.send({
      ...err
    })
  })
})


// 返回用户购物车信息
router.post('/getCartShop', function (req, res) {
  let { custId } = req.body;
  console.log(req.body);
  // 查询当前用户中购物车中商品id
  // selectCartCustId
  let cartList = null;
  selectApi.selectCartCustId(custId).then(value => {
    cartList = value.data.info
    for (let i = 0; i < cartList.length; i++) {
      selectApi.selectGoodId(cartList[i].goods_id).then(goodValue => {
        // 将商品信息赋值给数据载体
        cartList[i].goodinfo = goodValue.data.info[0];
        console.log(cartList);
        selectApi.selectGoodDatlId(cartList[i].goodinfo.goods_id).then(goodtlValue => {
          // 将商品详情添加到商品下
          cartList[i].goodinfo.goodtl = goodtlValue.data.info[0];
        })
      })
    }
    setTimeout(() => {
      res.send({
        data: { list: cartList },
        meta: { statu: true, msg: '获取成功！' }
      })
    }, 100)
  }).catch(error => {
    console.log(error);
    res.send({
      meta: { statu: false, msg: '返回失败！' }
    })
  })

})



// 返回订单信息
router.post('/getOrderInfoAll', function (req, res) {
  let { userId } = req.body;
  let orderList = null;
  selectApi.selUidOrderAll(userId).then(OrderValue => {
    orderList = OrderValue.data.info;
    for (let i = 0; i < orderList.length; i++) {
      // 订单详情
      selectApi.selOrderIdDatl(orderList[i].order_id).then(OrderDatlValue => {
        orderList[i].orderDetl = OrderDatlValue.data.info;
        // 商品信息
        selectApi.selectGoodId(orderList[i].orderDetl.goods_id).then(goodValue => {
          orderList[i].orderDetl.goodInfo = goodValue.data.info[0];
          // 商品详情
          selectApi.selectGoodDatlId(orderList[i].orderDetl.goods_id).then(goodtlValue => {
            orderList[i].orderDetl.goodInfo.goodtl = goodtlValue.data.info[0];
          })
        })
      })
      // 顾客
      selectApi.selectIdCust(orderList[i].cust_id, roleType.customer).then(custValue => {
        let { cust_id, cust_account, cust_phone } = custValue.data.uinfo;
        orderList[i].custInfo = {
          cust_id, cust_account, cust_phone
        }
      })
      // 售货商
      selectApi.selectIdSel(orderList[i].sel_id).then(selValue => {
        let { sel_id, sel_account, sel_phone, sel_store } = selValue.data.uinfo;
        orderList[i].selInfo = {
          sel_id, sel_account, sel_phone, sel_store
        }
      })
      // 地址
      selectApi.selectIdAddr(orderList[i].sel_id).then(addrValue => {
        let { addr_id, addr_local, addr_person, addr_phone } = addrValue.data.address;
        orderList[i].addrInfo = {
          addr_id, addr_local, addr_person, addr_phone
        }
      })
    }
    // 返回数据
    setTimeout(() => {
      res.send({
        data: { list: orderList },
        meta: { statu: true, msg: '获取成功！' }
      })
    }, 100)
  }).catch(error => {
    console.log(error);
    res.send({
      meta: { statu: false }, msg: '获取失败...'
    });
  })
})


module.exports = router;

