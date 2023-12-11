import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongo_url = process.env.MONGO_URL;

export function databaseconnection() {
  mongoose
    .connect(mongo_url)
    .then(() => {
      console.log("connected to database");
    })
    .catch((error) => {
      console.log(error);
    });
}
