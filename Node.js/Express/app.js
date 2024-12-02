const express = require("express");
const app = express();

app.use(express.json());

const list = require("./src/list");
const user = require("./src/user");
const { LoggerMiddleware } = require("./middleware/logger");

// 中间价需要注册在路由之前
app.use(LoggerMiddleware);

app.use("/list", list);
app.use("/user", user);

// 第一个参数是路由，第二个参数是回调函数
// req 请求，res 响应
// app.get("/get", (req, res) => {
//   res.send("Hello World");
// });

// app.post("/post", (req, res) => {
//   res.send("About Page");
// });

// // 动态参数
// app.get("/user/:id", (req, res) => {
//   res.send(`User ID is ${req.params.id}`);
// });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
