import Profile from "../model/profile.model.js"
import User from "../model/user.model.js"


export const getprofile =async (req,res)=>{
    try{
        const userid=req.user.userid
        if(userid){
            const userdetails=await User.findById(userid);
            if(userdetails){
                const profileid=userdetails.profile
                const profiledetails=await Profile.findById(profileid);
                return res.status(200).json({
                    success:true,
                    message:"get profile successfully",
                    profile:profiledetails
                })
            }else{
                return res.status(404).json({
                    success:false,
                    message:"userdetails not found"
                })
            }
        }else{
            return res.status(404).json({
                success:false,
                message:"userid is not  found"
            })
        }
    }catch(error){
        return res.status(500).json({
            success:false,
            message:`somethong went wrong while getprofile and error is ${error}`
        })
    }
}