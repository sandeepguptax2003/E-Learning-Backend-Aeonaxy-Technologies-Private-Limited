# E-Learning Platform Backend

## Table of Contents

- [Introduction](#introduction)
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
- [Backend API Link](#backend-api-link)
- [Installation](#installation)
- [Contributing](#contributing)
- [Contact](#contact)

## Introduction

This project aims to develop a robust backend API for an e-learning platform. The API facilitates user registration, user profile management, course management (including CRUD operations for admin), and user enrollment functionalities. It also implements filtering and pagination to enhance user experience.

## Project Overview

The project utilizes the free tier of MongoDB for data storage and resend free tier for handling email communications. The goal is to create a scalable and efficient backend system that supports the core functionalities of an e-learning platform.

## Features

The implemented features include:

- User Registration and Login
- User Profile Management
- Course Management (CRUD operations for admin)
- User Enrollment in Courses
- Filtering and Pagination for Courses
- Secure Authentication using JWT
- Error Handling

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT for Authentication
- Resend.com for Email Communication

## API Endpoints

This section provides an overview of the API endpoints available for testing. Each endpoint is designed to perform specific functions related to user management, course management, and enrollment.

### User APIs

- **User Registration(POST Request)**: `/api/users/register`
 - Allows new users to register by providing their details.
- **User Login(POST Request)**: `/api/users/login`
 - Authenticates users and provides access to protected resources.
- **User View Profile(GET Request)**: `/api/users/profile`
 - Retrieves the profile information of the authenticated user.
- **User Forgot Password(POST Request)**: `/api/users/forgot-password`
 - Initiates the password reset process for users who have forgotten their password.
- **User Profile Edit(PUT Request)**: `/api/users/profile`
 - Allows users to update their profile information.
- **User View All Courses(GET Request)**: `/api/users/courses`
 - Lists all available courses for the user.
- **User View Course By Filter-Category(GET Request)**: `/api/users/courses?category=category name`
 - Filters and lists courses based on the specified category.
- **User View Course By Pagination(GET Request)**: `/api/users/courses?page=1&limit=10`
 - Paginates the course list to improve user experience.
- **User Enroll Course(POST Request)**: `/api/users/courses/:id/enroll`
 - Allows users to enroll in a specific course.
- **User View Enrolled Course(GET Request)**: `/api/users/courses/enrolled`
 - Lists all courses the user is currently enrolled in.

### Admin APIs

- **Admin Login(POST Request)**: `/api/admin/login`
 - Authenticates admin users for accessing admin-specific resources.
 - Admin has inbuilt login details.
 - Email - admin@gmail.com
 - Password - admin
- **Admin Create Course(POST Request)**: `/api/admin/courses`
 - Allows admin users to create new courses.
- **Admin View All Created Course(GET Request)**: `/api/admin/courses`
 - Lists all courses created by the admin.
- **Admin Edit Course(PUT Request)**: `/api/admin/courses/:id`
 - Allows admin users to edit the details of a specific course.
- **Admin Delete Course(DELETE Request)**: `/api/admin/courses/:id`
 - Enables admin users to delete a specific course.

These endpoints are part of the backend API for the e-learning platform and can be tested using tools like Postman, cURL, ThunderClient Etc. For detailed API Uses Refer to Models And Routes.
##
## Backend API Link

The backend is deployed in Cyclic and can be accessed at [https://fine-blue-walrus-cape.cyclic.app/](https://fine-blue-walrus-cape.cyclic.app/).

## Installation

To get the E-Learning Backend API up and running on your local machine, follow these steps:

1. **Clone the repository**:
   git clone https://github.com/sandeepguptax2003/E-Learning-Backend-Aeonaxy-Technologies-Private-Limited-.git

2. **Install dependencies**:
   Navigate to the project directory and install the required dependencies using npm.

3. **Set up environment variables**:
   Create a `.env` file in the root directory of the project. Add the following environment variables to it:
   PORT=5600 
   MONGO_URI=your_mongodb_uri
   Replace `your_mongodb_uri` with your actual MongoDB connection string.

4. **Start the server**:
   With all dependencies installed and environment variables set, you can start the server by running:
   node server.js

## Contributing

We welcome contributions to improve our project! To contribute, please follow these guidelines:

1. Fork the repository and clone it to your local machine.
2. Install dependencies using `npm install`.
3. Set up the development environment.
4. Follow our coding standards.
5. Make your changes and test them thoroughly.
6. Submit a pull request with a detailed description of your changes.

### Contact

For any queries or suggestions, please feel free to contact me
