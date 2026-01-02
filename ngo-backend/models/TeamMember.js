const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    image: {
        type: String, // Cloudinary URL
        required: true
    },
    bio: {
        type: String
    },
    socialLinks: { // Store JSON string or Object
        twitter: String,
        linkedin: String,
        facebook: String
    }
}, { timestamps: true });

module.exports = mongoose.model('TeamMember', teamMemberSchema);
