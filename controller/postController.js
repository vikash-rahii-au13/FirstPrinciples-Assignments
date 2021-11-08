import Helper from '../config/helper';
import Post from '../models/Post'
import User from '../models/User'
import mongoose from 'mongoose';
const { validationResult } = require("express-validator");


import { body } from 'express-validator';


module.exports = {
    createPost: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    message: 'Parameter missing', code: 422, errors: errors.array()
                })
            }
            const currentUser = req.user.id
            const { title, description, content, isPrivate } = req.body;
            if (!title || !description || !content) {
                return Helper.response(res, 400, "Please add all the fields.")
            }
            const postData = await new Post({
                title,
                description,
                content,
                isPrivate,
                createdBy: currentUser
            })
            console.log(">>>>>>>", postData)
            //postData.image = image;
            await postData.save();
            var rsss = { "postData": postData }
            return Helper.response(res, 200, "Post created sucessfully.", rsss)
        } catch (error) {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>", error)
            return Helper.response(res, 500, "Server error.");
        }
    },
    updatePost: (req, res) => {
        // const postId = req.params.postId;
        const { title, description, content, isPrivate } = req.body;
        const postData = Post.findOne({ _id: req.params.postId })
        postData.exec((err, post) => {
            if (err) {
                return Helper.response(res, 400, "Something went wrong.")
            }
            post.title = title;
            post.description = description;
            post.content = content;
            post.isPrivate = isPrivate;
            post.save()
                .then(result => {
                    var resss = { "postData": result }
                    Helper.response(res, 200, "Post details updated successfully", resss);
                })
        })
    },
    deletePost: (req, res) => {
        const postId = req.params.postId;
        const postData = Post.findOne({ _id: mongoose.Types.ObjectId(postId) })
        postData.exec((err, post) => {
            if (err || !post) {
                return Helper.response(res, 400, "Something went wrong.")
            }
            post.remove()
                .then(postData => {
                    return Helper.response(res, 200, "Post deleted sucessfully.");
                })
                .catch(err => {
                    console.log(err)
                    return Helper.response(res, 500, "Server error.");
                })

        })

    },
    getAllPost: (req, res) => {
        try {
            const postData = Post.find({})
            postData.exec((err, post) => {
                if (err || !postData) {
                    return Helper.response(res, 400, "Post not found.")
                } else {
                    var ress = { postData: post }
                    return Helper.response(res, 200, "All Post List fetched.", ress)
                }
            })
        } catch (error) {
            console.log(">>>>", error)
            return Helper.response(res, 500, "Server error.")
        }

    },
    getAllPublicPost: (req, res) => {
        try {
            const postData = Post.find({ isPrivate: false })
            postData.exec((err, post) => {
                if (err || !postData) {
                    return Helper.response(res, 400, "Post not found.")
                } else {
                    var ress = { postData: post }
                    return Helper.response(res, 200, "All Post List fetched.", ress)
                }
            })
        } catch (error) {
            console.log(">>>>", error)
            return Helper.response(res, 500, "Server error.")
        }

    }

}