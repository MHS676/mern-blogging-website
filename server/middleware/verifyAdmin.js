// src/middleware/verifyAdmin.js
import User from '../Schema/User.js'; // Adjust the path based on your project structure

const verifyAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user).select('admin');
        if (!user || !user.admin) {
            return res.status(403).json({ error: "Access denied: Admins only" });
        }
        next();
    } catch (err) {
        console.error('Error in verifyAdmin middleware:', err.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default verifyAdmin;
