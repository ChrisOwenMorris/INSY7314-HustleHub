// controllers/authController.js
const bcrypt = require('bcrypt');
const users = require('../models/User');

// Register a new user
const registerUser = async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body;

        // Basic validation for missing fields
        if (!username || !email || !password || !role) {
            return res.status(400).json({ error: "Validation Error", message: "All fields are required (username, email, password, role)." });
        }

        // Check if user already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(409).json({ error: "Conflict", message: "User with this email already exists." });
        }

        // Hash the password securely using bcrypt (salt rounds = 10)
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create the new user object
        const newUser = {
            id: users.length + 1,
            username,
            email,
            password: hashedPassword, // Store the hashed password, never plain text!
            role // e.g., Client, Freelancer, or Admin
        };

        // Save to the in-memory array
        users.push(newUser);

        // Return a successful response (excluding the password)
        return res.status(201).json({
            status: "success",
            message: "User registered successfully",
            data: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        // Pass any unexpected errors to your global error handler
        next(error);
    }
};

module.exports = {
    registerUser
};