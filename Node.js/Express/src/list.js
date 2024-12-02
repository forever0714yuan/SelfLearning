const express = require("express");
const router = express.Router();

router.get("/getall", (req, res) => {
  res.json({
    message: "获取数据成功",
  });
});

module.exports = router;
