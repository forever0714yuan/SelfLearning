const express = require("express");
const app = express();

app.use("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // * 允许所有资源访问，当需要session的时候获取不到session   |  Origin 指定IP或者网址
  //   Access-Control-Allow-Methods 默认只支持get post head请求
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

  //   Access-Control-Allow-Headers
  res.header("Access-Control-Allow-Headers", "Content-Type"); // 允许自定义请求头

  next();
});

// 预检请求 浏览器发起
// 满足以下条件
// 1. 请求方式是Context-Type: application/json
// 2. 或者是自定义请求头
// 3. 或者是请求方式是非普通请求 比如PUT DELETE

app.get("/info", (req, res) => {
  res.set("xmzd", 123456);
  res.setHeader("Access-Control-Expose-Headers", "xmzd"); // 自定义响应头 后端需要抛出

  res.json({
    code: 200,
    type: "success",
  });
});

app.post("/info", (req, res) => {
  res.json({
    code: 200,
    type: "post",
  });
});

// websocket 实时通讯 前端可以给后端实时发送信息，后端也可以给前端发送信息
// 大屏的项目 后端需要实时返回 前段不需要传什么东西 SSE
app.get("/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  //   res.setHeader("Cache-Control", "no-cache");
  //   res.setHeader("Connection", "keep-alive");
  //   res.write("data:hello\n\n");

  setInterval(() => {
    res.write("data:hello\n\n");
  }, 1000);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
