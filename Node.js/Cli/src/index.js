#!/usr/bin/env node
// 告诉操作系统 执行自定义命令的时候 使用node执行当前文件

import { program } from "commander";
import fs from "node:fs";
import inquirer from "inquirer";

import { checkPath, downloadTemplate } from "./utils.js";

const version = JSON.parse(fs.readFileSync("./package.json")).version;

program.version(version);

program
  .command("create <projectName>")
  .alias("c")
  .description("创建项目")
  .action((projectName) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "description",
          message: "请输入项目名称",
          default: projectName,
        },
        {
          type: "confirm",
          name: "isTS",
          message: "是否支持TS",
        },
        {
          type: "list",
          name: "isTS",
          message: "是否支持TS",
        },
      ])
      .then((answers) => {
        console.log(answers);
        if (checkPath(projectName)) {
          return;
        }

        if (answers.isTS) {
          downloadTemplate("ts", projectName);
        } else {
          downloadTemplate("js", projectName);
        }
      });
  });
program.parse(process.argv);
