// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
    // We log the detailed error in our own terminal for debugging
    console.error("Internal Error Details:", err.message);

    // But we return a safe, generic response to the client
    // Notice there is no 'err.stack' included in the JSON response
    res.status(500).json({
        error: "Internal Server Error",
        message: "Something went wrong on our end. Please try again later."
    });
};

module.exports = errorHandler;