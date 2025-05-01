const fakeDb = require('../database/fakeDb');

function validateApiKey(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || !Object.values(fakeDb).includes(apiKey)) {
        return res.status(403).json({ error: 'Invalid API Key' });
    }
    next();
}

module.exports = validateApiKey;
