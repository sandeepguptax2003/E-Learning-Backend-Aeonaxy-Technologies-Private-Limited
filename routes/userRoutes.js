const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer();

// Register a new user
router.post('/register', userController.registerUser);

// User login
router.post('/login', userController.loginUser);

// Forgot password
router.post('/forgot-password', userController.forgotPassword);

// Get user profile
router.get('/profile', authMiddleware, userController.getUserProfile);

// Update user profile
router.put('/profile', authMiddleware, userController.updateUserProfile);

// Get all courses for users
router.get('/courses', authMiddleware, userController.getCourses);

// Enroll in a course
router.post('/courses/:id/enroll', authMiddleware, userController.enrollCourse);

// Get enrolled courses
router.get('/courses/enrolled', authMiddleware, userController.getEnrolledCourses);

module.exports = router;