const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware')

// Admin login
router.post('/login', adminController.loginAdmin);

// Create Course
router.post('/courses', authMiddleware, adminController.createCourse);

// Get All Courses
router.get('/courses', authMiddleware, adminController.getCourses);

// Update Course
router.put('/courses/:id', authMiddleware, adminController.updateCourse);

// Delete Course
router.delete('/courses/:id', authMiddleware, adminController.deleteCourse);

module.exports = router;
