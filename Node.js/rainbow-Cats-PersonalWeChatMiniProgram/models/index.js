const mongoose = require("mongoose");

const { dbURL } = require("../config/config.default");

const User = require("./user.js");
const Shopping = require("./shopping.js");
const Task = require("./task.js");

// 连接数据库
mongoose.connect(dbURL, {});

const db = mongoose.connection;

// 连接失败
db.on("error", console.error.bind(console, "数据库连接失败:"));

// 连接成功
db.once("open", function () {
  console.log("数据库连接成功");
});

// 导出模型类
module.exports = {
  User: User,
  Shopping,
  Task,
};
