const log4js = require("log4js");

log4js.configure({
  appenders: {
    out: {
      type: "stdout",
      layout: {
        type: "colored",
      },
    },
    file: {
      type: "file",
      filename: "logs/server.log",
    },
  },
  categories: {
    default: {
      appenders: ["out", "file"],
      level: "debug",
    },
  },
});

const logger = log4js.getLogger("default");

const LoggerMiddleware = (req, res, next) => {
  console.log("111");
  logger.debug(`Request received: ${req.method} ${req.url}`);
  next();
};

module.exports = { LoggerMiddleware };
