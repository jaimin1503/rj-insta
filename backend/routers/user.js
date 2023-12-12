import express from "express";
const router = express.Router();

import { signup, login } from "../controller/auth.controller.js";
import { getuser } from "../controller/getuser.controller.js";
import { createpost } from "../controller/createpost.controller.js";
import { getallpost } from "../controller/getallpost.controller.js";
import { auth } from "../middleware/auth.js";
import { likePost, unlikePost } from "../controller/like.controller.js";
import { getPostByid } from "../controller/getPostByid.controller.js";

router.post("/signup", signup);
router.post("/login", login);
router.get("/getuser", auth, getuser);
router.post("/createpost", auth, createpost);
router.get("/getallpost", auth, getallpost);
router.post("/likepost/:postid", auth, likePost);
router.post("/unlikepost/:postid", auth, unlikePost);
router.get("/getPostByid/:postid", auth, getPostByid);

export default router;
