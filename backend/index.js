import express from "express";
import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import { databaseconnection } from "./config/database.js";
import dotenv from "dotenv";
dotenv.config();
import user from "./routers/user.js";
import cors from "cors";
import Story from "./model/story.model.js";
import cron from "node-cron"; // Change import statement here

databaseconnection();
const app = express();
const server = http.createServer(app); // Create an HTTP server using Express
const io = new Server(server);

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

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    socket.leave(userData._id);
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
