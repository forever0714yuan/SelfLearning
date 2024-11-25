/*
 * @Author: 于金元 1141395452@qq.com
 * @Date: 2023-11-26 11:23:05
 * @LastEditors: 于金元 1141395452@qq.com
 * @LastEditTime: 2023-12-03 23:18:30
 * @FilePath: \rainbow-Cats-PersonalWeChatMiniProgram\controllers\user.js
 * @Description: 用户控制器（书写逻辑）
 *
 */
const { User } = require("../models");
const { sign } = require("../utils/jwt");
const { jwtSecret } = require("../config/config.default");
const md5 = require("../utils/md5");

exports.registerController = async (req, res, next) => {
  try {
    const user = new User(req.body);
    user.password = md5(user.password);

    await user.save();

    res.status(201).json({
      code: "0",
      message: ["注册成功"],
    });
  } catch (error) {
    next(error);
  }
};

// 用户登录
exports.loginController = async (req, res, next) => {
  try {
    const user = req.user;

    // 生成jwt
    const token = await sign(
      {
        userId: user._id,
      },
      jwtSecret,
      {
        expiresIn: 60 * 60 * 24,
      }
    );

    res.status(200).json({
      code: "0",
      message: ["登录成功"],
      data: token,
    });
  } catch (error) {
    next(error);
  }
};

// 用户信息
exports.getUserInfoController = async (req, res, next) => {
  try {
    const user = req.user;

    res.status(200).json({
      code: "0",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
