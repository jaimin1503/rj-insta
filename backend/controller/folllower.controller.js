import Follower from "../model/follower.model.js";
import Following from "../model/following.model.js";
import User from "../model/user.model.js";
import Profile from "../model/profile.model.js";

export const follow=async (req,res)=>{
    try{
        const followerid=req.params.followid
        const userid=req.user.userid
       
        const followuser=await User.findById(followerid);
      let  followupdatedprofile;
      let  userupdatedprofile
       
        const user=await User.findById(userid);
        if(user){
            const userprofileid=user.profile;
            const userprofile=await Profile.findById(userprofileid);
            const followingarray=userprofile.following
            if(!followingarray.includes(followerid)){
                userupdatedprofile=await Profile.findByIdAndUpdate(userprofileid,{$push:{following:followerid}},{new:true})

            }else{
                return res.status(400).json({
                    success:false,
                    message:"you are already follow this guy"
                })
            }
        }else{
            return res.status(400).json({
                success:false,
                message:`user is not found`,
                            })

        }
        if(followuser){
            const profileid=followuser.profile;
            followupdatedprofile=await Profile.findByIdAndUpdate(profileid,{$push:{followers:userid}},{new:true})
        }else{
            return res.status(400).json({
                success:false,
                message:`followuser is not found`
            })
        }
        return res.status(400).json({
            success:true,
            message:`follow successfully`,
            followprofile:followupdatedprofile,
            userprofile:userupdatedprofile

        })
    }catch(error){
        res.status(400).json({
            success:false,
            message:`something went wrong while follow the user and error is ${error}`
        })
    }
} 
