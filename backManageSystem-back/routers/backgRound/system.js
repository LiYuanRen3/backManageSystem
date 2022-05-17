const express = require('express');
const router = express.Router();



// 导入子路由
// 超级管理员
//  用户管理：用户列表
//  权限管理：角色列表，权限列表
const accountRouter = require("./system/account");
const permissionsRouter = require("./system/permissions");

// 普通管理员
// 	商品管理：商品列表，分类参数，商品分类
// 	订单管理：订单列表
// 	公告管理：公告列表
// 	数据统计：数据报表
const goodsRouter = require("./system/goods");
const ordersRouter = require("./system/orders");
const bulletinRouter = require("./system/bulletin");
const reportsRouter = require("./system/reports");

//挂载子路由
router.use("/account", accountRouter);
router.use("/permissions", permissionsRouter);
router.use("/goods", goodsRouter);
router.use("/orders", ordersRouter);
router.use("/bulletin", bulletinRouter);
router.use("/reports", reportsRouter);


module.exports = router;
