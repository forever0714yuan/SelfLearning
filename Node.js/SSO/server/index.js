import express from "express";
import cors from "cors";
import session from "express-session";
import fs from "fs";
import jwt from "jsonwebtoken";

const appToMapUrl = {
  //A应用id
  Rs6s2aHi: {
    url: "http://localhost:5173", //对应的应用地址
    secretKey: "%Y&*VGHJKLsjkas", //对应的secretKey
    token: "", //token
  },
  //B应用id
  "9LQ8Y3mB": {
    url: "http://localhost:5174", //对应的应用地址
    secretKey: "%Y&*FRTYGUHJIOKL", //对应的secretKey
    token: "", //token
  },
};

const app = express();
app.use(cors());
app.use(
  session({
    secret: "$%^&*()_+DFGHJKL",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, //过期时间
    },
  })
);
const genToken = (appId) => {
  return jwt.sign({ appId }, appToMapUrl[appId].secretKey);
};

app.get("/login", (req, res) => {
  if (req.session?.username) {
    const appId = req.query.appId;
    const url = appToMapUrl[appId].url;
    let token;
    //登录过如果存过token就直接取 没有存过就生成一个 因为可能有多个引用A登录过读取Token   B没有登录过生成Token 存入映射表
    if (appToMapUrl[appId].token) {
      token = appToMapUrl[appId].token;
    } else {
      token = genToken(appId);
      appToMapUrl[appId].token = token;
    }

    res.redirect(url + "?token=" + token);
    return;
  }
  const html = fs.readFileSync("../sso.html", "utf-8");
  res.send(html);
});

app.get("/protectd", (req, res) => {
  const { appId, username, password } = req.query; //获取应用标识
  const url = appToMapUrl[appId].url; //读取要跳转的地址
  const token = genToken(appId); //生成token
  appToMapUrl[appId].token = token; //根据应用存入对应的token
  req.session.username = username; //将token存入session
  res.redirect(`${url}?token=${token}`); //重定向到应用地址
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
