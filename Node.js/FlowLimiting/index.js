import express from "express";
import Redis from "ioredis";
import fs from "fs";

const redis = new Redis();
const app = express();
const lua = fs.readFileSync("./index.lua", "utf-8");

const CHANGE = 5;
const TIME = 30;
const KEY = "lottery";

app.use("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/lottery", async (req, res) => {
  redis.eval(lua, 1, KEY, CHANGE, TIME, (err, result) => {
    if (err) {
      console.log(err);
    }

    if (result === 1) {
      res.send("恭喜你中奖了");
    } else {
      res.send("请稍后重试！");
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
