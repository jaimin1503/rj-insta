import User from "../model/user.model.js";

export const getuserbyid = async (req, res) => {
  try {
    const userid = req.params.userid;

    if (userid) {
      const user = await User.findOne({ _id: userid }).populate({
        path: "profile",
        populate: [
          { path: "posts", model: "Post" },
          { path: "followers", model: "User" },
          { path: "following", model: "User" },
        ],
      });

      if (user) {
        return res.status(200).json({
          success: true,
          message: "user detail fetched successfully",
          user: user,
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
    return res.status(400).json({
      success: false,
      message: `something went wrong and error is ${error}`,
    });
  }
};
