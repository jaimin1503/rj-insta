import express from "express";
import {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} from "../controller/chatControllers.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

router.route("/").post(auth, accessChat);
router.route("/").get(auth, fetchChats);
router.route("/group").post(auth, createGroupChat);
router.route("/rename").put(auth, renameGroup);
router.route("/groupremove").put(auth, removeFromGroup);
router.route("/groupadd").put(auth, addToGroup);

export default router;
