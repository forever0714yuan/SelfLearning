const zlib = require("node:zlib");
const fs = require("node:fs");

const http = require("node:http");

/**
 * 压缩文件
 */
// const readStream = fs.createReadStream("index.txt");
// const writeStream = fs.createWriteStream("output.txt.gz");
// readStream.pipe(zlib.createGzip()).pipe(writeStream);

// const readStream = fs.createReadStream("index.txt");
// const writeStream = fs.createWriteStream("output1.txt.deflate");
// readStream.pipe(zlib.createDeflate()).pipe(writeStream);

/**
 * 解压文件
 */
// const readStream = fs.createReadStream("output.txt.gz");
// const writeStream = fs.createWriteStream("index2.txt");
// readStream.pipe(zlib.createGunzip()).pipe(writeStream);

// const readStream = fs.createReadStream("output1.txt.deflate");
// const writeStream = fs.createWriteStream("index3.txt");
// readStream.pipe(zlib.createInflate()).pipe(writeStream);

/**
 * 压缩网络数据
 */
const server = http.createServer((req, res) => {
  const txt = "1111".repeat(1000000);
  res.setHeader("Content-Encoding", "gzip");
  res.setHeader("Content-type", "text/plan; charset=utf-8");

  const result = zlib.gzipSync(txt);

  res.end(result);
});

server.listen(3000, () => {
  console.log("server is running on port 3000");
});
