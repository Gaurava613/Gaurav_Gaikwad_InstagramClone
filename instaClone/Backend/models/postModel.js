//postModel.js
import mongoose from "mongoose";
const {ObjectId}=mongoose.Types


const postSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true
    },
    imgUrl:{
        type:String,
        default:"No img available"
    },
    author:{
        type:ObjectId,
        ref:"UserModel"
    },
})

const PostModel=mongoose.model('PostModel',postSchema)
export default PostModel;




