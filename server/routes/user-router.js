const express = require('express');
const router = express.Router();
const {createUser, loginUser, logoutUser, fetchUser, fetchPosts, fetchAllUser, deleteUser} = require('../controllers/userController');
const authenticateUser = require('../middlewares/authentication');
const isUserAdmin = require('../middlewares/adminRights')
require('dotenv').config();
const adminrights = process.env.ADMIN_RIGHTS


// Routes
router.post('/register', createUser);
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/profile', authenticateUser, fetchUser)
router.get('/profile/posts', authenticateUser, fetchPosts);
router.get(`/profile/admin/adminMitConnect/${adminrights}`, authenticateUser, isUserAdmin, fetchAllUser)
router.get(`/profile/admin/adminMitConnect/deleteUser/${adminrights}/:id`, authenticateUser, isUserAdmin, deleteUser)




module.exports = router;