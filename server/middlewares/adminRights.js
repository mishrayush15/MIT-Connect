// Middleware to check if the user is admin

const userModel = require('../models/user-model')

const isUserAdmin = async (req, res, next) =>{
    const userData = await userModel.findOne({_id : req.user.id});
    const isAdmin = await userData.isAdmin;
    if(!isAdmin) return res.status(404).json({
        message : "Admin Rights Not Granted !"
    });
    console.log("Admin rights granted !");
    next();
    
}

module.exports = isUserAdmin;
