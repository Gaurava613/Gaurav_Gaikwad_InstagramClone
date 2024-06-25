import express from "express";
import userModel from "../models/userModel.js";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import protectedRoute from '../middleware/protectedRoute.js'

dotenv.config()

const router=express.Router()

router.get('/home',protectedRoute,(req,res)=>{
    res.send('Welcome !')
})

router.post('/register',async (req,res)=>{
    const{fullName,email,password}=req.body

    if(!fullName || !email || !password){
        return res.status(400).json({ message: "Mandatory fields cannot be empty" });
    }

    try {
        const existingUser=await userModel.findOne({email:email})
        if(existingUser){
            return res.json({message:'user alerady existed'})
        }

            const addUser=new userModel({fullName,email,password})
            addUser.save()
            .then(()=>{
                 res.status(201).json({message:'user added success',data:addUser})
            })
            .catch((error)=>{
                console.log(error.message+'error......')
            })
      
    } catch (error) {
        return res.json({error:error.message+'error while fetching'})
    }
})



router.post('/login',async (req,res)=>{
    const{email,password}=req.body

    if( !email || !password){
        return res.status(400).json({ message: "Mandatory fields cannot be empty" });
    }

    try {
        const existingUser=await userModel.findOne({email:email})
        if(!existingUser){
            return res.status(401).json({ message: 'Wrong email' });
        }else{
            if(existingUser.password!=password){
                return res.status(401).json({ message: 'Wrong password' });
            }
            else{
                const jwtToken =jwt.sign({_id:existingUser._id},process.env.JWT_SECRET)
                return res.json({message:'Logged in Successfully',data:existingUser,token:jwtToken  })
            }
        }
    } catch (error) {
        return res.status(500).json({ error: error.message + ' error while fetching' });
    }
})

export default router;


