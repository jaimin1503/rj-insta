import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  profilename: {
    type: String,
    required: true,
    trim: true,
  },
  bio: {
    type: String,
  },
  profilephoto: {
    type: String,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId, // Use mongoose.Schema.Types.ObjectId
      ref: "Post",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId, // Use mongoose.Schema.Types.ObjectId
      ref: "User",  
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId, // Use mongoose.Schema.Types.ObjectId
      ref: "User",
    },
  ],
  // saved: [{
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Saved"
  // }]
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
