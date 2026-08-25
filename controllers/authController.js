/**
 * File: controllers/authController.js
 * Description: Handles user authentication business logic, including secure input validation,
 * duplicate verification, and cryptographic password hashing via bcrypt.
 * 
 * References:
 * - Bcrypt Library Documentation: https://www.npmjs.com/package/bcrypt
 */

const bcrypt = require('bcrypt');
const users = require('../models/User');

/**
 * Controller method to register a new user account.
 */
const registerUser = async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body;

        // Validates that all mandatory fields have been provided in the request body
        if (!username || !email || !password || !role) {
            return res.status(400).json({ 
                error: "Validation Error", 
                message: "All fields are required (username, email, password, role)." 
            });
        }

        // Checks the in-memory data store for existing user email conflicts
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(409).json({ 
                error: "Conflict", 
                message: "User with this email already exists." 
            });
        }

        // Cryptographically hashes the user password using bcrypt with a salt factor of 10
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Constructs the new user record object
        const newUser = {
            id: users.length + 1,
            username,
            email,
            password: hashedPassword, // Stores the secure hash; plain-text passwords are strictly avoided
            role 
        };

        // Persists the new user record to the in-memory data model array
        users.push(newUser);

        // Returns a successful creation response omitting sensitive password data
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
        // Delegates unhandled execution errors to the global error-handling middleware
        next(error);
    }
};

module.exports = {
    registerUser
};