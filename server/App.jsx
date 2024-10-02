// src/App.jsx
import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import admin from 'firebase-admin';
import serviceAccountKey from "./react-js-blog-website-98b73-firebase-adminsdk-gn41n-39ad612daf.json" assert { type: 'json' };
import { getAuth } from 'firebase-admin/auth';
import aws from 'aws-sdk';
import User from './Schema/User.js'; 
import Blog from './Schema/Blog.js';
import Notification from './Schema/Notification.js';
import Comment from './Schema/Comment.js';
import Like from './Schema/Like.js'; // Import the Like model
import adminRoutes from './routes/admin.js'; // Import the admin router
import verifyAdmin from './middleware/verifyAdmin.js'; // Ensure this path is correct
import verifyJWT from './middleware/verifyJWT.js'; // Ensure this path is correct

const server = express();
const PORT = 3000;

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey)
});

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

server.use(express.json());
server.use(cors());

// Connecting to MongoDB
mongoose.connect(process.env.DB_LOCATION, {
  autoIndex: true,
}).then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));

// AWS S3 Configuration
const s3 = new aws.S3({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// ... existing routes and middleware ...

// Use Admin Routes
server.use('/admin', adminRoutes);

// ... remaining routes ...

// Start the server
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
