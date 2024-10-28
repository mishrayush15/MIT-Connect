const mongoose = require('mongoose');

const resolveSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    status:{
        type: String,
        default: "resolved"
    },
    date: {
        type: Date,
        default: Date.now
    },
    // imageURL: {
    //         type: String,
    //         required: true
    // }
})

module.exports = mongoose.model('resolve', resolveSchema);