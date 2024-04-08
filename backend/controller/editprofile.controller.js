import Profile from "../model/profile.model.js";
import User from "../model/user.model.js";
import uploadImageToCloudinary from "../utils/imageUploader.js";
import mongoose from "mongoose";
export const editprofile = async (req, res) => {
  try {
    const profilename = req.body.formData.profilename;
    const bio = req.body.formData.bio;
    const userid = req.user.userid;
    const userdetails = await User.findById(userid);
    if (userdetails) {
      const profileid = userdetails.profile;
      const profileUpdate = await Profile.findById(profileid)

      if (profilename) {
        profileUpdate.profilename = profilename;
      }

      if (bio !== undefined) {
        profileUpdate.bio = bio ? bio : "";
      }

      // if (url) {
      //   profileUpdate.profilephoto = url;
      // }

      // const updatesprofile = await Profile.findByIdAndUpdate(
      //   profileid,
      //   profileUpdate,
      //   { new: true }
      // );
      await profileUpdate.save();
      const updatedUser = await User.findOne({ profile: profileid }).populate({
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
      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        // profile: updatesprofile,
        data:updatedUser
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
    const userid = req.params.id;
    const user=await User.findById(userid)
    if(!user){
      return res.status(404).json({
        suucess:false,
        message:"user does not exist"
      })
    }
    console.log("displaypicture",displayPicture)
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME
    );
    const profileId=user.profile
    // const profile = await Profile.findById(profileId);
    // console.log(" profile", profile);

    const updatedProfile = await Profile.findByIdAndUpdate(
      profileId, // Use objectId here
      { profilephoto: image.secure_url },
      { new: true }
    );
    const updatedUser = await User.findOne({ profile: profileId }).populate({
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

