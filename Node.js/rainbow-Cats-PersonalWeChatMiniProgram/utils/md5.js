const crypto = require("crypto");

module.exports = (str) => {
  return (
    crypto
      // 使用那种混合
      .createHash("md5")
      // 进行混合编码
      .update("realworld", str)
      // 编码方式
      .digest("hex")
  );
};
