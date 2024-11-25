const validate = require("../middleware/validate");
const { body } = require("express-validator");

const {
  registerUserNameRegex,
  registerTelephoneRegex,
} = require("../regexps/user");

const { User } = require("../models");

const md5 = require("../utils/md5");

/**
 * @description: 注册校验
 * @return {*}
 */
exports.registerValidators = validate([
  body("username")
    .notEmpty()
    .withMessage("用户名不能为空")
    .custom(async (username) => {
      // 校验正则
      const regexpTest = registerUserNameRegex.test(username);

      if (!regexpTest) {
        return Promise.reject(
          "请输入1-64位,以字母开头,只包含英文和数字的名称."
        );
      }

      // 从数据库中查找
      const user = await User.findOne({ username });

      if (user) {
        return Promise.reject("用户名已存在,请重新输入");
      }
    }),
  body("password").notEmpty().withMessage("密码不能为空"),

  body("telephone")
    .notEmpty()
    .withMessage("手机号不能为空")
    .custom(async (telephone) => {
      // 手机号验证
      const regexpTest = registerTelephoneRegex.test(telephone);

      if (!regexpTest) {
        return Promise.reject("请输入正确的手机号");
      }
    }),
]);

/**
 * @description: 登录校验
 * @return {*}
 */
exports.loginValidators = [
  validate([
    body("username").notEmpty().withMessage("用户名不能为空"),
    body("password").notEmpty().withMessage("密码不能为空"),
  ]),
  validate([
    body("username").custom(async (username, { req }) => {
      const user = await User.findOne({ username });

      if (!user) {
        return Promise.reject("用户名不存在");
      }
      req.user = user;
    }),
  ]),
  validate([
    body("password").custom(async (password, { req }) => {
      if (md5(password) !== req.user.password) {
        return Promise.reject("密码错误");
      }
    }),
  ]),
];
