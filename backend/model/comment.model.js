import mongoose from "mongoose"


const commentSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "Post" //reference to the post model
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref : "User" //reference to the post model
    },    
    body: {
        type:String,
        required:true,
    }    
})


// Export 
const Comment = mongoose.model("Comment",commentSchema)
export default Comment