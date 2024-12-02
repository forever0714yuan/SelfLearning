import nodemailer from "nodemailer";
import yaml from "js-yaml";
import fs from "node:fs";
import url from "node:url";
import http from "node:http";

// 读取配置文件
const config = yaml.load(fs.readFileSync("./mail.yaml", "utf8"));

// 初始化邮件服务
const transporter = nodemailer.createTransport({
  service: "qq",
  auth: {
    user: config.user,
    pass: config.pass,
  },
  host: "smtp.qq.com",
  post: 465,
  secure: true,
});

http
  .createServer((req, res) => {
    const { pathname } = url.parse(req.url, true);

    const { method } = req;

    if (method === "POST" && pathname === "/send/email") {
      // 发送邮件
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", () => {
        const { to, subject, text } = JSON.parse(data);

        transporter.sendMail({
          from: config.user, // 发件人
          to: to, // 收件人
          subject: subject, // 主题
          text: text, // 内容
        });

        res.end("邮件发送成功");
      });
    }
  })
  .listen(3000, () => {
    console.log("Server running on port 3000");
  });
