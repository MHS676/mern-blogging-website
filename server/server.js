import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';
import cors from 'cors';

// Importing User schema
import User from './Schema/User.js';

const server = express();
const PORT = 3000;

// Regex for email and password validation
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

server.use(express.json());
server.use(cors());

// Connecting to MongoDB
mongoose.connect(process.env.DB_LOCATION, {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));

// Helper function to format data to send
const formatDatatoSend = (user) => {
    const access_token = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY);
    return {
        access_token,
        profile_img: user.personal_info.profile_img,
        username: user.personal_info.username,
        fullname: user.personal_info.fullname
    };
};

// Helper function to generate a unique username
const generateUsername = async (email) => {
    let username = email.split("@")[0];
    let usernameExists = await User.exists({ "personal_info.username": username });
    if (usernameExists) {
        username += nanoid().substring(0, 5);
    }
    return username;
};

// Signup route
server.post('/signup', (req, res) => {
    const { fullname, email, password } = req.body;

    // Validating data from frontend
    if (fullname.length < 3) {
        return res.status(403).json({ "error": "Fullname must be at least 3 letters long" });
    }
    if (!email.length) {
        return res.status(403).json({ "error": "Enter Email" });
    }
    if (!emailRegex.test(email)) {
        return res.status(403).json({ "error": "Email is invalid" });
    }
    if (!passwordRegex.test(password)) {
        return res.status(403).json({ "error": "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letter" });
    }

    bcrypt.hash(password, 10, async (err, hashed_password) => {
        if (err) {
            return res.status(500).json({ "error": "Error hashing password" });
        }

        const username = await generateUsername(email);
        const user = new User({
            personal_info: {
                fullname,
                email,
                password: hashed_password,
                username
            }
        });

        user.save()
            .then((u) => res.status(200).json(formatDatatoSend(u)))
            .catch(err => {
                if (err.code === 11000) {
                    return res.status(500).json({ "error": "Email already exists" });
                }
                return res.status(500).json({ "error": err.message });
            });
    });
});

// Signin route
server.post("/signin", (req, res) => {
    const { email, password } = req.body;

    User.findOne({ "personal_info.email": email })
        .then((user) => {
            if (!user) {
                return res.status(403).json({ "error": "Email not found" });
            }

            bcrypt.compare(password, user.personal_info.password, (err, result) => {
                if (err) {
                    return res.status(403).json({ "error": "Error occurred while logging in, please try again" });
                }
                if (!result) {
                    return res.status(403).json({ "error": "Incorrect password" });
                } else {
                    return res.status(200).json(formatDatatoSend(user));
                }
            });
        })
        .catch(err => res.status(500).json({ "error": "Server error" }));
});

// Google Signin route
server.post("/google-signin", async (req, res) => {
    const { email, fullname, googleId } = req.body;

    try {
        let user = await User.findOne({ "personal_info.email": email });

        if (user) {
            return res.status(200).json(formatDatatoSend(user));
        } else {
            const username = await generateUsername(email);
            user = new User({
                personal_info: {
                    fullname,
                    email,
                    username,
                    googleId,
                },
            });
            await user.save();
            return res.status(200).json(formatDatatoSend(user));
        }
    } catch (err) {
        return res.status(500).json({ "error": err.message });
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
