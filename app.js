const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// 1. Apply Security and Utility Middleware
app.use(helmet()); // Configure Helmet for security headers
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON payloads

// 2. Base Routes
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'HustleHub API is running securely!' });
});

// 3. Global Error Handler
app.use(errorHandler);

module.exports = app;