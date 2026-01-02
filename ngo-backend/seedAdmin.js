const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

dotenv.config();

const seedAdmin = async () => {
    try {
        await connectDB();

        // Check if admin already exists
        const adminExists = await Admin.findOne({ username: 'admin' });

        if (adminExists) {
            console.log('⚠️ Admin user already exists');
            process.exit();
        }

        // Create default admin
        const admin = await Admin.create({
            username: 'admin',
            password: 'password123',
            role: 'super_admin',
            permissions: []
        });

        console.log('✅ Admin user created successfully');
        console.log('Username: admin');
        console.log('Password: password123');

        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

seedAdmin();
