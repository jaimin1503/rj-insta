import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
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
    password:{
        type:String,
        required:true,
    },
    profile:[{
        type:Schema.Types.ObjectId,
        ref:"Profile"
    }]
})
export const User=mongoose.model("User",userSchema) 