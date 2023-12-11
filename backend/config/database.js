import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongo_url = process.env.MONGO_URL;

export function databaseconnection() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/myapp")
    .then(() => {
      console.log("connected to database");
    })
    .catch((error) => {
      console.log(error);
    });
}
