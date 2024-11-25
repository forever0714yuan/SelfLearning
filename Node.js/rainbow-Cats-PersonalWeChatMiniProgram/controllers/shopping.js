const { Shopping } = require("../models");
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @description 获取商城列表
 */
exports.getShopListController = async (req, res, next) => {
  try {
    const shopList = await Shopping.find().populate("createUserId");
    req.shopList = shopList;

    res.status(200).json({
      code: "0",
      data: shopList,
      message: ["获取商城列表成功"],
    });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @description 新增商品
 */
exports.addProductController = async (req, res, next) => {
  try {
    const shop = new Shopping(req.body);

    await shop.save();

    res.status(200).json({
      code: "0",
      message: ["新增商品成功"],
    });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @description 修改商品
 */
exports.updateProductController = async (req, res, next) => {
  try {
    const { id } = req.body;
    const shop = await Shopping.findById(id);

    shop.name = req.body.name;
    shop.price = req.body.price;
    shop.productImage = req.body.productImage;
    shop.desc = req.body.desc;
    shop.isFinished = req.body.isFinished;
    shop.createUserId = req.body.createUserId;
    shop.productCount = req.body.productCount;
    shop.updatedAt = Date.now();

    await shop.save();

    res.status(200).json({
      code: "0",
      message: ["修改商品成功"],
    });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @description 商品详情
 */
exports.shopDetailController = async (req, res, next) => {
  try {
    const { id } = req.body;
    const shopDetail = await Shopping.findById(id).populate("createUserId");

    res.status(200).json({
      code: "0",
      data: shopDetail,
      message: ["获取商品详情成功"],
    });
  } catch (error) {
    next(error);
  }
};
