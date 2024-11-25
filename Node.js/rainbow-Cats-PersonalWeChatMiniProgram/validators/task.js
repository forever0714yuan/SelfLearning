const validate = require("../middleware/validate");
const { Task } = require("../models");
const { body } = require("express-validator");

/**
 * @description 添加任务校验
 */
exports.addTaskValidator = validate([
  body("taskName").notEmpty().withMessage("任务名称不能为空"),
  body("price").notEmpty().withMessage("任务奖励不能为空"),
  body("taskImage").notEmpty().withMessage("任务图片不能为空"),
  body("desc").notEmpty().withMessage("任务描述不能为空"),
  body("isFinished").notEmpty().withMessage("任务状态不能为空"),
  body("createUserId").notEmpty().withMessage("创建人不能为空"),
  body("updateUserId").notEmpty().withMessage("更新人不能为空"),
]);

/**
 * @description 修改任务校验
 */
exports.updateTaskValidator = validate([
  body("taskId")
    .notEmpty()
    .withMessage("任务id不能为空")
    .custom(async (value, { req }) => {
      const task = await Task.findById(value);

      if (!task) {
        return Promise.reject("任务不存在");
      }

      if (task._id.toString() !== value.toString()) {
        return Promise.reject("任务不存在");
      }
      req.task = task;
    }),
  body("taskName").notEmpty().withMessage("任务名称不能为空"),
  body("price").notEmpty().withMessage("任务奖励不能为空"),
  body("taskImage").notEmpty().withMessage("任务图片不能为空"),
  body("desc").notEmpty().withMessage("任务描述不能为空"),
  body("isFinished").notEmpty().withMessage("任务状态不能为空"),
  body("createUserId").notEmpty().withMessage("创建人不能为空"),
  body("updateUserId").notEmpty().withMessage("更新人不能为空"),
]);

/**
 * @description 删除任务校验
 */

exports.deleteTaskValidator = validate([
  body("taskId")
    .notEmpty()
    .withMessage("任务id不能为空")
    .custom(async (value, { req }) => {
      const task = await Task.findById(value);

      if (!task) {
        return Promise.reject("任务不存在");
      }

      if (task._id.toString() !== value.toString()) {
        return Promise.reject("任务不存在");
      }
      req.task = task;
    }),
]);
