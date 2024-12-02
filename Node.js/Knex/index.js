(async () => {
  const mysql2 = require("mysql2/promise");
  const fs = require("fs");
  const jsyaml = require("js-yaml");
  const express = require("express");

  const knex = require("knex");

  const yaml = fs.readFileSync("./db.config.yaml", "utf8");

  const config = jsyaml.load(yaml);

  // const connection = await mysql2.createConnection({
  //   ...config.db,
  // });

  const db = knex({
    client: "mysql2",
    connection: {
      ...config.db,
    },
  });

  // 必须使用then 来接收 否则 不会常见成功
  db.schema
    .createTableIfNotExists("list", (table) => {
      table.increments("id").primary();
      table.string("name");
      table.integer("age");
      table.string("address");
      table.string("hobby");
      table.string("sex");
      table.timestamps(true, true); // 创建时间 和更新时间
    })
    .then(() => {
      console.log("创建成功");
    });

  const app = express();
  app.use(express.json());

  // 查询全部
  app.get("/api/v1/list", async (req, res) => {
    const data = await db("list").select();
    const count = await db("list").count("* as total");
    res.json({
      data,
      count: count[0].total,
    });
  });

  // 查询单个
  app.get("/api/v1/list/:id", async (req, res) => {
    const row = await db("list").select().where({ id: req.params.id });

    res.json(row);
  });

  // 新增
  app.post("/api/v1/list", async (req, res) => {
    const { name, age, address, hobby, sex } = req.body;

    await db("list").insert({
      name,
      age,
      address,
      hobby,
      sex,
    });

    res.json({ message: "success" });
  });

  // 修改
  app.post("/api/v1/updatelist", async (req, res) => {
    const { id, name, age, address, hobby } = req.body;

    await db("list")
      .update({
        name,
        age,
        address,
        hobby,
      })
      .where("id", id);

    res.json({ message: "success" });
  });

  // 删除
  app.post("/api/v1/deletelist", async (req, res) => {
    const { id } = req.body;
    // await connection.query("DELETE FROM user WHERE id = ?", [id]);
    await db("list").where({ id: id }).del();
    res.json({ message: "success" });
  });

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
})();
