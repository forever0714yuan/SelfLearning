const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  res.json({
    message: "登陆成功",
  });
});
router.post("/register", (req, res) => {
  res.json({
    message: "注册成功",
  });
});

module.exports = router;
