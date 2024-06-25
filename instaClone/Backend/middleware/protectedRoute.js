import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userModel from '../models/userModel.js';
dotenv.config()

const protectedRoute=(req,res,next)=>{
    const {authorization}= req.headers

    if(!authorization){
        return res.status(401).json({ message: "Login Required" });
    }
    const tokenValue=authorization.replace("Bearer ","")
    jwt.verify(tokenValue ,process.env.JET_SECRET,async (error,payload)=>{
        if(error){
            return res.status(401).json({ message: "Login Required" });
        }
        const { _id } = payload;
            userModel.findById({_id}).then(user=>{
                req.userData = user[0]
                next();
            })
    });
};

export default protectedRoute;
