import User from "../model/user.model.js"

export const getalluser=async(req,res)=>{
    try{
        const user=req.user.userid;
        if(user){
            const alluser=await User.find({});
            return res.status(200).json({
                success:true,
                message:"all user fatched successfully",
                alluser:alluser
            })
        }else{
            return res.status(200).json({
                success:false,
                message:"please login or signup first"
            })
        }
    }catch(error){
        return res.status(500).json({
            success:false,
            message:`something went wrong while fatching all user and error is ${error}`
        })
    }
}