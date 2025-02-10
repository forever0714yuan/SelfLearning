const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true, // 打包前清理dist文件夹
  },
  devtool: "inline-source-map", // 生成source-map文件
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      // 设置所有资源文件注入模版的位置 可选值: true, false , 'head', 'body'
      inject: "body",
    }),
  ],
  devServer: {
    static: "./dist",
  },
};
