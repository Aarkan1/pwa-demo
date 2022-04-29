import express from "express";
import { join, dirname } from "path";
import dotenv from "dotenv";
import api from "./routes/api.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 7000;
const staticFolder = "../frontend";

app.use("/api", api);

app.use(express.static(join(__dirname, staticFolder)));

app.get("*", (req, res) => {
    res.sendFile(join(__dirname, staticFolder + "/index.html"));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
