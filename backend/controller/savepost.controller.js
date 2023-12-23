import User from "../model/user.model.js";
import Profile from "../model/profile.model.js";

export const savedpost = async (req, res) => {
    try {
        const postid = req.params.postid;
        const userid = req.user.userid;
        const user = await User.findById(userid);
        const profile = await Profile.findById(user.profile);
        
        if (user) {
            let newprofile;
            if (profile.saved.includes(postid)) {
                newprofile = await Profile.findByIdAndUpdate(
                    user.profile,
                    { $pull: { saved: postid } },
                    { new: true }
                );
                return res.status(200).json({
                    success: true,
                    message: "Unsaved successfully",
                    profile: newprofile,
                });
            } else {
                newprofile = await Profile.findByIdAndUpdate(
                    user.profile,
                    { $push: { saved: postid } },
                    { new: true }
                );
                return res.status(200).json({
                    success: true,
                    message: "Saved successfully",
                    profile: newprofile,
                });
            }
        } else {
            return res.status(404).json({
                success: false,
                message: "Please login or sign up first",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Something went wrong while saving post, and the error is ${error}`,
        });
    }
};
