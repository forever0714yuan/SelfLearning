import net from "net";

const client = net.createConnection({ port: 3000, host: "localhost" });

client.on("data", (data) => {
  console.log(data.toString());
});
