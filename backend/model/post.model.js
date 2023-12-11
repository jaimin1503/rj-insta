import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    
    posturl: {
        type: String,
    },
    like: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Like"
    }],
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    
},{
    timestamps:true
})
const Post = mongoose.model("Post", postSchema) 
export default Post