const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  addTaskController,
  updateTaskController,
  deleteTaskController,
} = require("../controllers/task");
const {
  addTaskValidator,
  updateTaskValidator,
  deleteTaskValidator,
} = require("../validators/task");

// 添加任务
router.post("/addTask", auth, addTaskValidator, addTaskController);

// 修改任务
router.post("/updateTask", auth, updateTaskValidator, updateTaskController);

router.post("/deleteTask", auth, deleteTaskValidator, deleteTaskController);

module.exports = router;
