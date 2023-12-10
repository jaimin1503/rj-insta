// Import Mongoose 
import mongoose from "mongoose"


// Route Handler 
const likeSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "Post" //reference to the post model
    },
    user: {
        type:String,
        required:true,
    },    
})


// Export 
module.exports = mongoose.model("Like",likeSchema)