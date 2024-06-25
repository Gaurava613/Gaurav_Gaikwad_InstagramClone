import express from "express";
import dotenv from 'dotenv'
import protectedRoute from '../middleware/protectedRoute.js'
import PostModel from "../models/postModel.js";
import mongoose from "mongoose";

dotenv.config()

const postRouter=express.Router()

postRouter.post('/create-post',async (req,res)=>{
    const{title,content}=req.body

    if(!title || !content){
        return res.status(400).json({ message: "Mandatory fields cannot be empty" });
    }
    // console.log(req.userData)
    // res.send("Success")

    const postModel = new PostModel({
        title:title,
        content,
        author:req.userData
    })
    postModel.save()
    .then(dbPost=>{
        res.status(201).json({result:dbPost})
    })
    .catch(err=>{
        console.log(err)
    })
   
})

export default postRouter;


