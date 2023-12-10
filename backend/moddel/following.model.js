import mongoose from "mongoose";
const followingSchema = new mongoose.Schema({
    
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    
    
})
 const Following = mongoose.model("Following", followingSchema) 
 export default Following