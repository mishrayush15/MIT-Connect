const userModel = require('../models/user-model');
const postModel = require('../models/post-model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// Environment variable
const secret = process.env.SECRET;


// Create new user
const createUser = async (req, res) => {
    const { username, name, password, email, phoneNumber, enrollmentNumber } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) return res.status(409).json({ message: "User already exists, kindly login" });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.status(500).json({ message: "Error while creating user!" });
                const newUser = await userModel.create({
                    username,
                    name,
                    password: hash,
                    email,
                    phoneNumber,
                    enrollmentNumber
                })

                const token = jwt.sign({ email: newUser.email, id: newUser._id }, secret)
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: false,
                })
                res.json({
                    message: "User created succesfully!"
                })
                console.log("User created successfully!");
            })
        })
    } catch (error) {
        res.status(500).json({ message: "Error while creating user!" })
    }

}


// Login created user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "Something went wrong!" });

        bcrypt.compare(password, existingUser.password, (err, result) => {
            if (result) {
                const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret);
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: false,
                });
                res.json({ existingUser, token });
                console.log("User logged in successfully!");
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error while logging in!" });
    }

}


// Logout user
const logoutUser = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false,
    });
    res.json({ message: "User logged out successfully!" });
    console.log("User logged out successfully!");

}

// Fetch user for profile
const fetchUser = async (req, res) => {
    try{
        const existingUser = await userModel.findOne({ email: req.user.email });
        res.json({ existingUser });
        console.log("User fetched successfully!");
    }catch(error){
        res.json({
            message : "Error while fetching data!"
        })
    }
}

// Fetch all the user's post
const fetchPosts = async (req, res) => {
    const existingUserPosts = await userModel.findOne({ email: req.user.email }).populate('posts');
    res.json({ YourPosts: existingUserPosts.posts });
    console.log("Personal Posts fetched successfully!");
}

// Fetch all the users
const fetchAllUser = async (req, res) => {
    const users = await userModel.find();
    res.json({AllUsers : users});
    console.log("All users fetched (Only-Admins)");
    
}

const deleteUser = async (req, res) => {
    try{
        const user = await userModel.findOne({_id : req.params.id});
        if(!user) return res.status(404).json({
            message : "User not found!"
        })
        if(user.isAdmin == true) return res.status(401).json({
            message : "Admins can't be delete!"
        })
        const deletedUser = await userModel.findOneAndDelete({_id : req.params.id});
        const postsArray = deletedUser.posts;
        await postModel.deleteMany({_id: {$in : postsArray}})
        res.json({
            message : "User deleted sucessfully"
        })
    }catch(error){
        res.status(500).json({
            message : "Error while fetching data!"
        })
    }
}


module.exports = { createUser, loginUser, logoutUser, fetchUser, fetchPosts, fetchAllUser,  deleteUser };