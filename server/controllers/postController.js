const postModel = require('../models/post-model');
const userModel = require('../models/user-model');
const resolveMode = require('../models/resolve-model')
const nodemailer = require("nodemailer");
require('dotenv').config();
const email = process.env.EMAIL;
const password = process.env.PASSWORD;





// Create Post
const createPost = async (req, res) => {
    const { title, description } = req.body;
    try {
        const existingUser = await userModel.findOne({ email: req.user.email });
        const post = await postModel.create({
            title,
            description,
            user: existingUser._id
        });
        existingUser.posts.push(post._id);
        await existingUser.save();
        res.json({ post });
        console.log(`Post created successfully! by ${existingUser.username}`);
    } catch (error) {
        res.status(500).json({ message: "Error while creating post!" });
        console.log("Error while creating post!");
    }
}

// Fetch Post
const fetchPost = async (req, res) => {
    try {
        const existingPost = await postModel.find().populate('user');
        res.json({ Posts: existingPost });
        console.log("Posts fetched successfully!");
    } catch (error) {
        res.status(500).json({ message: "Error while fetching post!" });
        console.log("Error while fetching post!");
    }
}

// Delete Post
const deletePost = async (req, res) => {
    try {
        const existingPost = await postModel.findOneAndDelete({ _id: req.params.id })

        await userModel.updateOne(
            { _id: existingPost.user._id },
            { $pull: { posts: existingPost._id } }
        )
        res.json({ message: "Post Deleted!" })

    } catch (error) {
        res.status(500).json({ message: "Error while deleting post!" });
        console.log("Error");

    }
}

// Request Post
const requestedPost = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.user.email });
        const existingPostId = await postModel.findByIdAndUpdate(req.params.id,
            { status: "requested" },
            { new: true }
        );
        let userFlag = false;
        const existingPost = await postModel.findOne({ _id: req.params.id }).populate('requestedBy')
        for (i = 0; i <= existingPost.requestedBy.length - 1; i++) {
            if (existingPost.requestedBy[i]._id.toString() == existingUser._id.toString()) {
                userFlag = true;
                break;
            }
        }
        if (!userFlag) {
            existingPostId.requestedBy.push(existingUser._id);
            await existingPostId.save();
            res.status(200).json({
                updatedpost: existingPostId
            })
        } else {
            res.status(200).json({
                message: "Already requested!"
            })
        }
    } catch (error) {
        res.status(404).json({
            message: "Unable to edit changes!"
        })
    }
}

// Fetch requested posts
const fetchRequestedPost = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.user.email }).populate(({
            path: 'posts',
            populate: { path: 'requestedBy' }
        }))
        const requestedPosts = existingUser.posts.filter(post => post.status == "requested")
        res.status(200).json({
            requestedPosts: requestedPosts
        })
    } catch (error) {
        res.status(500).json({
            message: "Error while fethcing requested posts"
        })
    }
}

// Send email
const sendEmail = async (req, res) => {
    try {
        const postUserEmail = req.params.email;
        const userData = await userModel.findOne({ email: req.user.email })
        const { title, description } = req.body;
        const transporter = await nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: email,
                pass: password
            }
        });
        const info = await transporter.sendMail({
            from: email,
            to: postUserEmail,
            subject: title,
            text: description,
            html: `<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            background-color: #0047ab;
            color: white;
            padding: 10px 0;
            border-radius: 10px 10px 0 0;
        }
        .content {
            padding: 20px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #888888;
        }
        .info {
            margin-bottom: 15px;
        }
        .info strong {
            color: #0047ab;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Item Request</h2>
        </div>
        <div class="content">
            <div class="info">
                <strong>Sender Email:</strong> <span>${userData.email}</span>
            </div>
            <div class="info">
                <strong>Phone Number:</strong> <span>+91 ${userData.phoneNumber}</span>
            </div>
            <div class="info">
                <strong>Description:</strong>
                <p>${description}</p>
            </div>
        </div>
        <div class="footer">
            <p>Powered by MIT-Connect</p>
        </div>
    </div>
</body>
</html>`,
        });
        res.status(200).json({
            message: info
        })
    } catch (error) {
        res.status(500).json({
            message: "Unable to send request!"
        })
    }
}

// Resolve lost items
const resolveItem = async (req, res) => {
    try{
        const userId = req.params.id;
        const {title, description, phoneNumber} = req.body;
        const resolve = await resolveMode.create({
            title,
            phoneNumber,
            description,
            createdBy: userId
        })
        res.status(200).json({
            message : resolve
        })
    }catch(error){
        res.status(500).json({
            message: "Unable to complete request!"
        })
    }
}

// Fetch resolved posts
const fetchResolvedPosts = async (req, res) => {
    try{
        const resolvedPosts = await resolveMode.find().populate('createdBy');
        res.status(200).json({
            posts: resolvedPosts
        })
    }catch(error){
        res.status(404).json({
            message: "Can't perform the action"
        })
    }
}

module.exports = { createPost, fetchPost, deletePost, requestedPost, fetchRequestedPost, sendEmail, resolveItem, fetchResolvedPosts};