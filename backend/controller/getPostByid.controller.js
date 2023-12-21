import Post from "../model/post.model.js";

export const getPostByid = async (req, res) => {
  try {
    const postid = req.params.postid;

    const post = await Post.findById(postid)
    .populate({
      path: "like", 
      populate: {
        path: "user",
        model: "User",
      },
      options: { strictPopulate: false },
    })
    .populate({
      path: "comment",
      populate: {
        path: "user",
        model: "User",
        populate: {
          path: "profile",
          model: "Profile",
        },
        options: { strictPopulate: false },
      },
      options: { strictPopulate: false },
    })
    .populate({
      path: "user",
      populate: {
        path: "profile",
        model: "Profile",
      },
      options: { strictPopulate: false },
    });
  
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    post.user.password=undefined
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
