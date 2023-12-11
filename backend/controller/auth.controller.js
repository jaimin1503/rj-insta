import User from "../model/user.model.js";
import Profile from "../model/profile.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, username } = req.body;
    if (!firstName || !lastName || !email || !password || !username) {
      res.status(400).json({
        success: false,
        message: `please fill all the details`,
      });
      return;
    }
    const userexist = await User.findOne({ email });
    // console.log(userexist);
    if (userexist) {
      return res.status(400).json({
        success: false,
        message: `user is already exist please login `,
      });
    }
    let hashedpassword;
    try {
      hashedpassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: `error accure while hasing password and error is ${error}`,
      });
    }
    let profile;
    try {
      profile = await Profile.create({
        profilename: firstName,
      });
    } catch (error) {
      console.error("Error occurred while creating profile:", error);
      return res.status(400).json({
        success: false,
        message: `Error occurred while creating profile.`,
      });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      username,
      password: hashedpassword,
      profile,
    });

    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
      data: user,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return res.status(400).json({
        success: false,
        message: `Email is already in use. Please use a different email.`,
      });
    } else if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.username
    ) {
      return res.status(400).json({
        success: false,
        message: `Username is already taken. Please choose another username.`,
      });
    } else {
      console.error("Unexpected error occurred:", error);
      return res.status(400).json({
        success: false,
        message: `Something went wrong while signing up.`,
      });
    }
  }
};
