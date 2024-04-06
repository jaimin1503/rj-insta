import Profile from "../model/profile.model.js";
import User from "../model/user.model.js";
import uploadImageToCloudinary from "../utils/imageUploader.js";

export const editprofile = async (req, res) => {
  try {
    const url = req.body.url;
    const profilename = req.body.formData.profilename;
    const bio = req.body.formData.bio;
    const userid = req.user.userid;
    const userdetails = await User.findById(userid);
    if (userdetails) {
      const profileid = userdetails.profile;
      const profileUpdate = {};

      if (profilename) {
        profileUpdate.profilename = profilename;
      }

      if (bio !== undefined) {
        profileUpdate.bio = bio ? bio : "";
      }

      if (url) {
        profileUpdate.profilephoto = url;
      }

      const updatesprofile = await Profile.findByIdAndUpdate(
        profileid,
        profileUpdate,
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        profile: updatesprofile,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Something went wrong while editing profile. Error: ${error}`,
    });
  }
};

export const editProfilePicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const pId = req.params.id;
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME
    );
    const updatedProfile = await Profile.findByIdAndUpdate(
      pId,
      { profilephoto: image.secure_url },
      { new: true }
    );
    const updatedUser = await User.findOne({ profile: pId }).populate(
      "profile"
    );
    return res.status(200).json({
      success: true,
      message: `Image Updated successfully`,
      data: updatedUser,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
};
