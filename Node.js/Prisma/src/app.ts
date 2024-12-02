const express = require("express");
const { PrismaClient } = require("prisma");

const app = express();

app.use(express.json());

const prisma = new PrismaClient();

app.post("/create", async (req, res) => {
  const { name, email } = req.body;
  // const data = await prisma.user.create({
  //   data: {
  //     name,
  //     email,
  //     posts: {
  //       create: {
  //         title: "标题",
  //         // publish: true,
  //       },
  //     },
  //   },
  // });
  res.send("data");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
