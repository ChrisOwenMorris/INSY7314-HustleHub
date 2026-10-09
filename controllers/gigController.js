/**
 * File: controllers/gigController.js
 * Description: Handles business logic for gig CRUD operations, freelancer ownership checks,
 * public browsing, and financial summary calculations.
 * 
 * References:
 * - Express Controller Pattern: https://expressjs.com/en/guide/routing.html
 */

const gigs = require('../models/Gig');
const { calculateEstimatedTax } = require('../utils/taxCalculator');

/**
 * Public: Fetch all published gigs with optional title search.
 */
const getAllGigs = (req, res, next) => {
    try {
        const { search } = req.query;
        let results = [...gigs];

        if (search) {
            results = results.filter(gig => 
                gig.title.toLowerCase().includes(search.toLowerCase()) ||
                gig.category.toLowerCase().includes(search.toLowerCase())
            );
        }

        return res.status(200).json({ status: "success", count: results.length, data: results });
    } catch (error) {
        next(error);
    }
};

/**
 * Public: Fetch a single gig by ID.
 */
const getGigById = (req, res, next) => {
    try {
        const gigId = parseInt(req.params.id, 10);
        const gig = gigs.find(g => g.id === gigId);

        if (!gig) {
            return res.status(404).json({ error: "Not Found", message: "Gig listing not found." });
        }

        return res.status(200).json({ status: "success", data: gig });
    } catch (error) {
        next(error);
    }
};

/**
 * Protected (Freelancer): Create a new gig listing.
 */
const createGig = (req, res, next) => {
    try {
        const { title, description, price, category } = req.body;

        if (!title || !description || !price || !category) {
            return res.status(400).json({ error: "Validation Error", message: "All fields are required (title, description, price, category)." });
        }

        const newGig = {
            id: gigs.length + 1,
            freelancerId: req.user.id,
            freelancerEmail: req.user.email,
            title,
            description,
            price: Number(price),
            category,
            createdAt: new Date().toISOString()
        };

        gigs.push(newGig);

        return res.status(201).json({ status: "success", message: "Gig created successfully", data: newGig });
    } catch (error) {
        next(error);
    }
};

/**
 * Protected (Freelancer): Update an existing gig listing with ownership verification.
 */
const updateGig = (req, res, next) => {
    try {
        const gigId = parseInt(req.params.id, 10);
        const gig = gigs.find(g => g.id === gigId);

        if (!gig) {
            return res.status(404).json({ error: "Not Found", message: "Gig listing not found." });
        }

        // Ownership enforcement: verify authenticated user matches gig owner
        if (gig.freelancerId !== req.user.id) {
            return res.status(403).json({ error: "Forbidden", message: "You are not authorized to update this gig." });
        }

        const { title, description, price, category } = req.body;
        if (title) gig.title = title;
        if (description) gig.description = description;
        if (price) gig.price = Number(price);
        if (category) gig.category = category;

        return res.status(200).json({ status: "success", message: "Gig updated successfully", data: gig });
    } catch (error) {
        next(error);
    }
};

/**
 * Protected (Freelancer): Delete a gig listing with ownership verification.
 */
const deleteGig = (req, res, next) => {
    try {
        const gigId = parseInt(req.params.id, 10);
        const gigIndex = gigs.findIndex(g => g.id === gigId);

        if (gigIndex === -1) {
            return res.status(404).json({ error: "Not Found", message: "Gig listing not found." });
        }

        // Ownership enforcement
        if (gigs[gigIndex].freelancerId !== req.user.id) {
            return res.status(403).json({ error: "Forbidden", message: "You are not authorized to delete this gig." });
        }

        gigs.splice(gigIndex, 1);

        return res.status(200).json({ status: "success", message: "Gig deleted successfully." });
    } catch (error) {
        next(error);
    }
};

/**
 * Protected (Freelancer): Financial & Tax Summary.
 */
const getFreelancerFinancialSummary = (req, res, next) => {
    try {
        const myGigs = gigs.filter(g => g.freelancerId === req.user.id);
        const grossIncome = myGigs.reduce((sum, item) => sum + item.price, 0);
        const financialReport = calculateEstimatedTax(grossIncome);

        return res.status(200).json({
            status: "success",
            data: {
                totalActiveGigs: myGigs.length,
                ...financialReport
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllGigs,
    getGigById,
    createGig,
    updateGig,
    deleteGig,
    getFreelancerFinancialSummary
};