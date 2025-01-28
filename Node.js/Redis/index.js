import Ioredis from "ioredis";

const redis = new Ioredis({
  host: "localhost",
  port: 6379,
});

const redis2 = new Ioredis();

redis.subscribe("mychannel");

redis.on("message", (channel, message) => {
  console.log(`Received message ${message} from channel ${channel}`);
});

redis2.publish("mychannel", "Hello, Redis!");
// redis 设置过期时间
redis.setex("key", 10, "value");

// redis.setex("key", 10, "value");
// redis.set("name", "value");
// redis.get("name").then((value) => {
//   console.log(value);
// });

// redis.sadd("myset", "value1", "value2", "value3");
// redis.srem("myset", "value1");
// redis.sismember("myset", "value1").then((value) => {
//   console.log(value);
// });
// redis.smembers("myset").then((value) => {
//   console.log(value);
// });

// redis.hset("myhash", "field1", "value1", "field2", "value2");
// redis.hget("myhash", "field1").then((value) => {
//   console.log(value);
// });
// redis.hdel("myhash", "field1");
// redis.hgetall("myhash").then((value) => {
//   console.log(value);
// });

// redis.lpush("myqueue", "element1");
// redis.lpush("myqueue", "element2");
// redis.lrange("myqueue", 0, -1).then((value) => {
//   console.log(value);
// });
// redis.llen("myqueue").then((value) => {
//   console.log(value);
// });
