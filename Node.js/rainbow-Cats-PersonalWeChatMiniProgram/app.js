const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const router = require("./routers");
const error = require("./middleware/error");

require("./models");

app.use(express.json());

app.use(morgan("dev"));

app.use(cors());

app.use("/rainbow", router);

// 错误处理
app.use(error());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
