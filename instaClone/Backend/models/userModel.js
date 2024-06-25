import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:Number,
        require:true
    },
})

const userModel=mongoose.model('UserModel',userSchema)
export default userModel;




