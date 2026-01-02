const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

// Initialize Express
const app = express();

const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (origin === allowedOrigin || origin === 'http://localhost:5173') {
            callback(null, true);
        } else {
            callback(null, true); // In monolithic mode, same origin is defaultly ok
        }
    },
    credentials: true
}));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/team', require('./routes/teamRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/careers', require('./routes/careerRoutes'));
app.use('/api/content', require('./routes/contentRoutes'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder - assuming frontend is in '../Divya-Jyoti-Ngo/dist' relative to backend
    app.use(express.static(path.join(__dirname, '../Divya-Jyoti-Ngo/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'Divya-Jyoti-Ngo', 'dist', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('Divya Jyoti NGO Backend is running...');
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Server Error' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
