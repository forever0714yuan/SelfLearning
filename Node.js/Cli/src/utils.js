// https://gitee.com/chinafaker/vue-template.git
import fs from "node:fs";

import download from "download-git-repo";
import ora from "ora";

const spinner = ora("下载中....");

export const checkPath = (path) => {
  if (fs.existsSync(path)) {
    return true;
  } else {
    return false;
  }
};

export const downloadTemplate = (branch, path) => {
  return new Promise((resolve, reject) => {
    spinner.start();
    download(
      `direct:https://gitee.com/chinafaker/vue-template.git#${branch}`,
      path,
      { clone: true },
      function (err) {
        if (err) {
          reject(err);
          spinner.fail("下载失败");
          return;
        }

        resolve();
        spinner.succeed("下载成功");
      }
    );
  });
};
