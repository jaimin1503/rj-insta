import express from "express";
import { allMessages, sendMessage } from "../controller/messageController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.route("/:chatId").get(auth, allMessages);
router.route("/").post(auth, sendMessage);

export default router;
