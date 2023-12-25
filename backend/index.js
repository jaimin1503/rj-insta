import express from "express";
import cookieParser from "cookie-parser";
import { databaseconnection } from "./config/database.js";
import dotenv from "dotenv";
import user from "./routers/user.js";
import Story from "./model/story.model.js";
dotenv.config();
import cors from "cors";
import cron from "node-cron"; // Change import statement here
databaseconnection();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
app.use("/user", user);

// cron.schedule('*/3 * * * *', async () => {
//   try {
//     const threeMinutesAgo = new Date();
//     threeMinutesAgo.setMinutes(threeMinutesAgo.getMinutes() - 59);
//     // Assuming 'Story' is your Mongoose model
//     await Story.deleteMany({ createdAt: { $lt: threeMinutesAgo } });
//     console.log('Expired stories removed.');
//   } catch (err) {
//     console.error('Error removing expired stories:', err.message);
//   }
// }, {
//   timezone: 'Asia/Kolkata',
// });

app.get("/", (req, res) => {
  res.send("Hello World!");
});
