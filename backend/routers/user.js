import express from "express";
const router = express.Router();

import { signup, login } from "../controller/auth.controller.js";
import { getuser } from "../controller/getuser.controller.js";
import { getuserbyid } from "../controller/getuserbyid.controller.js";
import { createpost } from "../controller/createpost.controller.js";
import { getallpost } from "../controller/getallpost.controller.js";
import { getPostByid } from "../controller/getPostByid.controller.js";
import { auth } from "../middleware/auth.js";
import { likePost, unlikePost } from "../controller/like.controller.js";
import { commentpost } from "../controller/comment.controller.js";
import { follow } from "../controller/folllower.controller.js";

router.post("/signup", signup);
router.post("/login", login);
router.get("/getuser", auth, getuser);
router.get("/getuserbyid/:userid", auth, getuserbyid);
router.post("/createpost", auth, createpost);
router.get("/getallpost", auth, getallpost);
router.get("/getPostByid/:postid", auth, getPostByid);
router.post("/likepost/:postid", auth, likePost);
router.post("/unlikepost/:postid", auth, unlikePost);
router.post("/commentpost/:postid", auth, commentpost);
router.post("/follow/:followid", auth, follow);
export default router;
