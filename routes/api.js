const express = require('express');
const fakeDb = require('../database/fakeDb');

const router = express.Router();

// Validate API Key
router.post('/validate-key', (req, res) => {
    const { apiKey } = req.body;
    if (!apiKey || !Object.values(fakeDb).includes(apiKey)) {
        return res.status(403).json({ valid: false });
    }
    res.status(200).json({ valid: true });
});

// Generate API Key (already exists)
router.post('/generate-key', (req, res) => {
    const userId = req.body.userId;
    if (!userId) return res.status(400).json({ error: 'User ID is required' });
    
    const apiKey = crypto.randomBytes(32).toString('hex');
    fakeDb[userId] = apiKey;
    res.status(200).json({ apiKey });
});

module.exports = router;
