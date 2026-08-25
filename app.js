/**
 * File: app.js
 * Description: Main application configuration file for the HustleHub+ backend API.
 * Sets up Express middleware, security headers, base health-check routing, and 
 * error-handling middleware.
 * 
 * References:
 * - Express.js Documentation: https://expressjs.com/
 * - Helmet Security Middleware: https://helmetjs.github.io/
 * - CORS Middleware: https://github.com/expressjs/cors
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Application Security and Utility Middleware Configuration
app.use(helmet()); // Applies secure HTTP headers to mitigate common web vulnerabilities
app.use(cors()); // Enables Cross-Origin Resource Sharing based on project policy
app.use(express.json()); // Parses incoming JSON payloads into request.body

// Base System Health Check Route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'HustleHub API is running securely!' });
});

// Primary API Router Mounts
app.use('/api/auth', authRoutes);

// Global Error-Handling Middleware (Must be registered after all routes)
app.use(errorHandler);

module.exports = app;