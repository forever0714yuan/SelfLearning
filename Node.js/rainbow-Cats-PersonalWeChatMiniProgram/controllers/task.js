const { Task } = require("../models");

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @description 添加任务
 */
exports.addTaskController = async (req, res, next) => {
  try {
    const task = new Task(req.body);
    await task.save();

    res.status(201).json({
      code: "0",
      message: ["注册成功"],
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
 * @description 修改任务
 */
exports.updateTaskController = async (req, res, next) => {
  try {
    const task = req.task;
    const body = req.body;
    task.taskName = body.taskName || task.taskName;
    task.price = body.price || task.price;
    task.taskImage = body.taskImage || task.taskImage;
    task.desc = body.desc || task.desc;
    task.isFinished = body.isFinished || task.isFinished;
    task.createUserId = body.createUserId || task.createUserId;
    task.updateUserId = body.updateUserId || task.updateUserId;
    await task.save();

    res.status(201).json({
      code: "0",
      message: ["修改成功"],
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
 * @description 删除任务
 */
exports.deleteTaskController = async (req, res, next) => {
  try {
    const task = req.task;
    await task.remove();

    res.status(201).json({
      code: "0",
      message: ["删除成功"],
    });
  } catch (error) {
    next(error);
  }
};
