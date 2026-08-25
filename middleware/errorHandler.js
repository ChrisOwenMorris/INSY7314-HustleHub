/**
 * File: middleware/errorHandler.js
 * Description: Centralized global error handling middleware designed to intercept 
 * unhandled exceptions and prevent the exposure of sensitive system internals (stack traces).
 * 
 * References:
 * - Express Error Handling: https://expressjs.com/en/guide/error-handling.html
 */

const errorHandler = (err, req, res, next) => {
    // Logs the detailed error stack internally for debugging purposes
    console.error("Internal Error Details:", err.message);

    // Returns a controlled, secure, and user-friendly JSON response to the client
    res.status(500).json({
        error: "Internal Server Error",
        message: "Something went wrong on our end. Please try again later."
    });
};

module.exports = errorHandler;