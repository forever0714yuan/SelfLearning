(async () => {
  const mysql2 = require("mysql2/promise");
  const fs = require("fs");
  const jsyaml = require("js-yaml");
  const express = require("express");

  const yaml = fs.readFileSync("./db.config.yaml", "utf8");

  const config = jsyaml.load(yaml);

  const connection = await mysql2.createConnection({
    ...config.db,
  });

  const app = express();
  app.use(express.json());

  // 查询全部
  app.get("/api/v1/list", async (req, res) => {
    const [data] = await connection.query("SELECT * FROM user");
    res.json(data);
  });

  // 查询单个
  app.get("/api/v1/list/:id", async (req, res) => {
    const [row] = await connection.query("SELECT * FROM user WHERE id = ?", [
      req.params.id,
    ]);
    res.json(row);
  });

  // 新增
  app.post("/api/v1/list", async (req, res) => {
    const { name, age, address, hobby, sex } = req.body;

    await connection.query(
      "INSERT INTO user (name, age, address, hobby, sex) VALUES (?, ?, ?, ?, ?)",
      [name, age, address, hobby, sex]
    );

    res.json({ message: "success" });
  });

  // 修改
  app.post("/api/v1/updatelist", async (req, res) => {
    const { id, name, age, address, hobby } = req.body;
    await connection.query(
      "UPDATE user SET name = ?, age = ?, address = ?, hobby = ? WHERE id = ?",
      [name, age, address, hobby, id]
    );
    res.json({ message: "success" });
  });

  // 删除
  app.post("/api/v1/deletelist", async (req, res) => {
    const { id } = req.body;
    await connection.query("DELETE FROM user WHERE id = ?", [id]);
    res.json({ message: "success" });
  });

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
})();
