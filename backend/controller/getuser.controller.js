import User from "../model/user.model.js";
export const getuser = async (req, res) => {
  try {
    const userdetail = req.user;
    if (userdetail) {
      const user = await User.findById(userdetail.id)
        .populate({
          path: "profile",
          populate: {
            path: "posts",
            model: "Post",
          },
        })
        .populate({
          path: "profile",
          populate: {
            path: "followers",
            model: "Follower",
          },
        })
        .populate({
          path: "profile",
          populate: {
            path: "following",
            model: "Following",
          },
        });

      return res.status(200).json({
        success: true,
        message: "user detail fatched successfully",
        user: user,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "userdetails is not find in req",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `something want wrong and error is ${error}`,
    });
  }
};
