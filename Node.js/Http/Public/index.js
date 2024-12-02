import http from "http";
import fs from "fs";
import path from "path";
import mime from "mime";

const server = http
  .createServer((req, res) => {
    const { method, url } = req;
    // 静态资源
    if (method === "GET" && url.startsWith("/static")) {
      const staticPath = path.join(process.cwd(), url);
      fs.readFile(staticPath, (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("404 Not Found");
        } else {
          console.log("111");
          const type = mime.getType(staticPath); // 获取文件类型
          res.writeHead(200, {
            "content-type": type,
            "cache-control": "public, max-age=3600",
          }); // mime 类型
          res.end(data);
        }
      });
    }

    // 动态资源
    if ((method === "GET" || method === "POST") && url.startsWith("/api")) {
    }
  })
  .listen(3000, () => {
    console.log("Server is running on port 3000");
  });
