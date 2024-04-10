const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const bcrypt = require('bcrypt');
const { Resend } = require('resend');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { name, email: userEmail, password } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email: userEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      email: userEmail,
      password: hashedPassword
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Send a confirmation email After User Successfully Register
    const resendClient = new Resend('re_3vtUVwfZ_3or8vd97gJ5EUp96hkc4UtHW'); 
    const emailResponse = await resendClient.emails.send({
      from: 'onboarding@resend.dev',
      to: userEmail,
      subject: 'Registration Confirmation',
      html: `<p>Welcome to E-Learning Backend! You have successfully registered.</p>`
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JSON Web Token For Authentication purposes
    const token = jwt.sign({ userId: user._id }, 'sandeep123', { expiresIn: '1h' });

    // Access token
    const accessToken  = jwt.sign({ userId: user._id }, 'sandeep123', { expiresIn: '10m' });

    // Refresh token
    const refreshToken = jwt.sign({ userId: user._id }, 'sandeep123_refresh', { expiresIn: '1d' });

    res.status(200).json({ token, accessToken, refreshToken }); 
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'No user found with that email' });
    }

    // Generate a reset token and expiration date
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiration = Date.now() + 3600000; // 1 hour from now

    // Update the user document with the reset token and expiration
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiration;
    await user.save();

    // Send a password reset email
    const resendClient = new Resend('re_3vtUVwfZ_3or8vd97gJ5EUp96hkc4UtHW');
    const resetUrl = `http://your-frontend-url.com/reset-password?token=${resetToken}`;
    const emailResponse = await resendClient.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Password Reset Request',
      html: `<p>You have requested to reset your password. Click the following link to reset your password:</p>
             <p><a href="${resetUrl}">${resetUrl}</a></p>`
    });

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Profile
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find the user by ID
    const user = await User.findById(userId, '-password -resetPasswordToken -resetPasswordExpires');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update Profile
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email, password: currentPassword, newPassword } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's information
    user.name = name || user.name;
    user.email = email || user.email;

    // If a new password is provided, hash it and update the user's password
    if (newPassword) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid current password' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
    }

    // Save the updated user
    const updatedUser = await user.save();

    // Remove sensitive fields from the response
    const { password, resetPasswordToken, resetPasswordExpires, ...userProfile } = updatedUser._doc;

    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ message: 'Internal server error' });
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

// Enroll in a course
exports.enrollCourse = async (req, res) => {
  try {
    const courseId = req.params.id; 
    const userId = req.user._id;

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if the user has already enrolled in the course
    const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (existingEnrollment) {
      return res.status(400).json({ message: 'You have already enrolled in this course' });
    }

    // Create a new enrollment
    const enrollment = new Enrollment({ user: userId, course: courseId });
    await enrollment.save();

    res.status(200).json({ message: 'Thank you for enrolling in ' + course.title + '! 🎉 Hope you do well' });
  } catch (error) {
    logger.error('Internal server error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get enrolled courses
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find the enrollments for the user
    const enrollments = await Enrollment.find({ user: userId }).populate('course');

    if (enrollments.length === 0) {
      return res.status(200).json({ message: 'You Have Not Enrolled To any Course 😞 Please Enroll to a course' });
    }

    const enrolledCourses = enrollments.map(enrollment => enrollment.course);

    res.status(200).json(enrolledCourses);
  } catch (error) {
    logger.error('Internal server error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};