//postRouter.js
import express from "express";
import dotenv from 'dotenv';
import protectedRouter from "../middleware/protectedRoute.js";
import PostModel from "../models/postModel.js";

dotenv.config()

const postRouter = express.Router();

postRouter.get('/posts', (req, res) => {
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


postRouter.post('/create-post', protectedRouter, async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: "Mandatory fields cannot be empty" });
    }

    console.log("Creating post for user:", req.userData);  // Log user data

    const postModel = new PostModel({
        title: title,
        content: content,
        author: req.userData
    });

    try {
        const dbPost = await postModel.save();
        res.status(201).json({ result: dbPost });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error saving post" });
    }
});

export default postRouter;
