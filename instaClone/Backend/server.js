import express from "express";
import mongoose from "mongoose";
import userModel from "./models/userModel.js";
import router from "./router/userRouter.js";
import dotenv from 'dotenv'
import postModel from "./models/postModel.js";
import postRouter from "./router/postRoute.js";

dotenv.config()

const app=express()

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('DB connected successfully')
})
.catch((error)=>{
    console.log(error.message,'DB not connected')
})

app.use(express.json())
app.use(router)
app.use(postRouter)


app.listen(process.env.PORT,()=>{
    console.log(`server is running on PORT : ${process.env.PORT}`)
})

export default app;
