const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const svgToMiniDataURI = require("mini-svg-data-uri");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
    // Q:[contenthash][name][ext][query] 分别是什么意思？
    // A:contenthash: 文件内容的hash值，name: 文件名，ext: 文件扩展名，query: 文件查询参数
    assetModuleFilename: "images/[contenthash][name][ext][query]",
  },
  mode: "development",
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      inject: "body",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.png/,
        type: "asset/resource",
        generator: {
          filename: "images/[name]-[contenthash][ext][query]",
        },
      },
      {
        test: /\.svg/,
        type: "asset/inline",
        generator: {
          dataUrl: (content) => {
            content = content.toString();
            return svgToMiniDataURI(content);
          },
        },
      },
      {
        test: /\.txt/,
        type: "asset/source",
      },
      {
        test: /\.jpg/,
        type: "asset", // 小于 8kb 的文件会被视为inline 模块类型，大于 8kb 的文件会被视为 resource 模块类型
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
          },
        },
      },
    ],
  },
  devServer: {
    static: "./dist",
  },
};
