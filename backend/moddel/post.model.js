import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    
    imageurl: {
        type: String,
    },
    like: [{
        type: Schema.Types.ObjectId,
        ref: "Like"
    }],
    comment: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    
},{
    timestamps:true
})
export const User = mongoose.model("Post", postSchema) 