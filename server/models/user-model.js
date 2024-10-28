const mongoose = require('mongoose');


// User Schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ],
    created: {
        type: Date,
        default: Date.now
    },
    profilePic: {
        type: String,
        default: '/images/defaults/default.png'
    },
    // identityCard: {
    //     type: String,
    //     required: true
    // },
    enrollmentNumber: {
        type: String,
        required: true
    },
});


module.exports = mongoose.model('user', userSchema);