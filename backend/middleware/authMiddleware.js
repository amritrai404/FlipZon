import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    let token;

    // Check Authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Extract token
            token = req.headers.authorization.split(' ')[1];

            // Decode token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("🧾 Decoded Token:", decoded); // Should include { id, role }

            // Fetch user from DB
            const user = await User.findById(decoded.id).select('-password');
            console.log("🔍 Found user:", user);

            if (!user) {
                return res.status(401).json({ message: 'User not found, invalid token' });
            }

            // Attach user
            req.user = user;

            return next();
        } catch (err) {
            console.error('Token Error:', err.message);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    // No token
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        console.log("User in authorizeRoles:", req.user);

        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Role '${req.user?.role}' is not allowed to access this route`,
            });
        }
        next();
    };
};
