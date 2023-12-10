import mongoose from "mongoose";
const followingSchema = new mongoose.Schema({
    
    
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    
    
})
export const User = mongoose.model("Following", followingSchema) 