// import Like from '../model/like.model.js';
// import Post from '../model/post.model.js';

// export const unlikePost = async (req, res) => {
//   try {
//     const userid = req.user.userid; 
//     const postid = req.params.postid; 

//     // Check if the post exists
//     const post = await Post.findById(postid);
//     if (!post) {
//       return res.status(404).json({
//         success: false,
//         message: 'Post not found',
//       });
//     }

//     // Check if the user has already liked the post
//     const existingLike = await Like.findOne({ user: userid, post: postid });
//     if (existingLike) {
//           // Create a new like
//     const newLike = await Like.findOneAndDelete({ user: userid, post: postid });


//     // Update the post's like count (assuming you have a 'likes' field in your Post model)
//     const updatedPost= await Post.findOneAndUpdate(
//         { _id: postid }, // Assuming profileid is the ID of the profile document you want to update
//         { $poll: { like: newLike } }, //  $poll syntax
//         { new: true }
//     );
//     return res.status(200).json({
//       success: true,
//       message: 'Post unliked successfully',
//       like: newLike,
//       post:updatedPost
//     });
//     }


//     return res.status(400).json({
//       success: false,
//       message: 'You have not liked this post',
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: `something want wrong while likepost and error is ${error}`,
//     });
//   }
// };

// export const likePost = async (req, res) => {
//   try {
//     const userid = req.user.userid; 
//     const postid = req.params.postid; 

//     // Check if the post exists
//     const post = await Post.findById(postid);
//     if (!post) {
//       return res.status(404).json({
//         success: false,
//         message: 'Post not found',
//       });
//     }

//     // Check if the user has already liked the post
//     const existingLike = await Like.findOne({ user: userid, post: postid });
//     if (existingLike) {
//       return res.status(400).json({
//         success: false,
//         message: 'You have already liked this post',
//       });
//     }

//     // Create a new like
//     const newLike = new Like({
//       user: userid,
//       post: postid,
//     });

//     // Save the like to the database
//     await newLike.save();

//     // Update the post's like count (assuming you have a 'likes' field in your Post model)
//     const updatedPost= await Post.findOneAndUpdate(
//         { _id: postid }, // Assuming profileid is the ID of the profile document you want to update
//         { $push: { like: newLike } }, // Corrected $push syntax
//         { new: true }
//     );
//     return res.status(200).json({
//       success: true,
//       message: 'Post liked successfully',
//       like: newLike,
//       post:updatedPost
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: `something want wrong while likepost and error is ${error}`,
//     });
//   }
// };
