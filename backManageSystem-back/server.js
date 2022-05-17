// 导入、应用express模块
const express = require("express");
const app = express();

//导入、配置bodyParser中间件
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 导入、配置cors
const cors = require('cors');
app.use(cors());

// static
let path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

// 导入子路由
const userRouter = require("./routers/user");
const foregRoundRouter = require("./routers/foregRound");
const backgRoundRouter = require("./routers/backgRound");

//挂载子路由
app.use("/user", userRouter);
app.use("/foreg", foregRoundRouter);
app.use("/backg", backgRoundRouter);

// 设置并监听端口号
const port = process.env.PORT || 3600;//端口号
const host = process.env.HOST || '';//主机地址
app.server = app.listen(port, host, () => {
  console.log('欢迎使用离渊云服务器');
  console.log('服务器地址： http://localhost:3600');
})
