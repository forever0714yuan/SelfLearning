import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "node:fs";
import path from "node:path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${req.body.index}-${req.body.fileName}`);
  },
});
const upload = multer({ storage: storage });

const app = express();

app.use(cors());
app.use(express.json());

app.post("/upload", upload.single("file"), (req, res) => {
  let files = fs.readdirSync(path.join(process.cwd(), "./uploads"));
  files = files.sort((a, b) => a.split("-")[0] - b.split("-")[0]);

  const writePath = path.join(
    process.cwd(),
    `video`,
    `${req.body.fileName}.zip`
  );

  files.forEach(async (item) => {
    await fs.chmodSync(path.join(process.cwd(), "./uploads", item), "777");

    await fs.appendFileSync(
      writePath,
      fs.readFileSync(path.join(process.cwd(), "./uploads", item))
    );
  });

  res.send("File uploaded successfully");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
