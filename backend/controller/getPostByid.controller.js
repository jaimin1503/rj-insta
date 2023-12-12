import Post from "../model/post.model.js";

export const getPostByid = async (req, res) => {
  try {
    const postid = req.params.postid;

    const post = await Post.findById(postid);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      post: post,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `something went wrong while fetching post ${error}`,
    });
  }
};
