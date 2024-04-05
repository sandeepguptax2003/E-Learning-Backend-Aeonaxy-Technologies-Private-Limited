const Admin = require('../models/Admin');
const Course = require('../models/Course');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// Admin login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email and password match the fixed credentials
    if (email === 'admin@gmail.com' && password === 'admin') {
      // Generate a JWT token For Authentication
      const token = jwt.sign({ /* admin data */ }, 'sandeep123', { expiresIn: '1h' });

      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create Course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const course = new Course({
      title,
      description,
      category,
    });
    await course.save();
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ message: 'Failed to create course', error: error.message });
  }
};

// Get all courses
exports.getCourses = async (req, res) => {
  try {
    let query = {};
    if (req.query.category) {
      query.category = req.query.category;
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const courses = await Course.find(query).skip(skip).limit(limit);

    res.status(200).json(courses);
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ message: 'Failed to fetch courses', error: error.message });
  }
};

// Update Course
exports.updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const { title, description, category } = req.body;
    const course = await Course.findByIdAndUpdate(courseId, {
      title,
      description,
      category,
    }, { new: true });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course updated successfully', course });
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ message: 'Failed to update course', error: error.message });
  }
};

// Delete Course
exports.deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findByIdAndDelete(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ message: 'Failed to delete course', error: error.message });
  }
};
