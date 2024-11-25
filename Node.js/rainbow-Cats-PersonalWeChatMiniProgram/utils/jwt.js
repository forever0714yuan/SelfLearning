const jwt = require("jsonwebtoken");
const { promisify } = require("util");

// 加密
exports.sign = promisify(jwt.sign);
// 验证
exports.verify = promisify(jwt.verify);
// 直接解密
exports.decode = promisify(jwt.decode);
