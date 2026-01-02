const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    type: {
        type: String, // Full-time, Part-time, Internship, Volunteer
        required: true
    },
    isOpen: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Career', careerSchema);
