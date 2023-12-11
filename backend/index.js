import express from "express";
import cookieParser from "cookie-parser"
import { databaseconnection } from "./config/database.js";
import dotenv from "dotenv";
import user from "./routers/user.js";
dotenv.config();
import cors from "cors";
// import cookieParser from "cookie-parser";

databaseconnection();
const app = express();
app.use(express.json());
app.use(cookieParser);
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`app is listing on port ${port}`);
});
app.use(express.json());
app.use("/user", user);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
