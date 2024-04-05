const mongoose = require('mongoose');

// Connect to the MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // MongoDB connection options
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
};

module.exports = connectDB;
