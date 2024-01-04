import Story from "../model/story.model.js";

export const ctreatestory = async (req, res) => {
  try {
    const userid = req.user.userid;
    const storyurl = req.body.storyurl;
    if (userid && storyurl) {
      const story = await Story.create({ user: userid, storyurl });
      return res.status(200).json({
        success: true,
        message: "story created succcessfully",
        story:story
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "user or storyurl is missing",
      });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const getallstory = async (req, res) => {
  try {
    const userid = req.user.userid;
    if (userid) {
      const storys = await Story.find({ user: { $ne: userid } }).populate({
        path: "user",
        model: "User",
        populate: {
          path: "profile",
          model: "Profile",
        },
        options: { strictPopulate: false },
      });
      return res.status(200).json({
        success: true,
        message: "story fatched succcessfully",
        storys: storys,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "user or storyurl is missing",
      });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const getstorybyid = async (req, res) => {
  try {
    const storyid = req.params.storyid;
    if (storyid) {
      const story = await Story.findById(storyid).populate({
        path: "user",
        model: "User",
        populate: {
          path: "profile",
          model: "Profile",
        },
        options: { strictPopulate: false },
      });
      return res.status(200).json({
        success: true,
        message: "story is fatched successfully",
        story: story,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "user is not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `something went wrong while getstory and error is ${error}`,
    });
  }
};
export const getuserstory = async (req, res) => {
  try {
    const userid = req.user.userid;
    if (userid) {
      const story = await Story.findOne({user:userid}).populate({
        path: "user",
        model: "User",
        populate: {
          path: "profile",
          model: "Profile",
        },
        options: { strictPopulate: false },
      });
      if(story){

        return res.status(200).json({
          success: true,
          message: "story is fatched successfully",
          story: story,
        });
      }
      return res.status(200).json({
        success:false,
        message:"story is not found "
      })
    } else {
      return res.status(200).json({
        success: false,
        message: "user is not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `something went wrong while getstory and error is ${error}`,
    });
  }
};