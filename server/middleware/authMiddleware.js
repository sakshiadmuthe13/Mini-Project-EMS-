import jwt from 'jsonwebtoken'
import User from '../models/User.js';

const verifyUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ success: false, error: "Token not provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);

        if (!decoded) {
            return res.status(403).json({ success: false, error: "Invalid token" });
        }

        const user = await User.findById(decoded._id).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("JWT verify error:", error);
        return res.status(500).json({ success: false, error: "Server error" });
    }
};


export default verifyUser