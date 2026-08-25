const https = require('https');
const fs = require('fs');
const path = require('path');
const app = require('./app.js');

const PORT = process.env.PORT || 3000;

// Read the SSL certificates from the config folder
const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'config', 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'config', 'server.cert'))
};

// Create and start the HTTPS server
https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`Secure server running on https://localhost:${PORT}`);
    console.log(`Test the health check at https://localhost:${PORT}/api/health`);
});