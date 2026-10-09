/**
 * File: middleware/securityHeaders.js
 * Description: Custom security headers configuration enforcing strict Content-Security-Policy (CSP).
 */
const helmet = require('helmet');

const configureSecurityHeaders = () => {
    return helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'"],
                styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
                fontSrc: ["'self'", "https://fonts.gstatic.com"],
                imgSrc: ["'self'", "data:", "https:"],
                connectSrc: ["'self'", "https://localhost:3000"]
            }
        },
        crossOriginEmbedderPolicy: true,
        noSniff: true,
        frameguard: { action: 'deny' }
    });
};

module.exports = configureSecurityHeaders;