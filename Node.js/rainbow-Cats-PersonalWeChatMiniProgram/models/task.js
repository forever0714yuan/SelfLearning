const mongoose = require("mongoose");
const baseModel = require("./baseModel");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  ...baseModel,
  taskId: {
    type: String,
  },
  taskName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  taskImage: {
    type: String,
    required: true,
  },
  desc: { type: String, required: false },
  isFinished: { type: Number, default: 0 }, // 0 未完成 1 已完成
  createUserId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  updateUserId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
