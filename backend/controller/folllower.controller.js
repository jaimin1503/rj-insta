import Follower from "../model/follower.model.js";
import Following from "../model/following.model.js";
import User from "../model/user.model.js";
import Profile from "../model/profile.model.js";

export const follow = async (req, res) => {
  try {
    const followerid = req.params.followid;
    const userid = req.user.userid;
    if (followerid === userid) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }
    const followuser = await User.findById(followerid);
    if (!followuser) {
      return res.status(404).json({
        success: false,
        message: "Follower not found",
      });
    }
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const userprofileid = user.profile;
    const followprofileid = followuser.profile;
    const userprofile = await Profile.findById(userprofileid);
    if (!userprofile) {
      return res.status(500).json({
        success: false,
        message: "User profile not found",
      });
    }
    const followingarray = userprofile.following;
    if (!followingarray.includes(followerid)) {
      await Profile.findByIdAndUpdate(
        userprofileid,
        {$push:{following:followerid} },
        {new:true}
      );
      await Profile.findByIdAndUpdate(
        followprofileid,
        { $push: { followers: userid } },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "followed successfully",
        
      });
    } else {
      await Profile.findByIdAndUpdate(
        userprofileid,
        {$pull:{following:followerid} },
        {new:true}
      );
      await Profile.findByIdAndUpdate(
        followprofileid,
        { $pull: { followers: userid } },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "Unfollowed successfully",
        
      });
    }
  } catch (error) {
    console.error("Error during follow:", error);
    res.status(500).json({
      success: false,
      message: `Something went wrong while following the user. Error: ${error}`,
    });
  }
};
