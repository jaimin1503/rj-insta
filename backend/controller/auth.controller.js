import User from "../model/user.model.js";
import Profile from "../model/profile.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();
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
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({
                success:false,
                message:"please provide a valide email "
             });
          }
          if (password.length<6) {
            return res.status(400).json({
                success:false,
                message:"your password is to sort please provide at least 6 charcter password "
             });
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


export const login = async (req, res) => {
    try {
        const { email, password,username } = req.body;
        let user
        if(email){
            user= await User.findOne({ email });
        }else if(username){
            user = await User.findOne({ username });
        }else{
            return res.status(400).json({
                success:false,
                message:"please provide username or a email"
            })
        }
        
        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                const payload = {
                    userid: user._id,
                    email: user.email,
                    username: user.username,
                }
                let token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: "30d",
                });
                user.token = token;
                user.password = undefined;

                const options = {
                    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                    httpOnly: true,
                }

                return res.cookie("token", token, options).status(200).json({
                    success: true,
                    token,
                    user,
                    message: "User logged in successfully"
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: "password is incorrect"
                })
            }
        }else{
            return res.status(400).json({
                success:false,
                message:"user dose not exist "
            })
        }
    } catch (error) {
            return res.status(400).json({
                success:false,
                message:`somthing want wrong while login and error is ${error}` 
            })
    }
}