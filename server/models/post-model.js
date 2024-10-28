const mongoose = require('mongoose');

// Post Schema
const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    requestedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    // foundDate: {
    //     type: Date
    // },
    // imageURL: {
    //     type: String,
    //     required: true
    // },
    status: {
        type: String,
        default: 'lost'
    },
});


module.exports = mongoose.model('post', postSchema);