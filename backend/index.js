import express from "express";
import {databaseconnection} from "./config/database.js"
import dotenv from "dotenv"
import user from "./routers/user.js"
dotenv.config();
databaseconnection();
const app = express();
const port = process.env.PORT;
app.listen(port,()=>{
  console.log(`app is listing on port ${port}`)
})
app.use(express.json());
app.use("/user",user)
app.get("/", (req, res) => {
  res.send("Hello World!");
});
