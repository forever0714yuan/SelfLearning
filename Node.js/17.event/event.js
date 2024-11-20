const { log } = require("node:console");
const EventEmitter = require("node:events");

const event = new EventEmitter();

const fn = (data) => {
  log(data);
};

event.on("test", fn);
event.off("test", fn);

event.emit("test", "hello world");
