const express = require('express');
const router = express.Router();

// 导入子路由
const obtainRouter = require("./foregRound/obtain");
const searchRouter = require("./foregRound/search");
const paymentRouter = require("./foregRound/payment");
const shopRouter = require("./foregRound/shoping");


//挂载子路由
router.use("/obtain", obtainRouter);
router.use("/search", searchRouter);
router.use("/shoping", shopRouter);
router.use("/payment", paymentRouter);


module.exports = router;
