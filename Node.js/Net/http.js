import net from "net";
const html = `<h1>TCP Server</h1>`;
const reposneHeader = [
  "HTTP/1.1 200 OK",
  "Content-Type: text/html",
  "Content-Length: " + html.length,
  "Server: Nodejs",
  "\r\n",
  html,
];

const http = net.createServer((socket) => {
  socket.on("data", (data) => {
    if (/GET/.test(data.toString())) {
      socket.write(reposneHeader.join("\r\n"));
      socket.end();
    }
  });
});

http.listen(3001, () => {
  console.log("Server is listening on port 3001");
});
