import User from "../moddel/user.model.js"
import Profile from "../moddel/profile.model.js"
import bcrypt from "bcrypt"
export const signup=async (req,res)=>{
    try{
        const {firstName,lastName,email,password}=req.body
        if(!firstName||
            !lastName||
            !email||
            !password){
                res.status(400).json({
                    success:false,
                    message:`please fill all the details`                })
            }
        const userexist=await User.findOne({email});
        console.log(userexist);
        if(userexist){
           return res.status(400).json({
                success:false,
                message:`user is already exist please login `
            })
        }
        let hashedpassword;
        try{
            hashedpassword=await bcrypt.hash(password,10);
        }catch(error){
           return res.statu(400).json({
                success:false,
                message:`error accure while hasing password and error is ${error}`
            })
        }
        const profile=await Profile.create({
            profilename:firstName
        })
        const user =await User.create({
            firstName,lastName,email,password:hashedpassword,profile
        })

        return res.status(200).json({
            success : true,
            message : "User Created Successfully",
            data : user
        });


    }catch(error){
      return   res.status(400).json({
            success:false,
            message:`something want wrong while signup and error is ${error}`
        })
    }
}