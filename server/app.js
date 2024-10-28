const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const userRouter = require('./routes/user-router');
const postRouter = require('./routes/post-router');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors')


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));


// Environment variables
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;


// Connecting to database
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.log('Error connecting to database', err);
    })


// Redirecting to particular routes
app.use('/post', postRouter);
app.use('/user', userRouter);



// Server initializing
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})