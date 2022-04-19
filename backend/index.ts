import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import api from "./routes/api";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 7000;

app.use("/api", api);

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.listen(port, () => {
    console.log(`Server is running at https://localhost:${port}`);
});
