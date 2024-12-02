const express = require("express");
const app = express();
// 白名单
const whiteList = ["localhost"];

const preventHotlinking = (req, res, next) => {
  // 获取referer 如果是直接打开资源是获取不到referer的
  const referer = req.get("referer");

  if (referer) {
    const { hostname } = new URL(referer);

    if (!whiteList.includes(hostname)) {
      return res.status(403).send("禁止访问");
    }
  }

  next();
};

app.use(preventHotlinking);

// 初始化静态资源
app.use(express.static("static"));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
