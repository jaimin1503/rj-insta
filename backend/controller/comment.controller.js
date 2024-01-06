import Comment from "../model/comment.model.js";
import Post from "../model/post.model.js"
export const commentpost = async (req, res) => {
    try {
      const userid = req.user.userid; 
      const postid = req.params.postid; 
      const {comment}=req.body
      const post = await Post.findById(postid);
      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Post not found',
        });
      }
  
      const newcomment = await Comment.create({
        user: userid,
        post: postid,
        comment:comment
      });
      
      const updatedPost= await Post.findOneAndUpdate(
          { _id: postid }, 
          { $push: { comment: newcomment } }, 
          { new: true }
      ).select("-password");
      return res.status(200).json({
        success: true,
        message: 'comment on post  successfully',
        comment: newcomment,
        post:updatedPost
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: `something want wrong while comment and error is ${error}`,
      });
    }
  };