import knex from "knex";
import express from "express";
import shortid from "shortid";

const app = express();
app.use(express.json());
const db = knex({
  client: "mysql2",
  connection: {
    host: "localhost",
    port: 3307,
    user: "root",
    password: "513822Yu@",
    database: "short_links",
  },
});

// 生成短码 存入数据库
app.post("/short", async (req, res) => {
  const { url } = req.body;
  const short_id = shortid.generate();
  const result = await db("short").insert({ short_id, url });
  res.send(`http://localhost:3000/${short_id}`);
});

app.get("/:short_id", async (req, res) => {
  const short_id = req.params.short_id;
  const result = await db("short").select("url").where("short_id", short_id);
  console.log(result);
  if (result?.length) {
    res.redirect(result[0].url);
  } else {
    res.send("404");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
