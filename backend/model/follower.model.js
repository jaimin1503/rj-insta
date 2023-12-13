import mongoose from "mongoose";
const followerSchema = new mongoose.Schema({
    
    
    followerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    
    
    
})
 const Follower = mongoose.model("Follower", followerSchema) 
 export default Follower