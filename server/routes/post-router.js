const express = require('express');
const authenticateUser = require('../middlewares/authentication');
const { createPost, fetchPost, deletePost, requestedPost, fetchRequestedPost, sendEmail, resolveItem, fetchResolvedPosts } = require('../controllers/postController');
const isUserAdmin = require('../middlewares/adminRights');
const router = express.Router();
require('dotenv').config();
const adminrights = process.env.ADMIN_RIGHTS

// Routes
router.post('/create', authenticateUser, createPost);
router.get('/fetch', authenticateUser, fetchPost);
router.get('/delete/:id', authenticateUser, deletePost)
router.get('/request/:id', authenticateUser, requestedPost)
router.get('/requests/fetch', authenticateUser, fetchRequestedPost)
router.post('/requests/email/:email', authenticateUser, sendEmail)
router.post('/resolve/:id', authenticateUser, resolveItem)
router.get(`/profile/admin/adminMitConnect/${adminrights}`, authenticateUser, isUserAdmin, fetchResolvedPosts)


module.exports = router;