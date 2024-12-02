const ejs = require("ejs");
const fs = require("node:fs");
const marked = require("marked");

const browserSync = require("browser-sync");

let browser;

const server = () => {
  browser = browserSync.create();

  browser.init({
    server: {
      baseDir: "./",
      index: "index1.html",
    },
  });
};

const init = (callback) => {
  // 读取markdown文件内容
  const md = fs.readFileSync("README.md", "utf-8");
  // 将markdown内容转换为HTML
  const html = marked.parse(md);
  ejs.renderFile(
    "template.ejs",
    {
      content: html,
      title: "markdown转html",
    },
    (err, data) => {
      if (err) {
        throw err;
      }

      fs.writeFileSync("index1.html", data, "utf-8");
      callback();
    }
  );
};

fs.watchFile("README.md", (curr, prev) => {
  if (curr.mtime !== prev.mtime) {
    init(() => {
      browser.reload();
    });
  }
});

init(() => {
  server();
});
