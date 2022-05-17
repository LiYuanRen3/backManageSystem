const express = require('express');
const router = express.Router();

// 导入子路由
const insertRouter = require("./backgRound/insert");
const menusRouter = require("./backgRound/menus");
const systemRouter = require("./backgRound/system");

//挂载子路由
router.use("/insert", insertRouter);
router.use("/menus", menusRouter);
router.use("/system", systemRouter);

module.exports = router;
