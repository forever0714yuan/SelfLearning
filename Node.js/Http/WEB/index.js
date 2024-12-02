const http = require("node:http");
const url = require("node:url");

http
  .createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);

    if (req.method === "POST") {
      if (pathname === "/login") {
        let data = "";

        req.on("data", (chunk) => {
          data += chunk;
        });

        req.on("end", () => {
          res.setHeader("Content-Type", "application/json");
          res.statusCode = 200;
          res.end(data);
        });
      } else {
        res.statusCode = 404;
        res.end("Page not found");
      }
    } else if (req.method === "GET") {
      if (pathname === "/get") {
        res.end(JSON.stringify(query));
      } else {
        res.statusCode = 404;
        res.end("Get Page not found");
      }
    }
  })
  .listen(3000, () => {
    console.log("Server is running on port 3000");
  });
