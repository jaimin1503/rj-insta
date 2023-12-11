import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    profile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile"
    }
})
const  User=mongoose.model("User",userSchema) 
export default User