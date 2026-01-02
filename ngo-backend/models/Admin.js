const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['super_admin', 'admin'],
        default: 'admin'
    },
    permissions: [{
        type: String,
        enum: [
            'manage_projects',
            'manage_team',
            'manage_gallery',
            'manage_careers',
            'manage_content',
            'manage_settings'
        ]
    }]
}, { timestamps: true });

// Match user entered password to hashed password in database
adminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
