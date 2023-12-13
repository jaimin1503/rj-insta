import Like from "../model/like.model.js";
import Post from "../model/post.model.js";

export const likePost = async (req, res) => {
  try {
    const userid = req.user.userid;
    const postid = req.params.postid;

    const post = await Post.findById(postid);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const existingLike = await Like.findOne({ user: userid, post: postid });
    if (existingLike) {
      const newLike = await Like.findOneAndDelete({
        user: userid,
        post: postid,
      });
      const updatedPost = await Post.findOneAndUpdate(
        { _id: postid },
        { $pull: { like: newLike._id } },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "Post unliked successfully",
        like: newLike,
        post: updatedPost,
      });
    } else {
      const newLike = new Like({
        user: userid,
        post: postid,
      });

      await newLike.save();

      const updatedPost = await Post.findOneAndUpdate(
        { _id: postid },
        { $push: { like: newLike } },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "Post liked successfully",
        like: newLike,
        post: updatedPost,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `something went wrong while likepost and error is ${error}`,
    });
  }
};
