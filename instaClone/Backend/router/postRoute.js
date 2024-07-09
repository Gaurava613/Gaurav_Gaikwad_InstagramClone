//postRouter.js
import express from "express";
import dotenv from 'dotenv';
import protectedRouter from "../middleware/protectedRoute.js";
import PostModel from "../models/postModel.js";

dotenv.config()

const postRouter = express.Router();

postRouter.get('/posts', protectedRouter,(req, res) => {
    PostModel.find()
    .populate("author", "_id fullName")
    .then(allposts => {
        res.json({ allposts });
    })
    .catch(err => {
        console.log(err);
    });
});

postRouter.get('/myposts',protectedRouter, (req, res) => {
    PostModel.find({author:req.userData._id})
    .populate("author", "_id fullName")
    .then(myposts => {
        res.json({ myposts });
    })
    .catch(err => {
        console.log(err);
    });
});

postRouter.delete('/delet-post/:postId',protectedRouter, (req, res) => {
    PostModel.findOne({_id:req.params.postId})
    .populate("author", "_id fullName")
    .exec((error,post)=>{
        if(error || !post){
            return res.status(400).json({ error:error });
        }
        if(post.author._id.toString()===req.userData._id.toString()){
            post.remove()
            .then(result=>{
                res.json(result)
            })
        }
    })
});


postRouter.post('/create-post', protectedRouter, async (req, res) => {
    const { title, content,url } = req.body;

    if (!title || !content ,url) {
        return res.status(400).json({ message: "Mandatory fields cannot be empty" });
    }
 
    console.log("Creating post for user:", req.userData);  

    const postModel = new PostModel({
        title: title,
        content: content,
        imgUrl:url,
        author: req.userData
    });

    postModel.save()
        .then(dbPost => {
            res.status(201).json({ result: dbPost })
        })
        .catch(err => {
            console.log(err)
        })

});

export default postRouter;
