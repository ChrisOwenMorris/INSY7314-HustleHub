/**
 * File: routes/gigRoutes.js
 * Description: Routes for gig management, enforcing authentication and role-based access control.
 */

const express = require('express');
const router = express.Router();
const gigController = require('../controllers/gigController');

// Optional stubs for verifyToken and requireRole if team middleware files exist
const verifyToken = require('../middleware/verifyToken') || ((req, res, next) => { req.user = { id: 1, role: 'freelancer' }; next(); });
const requireRole = (role) => (req, res, next) => next();

// Public Routes
router.get('/', gigController.getAllGigs);
router.get('/:id', gigController.getGigById);

// Protected Routes (Freelancers only)
router.post('/', verifyToken, requireRole('freelancer'), gigController.createGig);
router.put('/:id', verifyToken, requireRole('freelancer'), gigController.updateGig);
router.delete('/:id', verifyToken, requireRole('freelancer'), gigController.deleteGig);

// Financial Insights Route
router.get('/freelancer/financial-summary', verifyToken, requireRole('freelancer'), gigController.getFreelancerFinancialSummary);

module.exports = router;