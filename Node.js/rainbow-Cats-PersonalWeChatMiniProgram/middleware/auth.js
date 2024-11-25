/*
 * @Author: 于金元 1141395452@qq.com
 * @Date: 2023-12-03 19:25:22
 * @LastEditors: 于金元 1141395452@qq.com
 * @LastEditTime: 2023-12-06 21:16:28
 * @FilePath: \rainbow-Cats-PersonalWeChatMiniProgram\middleware\auth.js
 * @Description: token验证中间件
 */
const { verify } = require("../utils/jwt");
const { jwtSecret } = require("../config/config.default");
const { User } = require("../models");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      code: "401",
      message: ["请先登录"],
    });
  }

  try {
    const userInfo = await verify(token, jwtSecret);
    const user = await User.findById(userInfo.userId).select([
      "username",
      "telephone",
      "createdAt",
      "updatedAt",
    ]);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      code: "401",
      message: ["请先登录"],
    });
  }
};
