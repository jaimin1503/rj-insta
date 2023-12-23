import User from "../model/user.model.js";
import Post from "../model/post.model.js";

export const isSaved = async (req, res) => {
  try {
    const userid = req.user.userid;
    const postid = req.params.postid;
    console.log(postid);

    if (userid) {
      if (postid) {
        const savedpost = await Post.findOne({ user: userid, post: postid });
        if (savedpost) {
          return res.status(200).json({
            success: true,
            message: "savedpost is found ",
            Saved: true,
          });
        } else {
          return res.status(200).json({
            success: false,
            message: "savedpost is not found ",
            Saved: false,
          });
        }
      } else {
        return res.status(404).json({
          success: false,
          message: "post is not found ",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "user is not found ",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `something went wrong while finding loke post and error is${error}`,
    });
  }
};
