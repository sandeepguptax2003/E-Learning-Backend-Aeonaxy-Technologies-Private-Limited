const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin')

// Authentication Logic
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, 'sandeep123');
    } catch (error) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Logic For User And Admin
    if (decodedToken.userId) {
      req.user = await User.findById(decodedToken.userId);
      if (!req.user) {
        throw new Error('User not found');
      }
    } else if (decodedToken.adminId) {
      req.admin = await Admin.findById(decodedToken.adminId);
      if (!req.admin) {
        throw new Error('Admin not found');
      }
    }

    next();
  } catch (error) {
    console.error('Authentication failed:', error);
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = authMiddleware;
