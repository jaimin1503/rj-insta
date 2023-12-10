import mongoose from "mongoose";
import profilepic from "../public/profilephoto.webp"
const profileSchema = new mongoose.Schema({
    profilename: {
        type: String,
        required: true,
        trim: true
    },
    bio: {
        type: String,
    },
    profilephoto: {
        type: String,
        default: profilepic
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: "Follower"
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: "Following"
    }],
    saved: [{
        type: Schema.Types.ObjectId,
        ref: "Saved"
    }]
})
export const User = mongoose.model("Profile", profileSchema) 