// src/routes/admin.js
import express from 'express';
import verifyJWT from '../middleware/verifyJWT.js';
import verifyAdmin from '../middleware/verifyAdmin.js';
import adminRateLimiter from '../middleware/rateLimiter.js'; // Import the rate limiter
import User from '../adminSchema/User.js';
import Like from '../Schema/Like.js';
import Comment from '../Schema/Comment.js';
import Blog from '../Schema/Blog.js';

const router = express.Router();

// Apply rate limiter to all admin routes
router.use(adminRateLimiter);

/**
 * @route   POST /admin/users-activity
 * @desc    Get all users with their total likes, comments, and blogs
 * @access  Admin Only
 */
router.post('/users-activity', verifyJWT, verifyAdmin, async (req, res) => {
    const { page = 1, limit = 10 } = req.body;

    try {
        const usersActivity = await User.aggregate([
            {
                $lookup: {
                    from: 'likes',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'likes'
                }
            },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'commented_by',
                    as: 'comments'
                }
            },
            {
                $lookup: {
                    from: 'blogs',
                    localField: '_id',
                    foreignField: 'author',
                    as: 'blogs'
                }
            },
            {
                $project: {
                    _id: 1,
                    'personal_info.fullname': 1,
                    'personal_info.username': 1,
                    'personal_info.email': 1,
                    totalLikes: { $size: '$likes' },
                    totalComments: { $size: '$comments' },
                    totalBlogs: { $size: '$blogs' },
                }
            },
            {
                $skip: (page - 1) * limit
            },
            {
                $limit: limit
            }
        ]);

        const totalUsers = await User.countDocuments();
        const totalPages = Math.ceil(totalUsers / limit);

        res.status(200).json({
            users: usersActivity,
            currentPage: page,
            totalPages: totalPages
        });
    } catch (err) {
        console.error("Error fetching users activity:", err.message);
        res.status(500).json({ error: "Failed to fetch users activity" });
    }
});

export default router;
