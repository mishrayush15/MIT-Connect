// Middleware for authentication
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;

const authenticateUser = (req, res, next)=>{
    const token = req.cookies.token;
    if(!token) return res.status(401).json({message: "Unauthorized!"});
    const data = jwt.verify(token, secret);
    if(!data) return res.status(401).json({message: "Unauthorized!"});
    req.user = data;
    next();
}

module.exports = authenticateUser;