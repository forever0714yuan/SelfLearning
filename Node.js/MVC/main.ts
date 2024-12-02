import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from "inversify";
import { UserController } from "./src/user/controller";
import { UserService } from "./src/user/services";
import express from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaDB } from "./src/db";

const container = new Container();

/** user 模块 */
container.bind<UserController>(UserController).to(UserController);
container.bind<UserService>(UserService).to(UserService);

/** 封装 */
container.bind("PrismaClient").toFactory(() => {
  return () => {
    return new PrismaClient();
  };
});
container.bind(PrismaDB).to(PrismaDB);

const server = new InversifyExpressServer(container);

// 设置全局中间件
server.setConfig((app) => {
  app.use(express.json());
});

const app = server.build();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
