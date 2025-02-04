import express from "express";
import { WebSocketServer } from "ws";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {});
