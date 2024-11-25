import { exec } from "node:child_process";
import { log } from "node:console";
import { promisify } from "node:util";

const execPromise = promisify(exec);

const myPromisify = (fn) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  };
};

const myExecPromise = myPromisify(exec);

myExecPromise("node -v")
  .then((stdout) => {
    console.log(stdout);
  })
  .catch((err) => {
    log(err);
  });
