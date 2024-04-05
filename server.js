const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5600;

// Middleware
app.use(express.json());

// Connect to the database
mongoose.connect(process.env.MONGO_URI, {

}).then(() => {
  console.log('Connected to the database');
}).catch(err => {
  console.log('Error connecting to the database', err);
});

// Home Page
app.get('/', async (req, res) => {
  try {
    res.json('Welcome to the E-Learning Backend');
  } catch (error) {
    console.log(error);
  }
});

// Routes
// User Routes
app.use('/api/users', userRoutes);

// Admin Routes
app.use('/api/admin', adminRoutes);

// Server 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
