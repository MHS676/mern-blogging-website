// src/tests/adminRoute.test.js
import request from 'supertest';
import app from '../App.jsx'; // Ensure your Express app is exported from App.jsx
import mongoose from 'mongoose';
import User from '../Schema/User.js';
import Like from '../Schema/Like.js';
import Comment from '../Schema/Comment.js';
import Blog from '../Schema/Blog.js';

describe('Admin Routes', () => {
    let adminToken;

    beforeAll(async () => {
        // Connect to the test database
        await mongoose.connect(process.env.TEST_DB_LOCATION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Create an admin user
        const adminUser = new User({
            personal_info: {
                fullname: "Admin User",
                email: "admin@example.com",
                password: "AdminPass123",
                username: "adminuser"
            },
            admin: true
        });
        await adminUser.save();

        // Generate JWT for admin
        adminToken = jwt.sign({ id: adminUser._id }, process.env.SECRET_ACCESS_KEY);
    });

    afterAll(async () => {
        // Clean up database
        await User.deleteMany({});
        await Like.deleteMany({});
        await Comment.deleteMany({});
        await Blog.deleteMany({});

        // Disconnect from the database
        await mongoose.disconnect();
    });

    test('Should allow admin to fetch users activity', async () => {
        const response = await request(app)
            .post('/admin/users-activity')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ page: 1, limit: 10 });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('users');
        expect(Array.isArray(response.body.users)).toBe(true);
    });

    test('Should deny access to non-admin users', async () => {
        // Create a non-admin user
        const user = new User({
            personal_info: {
                fullname: "Regular User",
                email: "user@example.com",
                password: "UserPass123",
                username: "regularuser"
            },
            admin: false
        });
        await user.save();

        // Generate JWT for non-admin
        const userToken = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY);

        const response = await request(app)
            .post('/admin/users-activity')
            .set('Authorization', `Bearer ${userToken}`)
            .send({ page: 1, limit: 10 });

        expect(response.statusCode).toBe(403);
        expect(response.body).toHaveProperty('error', 'Access denied: Admins only');
    });
});
