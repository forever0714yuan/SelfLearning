import net from "node:net";
const server = net.createServer((socket) => {
  setInterval(() => {
    socket.write("Hello World");
  }, 1000);
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
