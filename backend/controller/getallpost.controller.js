import Post from "../model/post.model.js"
export const getallpost=async (req,res)=>{
    try{
        const userdetail=req.user
        if(userdetail){
            const posts = await Post.find({})
            .populate('likes')  
            .populate('comments');

      return res.status(200).json({
        success: true,
        message: "user detail fatched successfully",
        posts: posts,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "userdetails is not find in req",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `something want wrong and error is ${error}`,
    });
  }
};