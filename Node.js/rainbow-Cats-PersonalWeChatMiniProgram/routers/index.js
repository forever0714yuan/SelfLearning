const express = require("express");

const router = express.Router();

// 用户相关路由
router.use("/user", require("./user"));

// 商城相关路由
router.use("/shop", require("./shopping"));

// 任务相关路由
router.use("/task", require("./task"));

module.exports = router;
