const path = require("path");
const toml = require("toml");
const yaml = require("yamljs");
const json5 = require("json5");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const svgToMiniDataURI = require("mini-svg-data-uri");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const data = ["shared", "importJquery"];
module.exports = {
  mode: "development",
  entry: {
    index: {
      import: "./index.js",
      dependOn: data,
    },
    another: {
      import: "./another-module.js",
      dependOn: data,
    },
    shared: {
      import: "lodash",
      runtime: "runtime",
    },
    importJquery: {
      import: "jquery",
      runtime: "runtime", // q:runtime 是什么意思？ a:runtime 是 webpack 5 中的新特性，用于提取运行时代码
    },
  },
  // entry: {
  //   index: "./index.js",
  //   another: "./another-module.js",
  // },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
    assetModuleFilename: "images/[name][ext][query]",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      inject: "body",
    }),

    new MiniCssExtractPlugin({
      filename: "styles/[name].css",
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
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader, // 提取 css 文件并压缩
          "css-loader", // 解析 css 文件
        ],
      },
      {
        test: /\.less$/i,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ["csv-loader"],
      },
      {
        test: /\.xml$/i,
        use: ["xml-loader"],
      },
      {
        test: /\.toml$/i,
        type: "json",
        parser: {
          parse: toml.parse,
        },
      },
      {
        test: /\.yaml$/i,
        type: "json",
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.json5$/i,
        type: "json",
        parser: {
          parse: json5.parse,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    // splitChunks: {
    //   chunks: "all",
    // },
  },
};
