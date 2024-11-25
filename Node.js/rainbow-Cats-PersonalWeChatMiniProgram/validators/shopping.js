const validate = require("../middleware/validate");
const { body } = require("express-validator");

/**
 * @description 添加商品参数校验
 */
exports.addProductValidator = validate([
  body("name").notEmpty().withMessage("商品名称不能为空"),
  body("price").notEmpty().withMessage("商品价格不能为空"),
  body("productImage").notEmpty().withMessage("商品图片不能为空"),
  body("desc").notEmpty().withMessage("商品描述不能为空"),
  body("isFinished").notEmpty().withMessage("商品状态不能为空"),
  body("createUserId").notEmpty().withMessage("创建者ID不能为空"),
  body("productCount").notEmpty().withMessage("商品数量不能为空"),
]);

/**
 * @description 商品详情参数校验
 */
exports.shopDetailValidator = validate([
  body("id").notEmpty().withMessage("商品ID不能为空"),
]);

exports.updateProductValidator = validate([
  body("name").notEmpty().withMessage("商品名称不能为空"),
  body("price").notEmpty().withMessage("商品价格不能为空"),
  body("productImage").notEmpty().withMessage("商品图片不能为空"),
  body("desc").notEmpty().withMessage("商品描述不能为空"),
  body("isFinished").notEmpty().withMessage("商品状态不能为空"),
  body("createUserId").notEmpty().withMessage("创建者ID不能为空"),
  body("productCount").notEmpty().withMessage("商品数量不能为空"),
  body("id").notEmpty().withMessage("商品ID不能为空"),
]);
