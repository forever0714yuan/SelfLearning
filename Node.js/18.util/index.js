import { exec } from "node:child_process";
import util from "node:util";

const execPromise = util.promisify(exec);

// exec("node -v", (err, stdout) => {
//   if (err) {
//     return err;
//   }

//   console.log(stdout);
// });

execPromise("node -v")
  .then((res) => {
    console.log(res, "res");
  })
  .catch((err) => {
    console.log(err, "err");
  });
