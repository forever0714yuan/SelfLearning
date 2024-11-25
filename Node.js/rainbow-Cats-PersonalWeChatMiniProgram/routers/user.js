/*
 * @Author: 于金元 1141395452@qq.com
 * @Date: 2023-11-26 11:15:25
 * @LastEditors: 于金元 1141395452@qq.com
 * @LastEditTime: 2023-12-06 21:17:42
 * @FilePath: \rainbow-Cats-PersonalWeChatMiniProgram\routers\user.js
 * @Description: 用户路由
 */
const express = require("express");

const {
  getUserInfoController,
  registerController,
  loginController,
} = require("../controllers/user");

const { registerValidators, loginValidators } = require("../validators/user");

const auth = require("../middleware/auth");

const router = express.Router();

// 用户注册
router.post("/register", registerValidators, registerController);

// 用户登录
router.post("/login", loginValidators, loginController);

// 用户信息
router.get("/userinfo", auth, getUserInfoController);

module.exports = router;
