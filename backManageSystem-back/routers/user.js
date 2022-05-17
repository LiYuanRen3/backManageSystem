const express = require('express');
const router = express.Router();
// 导入子路由
const loginRouter = require("./user/login");
const regisRouter = require("./user/regis");
const ifRepeatRouter = require("./user/ifRepeat");
const verifyLoginRouter = require("./user/verifyLogin");

//挂载子路由
router.use("/login", loginRouter);
router.use("/regis", regisRouter);
router.use("/ifRepeat", ifRepeatRouter);
router.use("/verifyLogin", verifyLoginRouter);

module.exports = router;
