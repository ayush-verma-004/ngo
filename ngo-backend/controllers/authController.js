const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const asyncHandler = require('express-async-handler'); // We might need to install this or use try-catch

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });

        if (admin && (await admin.matchPassword(password))) {
            res.json({
                _id: admin._id,
                username: admin.username,
                role: admin.role,
                permissions: admin.permissions,
                token: generateToken(admin._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Register a new admin
// @route   POST /api/auth/register
// @access  Private (Super Admin)
const registerUser = async (req, res) => {
    try {
        const { username, password, role, permissions } = req.body;

        const adminExists = await Admin.findOne({ username });

        if (adminExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const admin = await Admin.create({
            username,
            password,
            role: role || 'admin',
            permissions: permissions || []
        });

        if (admin) {
            res.status(201).json({
                _id: admin._id,
                username: admin.username,
                role: admin.role,
                permissions: admin.permissions,
            });
        } else {
            res.status(400).json({ message: 'Invalid admin data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update admin (by Super Admin)
// @route   PUT /api/auth/:id
// @access  Private (Super Admin)
const updateAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);

        if (admin) {
            admin.username = req.body.username || admin.username;
            admin.role = req.body.role || admin.role;
            admin.permissions = req.body.permissions || admin.permissions;

            if (req.body.password) {
                admin.password = req.body.password;
            }

            const updatedAdmin = await admin.save();

            res.json({
                _id: updatedAdmin._id,
                username: updatedAdmin.username,
                role: updatedAdmin.role,
                permissions: updatedAdmin.permissions,
            });
        } else {
            res.status(404).json({ message: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update admin profile (by themselves)
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin._id);

        if (admin) {
            admin.username = req.body.username || admin.username;
            if (req.body.password) {
                admin.password = req.body.password;
            }

            const updatedAdmin = await admin.save();

            res.json({
                _id: updatedAdmin._id,
                username: updatedAdmin.username,
                role: updatedAdmin.role,
                permissions: updatedAdmin.permissions,
                token: generateToken(updatedAdmin._id),
            });
        } else {
            res.status(404).json({ message: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all admins
// @route   GET /api/auth
// @access  Private (Super Admin)
const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find({}).select('-password');
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete admin
// @route   DELETE /api/auth/:id
// @access  Private (Super Admin)
const deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);

        if (admin) {
            // Prevent deleting yourself
            if (admin._id.toString() === req.admin._id.toString()) {
                return res.status(400).json({ message: 'You cannot delete yourself' });
            }
            await admin.deleteOne();
            res.json({ message: 'Admin removed' });
        } else {
            res.status(404).json({ message: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { loginUser, registerUser, updateProfile, getAdmins, deleteAdmin, updateAdmin };
