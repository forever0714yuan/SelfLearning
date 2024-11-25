/*
 * @Author: 于金元 1141395452@qq.com
 * @Date: 2023-12-06 22:52:32
 * @LastEditors: 于金元 1141395452@qq.com
 * @LastEditTime: 2023-12-06 22:56:56
 * @FilePath: \rainbow-Cats-PersonalWeChatMiniProgram\models\shopping.js
 * @Description:
 */
const mongoose = require("mongoose");
const baseModel = require("./baseModel");
const Schema = mongoose.Schema;

const shoppingSchema = new mongoose.Schema({
  ...baseModel,
  name: {
    type: String,
    required: true,
  },
  isFinished: {
    type: Number, // 0: 未完成 1: 已完成
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  productCount: {
    type: Number,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    default: "",
  },
  createUserId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Shopping", shoppingSchema);
