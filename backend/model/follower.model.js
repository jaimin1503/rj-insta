import mongoose from "mongoose";
const followerSchema = new mongoose.Schema({
    
    
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    
    
})
 const Follower = mongoose.model("Follower", followerSchema) 
 export default Follower