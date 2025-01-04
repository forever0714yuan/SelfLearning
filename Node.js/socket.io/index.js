import http from "node:http";
import { Server } from "socket.io";

const server = http.createServer();

const io = new Server(server, {
  cors: true,
});

const groupList = {};

/** 连接成功 */
io.on("connection", (socket) => {
  /** 断开连接 */
  socket.on("disconnect", () => {
    console.log("断开连接");
  });

  /** 接收消息 */
  socket.on("message", ({ text, room, user }) => {
    socket.broadcast.to(room).emit("message", {
      text,
      user,
    });
  });

  /** 加入房间 */
  socket.on("join", ({ name, room }) => {
    socket.join(room);

    if (groupList[room]) {
      groupList[room].push({ name, id: socket.id });
    } else {
      groupList[room] = [{ name, id: socket.id }];
    }

    socket.emit("message", { user: "管理员", text: `${name}加入房间` });
    socket.emit("groupList", groupList);
    socket.broadcast.emit("groupList", groupList);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
