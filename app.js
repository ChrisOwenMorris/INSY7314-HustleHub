const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// 1. Apply Security and Utility Middleware
app.use(helmet()); // Configure Helmet for security headers
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON payloads

// 2. Base Routes
// Create a health-check route to confirm HTTPS works
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'HustleHub API is running securely!' });
});

// We will add the auth routes and global error handler here in the next steps

module.exports = app;