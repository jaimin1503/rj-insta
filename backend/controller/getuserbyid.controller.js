import User from "../model/user.model.js"
export const getuserbyid=async (req,res)=>{
    try{
        const userid=req.params.userid
        console.log("userid is",userid)
        if(userid){
            const user = await User.findById(userid)
            .populate({
              path: 'profile',
              populate: {
                path: 'posts',
                model: 'Post',
              }
            })


            return res.status(200).json({
                success:true,
                message:"user detail fatched successfully",
                user:user
            })
        }else{
            return res.status(400).json({
                success:false,
                message:"userdetails is not find in req"
            })
        }

    }catch(error){
        return res.status(400).json({
            success:false,
            message:`something want wrong and error is ${error}`
        })
    }
}