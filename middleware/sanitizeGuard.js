/**
 * File: middleware/sanitizeGuard.js
 * Description: Middleware that recursively strips dangerous Mongo operators and script tags.
 */
const sanitizeInput = (obj) => {
    if (typeof obj !== 'object' || obj === null) return obj;

    for (const key in obj) {
        if (key.startsWith('$') || key.includes('.')) {
            delete obj[key];
        } else if (typeof obj[key] === 'string') {
            obj[key] = obj[key].replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        } else if (typeof obj[key] === 'object') {
            sanitizeInput(obj[key]);
        }
    }
    return obj;
};

const sanitizeGuard = (req, res, next) => {
    if (req.body) req.body = sanitizeInput(req.body);
    if (req.query) req.query = sanitizeInput(req.query);
    if (req.params) req.params = sanitizeInput(req.params);
    next();
};

module.exports = sanitizeGuard;