/*
 * @Author: 于金元 1141395452@qq.com
 * @Date: 2023-12-06 22:14:44
 * @LastEditors: 于金元 1141395452@qq.com
 * @LastEditTime: 2023-12-06 22:31:32
 * @FilePath: \rainbow-Cats-PersonalWeChatMiniProgram\routers\shopping.js
 * @Description: 商城路由
 */

const express = require("express");
const router = express.Router();
const {
  getShopListController,
  addProductController,
  shopDetailController,
  updateProductController,
} = require("../controllers/shopping");

const auth = require("../middleware/auth");

const {
  addProductValidator,
  shopDetailValidator,
  updateProductValidator,
} = require("../validators/shopping");

// 获取商城列表
router.get("/shopList", getShopListController);

// 添加商品
router.post("/addProduct", auth, addProductValidator, addProductController);

// 修改商品
router.post(
  "/updateProduct",
  auth,
  updateProductValidator,
  updateProductController
);

// 商品详情
router.get("/shopDetail", shopDetailValidator, shopDetailController);

module.exports = router;
