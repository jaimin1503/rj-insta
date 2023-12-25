// Import Mongoose 
import mongoose from "mongoose"


// Route Handler 
const storySchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "User" //reference to the post model
    },
    storyurl: {
        type:String,
        required:true,
    },    
},{timestamps:true})


// Export 
const Story = mongoose.model("Story", storySchema) 
export default Story