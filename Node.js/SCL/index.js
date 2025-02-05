import express from "express";
import qrcode from "qrcode";
import jwt from "jsonwebtoken";

let user = {};
let userId = 1; //模拟一个用户

const app = express();
app.use("/static", express.static("public"));

app.get("/qrcode", async (req, res) => {
  user[userId] = {
    token: null,
    time: Date.now(),
  };

  const code = await qrcode.toDataURL(
    `http:// 192.168.10.67:3000/static/mandate.html?userId=${userId}`
  );

  res.json({
    code,
    userId,
  });
});

app.post("/login/:userId", (req, res) => {
  const token = jwt.sign(req.params.userId, "secret");
  user[req.params.userId].token = token;
  user[req.params.userId].time = Date.now();
  res.json({
    token,
  });
});

app.get("/check/:userId", (req, res) => {
  const id = req.params.userId;
  if (Date.now() - user[id].time > 1000 * 60 * 1) {
    return res.json({
      status: 2,
      message: "二维码已过期",
    });
  } else if (user[1].token) {
    return res.json({
      status: 1,
      message: "已登录",
    });
  } else {
    return res.json({
      status: 0,
      message: "未登录",
    });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
