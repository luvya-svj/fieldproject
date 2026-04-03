import express from 'express';
const router = express.Router();
import Hospital from '../models/Hospital.js';

// GET /api/hospitals - Get all hospitals from PostgreSQL
router.get('/', async (req, res) => {
    try {
        const hospitals = await Hospital.findAll();
        
        // No more hardcoded fallback - strictly live data
        res.json({ success: true, count: hospitals.length, data: hospitals, source: 'postgres' });
    } catch (err) {
        console.error("Database error in /api/hospitals:", err.message);
        res.status(500).json({ success: false, error: "Database error occurred, unable to fetch live data." });
    }
});

// GET /api/hospitals/:id - Get single hospital from PostgreSQL
router.get('/:id', async (req, res) => {
    try {
        const hospital = await Hospital.findByPk(req.params.id);
        if (!hospital) {
            return res.status(404).json({ success: false, error: "Hospital not found in the database." });
        }
        res.json({ success: true, data: hospital, source: 'postgres' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST /api/hospitals/:id/queue - Add to queue (Database-ready stub)
router.post('/:id/queue', async (req, res) => {
    res.json({ success: true, message: "Added to live queue", ticketNumber: "P-502", estWait: "Live update in 15 mins" });
});

export default router;
