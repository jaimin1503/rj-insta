import mongoose from "mongoose";
const followerSchema = new mongoose.Schema({
    
    
    follower: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    
    
})
export const User = mongoose.model("Follower", followerSchema) 