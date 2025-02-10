const path = require("path");

module.exports = {
  mode: "development", // 设置mode
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
