const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.admin = await Admin.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const superAdmin = (req, res, next) => {
    if (req.admin && req.admin.role === 'super_admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as a super admin' });
    }
};

const checkPermission = (permission) => {
    return (req, res, next) => {
        if (req.admin && (req.admin.role === 'super_admin' || req.admin.permissions.includes(permission))) {
            next();
        } else {
            res.status(403).json({ message: `Not authorized, mission permission: ${permission}` });
        }
    };
};

module.exports = { protect, superAdmin, checkPermission };
