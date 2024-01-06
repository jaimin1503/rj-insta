import User from "../model/user.model.js";

export const getuserbyid = async (req, res) => {
  try {
    const newuserid = req.params.userid;
    const userid=req.user.userid;
    if (newuserid) {
      const newuser = await User.findOne({ _id: newuserid }).populate({
        path: "profile",
        populate: [
          { path: "posts", model: "Post" },
          {
            path: "followers", model: "User",
            select: '-password',
            populate: {
              path: "profile",
              model: "Profile",
            },
          },
          {
            path: "following",
            model: "User",
            select: '-password',
            populate: {
              path: "profile",
              model: "Profile",
            },
          },
        ],
      });
      
      if (newuser) {
        newuser.password=undefined
        const isPresant=newuser.profile.followers.some(follower=>follower._id==userid)
        return res.status(200).json({
          success: true,
          message: "user detail fetched successfully",
          newuser: newuser,
          following:isPresant
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "userdetails is not found in req",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `something went wrong and error is ${error}`,
    });
  }
};
