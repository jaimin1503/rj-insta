import express from "express";
const router = express.Router();

import { signup, login,sendotp } from "../controller/auth.controller.js";
import { getuser } from "../controller/getuser.controller.js";
import { getuserbyid } from "../controller/getuserbyid.controller.js";
import { createpost } from "../controller/createpost.controller.js";
import { getallpost } from "../controller/getallpost.controller.js";
import { getPostByid } from "../controller/getPostByid.controller.js";
import { auth } from "../middleware/auth.js";
import { likePost } from "../controller/like.controller.js";
import { commentpost } from "../controller/comment.controller.js";
import { follow, removefollow } from "../controller/folllower.controller.js";
import { getlikepost } from "../controller/getlikepost.controller.js";
import { editprofile } from "../controller/editprofile.controller.js";
import { getprofile } from "../controller/getprofile.controller.js";
import { getprofilebyid } from "../controller/getprofilebyid.controller.js";
import { savedpost } from "../controller/savepost.controller.js";
import { getalluser } from "../controller/getalluser.controller.js";
import { isSaved } from "../controller/isSaved.controller.js";
import {
  ctreatestory,
  getallstory,
  getstorybyid,
  getuserstory
} from "../controller/story.controller.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/sendotp", sendotp);

router.get("/getuser", auth, getuser);
router.get("/getuserbyid/:userid", auth, getuserbyid);
router.post("/createpost", auth, createpost);
router.get("/getallpost", auth, getallpost);
router.get("/getPostByid/:postid", auth, getPostByid);
router.post("/likepost/:postid", auth, likePost);
router.get("/getlikepost/:postid", auth, getlikepost);
router.post("/commentpost/:postid", auth, commentpost);
router.post("/follow/:followid", auth, follow);
router.post("/removefollow/:followid", auth, removefollow);
router.post("/savedpost/:postid", auth, savedpost);
router.put("/editprofile", auth, editprofile);
router.get("/getprofile", auth, getprofile);
router.get("/getprofilebyid/:profileid", auth, getprofilebyid);
router.get("/getalluser", auth, getalluser);
router.get("/:postid/isSaved", auth, isSaved);
router.post("/createstory", auth, ctreatestory);
router.get("/getallstory", auth, getallstory);
router.get("/getstorybyid/:storyid", getstorybyid);
router.get("/getuserstory",auth, getuserstory);

export default router;
