import Post from "../model/post.model.js";
import User from "../model/user.model.js";
import Profile from "../model/profile.model.js";

export const createpost = async (req, res) => {
  try {
    const userid = req.user.userid;
    console.log(userid);
    const posturl = req.body.posturl;
    console.log(posturl);

    if (userid) {
      console.log("fatching userdata");
      const user = await User.findById(userid);
      console.log("user is fatched", user);
      const profileid = user.profile;
      const post = await Post.create({
        posturl,
      });
      const updatedProfile = await Profile.findOneAndUpdate(
        { _id: profileid }, // Assuming profileid is the ID of the profile document you want to update
        { $push: { post } },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "post is created success fully ",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `somethin want wrong while creating post and error is ${error}`,
    });
  }
};
