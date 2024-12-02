const http = require("http");
const { createProxyMiddleware } = require("http-proxy-middleware");
const url = require("url");
const fs = require("fs");

const html = fs.readFileSync("index.html", "utf-8");
const config = require("./xm.config.js");

http
  .createServer((req, res) => {
    const { pathname } = url.parse(req.url, true);

    const proxyList = Object.keys(config.serve.proxy);

    if (proxyList.includes(pathname)) {
      const proxy = createProxyMiddleware(config.serve.proxy[pathname]);
      proxy(req, res);
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html" });

    res.end(html);
  })
  .listen(80, () => {
    console.log("Server is running on port 80");
  });
