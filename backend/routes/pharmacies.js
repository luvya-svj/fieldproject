import express from 'express';
import Pharmacy from '../models/Pharmacy.js';

const router = express.Router();

// @route   GET /api/pharmacies
// @desc    Get all 24/7 pharmacies
// @access  Public
router.get('/', async (req, res) => {
    try {
        const pharmacies = await Pharmacy.findAll();
        
        // Match the shape expected by our frontend (which likes standard array responses, but let's provide a data wrapper for scaling)
        res.json({
            count: pharmacies.length,
            data: pharmacies
        });
    } catch (err) {
        console.error('Error fetching pharmacies:', err);
        res.status(500).json({ error: 'Server Error occurred while fetching pharmacies' });
    }
});

export default router;
