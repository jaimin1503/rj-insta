import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 5555;
const mongo_url =
  "mongodb+srv://jaimin15:ranjeet62@socoalmedia.yn32wgb.mongodb.net/?retryWrites=true&w=majority";
app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("connected to database");
    app.listen(port, () => {
      console.log("listning on port 5555");
    });
  })
  .catch((error) => {
    console.log(error);
  });
