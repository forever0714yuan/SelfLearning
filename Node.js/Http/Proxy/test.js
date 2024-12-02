const http = require("node:http");
const url = require("url");

http
  .createServer((req, res) => {
    const { pathname } = url.parse(req.url, true);
    if (pathname === "/api") {
      res.end("Hello from API");
    }
  })
  .listen(3000, () => {
    console.log("Server is running on port 3000");
  });
