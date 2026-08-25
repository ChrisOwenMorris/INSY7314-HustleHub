/**
 * File: server.js
 * Description: Bootstraps the HTTPS server implementation for the HustleHub+ backend.
 * Loads local SSL certificates to serve the application securely over HTTPS.
 * 
 * References:
 * - Node.js HTTPS Module: https://nodejs.org/api/https.html
 * - Node.js File System Module: https://nodejs.org/api/fs.html
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const app = require('./app.js');

const PORT = process.env.PORT || 3000;

// Configuration options for local SSL/TLS certificate loading
const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'config', 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'config', 'server.cert'))
};

// Instantiates and starts the secure HTTPS server instance
https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`Secure server running on https://localhost:${PORT}`);
    console.log(`Test the health check at https://localhost:${PORT}/api/health`);
});