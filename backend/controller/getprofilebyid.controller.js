import Profile from "../model/profile.model.js"
// import User from "../model/user.model.js"


export const getprofilebyid =async (req,res)=>{
    try{
        const profileid=req.params.profileid
        if(profileid){
                
                const profiledetails=await Profile.findById(profileid);
                return res.status(200).json({
                    success:true,
                    message:"get profile successfully",
                    profile:profiledetails
                })
            }else{
            return res.status(400).json({
                success:false,
                message:"profileid is not  found"
            })
        }
    }catch(error){
        return res.status(400).json({
            success:false,
            message:`somethong went wrong while getprofile and error is ${error}`
        })
    }
}