import Profile from "../model/profile.model.js"
import User from "../model/user.model.js"


export const editprofile = async (req, res) => {
    try {
        // const profilephoto = req.params.profileid;
        // const {url,formdata}=req.body
        const url=req.body.url;
        const profilename=req.body.formData.profilename;
        const bio=req.body.formData.bio
        const userid = req.user.userid;
         const userdetails = await User.findById(userid);
        if (userdetails) {
            const profileid = userdetails.profile
            const updatesprofile = await Profile.findByIdAndUpdate(profileid, { profilename, bio: bio ? bio : "", profilephoto:url },{new:true})
            return res.status(200).json({
                success:true,
                message:"profile edite successfully ",
                profile:updatesprofile
        })
        }else{
        return res.status(400).json({
            success:false,
            message:"user is not found"
        })
        }


    } catch (error) {
        return res.status(400).json({
            success: false,
            message: `something went wrong while editprofile and error is ${error}`
        })
    }
}