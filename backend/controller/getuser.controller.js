import User from "../model/user.model.js";
export const getuser = async (req, res) => {
  try {
    const userdetail = req.user;

    const email = userdetail.email;
    if (userdetail) {
      const user = await User.findOne({ email }).populate({
        path: "profile",
        populate: [
          { path: "posts", model: "Post" },
          {
            path: "followers",
            model: "User",
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
          {
            path: "saved",
            model: "Post",
          },
        ],
      });

      user.password = undefined;

      return res.status(200).json({
        success: true,
        message: "user detail fatched successfully",
        user: user,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "userdetails is not find in req",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `something went wrong ${error}`,
    });
  }
};
