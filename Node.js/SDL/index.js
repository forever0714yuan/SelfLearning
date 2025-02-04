import express from "express";
import { WebSocketServer } from "ws";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

//存放数据结构
const connection = {};

const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    if (data.action === "login") {
      // 已经登录
      console.log(data, "111111111111111111111111111");
      console.log(connection, "22222222222222");

      if (connection?.[data.id]?.fingerprint) {
        console.log("账号在别处登录");
        connection[data.id].socket.send(
          JSON.stringify({
            action: "logout",
            message: `你于${new Date().toLocaleString()}账号在别处登录`,
          })
        );
        console.log(connection, "已经登录");

        connection[data.id].socket.close(); //断开旧设备连接
        connection[data.id].socket = ws; //更新ws
      } else {
        // 首次登录
        connection[data.id] = {
          socket: ws,
          fingerprint: data.fingerprint,
        };
        console.log(connection, "首次登录");
      }
    }
  });
});
